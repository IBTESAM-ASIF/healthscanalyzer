import { corsHeaders } from './cors.ts';

const countTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};

const calculateTokenCost = (tokens: number, isInput: boolean) => {
  const inputRate = 0.00025 / 1000;
  const outputRate = 0.00075 / 1000;
  return tokens * (isInput ? inputRate : outputRate);
};

export async function analyzeProduct(openAIApiKey: string, product: any) {
  console.log(`[${new Date().toISOString()}] Starting deep analysis for: ${product.name}`);
  
  try {
    const systemPrompt = `You are a product safety expert. Analyze this product and return a valid JSON object with these fields:
      {
        "healthScore": number between 0-100,
        "category": "healthy" or "restricted" or "harmful",
        "summary": string,
        "pros": string array,
        "cons": string array,
        "allergyRisks": string array,
        "drugInteractions": string array,
        "populationWarnings": string array,
        "environmentalImpact": string,
        "safetyIncidents": string array,
        "hasFatalIncidents": boolean,
        "hasSeriousAdverseEvents": boolean
      }
      Be thorough and realistic. Return ONLY valid JSON.`;

    const userPrompt = `Product Details:
      Name: ${product.name}
      Description: ${product.description || 'No description provided'}
      Known Ingredients: ${product.known_ingredients?.join(', ') || 'No ingredients listed'}
      Initial Safety Concerns: ${product.initial_safety_concerns?.join(', ') || 'None reported'}
      Potential Risks: ${product.potential_risks?.join(', ') || 'None identified'}`;
    
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
        temperature: 0.7
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

    // Validate JSON before parsing
    let cleanedContent = content.trim();
    // Remove any markdown code block markers if present
    cleanedContent = cleanedContent.replace(/```json\n?|\n?```/g, '');
    
    console.log(`[${new Date().toISOString()}] Raw analysis response:`, cleanedContent);

    const analysis = JSON.parse(cleanedContent);
    
    // Calculate costs
    const outputTokens = countTokens(content);
    const outputCost = calculateTokenCost(outputTokens, false);
    const totalCost = inputCost + outputCost;
    
    console.log(`[${new Date().toISOString()}] Analysis output cost: $${outputCost.toFixed(6)} (${outputTokens} tokens)`);
    console.log(`[${new Date().toISOString()}] Total analysis cost: $${totalCost.toFixed(6)}`);

    // Validate and sanitize the analysis object
    const sanitizedAnalysis = {
      healthScore: Number(analysis.healthScore) || 0,
      category: ['healthy', 'restricted', 'harmful'].includes(analysis.category?.toLowerCase()) 
        ? analysis.category.toLowerCase() 
        : 'restricted',
      summary: String(analysis.summary || ''),
      pros: Array.isArray(analysis.pros) ? analysis.pros.map(String) : [],
      cons: Array.isArray(analysis.cons) ? analysis.cons.map(String) : [],
      allergyRisks: Array.isArray(analysis.allergyRisks) ? analysis.allergyRisks.map(String) : [],
      drugInteractions: Array.isArray(analysis.drugInteractions) ? analysis.drugInteractions.map(String) : [],
      populationWarnings: Array.isArray(analysis.populationWarnings) ? analysis.populationWarnings.map(String) : [],
      environmentalImpact: String(analysis.environmentalImpact || ''),
      safetyIncidents: Array.isArray(analysis.safetyIncidents) ? analysis.safetyIncidents.map(String) : [],
      hasFatalIncidents: Boolean(analysis.hasFatalIncidents),
      hasSeriousAdverseEvents: Boolean(analysis.hasSeriousAdverseEvents),
      analysis_cost: totalCost
    };
    
    console.log(`[${new Date().toISOString()}] Completed analysis for: ${product.name}`);
    return sanitizedAnalysis;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in analyzeProduct:`, error);
    throw error;
  }
}