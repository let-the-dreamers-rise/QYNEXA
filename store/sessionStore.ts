import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AIClone,
  SimulatedPersonality,
  SimulationResults,
  PremiumInsightsData,
} from '@/types';

interface SessionStore {
  aiClone: AIClone | null;
  setAIClone: (clone: AIClone) => void;

  simulatedPersonality: SimulatedPersonality | null;
  setSimulatedPersonality: (personality: SimulatedPersonality) => void;

  simulationResults: SimulationResults | null;
  setSimulationResults: (results: SimulationResults) => void;

  // Unlock — NEVER persisted, ALWAYS starts false, force-reset on hydration
  isUnlocked: boolean;
  unlockTxHash: string | null;
  setUnlocked: (txHash: string) => void;

  premiumInsights: PremiumInsightsData | null;
  setPremiumInsights: (insights: PremiumInsightsData) => void;

  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      aiClone: null,
      simulatedPersonality: null,
      simulationResults: null,
      isUnlocked: false,
      unlockTxHash: null,
      premiumInsights: null,

      setAIClone: (clone) => set({ aiClone: clone }),
      setSimulatedPersonality: (personality) =>
        set({ simulatedPersonality: personality }),
      setSimulationResults: (results) =>
        set({ simulationResults: results, isUnlocked: false, unlockTxHash: null, premiumInsights: null }),
      setUnlocked: (txHash) => set({ isUnlocked: true, unlockTxHash: txHash }),
      setPremiumInsights: (insights) => set({ premiumInsights: insights }),
      clearSession: () =>
        set({
          aiClone: null,
          simulatedPersonality: null,
          simulationResults: null,
          isUnlocked: false,
          unlockTxHash: null,
          premiumInsights: null,
        }),
    }),
    {
      name: 'qynexa-v3',
      version: 3,
      partialize: (state) => ({
        aiClone: state.aiClone,
        simulatedPersonality: state.simulatedPersonality,
        simulationResults: state.simulationResults,
      }),
      // FORCE reset unlock after ANY hydration — belt AND suspenders
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.isUnlocked = false;
            state.unlockTxHash = null;
            state.premiumInsights = null;
          }
        };
      },
      migrate: () => ({
        aiClone: null,
        simulatedPersonality: null,
        simulationResults: null,
      }),
    }
  )
);

// Nuke ALL old storage keys on client
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('onexa-session');
    localStorage.removeItem('qynexa-session');
    localStorage.removeItem('qynexa-v2');
  } catch { }
}
