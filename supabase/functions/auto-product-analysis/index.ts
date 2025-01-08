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
    
    // Phase 1: Product Search with increased number of products
    console.log(`[${new Date().toISOString()}] Starting Phase 1: Product Search`);
    const products = await searchProducts(openAIApiKey);
    console.log(`[${new Date().toISOString()}] Found ${products.length} products to analyze`);
    
    if (!products || products.length === 0) {
      throw new Error('No products found to analyze');
    }
    
    // Phase 2: Deep Analysis with improved error handling
    console.log(`[${new Date().toISOString()}] Starting Phase 2: Deep Analysis`);
    const analysisPromises = products.map(async (product) => {
      try {
        const analysis = await analyzeProduct(openAIApiKey, product);
        console.log(`[${new Date().toISOString()}] Successfully analyzed product: ${product.name}`);
        return { product, analysis, success: true };
      } catch (error) {
        console.error(`[${new Date().toISOString()}] Error analyzing product ${product.name}:`, error);
        return { product, error, success: false };
      }
    });
    
    const analysisResults = await Promise.all(analysisPromises);
    
    // Phase 3: Database Upload with validation
    console.log(`[${new Date().toISOString()}] Starting Phase 3: Database Upload`);
    const uploadResults = [];
    
    for (const result of analysisResults) {
      if (result.success) {
        try {
          await uploadToDatabase(supabaseUrl, supabaseServiceRoleKey, result.product, result.analysis);
          uploadResults.push({
            name: result.product.name,
            status: 'success'
          });
        } catch (error) {
          console.error(`[${new Date().toISOString()}] Error uploading ${result.product.name}:`, error);
          uploadResults.push({
            name: result.product.name,
            status: 'failed',
            error: error.message
          });
        }
      }
    }

    const cycleEndTime = new Date();
    const cycleDuration = (cycleEndTime.getTime() - cycleStartTime.getTime()) / 1000;
    
    console.log(`[${cycleEndTime.toISOString()}] Cycle completed in ${cycleDuration} seconds`);
    console.log('Upload results:', uploadResults);

    return new Response(
      JSON.stringify({ 
        success: true, 
        productsAnalyzed: uploadResults.filter(r => r.status === 'success').length,
        totalAttempted: products.length,
        uploadResults,
        cycleDuration,
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