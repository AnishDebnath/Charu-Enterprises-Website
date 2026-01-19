
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert industrial sales consultant for Charu Enterprises, an Indian manufacturer of fence fittings.
Your goal is to help B2B buyers (from USA, Middle East, Europe) understand Charu's product range and expertise.
Charu Enterprises specializes in:
- Barbed Arms (14/16 GA, Single/Double)
- Fence Caps (Pressed Steel, Malleable Iron, Aluminum)
- Fence Bands (T, L, Flat)
- Tension Bars (Galvanized Steel)
- Brackets & Accessories
- Custom OEM Solutions (Die & Mold development)

Key selling points: 50+ years experience, 150M+ pieces delivered, in-house galvanizing, Government of India awarded.
Always be professional, concise, and focused on wholesale/export benefits.
`;

export async function askProductConsultant(query: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request at the moment. Please contact our export team directly.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI consultant is currently offline. Please reach out via the contact form.";
  }
}
