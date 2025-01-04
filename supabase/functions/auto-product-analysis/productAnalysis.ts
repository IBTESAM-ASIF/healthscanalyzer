import { corsHeaders } from './cors.ts';

export async function analyzeProduct(openAIApiKey: string, product: any) {
  console.log(`[${new Date().toISOString()}] Starting deep analysis for: ${product.name}`);
  
  try {
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
          content: "You are a product safety expert. Analyze this product and return ONLY a valid JSON object with these exact fields: healthScore (number 0-100), category (string: healthy/restricted/harmful), summary (string), pros (string array), cons (string array), allergyRisks (string array), drugInteractions (string array), populationWarnings (string array), environmentalImpact (string), safetyIncidents (string array). No markdown formatting or explanation."
        }, {
          role: "user",
          content: `Analyze this product: ${JSON.stringify(product)}`
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

    // Parse the content directly since we explicitly asked for clean JSON
    const analysis = JSON.parse(content);
    
    console.log(`[${new Date().toISOString()}] Completed deep analysis for: ${product.name}`);
    return analysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in analyzeProduct:`, error);
    throw error;
  }
}