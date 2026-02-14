import { callGemini, parseJSONResponse } from './gemini';
import type {
  PremiumInsightsData,
  SimulationResults,
  AIClone,
  SimulatedPersonality,
} from '@/types';

export async function generateInsights(
  simulationResults: SimulationResults,
  aiClone: AIClone,
  simulatedPersonality: SimulatedPersonality
): Promise<PremiumInsightsData> {
  const conversationSummary = simulationResults.conversation
    .map((turn) => `${turn.speaker}: ${turn.message}`)
    .join('\n');

  const prompt = `Based on this parallel simulation, generate strategic insights for real-world application.

AI Clone: ${aiClone.name}
Compatibility Score: ${simulationResults.compatibilityScore}%
Attraction Level: ${simulationResults.attractionLevel}%
Interest: ${simulationResults.predictedInterest}
Ghost Probability: ${simulationResults.ghostProbability}%

Conversation:
${conversationSummary}

Red Flags: ${simulationResults.redFlags.join(', ')}
Green Flags: ${simulationResults.greenFlags.join(', ')}

Generate premium insights in JSON format:
{
  "recommendedMessage": "An exact, specific message to send (2-3 sentences)",
  "idealDatePlan": "A detailed date plan (3-4 sentences)",
  "topicsToAvoid": ["topic1", "topic2", "topic3"],
  "successProbability": 0-100,
  "confidenceTips": ["tip1", "tip2", "tip3", "tip4"],
  "futureDateSimulation": "A narrative of how a potential date might unfold (4-5 sentences)",
  "psychologicalAnalysis": "Deep personality insights and compatibility analysis (4-5 sentences)",
  "longTermPotential": "Assessment of long-term relationship trajectory (3-4 sentences)"
}

Be specific, actionable, and realistic. Base all recommendations on the simulation data.`;

  const response = await callGemini(prompt, { temperature: 0.8 });

  if (!response.success) {
    throw new Error(response.error || 'Failed to generate insights');
  }

  const parsed = parseJSONResponse<{
    recommendedMessage: string;
    idealDatePlan: string;
    topicsToAvoid: string[];
    successProbability: number;
    confidenceTips: string[];
    futureDateSimulation: string;
    psychologicalAnalysis: string;
    longTermPotential: string;
  }>(response);

  if (!parsed) {
    throw new Error('Invalid response format from AI service');
  }

  if (
    !parsed.recommendedMessage ||
    !parsed.idealDatePlan ||
    !parsed.topicsToAvoid ||
    typeof parsed.successProbability !== 'number' ||
    !parsed.confidenceTips ||
    parsed.confidenceTips.length === 0 ||
    !parsed.futureDateSimulation ||
    !parsed.psychologicalAnalysis ||
    !parsed.longTermPotential
  ) {
    throw new Error('Incomplete insights data');
  }

  const insights: PremiumInsightsData = {
    id: crypto.randomUUID(),
    recommendedMessage: parsed.recommendedMessage,
    idealDatePlan: parsed.idealDatePlan,
    topicsToAvoid: parsed.topicsToAvoid,
    successProbability: Math.max(0, Math.min(100, parsed.successProbability)),
    confidenceTips: parsed.confidenceTips,
    futureDateSimulation: parsed.futureDateSimulation,
    psychologicalAnalysis: parsed.psychologicalAnalysis,
    longTermPotential: parsed.longTermPotential,
    createdAt: Date.now(),
  };

  return insights;
}
