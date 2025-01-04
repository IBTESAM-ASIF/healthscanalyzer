import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function generateProductIdeas(openai: OpenAIApi, limit: number = 5) {
  console.log(`[${new Date().toISOString()}] Starting product idea generation for ${limit} products...`);
  const completion = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Generate ${limit} unique consumer products that would benefit from health analysis. Include both common and specialized products. Format as JSON array.`
      }
    ]
  });

  const ideas = JSON.parse(completion.data.choices[0].message?.content || '[]');
  console.log(`[${new Date().toISOString()}] Successfully generated ${ideas.length} product ideas`);
  return ideas;
}

async function analyzeProduct(openai: OpenAIApi, product: any) {
  console.log(`[${new Date().toISOString()}] Analyzing product: ${product.name}`);
  const completion = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Analyze products and provide a detailed JSON response including:
          1. Product name
          2. Category (healthy/restricted/harmful)
          3. Health score (0-100)
          4. Analysis summary
          5. Pros and cons
          6. Safety considerations`
      },
      {
        role: "user",
        content: `Analyze: ${JSON.stringify(product)}`
      }
    ]
  });

  const analysis = JSON.parse(completion.data.choices[0].message?.content || '{}');
  console.log(`[${new Date().toISOString()}] Completed analysis for: ${product.name}`);
  return analysis;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log(`[${new Date().toISOString()}] Starting automatic product analysis...`);
    
    const { limit = 5 } = await req.json();
    
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      console.error(`[${new Date().toISOString()}] Error: OpenAI API key not configured`);
      throw new Error('OpenAI API key not configured');
    }

    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const productIdeas = await generateProductIdeas(openai, limit);
    console.log(`[${new Date().toISOString()}] Generated ${productIdeas.length} product ideas`);

    const analyzedProducts = await Promise.all(
      productIdeas.map(product => analyzeProduct(openai, product))
    );
    console.log(`[${new Date().toISOString()}] Analyzed ${analyzedProducts.length} products`);

    // Insert new products with detailed logging
    for (const product of analyzedProducts) {
      console.log(`[${new Date().toISOString()}] Inserting product: ${product.name}`);
      const { error } = await supabaseClient
        .from('products')
        .insert([{
          name: product.name,
          category: product.category?.toLowerCase(),
          health_score: product.healthScore,
          analysis_summary: product.summary,
          pros: product.pros,
          cons: product.cons,
          safety_incidents: product.safetyIncidents || [],
          created_at: new Date().toISOString()
        }]);
      
      if (error) {
        console.error(`[${new Date().toISOString()}] Error inserting product ${product.name}:`, error);
      } else {
        console.log(`[${new Date().toISOString()}] Successfully inserted product: ${product.name}`);
      }
    }

    console.log(`[${new Date().toISOString()}] Product analysis cycle completed successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        productsAnalyzed: analyzedProducts.length,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in auto-product-analysis:`, error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});