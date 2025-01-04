import { corsHeaders } from './cors.ts';

// Token counting helper (approximation based on GPT tokenization rules)
const countTokens = (text: string): number => {
  // GPT models process text as tokens, which can be words or parts of words
  // This is a simplified approximation - about 4 characters per token
  return Math.ceil(text.length / 4);
};

// Calculate costs based on current OpenAI pricing for GPT-4o-mini
const calculateTokenCost = (tokens: number, isInput: boolean) => {
  // GPT-4o-mini pricing:
  // Input tokens: $0.00025 / 1K tokens
  // Output tokens: $0.00075 / 1K tokens
  const inputRate = 0.00025 / 1000; // $0.00025 per 1K tokens
  const outputRate = 0.00075 / 1000; // $0.00075 per 1K tokens
  return tokens * (isInput ? inputRate : outputRate);
};

export async function analyzeProduct(openAIApiKey: string, product: any) {
  console.log(`[${new Date().toISOString()}] Starting deep analysis for: ${product.name}`);
  
  try {
    const systemPrompt = "You are a product safety expert. Analyze this product and return ONLY a valid JSON object with these exact fields: healthScore (number 0-100), category (string: healthy/restricted/harmful), summary (string), pros (string array), cons (string array), allergyRisks (string array), drugInteractions (string array), populationWarnings (string array), environmentalImpact (string), safetyIncidents (string array). No markdown formatting or explanation.";
    const userPrompt = `Analyze this product: ${JSON.stringify(product)}`;
    
    // Calculate input tokens and cost
    const inputTokens = countTokens(systemPrompt + userPrompt);
    const inputCost = calculateTokenCost(inputTokens, true);
    
    console.log(`[${new Date().toISOString()}] Analysis input cost estimate: $${inputCost.toFixed(6)} (${inputTokens} tokens)`);

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
        }, {
          role: "user",
          content: userPrompt
        }],
        max_tokens: 2000
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
    const outputTokens = countTokens(content);
    const outputCost = calculateTokenCost(outputTokens, false);
    const totalCost = inputCost + outputCost;
    
    console.log(`[${new Date().toISOString()}] Analysis output cost estimate: $${outputCost.toFixed(6)} (${outputTokens} tokens)`);
    console.log(`[${new Date().toISOString()}] Total analysis cost: $${totalCost.toFixed(6)}`);

    // Parse the content and add the cost information
    const analysis = JSON.parse(content);
    analysis.analysis_cost = totalCost;
    
    console.log(`[${new Date().toISOString()}] Completed deep analysis for: ${product.name}`);
    return analysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in analyzeProduct:`, error);
    throw error;
  }
}