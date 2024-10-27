import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateTravelPlan(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    const result = await model.generateContent(`
      ${prompt}
      
      Respond with a JSON object using this exact structure:
      {
        "destination": string,
        "duration": string,
        "budget": string,
        "itinerary": [
          {
            "day": number,
            "activities": string[]
          }
        ],
        "recommendations": string[]
      }
    `);

    const response = await result.response;
    const text = response.text();
    
    try {
      // First, validate that we received a response
      if (!text) {
        throw new Error('Empty response from Gemini API');
      }

      // Try to parse the JSON response
      const parsedResponse = JSON.parse(text);

      // Validate the required fields
      if (!parsedResponse.destination || !parsedResponse.duration || 
          !parsedResponse.budget || !Array.isArray(parsedResponse.itinerary) ||
          !Array.isArray(parsedResponse.recommendations)) {
        throw new Error('Invalid response structure from Gemini API');
      }

      return parsedResponse;
    } catch (parseError) {
      console.error('Raw API response:', text);
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse Gemini API response');
    }
  } catch (apiError) {
    console.error('API error:', apiError);
    throw new Error('Failed to communicate with Gemini API');
  }
}