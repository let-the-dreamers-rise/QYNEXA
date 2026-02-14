import type { AIClone, SimulatedPersonality, SimulationResults } from '@/types';

export function generateDemoAIClone(): AIClone {
  return {
    id: 'demo-clone-1',
    name: 'Alex Chen',
    personalityProfile:
      'Alex is an outgoing and curious individual with a passion for technology and creative pursuits. They balance analytical thinking with emotional intelligence, making them adaptable in various social situations. Alex values authentic connections and meaningful conversations.',
    behavioralTraits: [
      'Extroverted',
      'Curious',
      'Empathetic',
      'Tech-savvy',
      'Creative',
    ],
    communicationTone: 'Casual and friendly with occasional wit and humor',
    summary:
      'A tech-enthusiast with strong social skills who values genuine connections and intellectual conversations.',
    createdAt: Date.now(),
  };
}

export function generateDemoSimulatedPersonality(): SimulatedPersonality {
  return {
    id: 'demo-personality-1',
    personalityProfile:
      'Jordan is an introspective and artistic person who enjoys deep conversations about philosophy, art, and human nature. They have a thoughtful communication style and appreciate authenticity in relationships. Jordan values emotional depth and intellectual stimulation.',
    behavioralPatterns: [
      'Thoughtful and reflective',
      'Values deep conversations',
      'Artistic and creative',
      'Seeks meaningful connections',
    ],
    communicationStyle: 'Thoughtful and introspective with poetic undertones',
    extractedTraits: [
      'Introverted',
      'Philosophical',
      'Artistic',
      'Emotionally aware',
      'Authentic',
    ],
    sourceType: 'bio',
    createdAt: Date.now(),
  };
}

export function generateDemoSimulationResults(): SimulationResults {
  return {
    id: 'demo-simulation-1',
    conversation: [
      {
        speaker: 'clone',
        message:
          "Hey! I noticed you're into art and philosophy. I've been exploring the intersection of AI and creativity lately. What's your take on it?",
        timestamp: 1,
      },
      {
        speaker: 'simulated',
        message:
          "That's fascinating! I think AI challenges our understanding of creativity itself. It makes us question what it means to be truly original. Have you seen any AI art that moved you?",
        timestamp: 2,
      },
      {
        speaker: 'clone',
        message:
          "Absolutely! There's this AI-generated piece that mimics Van Gogh's style but with modern themes. It's both familiar and alien. Makes you wonder about the nature of artistic expression.",
        timestamp: 3,
      },
      {
        speaker: 'simulated',
        message:
          "I love that tension between familiar and alien. It's like looking at ourselves through a distorted mirror. Do you create art yourself, or are you more on the tech side?",
        timestamp: 4,
      },
      {
        speaker: 'clone',
        message:
          "Bit of both actually! I code during the day and paint at night. It's my way of balancing logic and emotion. What about you? What mediums do you work with?",
        timestamp: 5,
      },
      {
        speaker: 'simulated',
        message:
          "I do mixed media - combining traditional painting with digital elements. Your balance of coding and painting sounds beautiful. We should collaborate sometime!",
        timestamp: 6,
      },
    ],
    attractionLevel: 78,
    compatibilityScore: 82,
    redFlags: [
      'Potential for overthinking in conversations',
      'May need alone time that could be misinterpreted',
    ],
    greenFlags: [
      'Shared interest in art and technology',
      'Both value deep, meaningful conversations',
      'Complementary personality types (extrovert/introvert balance)',
      'Mutual respect for creative pursuits',
    ],
    predictedInterest: 'high',
    ghostProbability: 15,
    relationshipPotential:
      'Strong potential for a meaningful connection. The balance between Alex\'s outgoing nature and Jordan\'s introspective style creates a complementary dynamic. Shared interests in art, technology, and philosophy provide solid common ground for deep conversations and mutual growth.',
    executionTime: 8500,
    createdAt: Date.now(),
  };
}
