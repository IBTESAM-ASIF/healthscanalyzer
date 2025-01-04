import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Create a detailed system prompt for comprehensive analysis
    const systemPrompt = `You are a world-class product analyst with expertise in:
- Chemical composition analysis
- Toxicology and safety assessment
- Clinical research and medical studies
- Environmental impact assessment
- Regulatory compliance
- Public health surveillance

Analyze the product thoroughly and provide:
1. Detailed ingredient analysis with scientific backing
2. Comprehensive safety profile including:
   - Historical incidents
   - Documented fatalities
   - Serious adverse events
   - Population-specific risks
3. Potential health impacts:
   - Short-term effects
   - Long-term implications
   - Allergic reactions
   - Drug interactions
4. Environmental considerations
5. Special population warnings

Maintain extremely high accuracy (>98%) in your analysis.`;

    // Fetch product details from Amazon URL
    const productDetails = await fetchProductDetails(url); // Implement this function to scrape product details
    const productName = productDetails.name;

    // Analyze the product using GPT-4
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      temperature: 0.5,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze this product thoroughly: ${productDetails}` }
      ]
    });

    const analysis = completion.data.choices[0].message?.content;
    
    // Parse the analysis to extract structured data
    const structuredAnalysis = {
      name: productName,
      ingredients: extractIngredients(analysis),
      category: determineCategory(analysis),
      health_score: calculateHealthScore(analysis),
      analysis_summary: extractSummary(analysis),
      pros: extractPros(analysis),
      cons: extractCons(analysis),
      has_fatal_incidents: checkForFatalIncidents(analysis),
      has_serious_adverse_events: checkForSeriousEvents(analysis),
      allergy_risks: extractAllergyRisks(analysis),
      drug_interactions: extractDrugInteractions(analysis),
      special_population_warnings: extractSpecialWarnings(analysis),
      environmental_impact: extractEnvironmentalImpact(analysis),
      safety_incidents: extractSafetyIncidents(analysis),
    };

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store the analysis in the database
    const { data, error } = await supabaseClient
      .from('products')
      .insert([structuredAnalysis]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: 'Analysis completed successfully', data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

// Helper functions for parsing the analysis
function extractIngredients(analysis: string): string[] {
  const ingredientSection = analysis.match(/ingredients[^\n.]*[.\n]/gi) || [];
  return ingredientSection.map(ingredient => ingredient.trim());
}

function determineCategory(analysis: string): 'healthy' | 'restricted' | 'harmful' {
  if (analysis.toLowerCase().includes('healthy')) return 'healthy';
  if (analysis.toLowerCase().includes('restricted')) return 'restricted';
  return 'harmful';
}

function calculateHealthScore(analysis: string): number {
  const scoreMatch = analysis.match(/health score: (\d+)/i);
  return scoreMatch ? parseInt(scoreMatch[1]) : 0;
}

function extractSummary(analysis: string): string {
  const summaryMatch = analysis.match(/summary: (.*?)(?=\n|$)/i);
  return summaryMatch ? summaryMatch[1].trim() : '';
}

function extractPros(analysis: string): string[] {
  const prosMatch = analysis.match(/pros: (.*?)(?=\n|$)/i);
  return prosMatch ? prosMatch[1].split(',').map(p => p.trim()) : [];
}

function extractCons(analysis: string): string[] {
  const consMatch = analysis.match(/cons: (.*?)(?=\n|$)/i);
  return consMatch ? consMatch[1].split(',').map(c => c.trim()) : [];
}

function checkForFatalIncidents(analysis: string): boolean {
  return analysis.toLowerCase().includes('fatality') || 
         analysis.toLowerCase().includes('death') ||
         analysis.toLowerCase().includes('lethal');
}

function checkForSeriousEvents(analysis: string): boolean {
  return analysis.toLowerCase().includes('serious adverse') || 
         analysis.toLowerCase().includes('hospitalization') ||
         analysis.toLowerCase().includes('severe reaction');
}

function extractAllergyRisks(analysis: string): string[] {
  const allergySection = analysis.match(/allerg[^\n.]*[.\n]/gi) || [];
  return allergySection.map(risk => risk.trim());
}

function extractDrugInteractions(analysis: string): string[] {
  const interactionSection = analysis.match(/interact[^\n.]*[.\n]/gi) || [];
  return interactionSection.map(interaction => interaction.trim());
}

function extractSpecialWarnings(analysis: string): string[] {
  const warningSection = analysis.match(/(warning|caution|precaution)[^\n.]*[.\n]/gi) || [];
  return warningSection.map(warning => warning.trim());
}

function extractEnvironmentalImpact(analysis: string): string {
  const envSection = analysis.match(/environment[^\n.]*[.\n]/i)?.[0] || '';
  return envSection.trim();
}

function extractSafetyIncidents(analysis: string): string[] {
  const incidentSection = analysis.match(/(incident|event|case)[^\n.]*[.\n]/gi) || [];
  return incidentSection.map(incident => incident.trim());
}
