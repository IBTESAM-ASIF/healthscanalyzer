import { corsHeaders } from './cors.ts';

const calculateTokenCost = (tokens: number, isInput: boolean) => {
  const inputRate = 0.150 / 1000000; // $0.150 per 1M tokens
  const outputRate = 0.600 / 1000000; // $0.600 per 1M tokens
  return tokens * (isInput ? inputRate : outputRate);
};

// Rough estimate of tokens based on string length
const estimateTokens = (text: string) => Math.ceil(text.length / 4);

export async function analyzeProduct(openAIApiKey: string, product: any) {
  console.log(`[${new Date().toISOString()}] Starting deep analysis for: ${product.name}`);
  
  try {
    const systemPrompt = "You are a product safety expert. Analyze this product and return ONLY a valid JSON object with these exact fields: healthScore (number 0-100), category (string: healthy/restricted/harmful), summary (string), pros (string array), cons (string array), allergyRisks (string array), drugInteractions (string array), populationWarnings (string array), environmentalImpact (string), safetyIncidents (string array). No markdown formatting or explanation.";
    const userPrompt = `Analyze this product: ${JSON.stringify(product)}`;
    
    // Calculate input tokens and cost
    const inputTokens = estimateTokens(systemPrompt + userPrompt);
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
    
    console.log(`[${new Date().toISOString()}] Analysis output cost estimate: $${outputCost.toFixed(6)} (${outputTokens} tokens)`);
    console.log(`[${new Date().toISOString()}] Total analysis cost estimate: $${(inputCost + outputCost).toFixed(6)}`);

    // Parse the content directly since we explicitly asked for clean JSON
    const analysis = JSON.parse(content);
    
    console.log(`[${new Date().toISOString()}] Completed deep analysis for: ${product.name}`);
    return analysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in analyzeProduct:`, error);
    throw error;
  }
}