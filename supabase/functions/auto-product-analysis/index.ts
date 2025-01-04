import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from './cors.ts';
import { searchProducts } from './productSearch.ts';
import { analyzeProduct } from './productAnalysis.ts';
import { uploadToDatabase } from './databaseUpload.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate environment variables
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!openAIApiKey) throw new Error('Missing OpenAI API key');
    if (!supabaseUrl) throw new Error('Missing Supabase URL');
    if (!supabaseServiceRoleKey) throw new Error('Missing Supabase service role key');

    const cycleStartTime = new Date();
    console.log(`[${cycleStartTime.toISOString()}] Starting analysis cycle`);
    
    // Phase 1: Product Search
    console.log(`[${new Date().toISOString()}] Starting Phase 1: Product Search`);
    const products = await searchProducts(openAIApiKey);
    
    // Phase 2: Deep Analysis
    console.log(`[${new Date().toISOString()}] Starting Phase 2: Deep Analysis`);
    const analysisPromises = products.map(product => analyzeProduct(openAIApiKey, product));
    const analyses = await Promise.all(analysisPromises);
    
    // Phase 3: Database Upload
    console.log(`[${new Date().toISOString()}] Starting Phase 3: Database Upload`);
    for (let i = 0; i < products.length; i++) {
      await uploadToDatabase(supabaseUrl, supabaseServiceRoleKey, products[i], analyses[i]);
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