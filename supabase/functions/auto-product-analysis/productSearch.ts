import { corsHeaders } from './cors.ts';

export async function searchProducts(openAIApiKey: string) {
  console.log(`[${new Date().toISOString()}] Starting product search phase...`);
  
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
          content: "You are a product research expert. Search for 2 unique consumer products that need health analysis. Include both common items and specialized products. Return ONLY a JSON array with objects containing: name, description, category (healthy/restricted/harmful), known_ingredients, amazon_url, potential_risks, initial_safety_concerns"
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
    const products = JSON.parse(cleanedContent);
    
    console.log(`[${new Date().toISOString()}] Found ${products.length} products to analyze`);
    return products;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in searchProducts:`, error);
    throw error;
  }
}