import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { validateEnvironmentVariables, generateOAuthHeader } from "./twitterUtils.ts";
import { generateTweetContent } from "./tweetContent.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sendTweet(tweetText: string): Promise<any> {
  console.log("Preparing to send tweet:", tweetText);
  
  const url = "https://api.twitter.com/2/tweets";
  const method = "POST";
  const oauthHeader = generateOAuthHeader(method, url);
  
  console.log("Generated OAuth header");
  
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: oauthHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: tweetText }),
  });

  const responseText = await response.text();
  console.log("Twitter API Response:", responseText);

  if (!response.ok) {
    throw new Error(`Twitter API error: ${response.status} - ${responseText}`);
  }

  return JSON.parse(responseText);
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Tweet function triggered");
    validateEnvironmentVariables();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the last 2 products
    const { data: products, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .order('created_at', { ascending: false })
      .limit(2);

    if (fetchError) {
      console.error("Error fetching products:", fetchError);
      throw new Error("Failed to fetch products");
    }

    if (!products || products.length === 0) {
      console.log("No products found to tweet about");
      return new Response(
        JSON.stringify({ message: "No products to tweet about" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        }
      );
    }

    console.log("Found products to tweet about:", products.length);
    
    // Generate and send tweet
    const tweetContent = generateTweetContent(products);
    console.log("Generated tweet content:", tweetContent);
    
    const tweet = await sendTweet(tweetContent);
    console.log("Tweet sent successfully:", tweet);

    return new Response(
      JSON.stringify({ 
        success: true,
        tweet_id: tweet.data.id,
        tweet_content: tweetContent 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in tweet-new-product function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});