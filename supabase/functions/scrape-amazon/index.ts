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

    // Get random Amazon product categories for variety
    const categories = [
      "skincare",
      "food supplements",
      "snacks",
      "beverages",
      "personal care",
      "beauty products"
    ]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]

    // Enhanced analysis prompt for more comprehensive research
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",  // Using the more powerful model for better analysis
      messages: [{
        role: "system",
        content: `You are an expert product researcher and analyst with deep knowledge in health, nutrition, chemistry, and consumer safety. Your task is to perform comprehensive analysis of products considering:

1. Historical context and development of ingredients
2. Scientific research and clinical studies
3. Global regulatory status and safety assessments
4. Environmental impact and sustainability
5. Manufacturing processes and quality control
6. Potential interactions and contraindications
7. Population-specific considerations (age groups, health conditions)
8. Long-term health implications
9. Alternative and comparative product analysis
10. Latest scientific literature and research findings

Provide detailed, evidence-based analysis while maintaining accuracy above 97%.`
      }, {
        role: "user",
        content: `Generate a comprehensive analysis for a ${randomCategory} product. Include:
1. Product name
2. Complete list of ingredients with their scientific background
3. Detailed health impact assessment
4. Evidence-based benefits and risks
5. Category classification (healthy/restricted/harmful)
6. Numerical health score (0-100)
7. Thorough analysis summary
8. Scientifically-backed pros and cons

Return as JSON with fields: name, ingredients (array), category, healthScore, analysisSummary, pros (array), cons (array).`
      }]
    })

    const productData = JSON.parse(completion.data.choices[0].message?.content ?? "{}")

    // Insert into database
    const { data, error } = await supabaseClient
      .from('products')
      .insert([{
        name: productData.name,
        ingredients: productData.ingredients,
        category: productData.category.toLowerCase(),
        health_score: productData.healthScore,
        analysis_summary: productData.analysisSummary,
        pros: productData.pros,
        cons: productData.cons
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