import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

interface Product {
  name: string;
  health_score: number;
  analysis_summary?: string;
  pros?: string[];
  cons?: string[];
  category?: string;
  analysis_cost: number;
}

function generateTweets(products: Product[]): string[] {
  const websiteUrl = "https://www.healthscanalyzer.com";
  const hashtags = "#HealthTech #AI #WellnessRevolution #HealthyLiving #ProductSafety";

  const hooks = [
    "🚀 Breaking: AI reveals shocking truths about everyday products!",
    "🔬 EXCLUSIVE: Revolutionary health insights you can't afford to miss!",
    "⚡️ ALERT: Game-changing AI technology transforms product safety!",
    "🌟 BREAKTHROUGH: AI-powered health analysis changes everything!",
    "💡 REVEALED: The future of health product analysis is here!"
  ];

  const tweets = [
    // Data-driven insights
    `🤖 Our AI just analyzed ${products.length} products in seconds!\n\nAverage analysis cost: $${(products.reduce((acc, p) => acc + (p.analysis_cost || 0), 0) / products.length).toFixed(6)}\n\nGet instant health insights at ${websiteUrl}\n\n${hashtags}`,
    
    // Health scores highlight
    `🏆 Top performing products on HealthScanalyzer:\n\n${products.filter(p => p.health_score > 85).map(p => `✨ ${p.name}: ${p.health_score}%`).slice(0, 3).join('\n')}\n\nSee more at ${websiteUrl}\n\n${hashtags}`,
    
    // Safety focus
    "🛡️ Did you know?\n\nTraditional product testing takes 2-4 weeks\nOur AI delivers results in 3.2 seconds\n\nReal-time health insights at your fingertips!\n\nTry it now: " + websiteUrl + "\n\n" + hashtags,
    
    // Cost efficiency
    "💰 Traditional product analysis: $2,000+\nHealthScanalyzer AI analysis: $0.000795\n\nSame accuracy, fraction of the cost!\n\nStart analyzing: " + websiteUrl + "\n\n" + hashtags,
    
    // Educational
    "🧬 What our AI analyzes:\n\n✅ Ingredient safety\n✅ Health impacts\n✅ Allergen risks\n✅ Drug interactions\n✅ Environmental impact\n\nAll in seconds at " + websiteUrl + "\n\n" + hashtags,
    
    // Trust building
    "🔍 Why trust HealthScanalyzer?\n\n✅ Advanced AI technology\n✅ Real-time analysis\n✅ Scientific backing\n✅ Comprehensive reports\n\nTry it now: " + websiteUrl + "\n\n" + hashtags,
    
    // Feature highlight
    "⚡️ HealthScanalyzer features:\n\n🤖 AI-powered analysis\n📊 Health score rating\n⚡️ Instant results\n🔍 Deep ingredient insights\n\nExplore now: " + websiteUrl + "\n\n" + hashtags,
    
    // Success metrics
    `📈 HealthScanalyzer by numbers:\n\n🔍 ${products.length} products analyzed\n⚡️ 3.2 second average\n💰 $0.000795 per analysis\n\nJoin the revolution: ${websiteUrl}\n\n${hashtags}`,
    
    // Problem-solution
    "❓ Tired of unclear ingredient labels?\n\n🤖 Our AI decodes them instantly\n🎯 Get clear health insights\n💡 Make informed decisions\n\nTry it free: " + websiteUrl + "\n\n" + hashtags,
    
    // Benefit focused
    "🎯 With HealthScanalyzer you can:\n\n✅ Avoid harmful ingredients\n✅ Prevent allergic reactions\n✅ Make healthier choices\n✅ Save time & money\n\nStart now: " + websiteUrl + "\n\n" + hashtags,
    
    // Innovation story
    "🚀 The future of health is here!\n\nHealthScanalyzer combines:\n🤖 Advanced AI\n🔬 Scientific research\n⚡️ Real-time analysis\n\nBe part of it: " + websiteUrl + "\n\n" + hashtags,
    
    // Social proof
    `💫 Our AI has analyzed:\n\n🔍 ${products.length} products\n⚡️ ${products.filter(p => p.health_score > 80).length} high-performing items\n🎯 ${products.filter(p => p.pros && p.pros.length > 0).length} products with verified benefits\n\nJoin us: ${websiteUrl}\n\n${hashtags}`,
    
    // Call to action
    "🎯 Stop guessing about product safety\n\n🤖 Let our AI analyze it for you\n⚡️ Get instant results\n💡 Make informed decisions\n\nStart free: " + websiteUrl + "\n\n" + hashtags,
    
    // Unique value proposition
    "💡 What makes us unique:\n\n🤖 Advanced AI technology\n⚡️ 3.2 second analysis\n💰 Fraction of traditional cost\n🎯 Scientific accuracy\n\nTry now: " + websiteUrl + "\n\n" + hashtags,
    
    // Industry impact
    "🌟 HealthScanalyzer is revolutionizing product safety:\n\n🤖 AI-powered analysis\n⚡️ Instant results\n💰 Affordable for everyone\n\nJoin the revolution: " + websiteUrl + "\n\n" + hashtags
  ];

  return tweets;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all products
    const { data: products, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error("Error fetching products:", fetchError);
      throw new Error("Failed to fetch products");
    }

    const tweets = generateTweets(products || []);

    return new Response(
      JSON.stringify({ 
        success: true,
        tweets,
        total: tweets.length
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error generating tweets:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 500,
      }
    );
  }
});