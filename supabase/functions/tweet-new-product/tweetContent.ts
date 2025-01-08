interface Product {
  name: string;
  category?: string;
  health_score?: number;
  pros?: string[];
  has_fatal_incidents?: boolean;
  has_serious_adverse_events?: boolean;
}

function getHook(products: Product[]): string {
  const highestScore = Math.max(...products.map(p => p.health_score || 0));
  const hasWarning = products.some(p => p.has_serious_adverse_events || p.has_fatal_incidents);
  const totalBenefits = products.reduce((acc, p) => acc + (p.pros?.length || 0), 0);
  
  if (hasWarning) {
    return "🚨 URGENT HEALTH ALERT: Must-know findings about products you might be using!";
  }
  if (highestScore > 90) {
    return "🌟 BREAKTHROUGH DISCOVERY: We found products that could revolutionize your health!";
  }
  if (totalBenefits > 5) {
    return "💪 GAME-CHANGER ALERT: Multiple health benefits discovered in latest analysis!";
  }
  
  const hooks = [
    "🔬 EXCLUSIVE: AI reveals shocking truths about everyday products!",
    "🎯 HEALTH HACK: Smart consumers need to see these results!",
    "⚡️ TRENDING NOW: Revolutionary health insights you can't miss!",
    "🌿 WELLNESS ALERT: Transform your health with these findings!"
  ];
  return hooks[Math.floor(Math.random() * hooks.length)];
}

function formatProductSummary(product: Product): string {
  const category = product.category ? `[${product.category.toUpperCase()}]` : '';
  const score = product.health_score || 0;
  
  const scoreEmoji = score > 90 ? '🏆' : 
                    score > 80 ? '⭐️' : 
                    score > 70 ? '✅' : 
                    score > 50 ? '⚠️' : '❗️';
  
  const keyBenefit = product.pros && product.pros.length > 0 
    ? `💡 Key benefit: ${product.pros[0]}`
    : '';

  const warningLabel = (product.has_fatal_incidents || product.has_serious_adverse_events)
    ? "⚠️ IMPORTANT SAFETY NOTICE"
    : "";

  return `${scoreEmoji} ${product.name} ${category}\n` +
         `Health Score: ${score}%\n` +
         `${keyBenefit}\n` +
         `${warningLabel}`;
}

export function generateTweetContent(products: Product[]): string {
  const timestamp = new Date().toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });

  const productSummaries = products.map(formatProductSummary).join("\n\n");
  const websiteUrl = "https://www.healthscanalyzer.com";
  const hook = getHook(products);
  
  return `${hook}\n\n` +
         `${productSummaries}\n\n` +
         `🕒 Latest Analysis: ${timestamp} UTC\n` +
         `\n` +
         `🔍 Get your FREE health report at ${websiteUrl}\n` +
         `\n` +
         `#HealthTech #AI #WellnessRevolution #HealthyLiving #ProductSafety #FutureOfHealth`;
}