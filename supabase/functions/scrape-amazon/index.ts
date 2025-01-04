import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function fetchProductDetails(url: string) {
  try {
    console.log('Fetching product details from:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    if (!doc) throw new Error('Failed to parse HTML');

    const productName = doc.querySelector('#productTitle')?.textContent?.trim();
    const description = doc.querySelector('#productDescription')?.textContent?.trim();
    const ingredients = doc.querySelector('#important-information')?.textContent
      ?.match(/ingredients?:([^.]*)/i)?.[1]?.split(',').map(i => i.trim()) || [];

    console.log('Successfully extracted product details');
    return { name: productName, description, ingredients };
  } catch (error) {
    console.error('Error in fetchProductDetails:', error);
    throw error;
  }
}

async function analyzeProduct(openai: OpenAIApi, productData: any) {
  try {
    console.log('Starting AI analysis for:', productData.name);
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a product safety expert. Analyze products and provide:
            1. Health score (0-100)
            2. Category (healthy/restricted/harmful)
            3. Analysis summary
            4. Pros and cons
            5. Safety considerations
            Format as JSON.`
        },
        {
          role: "user",
          content: `Analyze: ${JSON.stringify(productData)}`
        }
      ]
    });

    const analysis = JSON.parse(completion.data.choices[0].message?.content || '{}');
    console.log('AI analysis completed successfully');
    return analysis;
  } catch (error) {
    console.error('Error in analyzeProduct:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log('Processing URL:', url);

    if (!url?.includes('amazon.com')) {
      throw new Error('Invalid Amazon URL');
    }

    // Initialize OpenAI
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) throw new Error('OpenAI API key not configured');

    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    // Fetch and analyze product
    const productDetails = await fetchProductDetails(url);
    const analysis = await analyzeProduct(openai, productDetails);

    // Store in Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, error } = await supabaseClient
      .from('products')
      .insert([{
        name: productDetails.name,
        amazon_url: url,
        ingredients: productDetails.ingredients,
        category: analysis.category?.toLowerCase(),
        health_score: analysis.healthScore,
        analysis_summary: analysis.summary,
        pros: analysis.pros,
        cons: analysis.cons,
        environmental_impact: analysis.environmentalImpact,
        safety_incidents: analysis.safetyIncidents || []
      }]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});