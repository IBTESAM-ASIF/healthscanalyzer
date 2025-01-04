import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function searchProducts(openai: OpenAIApi) {
  console.log(`[${new Date().toISOString()}] Starting product search phase...`);
  
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a product research expert. Search for 2 unique consumer products that need health analysis. 
          Include both common items and specialized products. Format as JSON array with fields:
          - name
          - description
          - category (preliminary: healthy/restricted/harmful)
          - known_ingredients
          - amazon_url (hypothetical)
          - potential_risks
          - initial_safety_concerns`
        }
      ]
    });

    if (!completion.data.choices[0].message?.content) {
      throw new Error('No content received from OpenAI');
    }

    const products = JSON.parse(completion.data.choices[0].message.content);
    console.log(`[${new Date().toISOString()}] Found ${products.length} products to analyze`);
    return products;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in searchProducts:`, error);
    throw error;
  }
}

async function analyzeProduct(openai: OpenAIApi, product: any) {
  console.log(`[${new Date().toISOString()}] Starting deep analysis for: ${product.name}`);
  
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a product safety expert. Analyze this product thoroughly and provide:
            1. Detailed health score (0-100)
            2. Final category determination (healthy/restricted/harmful)
            3. Comprehensive analysis summary
            4. Evidence-based pros and cons
            5. Safety considerations including:
               - Allergy risks
               - Drug interactions
               - Population-specific warnings
               - Environmental impact
               - Safety incidents
            Format as detailed JSON.`
        },
        {
          role: "user",
          content: `Analyze this product with all available information: ${JSON.stringify(product)}`
        }
      ]
    });

    if (!completion.data.choices[0].message?.content) {
      throw new Error('No content received from OpenAI');
    }

    const analysis = JSON.parse(completion.data.choices[0].message.content);
    console.log(`[${new Date().toISOString()}] Completed deep analysis for: ${product.name}`);
    return analysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in analyzeProduct:`, error);
    throw error;
  }
}

async function uploadToDatabase(supabaseClient: any, product: any, analysis: any) {
  console.log(`[${new Date().toISOString()}] Uploading product to database: ${product.name}`);
  
  try {
    const { error } = await supabaseClient
      .from('products')
      .insert([{
        name: product.name,
        amazon_url: product.amazon_url,
        ingredients: product.known_ingredients,
        category: analysis.category?.toLowerCase(),
        health_score: analysis.healthScore,
        analysis_summary: analysis.summary,
        pros: analysis.pros,
        cons: analysis.cons,
        allergy_risks: analysis.allergyRisks,
        drug_interactions: analysis.drugInteractions,
        special_population_warnings: analysis.populationWarnings,
        environmental_impact: analysis.environmentalImpact,
        safety_incidents: analysis.safetyIncidents || [],
        has_fatal_incidents: analysis.hasFatalIncidents || false,
        has_serious_adverse_events: analysis.hasSeriousAdverseEvents || false,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      throw error;
    }
    
    console.log(`[${new Date().toISOString()}] Successfully uploaded: ${product.name}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error uploading ${product.name}:`, error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const cycleStartTime = new Date();
    console.log(`[${cycleStartTime.toISOString()}] Starting analysis cycle`);
    
    // Initialize OpenAI
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      console.error(`[${cycleStartTime.toISOString()}] Error: OpenAI API key not configured`);
      throw new Error('OpenAI API key not configured');
    }

    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    // Initialize Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Phase 1: Product Search (0-4 minutes)
    console.log(`[${new Date().toISOString()}] Starting Phase 1: Product Search`);
    const products = await searchProducts(openai);
    
    // Phase 2: Deep Analysis (5-9 minutes)
    console.log(`[${new Date().toISOString()}] Starting Phase 2: Deep Analysis`);
    const analysisPromises = products.map(product => analyzeProduct(openai, product));
    const analyses = await Promise.all(analysisPromises);
    
    // Phase 3: Database Upload (minute 10)
    console.log(`[${new Date().toISOString()}] Starting Phase 3: Database Upload`);
    for (let i = 0; i < products.length; i++) {
      await uploadToDatabase(supabaseClient, products[i], analyses[i]);
    }

    const cycleEndTime = new Date();
    const cycleDuration = (cycleEndTime.getTime() - cycleStartTime.getTime()) / 1000;
    
    console.log(`[${cycleEndTime.toISOString()}] Cycle completed in ${cycleDuration} seconds`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        productsAnalyzed: products.length,
        cycleDuration: cycleDuration,
        timestamp: cycleEndTime.toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in auto-product-analysis:`, error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});