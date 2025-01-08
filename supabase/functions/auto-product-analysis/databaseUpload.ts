import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from './cors.ts';

export async function uploadToDatabase(
  supabaseUrl: string, 
  supabaseKey: string, 
  product: any, 
  analysis: any
) {
  console.log(`[${new Date().toISOString()}] Starting database upload for: ${product.name}`);
  console.log(`[${new Date().toISOString()}] Analysis data:`, JSON.stringify(analysis, null, 2));
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const productData = {
      name: String(product.name),
      amazon_url: product.amazon_url ? String(product.amazon_url) : null,
      ingredients: Array.isArray(product.known_ingredients) ? product.known_ingredients.map(String) : [],
      category: analysis.category,
      health_score: Number(analysis.healthScore),
      analysis_summary: String(analysis.summary),
      pros: Array.isArray(analysis.pros) ? analysis.pros : [],
      cons: Array.isArray(analysis.cons) ? analysis.cons : [],
      allergy_risks: Array.isArray(analysis.allergyRisks) ? analysis.allergyRisks : [],
      drug_interactions: Array.isArray(analysis.drugInteractions) ? analysis.drugInteractions : [],
      special_population_warnings: Array.isArray(analysis.populationWarnings) ? analysis.populationWarnings : [],
      environmental_impact: String(analysis.environmentalImpact || ''),
      safety_incidents: Array.isArray(analysis.safetyIncidents) ? analysis.safetyIncidents : [],
      has_fatal_incidents: Boolean(analysis.hasFatalIncidents),
      has_serious_adverse_events: Boolean(analysis.hasSeriousAdverseEvents),
      analysis_cost: Number(analysis.analysis_cost) || 0,
      created_at: new Date().toISOString()
    };

    console.log(`[${new Date().toISOString()}] Prepared product data:`, JSON.stringify(productData, null, 2));

    const { error } = await supabase
      .from('products')
      .insert([productData]);

    if (error) {
      console.error(`[${new Date().toISOString()}] Database error:`, error);
      throw error;
    }
    
    console.log(`[${new Date().toISOString()}] Successfully uploaded: ${product.name}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error uploading ${product.name}:`, error);
    throw error;
  }
}