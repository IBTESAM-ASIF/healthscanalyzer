import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from './cors.ts';
import OpenAI from 'https://deno.land/x/openai@v4.24.0/mod.ts';

const openai = new OpenAI(Deno.env.get('OPENAI_API_KEY') || '');

async function fetchProductDetails(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch product page');
    
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (!doc) throw new Error('Failed to parse HTML');

    // Extract full product name
    const productName = doc.querySelector('#productTitle')?.textContent?.trim();
    
    // Extract company/brand name
    let company = '';
    // Try multiple selectors where brand/company information might be found
    const brandElement = doc.querySelector('#bylineInfo') || 
                        doc.querySelector('.contributorNameID') ||
                        doc.querySelector('[data-feature-name="brandLogo"]');
    
    if (brandElement) {
      company = brandElement.textContent
        ?.replace('Visit the', '')
        ?.replace('Brand:', '')
        ?.replace('Store', '')
        ?.trim() || '';
    }

    // Extract description and ingredients
    const description = doc.querySelector('#productDescription')?.textContent?.trim();
    const ingredientsSection = doc.querySelector('#important-information, #ingredient-information')?.textContent || '';
    const ingredients = ingredientsSection
      .toLowerCase()
      .split(/ingredients?:/i)[1]
      ?.split(/[,.]/)
      .map(i => i.trim())
      .filter(i => i.length > 0) || [];

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
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a product safety analyst. Analyze products and their ingredients to determine their safety category (healthy, restricted, or harmful) and provide detailed analysis. Include specific health impacts, risks, and environmental considerations. Format response as JSON with fields: category, healthScore (0-100), summary, pros (array), cons (array), environmentalImpact, safetyIncidents (array), hasFatalIncidents (boolean), hasSeriousAdverseEvents (boolean), allergyRisks (array), drugInteractions (array), specialPopulationWarnings (array).`
        },
        {
          role: "user",
          content: `Analyze this product thoroughly:
          Product Name: ${productData.name}
          Company: ${productData.company}
          Description: ${productData.description}
          Ingredients: ${productData.ingredients.join(', ')}`
        }
      ]
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    console.log('Analysis completed successfully');
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
    const analysis = await analyzeProduct(openai, productDetails);

    // Check if product already exists
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check for existing product with same name and company
    const { data: existingProduct } = await supabaseClient
      .from('products')
      .select('id')
      .eq('name', productDetails.name)
      .eq('company', productDetails.company)
      .single();

    if (existingProduct) {
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

    // Insert new product
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