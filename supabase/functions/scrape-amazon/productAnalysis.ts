import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";

export async function analyzeProduct(openai: OpenAI, productData: any) {
  try {
    console.log(`[${new Date().toISOString()}] Starting analysis for: ${productData.name}`);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a product safety analyst specializing in health and wellness products. 
          Analyze products and their ingredients to determine their safety category (healthy, restricted, or harmful). 
          Consider both direct and indirect health impacts, potential risks, and environmental factors.
          Format response as JSON with fields: 
          - category (string: 'healthy', 'restricted', or 'harmful')
          - healthScore (number: 0-100)
          - summary (string)
          - pros (string array)
          - cons (string array)
          - environmentalImpact (string)
          - safetyIncidents (string array)
          - hasFatalIncidents (boolean)
          - hasSeriousAdverseEvents (boolean)
          - allergyRisks (string array)
          - drugInteractions (string array)
          - specialPopulationWarnings (string array)`
        },
        {
          role: "user",
          content: `Analyze this product thoroughly:
          Product Name: ${productData.name}
          Company: ${productData.company}
          Description: ${productData.description}
          Ingredients: ${productData.ingredients?.join(', ')}`
        }
      ]
    });

    if (!completion.choices[0].message.content) {
      throw new Error('No analysis results received from OpenAI');
    }

    const analysis = JSON.parse(completion.choices[0].message.content);
    console.log(`[${new Date().toISOString()}] Analysis completed for: ${productData.name}`);
    console.log('Analysis results:', analysis);
    return analysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in product analysis:`, error);
    throw error;
  }
}