import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

export const createOpenAIClient = (apiKey: string) => {
  const configuration = new Configuration({ apiKey });
  return new OpenAIApi(configuration);
};

export const analyzeProductWithAI = async (openai: OpenAIApi, productData: any) => {
  const completion = await openai.createChatCompletion({
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

  return completion.data.choices[0].message?.content || '';
};