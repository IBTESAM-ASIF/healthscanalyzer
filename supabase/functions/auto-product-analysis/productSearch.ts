import { corsHeaders } from './cors.ts';

const calculateTokenCost = (tokens: number, isInput: boolean) => {
  const inputRate = 0.150 / 1000000; // $0.150 per 1M tokens
  const outputRate = 0.600 / 1000000; // $0.600 per 1M tokens
  return tokens * (isInput ? inputRate : outputRate);
};

// Rough estimate of tokens based on string length
const estimateTokens = (text: string) => Math.ceil(text.length / 4);

export async function searchProducts(openAIApiKey: string) {
  console.log(`[${new Date().toISOString()}] Starting product search phase...`);
  
  try {
    const systemPrompt = "You are a product research expert. Generate 2 unique consumer products that need health analysis. Return ONLY a valid JSON array of objects with these exact fields: name (string), description (string), category (string: healthy/restricted/harmful), known_ingredients (string array), amazon_url (string), potential_risks (string array), initial_safety_concerns (string array). No markdown formatting or explanation.";
    
    // Calculate input tokens and cost
    const inputTokens = estimateTokens(systemPrompt);
    const inputCost = calculateTokenCost(inputTokens, true);
    
    console.log(`[${new Date().toISOString()}] Search input cost estimate: $${inputCost.toFixed(6)} (${inputTokens} tokens)`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{
          role: "system",
          content: systemPrompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Calculate output tokens and cost
    const outputTokens = estimateTokens(content);
    const outputCost = calculateTokenCost(outputTokens, false);
    
    console.log(`[${new Date().toISOString()}] Search output cost estimate: $${outputCost.toFixed(6)} (${outputTokens} tokens)`);
    console.log(`[${new Date().toISOString()}] Total search cost estimate: $${(inputCost + outputCost).toFixed(6)}`);

    // Parse the content directly since we explicitly asked for clean JSON
    const products = JSON.parse(content);
    
    console.log(`[${new Date().toISOString()}] Found ${products.length} products to analyze`);
    return products;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in searchProducts:`, error);
    throw error;
  }
}