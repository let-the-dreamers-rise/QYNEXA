/**
 * Property-Based Tests for Session State Management
 * Feature: onexa
 */

import fc from 'fast-check';
import { useSessionStore } from '@/store/sessionStore';
import type { AIClone, SimulatedPersonality, SimulationResults } from '@/types';

// Property 4: Session State Persistence
// Validates: Requirements 2.5, 3.6, 12.1, 12.2, 12.3, 12.4
describe('Property 4: Session State Persistence', () => {
  beforeEach(() => {
    // Clear session before each test
    useSessionStore.getState().clearSession();
  });

  test('AI clone should be retrievable immediately after creation', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 1, maxLength: 50 }),
          personalityProfile: fc.string({ minLength: 10, maxLength: 500 }),
          behavioralTraits: fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
          communicationTone: fc.string({ minLength: 5, maxLength: 100 }),
          summary: fc.string({ minLength: 10, maxLength: 200 }),
          createdAt: fc.integer({ min: Date.now() - 1000000, max: Date.now() })
        }),
        (aiClone: AIClone) => {
          // Store AI clone
          useSessionStore.getState().setAIClone(aiClone);
          
          // Retrieve AI clone
          const retrieved = useSessionStore.getState().aiClone;
          
          // Verify it matches
          expect(retrieved).toEqual(aiClone);
          expect(retrieved?.id).toBe(aiClone.id);
          expect(retrieved?.name).toBe(aiClone.name);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Simulated personality should be retrievable immediately after creation', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          personalityProfile: fc.string({ minLength: 10, maxLength: 500 }),
          behavioralPatterns: fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 1, maxLength: 10 }),
          communicationStyle: fc.string({ minLength: 5, maxLength: 100 }),
          extractedTraits: fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
          sourceType: fc.constantFrom('chat' as const, 'bio' as const, 'description' as const),
          createdAt: fc.integer({ min: Date.now() - 1000000, max: Date.now() })
        }),
        (personality: SimulatedPersonality) => {
          // Store personality
          useSessionStore.getState().setSimulatedPersonality(personality);
          
          // Retrieve personality
          const retrieved = useSessionStore.getState().simulatedPersonality;
          
          // Verify it matches
          expect(retrieved).toEqual(personality);
          expect(retrieved?.id).toBe(personality.id);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Simulation results should be retrievable immediately after creation', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          conversation: fc.array(
            fc.record({
              speaker: fc.constantFrom('clone' as const, 'simulated' as const),
              message: fc.string({ minLength: 5, maxLength: 200 }),
              timestamp: fc.integer({ min: 0, max: 100 })
            }),
            { minLength: 2, maxLength: 20 }
          ),
          attractionLevel: fc.integer({ min: 0, max: 100 }),
          compatibilityScore: fc.integer({ min: 0, max: 100 }),
          redFlags: fc.array(fc.string({ minLength: 5, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
          greenFlags: fc.array(fc.string({ minLength: 5, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
          predictedInterest: fc.constantFrom('low' as const, 'medium' as const, 'high' as const),
          ghostProbability: fc.integer({ min: 0, max: 100 }),
          relationshipPotential: fc.string({ minLength: 10, maxLength: 300 }),
          executionTime: fc.integer({ min: 100, max: 30000 }),
          createdAt: fc.integer({ min: Date.now() - 1000000, max: Date.now() })
        }),
        (results: SimulationResults) => {
          // Store results
          useSessionStore.getState().setSimulationResults(results);
          
          // Retrieve results
          const retrieved = useSessionStore.getState().simulationResults;
          
          // Verify it matches
          expect(retrieved).toEqual(results);
          expect(retrieved?.id).toBe(results.id);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Unlock status should be retrievable immediately after setting', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 64, maxLength: 64 }).map(s => '0x' + s.replace(/[^0-9a-f]/g, '0').substring(0, 64)),
        (txHash: string) => {
          // Set unlock status
          useSessionStore.getState().setUnlocked(txHash);
          
          // Retrieve unlock status
          const isUnlocked = useSessionStore.getState().isUnlocked;
          const storedTxHash = useSessionStore.getState().unlockTxHash;
          
          // Verify it matches
          expect(isUnlocked).toBe(true);
          expect(storedTxHash).toBe(txHash);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 6: Session Cleanup
// Validates: Requirements 12.6
describe('Property 6: Session Cleanup', () => {
  test('All session data should be cleared after clearSession', () => {
    fc.assert(
      fc.property(
        fc.record({
          aiClone: fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 1, maxLength: 50 }),
            personalityProfile: fc.string({ minLength: 10, maxLength: 500 }),
            behavioralTraits: fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
            communicationTone: fc.string({ minLength: 5, maxLength: 100 }),
            summary: fc.string({ minLength: 10, maxLength: 200 }),
            createdAt: fc.integer({ min: Date.now() - 1000000, max: Date.now() })
          }),
          personality: fc.record({
            id: fc.uuid(),
            personalityProfile: fc.string({ minLength: 10, maxLength: 500 }),
            behavioralPatterns: fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 1, maxLength: 10 }),
            communicationStyle: fc.string({ minLength: 5, maxLength: 100 }),
            extractedTraits: fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
            sourceType: fc.constantFrom('chat' as const, 'bio' as const, 'description' as const),
            createdAt: fc.integer({ min: Date.now() - 1000000, max: Date.now() })
          }),
          txHash: fc.string({ minLength: 64, maxLength: 64 }).map(s => '0x' + s.replace(/[^0-9a-f]/g, '0').substring(0, 64))
        }),
        (data) => {
          // Populate session with data
          useSessionStore.getState().setAIClone(data.aiClone);
          useSessionStore.getState().setSimulatedPersonality(data.personality);
          useSessionStore.getState().setUnlocked(data.txHash);
          
          // Verify data is present
          expect(useSessionStore.getState().aiClone).not.toBeNull();
          expect(useSessionStore.getState().simulatedPersonality).not.toBeNull();
          expect(useSessionStore.getState().isUnlocked).toBe(true);
          
          // Clear session
          useSessionStore.getState().clearSession();
          
          // Verify all data is cleared
          expect(useSessionStore.getState().aiClone).toBeNull();
          expect(useSessionStore.getState().simulatedPersonality).toBeNull();
          expect(useSessionStore.getState().simulationResults).toBeNull();
          expect(useSessionStore.getState().isUnlocked).toBe(false);
          expect(useSessionStore.getState().unlockTxHash).toBeNull();
          expect(useSessionStore.getState().premiumInsights).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
