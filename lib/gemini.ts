import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface GeminiResponse {
  text: string;
  success: boolean;
  error?: string;
}

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;
const REQUEST_TIMEOUT = 60000;

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callGemini(
  prompt: string,
  options: {
    temperature?: number;
    maxRetries?: number;
    timeout?: number;
  } = {}
): Promise<GeminiResponse> {
  const {
    temperature = 0.7,
    maxRetries = MAX_RETRIES,
    timeout = REQUEST_TIMEOUT,
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-pro',
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('Request timeout')),
          timeout
        )
      );

      const generatePromise = model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens: 8192,
        },
      });

      const result = await Promise.race([generatePromise, timeoutPromise]);

      const response = result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from AI service');
      }

      return {
        text,
        success: true,
      };
    } catch (error: any) {
      lastError = error;

      if (error.message?.includes('timeout')) {
        console.error(`Attempt ${attempt + 1} timed out`);
      } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
        console.error(`Attempt ${attempt + 1} rate limited`);
      } else {
        console.error(`Attempt ${attempt + 1} failed:`, error.message);
      }

      if (attempt < maxRetries - 1) {
        const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        await delay(retryDelay);
      }
    }
  }

  return {
    text: '',
    success: false,
    error: lastError?.message || 'AI service request failed',
  };
}

export function validateGeminiResponse(response: GeminiResponse): boolean {
  return response.success && response.text.trim().length > 0;
}

export function parseJSONResponse<T>(response: GeminiResponse): T | null {
  if (!validateGeminiResponse(response)) {
    return null;
  }

  try {
    let text = response.text.trim();

    // Strip markdown code fences (```json ... ``` or ``` ... ```)
    const codeBlockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (codeBlockMatch) {
      text = codeBlockMatch[1].trim();
    }

    // Extract the outermost JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON object found in response:', text.substring(0, 200));
      return null;
    }

    return JSON.parse(jsonMatch[0]) as T;
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    console.error('Raw text:', response.text.substring(0, 500));
    return null;
  }
}
