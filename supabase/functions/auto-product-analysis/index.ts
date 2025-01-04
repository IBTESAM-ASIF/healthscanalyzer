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
    console.log('Starting automated product analysis...');

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Step 1: Use GPT-4 to generate 5 unique product ideas
    console.log('Generating product ideas...');
    const productIdeaCompletion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a product researcher. Generate 5 unique consumer products that would benefit from health and safety analysis. Include both common household items and specialized products. Format as JSON array with name and brief description."
        }
      ]
    });

    const productIdeas = JSON.parse(productIdeaCompletion.data.choices[0].message?.content || '[]');
    console.log('Generated product ideas:', productIdeas);

    // Step 2: Analyze each product
    const analyzedProducts = [];
    for (const product of productIdeas) {
      console.log(`Analyzing product: ${product.name}`);
      
      const analysisCompletion = await openai.createChatCompletion({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a world-class product analyst with expertise in:
- Chemical composition analysis
- Toxicology and safety assessment
- Clinical research and medical studies
- Environmental impact assessment
- Regulatory compliance
- Public health surveillance

Analyze the product thoroughly and provide a detailed JSON response including:
1. Product name
2. Category (healthy/restricted/harmful)
3. Health score (0-100)
4. Ingredients list
5. Detailed analysis summary
6. Pros and cons
7. Safety incidents (if any)
8. Fatal incidents (true/false)
9. Serious adverse events (true/false)
10. Allergy risks
11. Drug interactions
12. Special population warnings
13. Environmental impact

Maintain extremely high accuracy (>98%) in your analysis.`
          },
          {
            role: "user",
            content: `Analyze this product thoroughly: ${product.name}\n${product.description}`
          }
        ]
      });

      const analysis = JSON.parse(analysisCompletion.data.choices[0].message?.content || '{}');
      analyzedProducts.push(analysis);
    }

    // Step 3: Store results in database
    console.log('Storing analysis results...');
    for (const product of analyzedProducts) {
      const { data, error } = await supabaseClient
        .from('products')
        .insert([{
          name: product.name,
          category: product.category.toLowerCase(),
          health_score: product.healthScore,
          ingredients: product.ingredients,
          analysis_summary: product.analysisSummary,
          pros: product.pros,
          cons: product.cons,
          has_fatal_incidents: product.hasFatalIncidents,
          has_serious_adverse_events: product.hasSeriousAdverseEvents,
          allergy_risks: product.allergyRisks,
          drug_interactions: product.drugInteractions,
          special_population_warnings: product.specialPopulationWarnings,
          environmental_impact: product.environmentalImpact,
          safety_incidents: product.safetyIncidents
        }]);

      if (error) {
        console.error('Error storing product:', error);
        throw error;
      }
    }

    console.log('Analysis completed successfully');
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