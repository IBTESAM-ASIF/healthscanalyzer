import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
import { corsHeaders } from './cors.ts';
import { checkForDuplicates } from './duplicateCheck.ts';
import { analyzeProduct } from './productAnalysis.ts';
import { extractProductDetails } from './productExtraction.ts';

const openai = new OpenAI(Deno.env.get('OPENAI_API_KEY') || '');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      throw new Error('URL is required');
    }

    console.log(`[${new Date().toISOString()}] Processing URL: ${url}`);
    
    const productDetails = await extractProductDetails(url);
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

    const isDuplicate = await checkForDuplicates(
      supabaseClient,
      productDetails.name,
      productDetails.company
    );

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
      }])
      .select();

    if (error) throw error;

    console.log(`[${new Date().toISOString()}] Successfully processed product:`, data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error processing request:`, error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});