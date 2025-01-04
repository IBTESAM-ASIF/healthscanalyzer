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
          content: "You are a product research expert. Generate 2 unique consumer products that need health analysis. Return ONLY a valid JSON array of objects with these exact fields: name (string), description (string), category (string: healthy/restricted/harmful), known_ingredients (string array), amazon_url (string), potential_risks (string array), initial_safety_concerns (string array). No markdown formatting or explanation."
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
    const products = JSON.parse(content);
    
    console.log(`[${new Date().toISOString()}] Found ${products.length} products to analyze`);
    return products;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in searchProducts:`, error);
    throw error;
  }
}