import { callGemini, parseJSONResponse } from './gemini';
import type { AIClone, CreateCloneRequest } from '@/types';

export async function generateAIClone(
  input: CreateCloneRequest
): Promise<AIClone> {
  const prompt = `You are an expert personality analyst. Create a detailed AI personality clone based on the following information:

Name: ${input.name}
Personality Type: ${input.personalityType}
Interests: ${input.interests.join(', ')}
Communication Style: ${input.communicationStyle}
Social Goals: ${input.socialGoals}

Generate a comprehensive personality profile in JSON format with the following structure:
{
  "personalityProfile": "A detailed 3-4 sentence description of the person's overall personality",
  "behavioralTraits": ["trait1", "trait2", "trait3", "trait4", "trait5"],
  "communicationTone": "A brief description of how this person communicates",
  "summary": "A concise 1-2 sentence summary of the AI clone"
}

Make the profile realistic, nuanced, and based on the provided information. Include both strengths and potential areas of growth.`;

  const response = await callGemini(prompt, { temperature: 0.8 });

  if (!response.success) {
    throw new Error(response.error || 'Failed to generate AI clone');
  }

  const parsed = parseJSONResponse<{
    personalityProfile: string;
    behavioralTraits: string[];
    communicationTone: string;
    summary: string;
  }>(response);

  if (!parsed) {
    throw new Error('Invalid response format from AI service');
  }

  if (
    !parsed.personalityProfile ||
    !parsed.behavioralTraits ||
    parsed.behavioralTraits.length === 0 ||
    !parsed.communicationTone ||
    !parsed.summary
  ) {
    throw new Error('Incomplete AI clone data');
  }

  const aiClone: AIClone = {
    id: crypto.randomUUID(),
    name: input.name,
    personalityProfile: parsed.personalityProfile,
    behavioralTraits: parsed.behavioralTraits,
    communicationTone: parsed.communicationTone,
    summary: parsed.summary,
    createdAt: Date.now(),
  };

  return aiClone;
}
