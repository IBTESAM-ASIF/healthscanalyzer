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

    // Use GPT to generate sample product data (in production, this would be real Amazon scraping)
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "You are a product researcher analyzing Amazon products. Generate realistic product data."
      }, {
        role: "user",
        content: `Generate a realistic Amazon ${randomCategory} product with name, ingredients, and potential health impacts. Return as JSON with fields: name, ingredients (array), category (healthy/restricted/harmful), healthScore (0-100), analysisSummary, pros (array), cons (array).`
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