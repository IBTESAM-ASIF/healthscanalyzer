import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.1.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    const categories = [
      "skincare",
      "food supplements",
      "snacks",
      "beverages",
      "personal care",
      "beauty products"
    ]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: `You are an expert product researcher and analyst specializing in consumer safety, toxicology, and public health. Your analysis must include:

1. Detailed Chemical Analysis:
   - Complete breakdown of chemical compounds
   - Molecular interactions and potential reactions
   - Known toxicological profiles

2. Historical Safety Data:
   - Documented adverse events and fatalities
   - Class action lawsuits or recalls
   - FDA warnings or regulatory actions

3. Clinical Research:
   - Peer-reviewed studies on ingredients
   - Long-term exposure effects
   - Population-specific risks

4. Allergy Information:
   - Common allergic reactions
   - Cross-reactivity potential
   - Severity of allergic responses

5. Manufacturing Safety:
   - Quality control measures
   - Contamination risks
   - Supply chain integrity

6. Environmental Impact:
   - Bioaccumulation potential
   - Ecological toxicity
   - Disposal concerns

7. Special Populations:
   - Risks for pregnant women
   - Pediatric safety concerns
   - Elderly population considerations

8. Drug Interactions:
   - Known contraindications
   - Medication interference patterns
   - Synergistic effects

Maintain accuracy above 98% and flag any products with documented fatalities or severe health incidents.`
      }, {
        role: "user",
        content: `Generate a comprehensive safety analysis for a ${randomCategory} product. Include:

1. Product name and chemical composition
2. Complete toxicological profile
3. Historical safety incidents (if any)
4. Documented fatalities or severe adverse events
5. Allergy risk assessment
6. Drug interaction warnings
7. Special population considerations
8. Environmental impact
9. Manufacturing safety analysis
10. Regulatory compliance status

Return as JSON with fields: 
name, 
ingredients (array with chemical details), 
category (healthy/restricted/harmful), 
healthScore (0-100), 
hasFatalIncidents (boolean),
hasSerousAdverseEvents (boolean),
allergyRisks (array),
drugInteractions (array),
specialPopulationWarnings (array),
environmentalImpact (string),
analysisSummary (string),
pros (array),
cons (array),
safetyIncidents (array of historical incidents)`
      }]
    })

    const productData = JSON.parse(completion.data.choices[0].message?.content ?? "{}")

    const { data, error } = await supabaseClient
      .from('products')
      .insert([{
        name: productData.name,
        ingredients: productData.ingredients,
        category: productData.category.toLowerCase(),
        health_score: productData.healthScore,
        analysis_summary: productData.analysisSummary,
        pros: productData.pros,
        cons: productData.cons,
        has_fatal_incidents: productData.hasFatalIncidents,
        has_serious_adverse_events: productData.hasSerousAdverseEvents,
        allergy_risks: productData.allergyRisks,
        drug_interactions: productData.drugInteractions,
        special_population_warnings: productData.specialPopulationWarnings,
        environmental_impact: productData.environmentalImpact,
        safety_incidents: productData.safetyIncidents
      }])

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in scrape-amazon function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})