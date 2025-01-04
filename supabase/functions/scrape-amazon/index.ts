import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function fetchProductDetails(url: string) {
  console.log('Starting fetchProductDetails for URL:', url);
  
  try {
    console.log('Initiating fetch request to Amazon');
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log('Successfully fetched HTML content, length:', html.length);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    if (!doc) {
      console.error('Failed to parse HTML document');
      throw new Error('Failed to parse HTML');
    }

    // Extract product name
    const productName = doc.querySelector('#productTitle')?.textContent?.trim() ||
                       doc.querySelector('.product-title')?.textContent?.trim();
    console.log('Extracted product name:', productName);

    // Extract product description
    const description = doc.querySelector('#productDescription')?.textContent?.trim() ||
                       doc.querySelector('.product-description')?.textContent?.trim();
    console.log('Extracted description length:', description?.length);

    // Extract ingredients
    const ingredientsSection = doc.querySelector('#important-information')?.textContent || '';
    const ingredients = ingredientsSection.match(/ingredients?:([^.]*)/i)?.[1]?.split(',').map(i => i.trim()) || [];
    console.log('Extracted ingredients count:', ingredients.length);

    const result = {
      name: productName || 'Unknown Product',
      description: description || '',
      ingredients: ingredients,
      url: url
    };

    console.log('Product details extraction completed:', JSON.stringify(result, null, 2));
    return result;

  } catch (error) {
    console.error('Error in fetchProductDetails:', error);
    throw new Error(`Failed to fetch product details: ${error.message}`);
  }
}

serve(async (req) => {
  console.log('Received request:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log('Processing URL:', url);

    if (!url || !url.includes('amazon.com')) {
      console.error('Invalid URL provided:', url);
      throw new Error('Invalid or missing Amazon URL');
    }

    // Initialize OpenAI
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    const configuration = new Configuration({
      apiKey: openAiKey,
    });
    const openai = new OpenAIApi(configuration);
    console.log('OpenAI client initialized');

    // Fetch product details
    console.log('Fetching product details...');
    const productDetails = await fetchProductDetails(url);
    console.log('Product details fetched successfully');

    // Analyze the product using GPT-4
    console.log('Starting GPT-4 analysis...');
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: `You are a product safety and health analyst. Analyze the following product details and provide:
          1. Health score (0-100)
          2. Category (healthy/restricted/harmful)
          3. Pros and cons
          4. Safety analysis
          5. Environmental impact
          6. Potential risks and warnings`
        },
        {
          role: "user",
          content: `Analyze this product thoroughly:
          Name: ${productDetails.name}
          Description: ${productDetails.description}
          Ingredients: ${productDetails.ingredients.join(', ')}`
        }
      ]
    });

    const analysis = completion.data.choices[0].message?.content;
    console.log('GPT-4 analysis completed:', analysis);

    // Parse the analysis
    const healthScore = parseInt(analysis?.match(/health score:?\s*(\d+)/i)?.[1] || '0');
    const category = analysis?.toLowerCase().includes('harmful') ? 'harmful' :
                    analysis?.toLowerCase().includes('restricted') ? 'restricted' : 'healthy';
    
    const pros = analysis?.match(/pros:([^cons]*)/i)?.[1]?.split('-')
      .map(p => p.trim())
      .filter(p => p.length > 0) || [];
    
    const cons = analysis?.match(/cons:([^safety]*)/i)?.[1]?.split('-')
      .map(c => c.trim())
      .filter(c => c.length > 0) || [];

    console.log('Parsed analysis results:', {
      healthScore,
      category,
      prosCount: pros.length,
      consCount: cons.length
    });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    console.log('Supabase client initialized');

    // Store the analysis in the database
    console.log('Storing analysis in database...');
    const { data, error } = await supabaseClient
      .from('products')
      .insert([{
        name: productDetails.name,
        amazon_url: url,
        ingredients: productDetails.ingredients,
        category: category,
        health_score: healthScore,
        analysis_summary: analysis,
        pros: pros,
        cons: cons,
        environmental_impact: analysis?.match(/environmental impact:([^.]*)/i)?.[1]?.trim() || null,
        allergy_risks: analysis?.match(/allergy risks?:([^.]*)/i)?.[1]?.split(',').map(r => r.trim()) || [],
        drug_interactions: analysis?.match(/drug interactions?:([^.]*)/i)?.[1]?.split(',').map(i => i.trim()) || [],
        special_population_warnings: analysis?.match(/warnings?:([^.]*)/i)?.[1]?.split(',').map(w => w.trim()) || [],
        safety_incidents: analysis?.match(/safety incidents?:([^.]*)/i)?.[1]?.split(',').map(s => s.trim()) || [],
        has_fatal_incidents: analysis?.toLowerCase().includes('fatal') || false,
        has_serious_adverse_events: analysis?.toLowerCase().includes('serious adverse') || false
      }]);

    if (error) {
      console.error('Error storing analysis:', error);
      throw error;
    }

    console.log('Analysis stored successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Analysis completed and stored successfully',
        data: data
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 400 
      }
    );
  }
});