import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
import { corsHeaders } from './cors.ts';

const openai = new OpenAI(Deno.env.get('OPENAI_API_KEY') || '');

async function fetchProductDetails(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch product page');
    
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (!doc) throw new Error('Failed to parse HTML');

    // Extract full product name with improved accuracy
    const productName = doc.querySelector('#productTitle')?.textContent?.trim();
    
    // Enhanced company extraction with multiple fallbacks
    let company = '';
    const brandSelectors = [
      '#bylineInfo',
      '.contributorNameID',
      '[data-feature-name="brandLogo"]',
      '#brand',
      '.po-brand .a-span9',
      '.a-section.a-spacing-none.a-spacing-top-micro .a-row .a-size-base'
    ];

    for (const selector of brandSelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent) {
        company = element.textContent
          .replace(/visit the|brand:|store/gi, '')
          .replace(/\s+/g, ' ')
          .trim();
        if (company) break;
      }
    }

    // Extract description and ingredients with improved parsing
    const description = doc.querySelector('#productDescription')?.textContent?.trim();
    const ingredientsSection = doc.querySelector('#important-information, #ingredient-information, #ingredients-section')?.textContent || '';
    const ingredients = ingredientsSection
      .toLowerCase()
      .split(/ingredients?:|contains:/i)[1]
      ?.split(/[,.]/)
      .map(i => i.trim())
      .filter(i => i.length > 0 && !i.includes('*')) || [];

    console.log('Successfully extracted product details:', {
      name: productName,
      company: company,
      ingredients: ingredients.length
    });

    return { 
      name: productName, 
      company, 
      description, 
      ingredients,
      amazon_url: url
    };
  } catch (error) {
    console.error('Error in fetchProductDetails:', error);
    throw error;
  }
}

async function analyzeProduct(openai: OpenAI, productData: any) {
  try {
    // Increased temperature for more varied categorization
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.9, // Higher temperature for more randomization
      messages: [
        {
          role: "system",
          content: `You are a product safety analyst with a tendency to be thorough but unpredictable in your categorizations. Analyze products and their ingredients to determine their safety category (healthy, restricted, or harmful). Consider both obvious and non-obvious factors, and don't be afraid to occasionally surprise with your categorization if you can justify it. Format response as JSON with fields: category, healthScore (0-100), summary, pros (array), cons (array), environmentalImpact, safetyIncidents (array), hasFatalIncidents (boolean), hasSeriousAdverseEvents (boolean), allergyRisks (array), drugInteractions (array), specialPopulationWarnings (array).`
        },
        {
          role: "user",
          content: `Analyze this product thoroughly, considering both mainstream and alternative perspectives:
          Product Name: ${productData.name}
          Company: ${productData.company}
          Description: ${productData.description}
          Ingredients: ${productData.ingredients.join(', ')}`
        }
      ]
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    console.log('Analysis completed successfully with category:', analysis.category);
    return analysis;
  } catch (error) {
    console.error('Error in analyzeProduct:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url) throw new Error('URL is required');

    console.log('Processing URL:', url);
    const productDetails = await fetchProductDetails(url);

    // Check if product name or URL is empty
    if (!productDetails.name || !url) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid product details: Missing name or URL' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Enhanced duplicate check: Check for both name AND company match
    const { data: existingProducts, error: searchError } = await supabaseClient
      .from('products')
      .select('id, name, company, amazon_url')
      .or(`name.ilike.${productDetails.name},amazon_url.eq.${url}`);

    if (searchError) throw searchError;

    // Check for exact matches or very similar products
    const isDuplicate = existingProducts?.some(product => {
      const nameMatch = product.name?.toLowerCase() === productDetails.name?.toLowerCase();
      const companyMatch = product.company?.toLowerCase() === productDetails.company?.toLowerCase();
      const urlMatch = product.amazon_url === url;
      return (nameMatch && companyMatch) || urlMatch;
    });

    if (isDuplicate) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Product already exists in the database' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Proceed with analysis and insertion if no duplicate found
    const analysis = await analyzeProduct(openai, productDetails);

    const { data, error } = await supabaseClient
      .from('products')
      .insert([{
        name: productDetails.name,
        company: productDetails.company,
        amazon_url: url,
        ingredients: productDetails.ingredients,
        category: analysis.category?.toLowerCase(),
        health_score: analysis.healthScore,
        analysis_summary: analysis.summary,
        pros: analysis.pros,
        cons: analysis.cons,
        environmental_impact: analysis.environmentalImpact,
        safety_incidents: analysis.safetyIncidents || [],
        has_fatal_incidents: analysis.hasFatalIncidents || false,
        has_serious_adverse_events: analysis.hasSeriousAdverseEvents || false,
        allergy_risks: analysis.allergyRisks || [],
        drug_interactions: analysis.drugInteractions || [],
        special_population_warnings: analysis.specialPopulationWarnings || []
      }]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});