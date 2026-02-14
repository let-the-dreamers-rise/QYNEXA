// Core Data Models

export interface AIClone {
  id: string;
  name: string;
  personalityProfile: string;
  behavioralTraits: string[];
  communicationTone: string;
  summary: string;
  createdAt: number;
}

export interface SimulatedPersonality {
  id: string;
  personalityProfile: string;
  behavioralPatterns: string[];
  communicationStyle: string;
  extractedTraits: string[];
  sourceType: 'chat' | 'bio' | 'description';
  createdAt: number;
}

export interface ConversationTurn {
  speaker: 'clone' | 'simulated';
  message: string;
  timestamp: number;
}

export interface SimulationResults {
  id: string;
  conversation: ConversationTurn[];
  attractionLevel: number;
  compatibilityScore: number;
  redFlags: string[];
  greenFlags: string[];
  predictedInterest: 'low' | 'medium' | 'high';
  ghostProbability: number;
  relationshipPotential: string;
  executionTime: number;
  createdAt: number;
}

export interface PremiumInsightsData {
  id: string;
  recommendedMessage: string;
  idealDatePlan: string;
  topicsToAvoid: string[];
  successProbability: number;
  confidenceTips: string[];
  futureDateSimulation: string;
  psychologicalAnalysis: string;
  longTermPotential: string;
  createdAt: number;
}

export interface UnlockTransaction {
  txHash: string;
  walletAddress: string;
  status: 'pending' | 'success' | 'failed';
  network: string;
  timestamp: number;
}

// API Request/Response Types

export interface CreateCloneRequest {
  name: string;
  personalityType: string;
  interests: string[];
  communicationStyle: string;
  socialGoals: string;
}

export interface CreateCloneResponse {
  success: boolean;
  clone?: AIClone;
  error?: string;
}

export interface CreatePersonalityRequest {
  inputType: 'chat' | 'bio' | 'description';
  content: string;
}

export interface CreatePersonalityResponse {
  success: boolean;
  personality?: SimulatedPersonality;
  error?: string;
}

export interface RunSimulationRequest {
  aiClone: AIClone;
  simulatedPersonality: SimulatedPersonality;
}

export interface RunSimulationResponse {
  success: boolean;
  results?: SimulationResults;
  error?: string;
}

export interface GenerateInsightsRequest {
  simulationResults: SimulationResults;
  aiClone: AIClone;
  simulatedPersonality: SimulatedPersonality;
}

export interface GenerateInsightsResponse {
  success: boolean;
  insights?: PremiumInsightsData;
  error?: string;
}

export interface VerifyUnlockRequest {
  txHash: string;
  walletAddress: string;
}

export interface VerifyUnlockResponse {
  success: boolean;
  verified: boolean;
  error?: string;
}

// Component Props Types

export interface AICloneCreatorProps {
  onCloneCreated: (clone: AIClone) => void;
}

export interface PersonalityCreatorProps {
  onPersonalityCreated: (personality: SimulatedPersonality) => void;
}

export interface SimulationEngineProps {
  aiClone: AIClone;
  simulatedPersonality: SimulatedPersonality;
  onSimulationComplete: (results: SimulationResults) => void;
}

export interface PremiumGateProps {
  isUnlocked: boolean;
  onUnlockRequested: () => void;
}

export interface UnlockFlowProps {
  onUnlockSuccess: (txHash: string) => void;
  onUnlockFailure: (error: string) => void;
}

export interface PremiumInsightsProps {
  simulationResults: SimulationResults;
  insights: PremiumInsightsData;
}
