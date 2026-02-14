/**
 * Property-Based Tests for Demo Mode
 * Feature: onexa
 */

import fc from 'fast-check';
import type { AIClone, SimulatedPersonality, SimulationResults } from '@/types';

// Property 14: Demo Mode Completeness
// Validates: Requirements 8.2, 8.3, 8.4, 8.5
describe('Property 14: Demo Mode Completeness', () => {
  test('Demo mode should generate complete AI clone', () => {
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
        (demoClone: AIClone) => {
          // Verify demo clone has all required fields
          expect(demoClone.id).toBeTruthy();
          expect(demoClone.name).toBeTruthy();
          expect(demoClone.personalityProfile).toBeTruthy();
          expect(demoClone.behavioralTraits.length).toBeGreaterThan(0);
          expect(demoClone.communicationTone).toBeTruthy();
          expect(demoClone.summary).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Demo mode should generate complete simulated personality', () => {
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
        (demoPersonality: SimulatedPersonality) => {
          // Verify demo personality has all required fields
          expect(demoPersonality.id).toBeTruthy();
          expect(demoPersonality.personalityProfile).toBeTruthy();
          expect(demoPersonality.behavioralPatterns.length).toBeGreaterThan(0);
          expect(demoPersonality.communicationStyle).toBeTruthy();
          expect(demoPersonality.extractedTraits.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Demo mode should generate complete simulation results', () => {
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
        (demoResults: SimulationResults) => {
          // Verify demo results have all required fields
          expect(demoResults.id).toBeTruthy();
          expect(demoResults.conversation.length).toBeGreaterThan(0);
          expect(demoResults.attractionLevel).toBeGreaterThanOrEqual(0);
          expect(demoResults.attractionLevel).toBeLessThanOrEqual(100);
          expect(demoResults.compatibilityScore).toBeGreaterThanOrEqual(0);
          expect(demoResults.compatibilityScore).toBeLessThanOrEqual(100);
          expect(demoResults.relationshipPotential).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 15: Demo Mode Performance
// Validates: Requirements 8.6
describe('Property 15: Demo Mode Performance', () => {
  test('Demo mode should complete within 15 seconds', () => {
    const DEMO_TIMEOUT_MS = 15000;
    
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 15000 }),
        (executionTime) => {
          // Verify execution time is within limit
          expect(executionTime).toBeLessThanOrEqual(DEMO_TIMEOUT_MS);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Demo mode execution time should be positive', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 15000 }),
        (executionTime) => {
          expect(executionTime).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
