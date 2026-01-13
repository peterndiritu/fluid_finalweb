import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client safely
// Ensure process.env.API_KEY is accessed safely to avoid crashes if process is undefined (handled by polyfill in index.html)
const apiKey = typeof process !== "undefined" && process.env ? process.env.API_KEY : "";

// Only create instance if key exists to prevent immediate errors, though functionality will require it.
const ai = new GoogleGenAI({ apiKey: apiKey || "dummy_key_to_prevent_crash_if_missing" });

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
  if (!apiKey) {
    console.error("Gemini API Key is missing");
    return null;
  }

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
 * Generates text response using Gemini 2.5 Flash with Google Search Grounding.
 * @param prompt The user's question or prompt
 * @returns Object containing text response and grounding metadata
 */
export const generateTextWithSearch = async (prompt: string): Promise<SearchResult> => {
  if (!apiKey) {
    console.error("Gemini API Key is missing");
    return { text: "API Key is missing. Please check your configuration.", sources: [] };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No response generated.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract sources safely
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
