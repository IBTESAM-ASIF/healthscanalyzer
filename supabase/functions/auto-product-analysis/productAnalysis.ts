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
          content: "You are a product safety expert. Analyze this product and return ONLY a JSON object containing: healthScore (0-100), category (healthy/restricted/harmful), summary, pros, cons, allergyRisks, drugInteractions, populationWarnings, environmentalImpact, safetyIncidents"
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

    // Clean the response to ensure valid JSON
    const cleanedContent = content.replace(/```json\n|\n```/g, '').trim();
    const analysis = JSON.parse(cleanedContent);
    
    console.log(`[${new Date().toISOString()}] Completed deep analysis for: ${product.name}`);
    return analysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in analyzeProduct:`, error);
    throw error;
  }
}