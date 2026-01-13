
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client strictly following @google/genai coding guidelines.
// Always use the named parameter and assume process.env.API_KEY is valid.
// Fix: Use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits an image using Gemini 2.5 Flash Image based on a text prompt.
 * @param base64Image The base64 string of the image (without the data:image/... prefix)
 * @param mimeType The mime type of the image
 * @param prompt The text instruction for editing
 * @returns The base64 string of the generated image
 */
export const editImageWithGemini = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned");
    }

    const content = response.candidates[0].content;
    
    // Iterate through parts to find the image part
    if (content.parts) {
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
           // Return the raw base64 data
           return part.inlineData.data;
        }
      }
    }

    console.warn("No image data found in response parts");
    return null;

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    throw error;
  }
};

export interface SearchResult {
  text: string;
  sources: Array<{ title: string; uri: string }>;
}

/**
 * Generates text response using Gemini 3 Flash with Google Search Grounding.
 * @param prompt The user's question or prompt
 * @returns Object containing text response and grounding metadata
 */
export const generateTextWithSearch = async (prompt: string): Promise<SearchResult> => {
  try {
    // Fix: Use 'gemini-3-flash-preview' for basic text tasks with search as per model selection rules
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Fix: Ensure correct access to .text property on response
    const text = response.text || "No response generated.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract sources safely from grounding metadata
    const sources = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) {
          return { title: chunk.web.title || "Source", uri: chunk.web.uri || "#" };
        }
        return null;
      })
      .filter((source: any) => source !== null);

    return { text, sources };

  } catch (error) {
    console.error("Error generating text with search:", error);
    return { text: "An error occurred while fetching the response.", sources: [] };
  }
};
