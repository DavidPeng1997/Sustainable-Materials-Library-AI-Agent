import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-3-flash-preview';
const IMAGE_MODEL_NAME = 'gemini-2.5-flash-image';

export const generateResponse = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock response.");
    return "請設定您的 Google Gemini API 金鑰以接收真實回應。(模擬回應：我可以協助您尋找永續材料！)";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: h.parts
        })),
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      config: {
        systemInstruction: "您是 SML.AI，永續材料圖書館 (SML) 的專業 AI 助理。您的目標是協助設計師和開發人員探索環保材料、了解 ISO 綠色規範，並開發永續產品。您樂於助人、知識淵博且簡潔扼要。當被問及材料時，請提供耐用性和永續性的見解。請使用繁體中文回答。",
      }
    });

    return response.text || "很抱歉，我無法生成回應。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線到 AI 服務時發生錯誤。";
  }
};

export const generateMaterialImage = async (prompt: string): Promise<string | null> => {
  if (!apiKey) {
    console.warn("API Key is missing for image generation.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        // Nano banana (gemini-2.5-flash-image) specific configs if needed
      }
    });

    // Extract image data from parts
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return null;
  }
};
