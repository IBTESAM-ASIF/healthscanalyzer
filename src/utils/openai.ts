import OpenAI from 'openai';

export const createOpenAIClient = (apiKey: string) => {
  return new OpenAI({ apiKey });
};

export const analyzeProductWithAI = async (openai: OpenAI, productData: any) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a world-class product analyst with expertise in health and safety assessment. 
        Analyze products thoroughly and provide detailed insights about their health implications.`
      },
      {
        role: "user",
        content: `Analyze this product thoroughly:
        Name: ${productData.name}
        Description: ${productData.description}
        Ingredients: ${productData.ingredients?.join(', ')}`
      }
    ],
    temperature: 0.7
  });

  return completion.choices[0].message.content || '';
};