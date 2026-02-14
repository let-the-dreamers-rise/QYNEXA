/**
 * Example-Based Tests for README Documentation
 * Feature: onexa
 */

import fs from 'fs';
import path from 'path';

const readmeContent = fs.existsSync(path.join(process.cwd(), 'README.md'))
  ? fs.readFileSync(path.join(process.cwd(), 'README.md'), 'utf-8')
  : '';

// Example 13: README Existence
// Validates: Requirements 13.1
describe('Example 13: README Existence', () => {
  test('Repository should contain README.md file', () => {
    const readmeExists = fs.existsSync(path.join(process.cwd(), 'README.md'));
    expect(readmeExists).toBe(true);
  });
});

// Example 14: README Vision Section
// Validates: Requirements 13.2
describe('Example 14: README Vision Section', () => {
  test('README should contain project vision and problem statement', () => {
    expect(readmeContent).toContain('Vision');
    expect(readmeContent).toContain('Problem');
  });
});

// Example 15: README Solution Section
// Validates: Requirements 13.3
describe('Example 15: README Solution Section', () => {
  test('README should explain the solution approach', () => {
    expect(readmeContent).toContain('Solution');
  });
});

// Example 16: README Tech Stack
// Validates: Requirements 13.4
describe('Example 16: README Tech Stack', () => {
  test('README should document the complete tech stack', () => {
    expect(readmeContent).toContain('Tech Stack');
    expect(readmeContent).toContain('Next.js');
    expect(readmeContent).toContain('Gemini');
  });
});

// Example 17: README Run Instructions
// Validates: Requirements 13.5
describe('Example 17: README Run Instructions', () => {
  test('README should provide step-by-step run instructions', () => {
    expect(readmeContent).toContain('Getting Started');
    expect(readmeContent).toContain('npm install');
    expect(readmeContent).toContain('npm run dev');
  });
});

// Example 18: README Demo Flow
// Validates: Requirements 13.6
describe('Example 18: README Demo Flow', () => {
  test('README should describe demo flow for judges', () => {
    expect(readmeContent).toContain('Demo');
  });
});

// Example 19: README Onchain Documentation
// Validates: Requirements 13.7
describe('Example 19: README Onchain Documentation', () => {
  test('README should explain onchain component', () => {
    expect(readmeContent).toContain('Blockchain');
    expect(readmeContent).toContain('SKALE');
  });
});

// Example 20: README Architecture Content
// Validates: Requirements 13.8
describe('Example 20: README Architecture Content', () => {
  test('README should include architecture information', () => {
    expect(readmeContent).toContain('Architecture');
  });
});
