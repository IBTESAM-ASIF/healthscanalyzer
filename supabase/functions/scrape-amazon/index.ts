import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function fetchProductDetails(url: string) {
  try {
    console.log('Fetching product details from:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
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

async function analyzeProduct(openai: OpenAIApi, productData: any) {
  try {
    console.log('Starting AI analysis for:', productData.name);
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a product safety expert. Analyze products and provide:
            1. Health score (0-100)
            2. Category (healthy/restricted/harmful)
            3. Analysis summary
            4. Pros and cons
            5. Safety considerations
            Format as JSON.`
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

    const analysis = JSON.parse(completion.data.choices[0].message?.content || '{}');
    console.log('AI analysis completed successfully');
    return analysis;
  } catch (error) {
    console.error('Error in analyzeProduct:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log('Processing URL:', url);

    if (!url?.includes('amazon.com')) {
      throw new Error('Invalid Amazon URL');
    }

    // Initialize OpenAI
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) throw new Error('OpenAI API key not configured');

    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    // Fetch and analyze product
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
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});