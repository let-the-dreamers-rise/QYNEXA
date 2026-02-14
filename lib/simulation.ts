import { callGemini, parseJSONResponse } from './gemini';
import type {
  AIClone,
  SimulatedPersonality,
  SimulationResults,
  ConversationTurn,
} from '@/types';

export async function runSimulation(
  aiClone: AIClone,
  simulatedPersonality: SimulatedPersonality
): Promise<SimulationResults> {
  const startTime = Date.now();

  const prompt = `You are simulating a parallel reality conversation between two people. Generate a realistic interaction and analyze compatibility.

Person 1 (AI Clone):
- Name: ${aiClone.name}
- Personality: ${aiClone.personalityProfile}
- Traits: ${aiClone.behavioralTraits.join(', ')}
- Communication: ${aiClone.communicationTone}

Person 2 (Simulated):
- Personality: ${simulatedPersonality.personalityProfile}
- Patterns: ${simulatedPersonality.behavioralPatterns.join(', ')}
- Communication: ${simulatedPersonality.communicationStyle}
- Traits: ${simulatedPersonality.extractedTraits.join(', ')}

Generate a JSON response with:
{
  "conversation": [
    {"speaker": "clone", "message": "...", "timestamp": 1},
    {"speaker": "simulated", "message": "...", "timestamp": 2},
    ... (6-8 turns total)
  ],
  "attractionLevel": 0-100,
  "compatibilityScore": 0-100,
  "redFlags": ["flag1", "flag2"],
  "greenFlags": ["flag1", "flag2", "flag3"],
  "predictedInterest": "low" | "medium" | "high",
  "ghostProbability": 0-100,
  "relationshipPotential": "A 2-3 sentence assessment"
}

Make the conversation natural and realistic. Base all metrics on the conversation content.`;

  const response = await callGemini(prompt, {
    temperature: 0.9,
    timeout: 60000,
  });

  if (!response.success) {
    throw new Error(response.error || 'Failed to run simulation');
  }

  const parsed = parseJSONResponse<{
    conversation: ConversationTurn[];
    attractionLevel: number;
    compatibilityScore: number;
    redFlags: string[];
    greenFlags: string[];
    predictedInterest: 'low' | 'medium' | 'high';
    ghostProbability: number;
    relationshipPotential: string;
  }>(response);

  if (!parsed) {
    throw new Error('Invalid response format from AI service');
  }

  if (
    !parsed.conversation ||
    parsed.conversation.length === 0 ||
    typeof parsed.attractionLevel !== 'number' ||
    typeof parsed.compatibilityScore !== 'number' ||
    !parsed.redFlags ||
    !parsed.greenFlags ||
    !parsed.predictedInterest ||
    typeof parsed.ghostProbability !== 'number' ||
    !parsed.relationshipPotential
  ) {
    throw new Error('Incomplete simulation data');
  }

  const executionTime = Date.now() - startTime;

  const results: SimulationResults = {
    id: crypto.randomUUID(),
    conversation: parsed.conversation,
    attractionLevel: Math.max(0, Math.min(100, parsed.attractionLevel)),
    compatibilityScore: Math.max(0, Math.min(100, parsed.compatibilityScore)),
    redFlags: parsed.redFlags,
    greenFlags: parsed.greenFlags,
    predictedInterest: parsed.predictedInterest,
    ghostProbability: Math.max(0, Math.min(100, parsed.ghostProbability)),
    relationshipPotential: parsed.relationshipPotential,
    executionTime,
    createdAt: Date.now(),
  };

  return results;
}
