import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";

export async function analyzeProduct(openai: OpenAI, productData: any) {
  try {
    console.log(`[${new Date().toISOString()}] Starting analysis for: ${productData.name}`);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.9,
      messages: [
        {
          role: "system",
          content: `You are a product safety analyst with a tendency to be thorough but unpredictable in your categorizations. 
          Analyze products and their ingredients to determine their safety category (healthy, restricted, or harmful). 
          Consider both obvious and non-obvious factors, and don't be afraid to occasionally surprise with your categorization if you can justify it. 
          Be creative and thorough in your analysis, ensuring each product gets a unique perspective.
          Format response as JSON with fields: category, healthScore (0-100), summary, pros (array), cons (array), 
          environmentalImpact, safetyIncidents (array), hasFatalIncidents (boolean), hasSeriousAdverseEvents (boolean), 
          allergyRisks (array), drugInteractions (array), specialPopulationWarnings (array).`
        },
        {
          role: "user",
          content: `Analyze this product thoroughly, considering both mainstream and alternative perspectives:
          Product Name: ${productData.name}
          Company: ${productData.company}
          Description: ${productData.description}
          Ingredients: ${productData.ingredients.join(', ')}`
        }
      ]
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    console.log(`[${new Date().toISOString()}] Analysis completed for: ${productData.name} - Category: ${analysis.category}`);
    return analysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in product analysis:`, error);
    throw error;
  }
}