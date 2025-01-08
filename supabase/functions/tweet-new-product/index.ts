import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { createHmac } from "node:crypto";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const API_KEY = Deno.env.get("TWITTER_CONSUMER_KEY")?.trim();
const API_SECRET = Deno.env.get("TWITTER_CONSUMER_SECRET")?.trim();
const ACCESS_TOKEN = Deno.env.get("TWITTER_ACCESS_TOKEN")?.trim();
const ACCESS_TOKEN_SECRET = Deno.env.get("TWITTER_ACCESS_TOKEN_SECRET")?.trim();

function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const signatureBaseString = `${method}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(
    Object.entries(params)
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join("&")
  )}`;
  const signingKey = `${encodeURIComponent(
    consumerSecret
  )}&${encodeURIComponent(tokenSecret)}`;
  const hmacSha1 = createHmac("sha1", signingKey);
  return hmacSha1.update(signatureBaseString).digest("base64");
}

function generateOAuthHeader(method: string, url: string): string {
  const oauthParams = {
    oauth_consumer_key: API_KEY!,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: ACCESS_TOKEN!,
    oauth_version: "1.0",
  };

  const signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    API_SECRET!,
    ACCESS_TOKEN_SECRET!
  );

  return (
    "OAuth " +
    Object.entries({ ...oauthParams, oauth_signature: signature })
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
      .join(", ")
  );
}

async function generateTweetContent(products: any[]): Promise<string> {
  // Generate engaging hooks based on product categories and scores
  const getHook = (products: any[]) => {
    const highestScore = Math.max(...products.map(p => p.health_score || 0));
    const hasWarning = products.some(p => p.has_serious_adverse_events || p.has_fatal_incidents);
    
    if (hasWarning) {
      return "🚨 HEALTH ALERT: Critical findings in our latest product analysis!";
    }
    if (highestScore > 90) {
      return "🌟 BREAKTHROUGH: Discovered top-tier healthy products you need to know about!";
    }
    return "🔬 NEW ANALYSIS: Game-changing health insights revealed!";
  };

  // Format date for urgency
  const timestamp = new Date().toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });

  // Create engaging product summaries
  const productSummaries = products.map(product => {
    const category = product.category ? `[${product.category.toUpperCase()}]` : '';
    const score = product.health_score || 0;
    const scoreEmoji = score > 80 ? '🏆' : score > 60 ? '✅' : '⚠️';
    
    // Get the most impactful benefit
    const keyBenefit = product.pros && product.pros.length > 0 
      ? `💪 Key benefit: ${product.pros[0]}`
      : '';

    return `${scoreEmoji} ${product.name} ${category}\n` +
           `Health Score: ${score}%\n` +
           `${keyBenefit}`;
  }).join("\n\n");

  // Construct the tweet with a compelling structure
  const hook = getHook(products);
  const websiteUrl = "https://www.healthscanalyzer.com";
  
  return `${hook}\n\n` +
         `${productSummaries}\n\n` +
         `🕒 Analysis time: ${timestamp} UTC\n` +
         `\n` +
         `🔍 Get detailed reports at ${websiteUrl}\n` +
         `\n` +
         `#HealthTech #WellnessAI #HealthyLiving #ProductSafety`;
}

async function sendTweet(tweetText: string): Promise<any> {
  const url = "https://api.twitter.com/2/tweets";
  const method = "POST";
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = Math.random().toString(36).substring(2);

  const params = {
    oauth_consumer_key: API_KEY!,
    oauth_token: ACCESS_TOKEN!,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
    oauth_nonce: nonce,
    oauth_version: "1.0",
  };

  const signature = generateOAuthSignature(
    method,
    url,
    params,
    API_SECRET!,
    ACCESS_TOKEN_SECRET!
  );

  const authHeader = `OAuth oauth_consumer_key="${API_KEY}",oauth_token="${ACCESS_TOKEN}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_signature="${signature}"`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: tweetText }),
  });

  return response.json();
}

Deno.serve(async (req) => {
  try {
    // Get the last 2 products added
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order('created_at', { ascending: false })
      .limit(2);

    if (error) throw error;

    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ message: "No new products to tweet about" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate and send a single tweet for all products
    const tweetContent = await generateTweetContent(products);
    await sendTweet(tweetContent);

    return new Response(
      JSON.stringify({ 
        message: "Tweet posted successfully",
        tweet_content: tweetContent 
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error in tweet-new-product function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
