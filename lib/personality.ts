import { callGemini, parseJSONResponse } from './gemini';
import type { SimulatedPersonality, CreatePersonalityRequest } from '@/types';

export async function generatePersonality(
  input: CreatePersonalityRequest
): Promise<SimulatedPersonality> {
  let promptContext = '';

  switch (input.inputType) {
    case 'chat':
      promptContext = `Analyze the following chat conversation and extract personality traits:\n\n${input.content}`;
      break;
    case 'bio':
      promptContext = `Analyze the following bio/profile and extract personality traits:\n\n${input.content}`;
      break;
    case 'description':
      promptContext = `Analyze the following description and extract personality traits:\n\n${input.content}`;
      break;
  }

  const prompt = `${promptContext}

Generate a comprehensive personality profile in JSON format with the following structure:
{
  "personalityProfile": "A detailed 3-4 sentence description of the person's personality based on the input",
  "behavioralPatterns": ["pattern1", "pattern2", "pattern3", "pattern4"],
  "communicationStyle": "A brief description of their communication approach",
  "extractedTraits": ["trait1", "trait2", "trait3", "trait4", "trait5"]
}

Be specific and base your analysis on observable patterns in the provided text. Include both positive traits and potential red flags if evident.`;

  const response = await callGemini(prompt, { temperature: 0.7 });

  if (!response.success) {
    throw new Error(response.error || 'Failed to generate personality');
  }

  const parsed = parseJSONResponse<{
    personalityProfile: string;
    behavioralPatterns: string[];
    communicationStyle: string;
    extractedTraits: string[];
  }>(response);

  if (!parsed) {
    throw new Error('Invalid response format from AI service');
  }

  if (
    !parsed.personalityProfile ||
    !parsed.behavioralPatterns ||
    parsed.behavioralPatterns.length === 0 ||
    !parsed.communicationStyle ||
    !parsed.extractedTraits ||
    parsed.extractedTraits.length === 0
  ) {
    throw new Error('Incomplete personality data');
  }

  const personality: SimulatedPersonality = {
    id: crypto.randomUUID(),
    personalityProfile: parsed.personalityProfile,
    behavioralPatterns: parsed.behavioralPatterns,
    communicationStyle: parsed.communicationStyle,
    extractedTraits: parsed.extractedTraits,
    sourceType: input.inputType,
    createdAt: Date.now(),
  };

  return personality;
}
