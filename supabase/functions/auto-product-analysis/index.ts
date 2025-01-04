import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function generateProductIdeas(openai: OpenAIApi) {
  console.log('Generating product ideas...');
  const completion = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a product researcher. Generate 5 unique consumer products that would benefit from health and safety analysis. Include both common household items and specialized products. Format as JSON array with name and brief description."
      }
    ]
  });

  return JSON.parse(completion.data.choices[0].message?.content || '[]');
}

async function analyzeProduct(openai: OpenAIApi, product: any) {
  console.log(`Analyzing product: ${product.name}`);
  const completion = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a world-class product analyst with expertise in health and safety assessment. Analyze the product thoroughly and provide a detailed JSON response including:
          1. Product name
          2. Category (healthy/restricted/harmful)
          3. Health score (0-100)
          4. Ingredients list
          5. Analysis summary
          6. Pros and cons
          7. Safety incidents
          8. Fatal incidents (true/false)
          9. Serious adverse events (true/false)
          10. Allergy risks
          11. Drug interactions
          12. Environmental impact`
      },
      {
        role: "user",
        content: `Analyze this product thoroughly: ${product.name}\n${product.description}`
      }
    ]
  });

  return JSON.parse(completion.data.choices[0].message?.content || '{}');
}

async function storeProductAnalysis(supabaseClient: any, product: any) {
  console.log(`Storing analysis for product: ${product.name}`);
  const { data, error } = await supabaseClient
    .from('products')
    .insert([{
      name: product.name,
      category: product.category?.toLowerCase(),
      health_score: product.healthScore,
      ingredients: product.ingredients,
      analysis_summary: product.analysisSummary,
      pros: product.pros,
      cons: product.cons,
      has_fatal_incidents: product.hasFatalIncidents,
      has_serious_adverse_events: product.hasSeriousAdverseEvents,
      allergy_risks: product.allergyRisks,
      drug_interactions: product.drugInteractions,
      environmental_impact: product.environmentalImpact,
      safety_incidents: product.safetyIncidents
    }]);

  if (error) {
    console.error('Error storing product:', error);
    throw error;
  }
  return data;
}

serve(async (req) => {
  console.log('Starting auto product analysis function...');
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize OpenAI
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const configuration = new Configuration({
      apiKey: openAiKey,
    });
    const openai = new OpenAIApi(configuration);
    console.log('OpenAI client initialized');

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    console.log('Supabase client initialized');

    // Generate and analyze products
    const productIdeas = await generateProductIdeas(openai);
    console.log(`Generated ${productIdeas.length} product ideas`);

    const analyzedProducts = [];
    for (const product of productIdeas) {
      const analysis = await analyzeProduct(openai, product);
      analyzedProducts.push(analysis);
    }
    console.log(`Analyzed ${analyzedProducts.length} products`);

    // Store results
    for (const product of analyzedProducts) {
      await storeProductAnalysis(supabaseClient, product);
    }
    console.log('All products stored successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Analysis completed successfully',
        productsAnalyzed: analyzedProducts.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in auto-product-analysis:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});