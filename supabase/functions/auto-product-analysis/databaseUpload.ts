import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from './cors.ts';

export async function uploadToDatabase(
  supabaseUrl: string, 
  supabaseKey: string, 
  product: any, 
  analysis: any
) {
  console.log(`[${new Date().toISOString()}] Uploading product to database: ${product.name}`);
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { error } = await supabase
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

    if (error) throw error;
    
    console.log(`[${new Date().toISOString()}] Successfully uploaded: ${product.name}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error uploading ${product.name}:`, error);
    throw error;
  }
}