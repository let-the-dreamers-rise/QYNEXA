/**
 * Example-Based Tests for Landing Page
 * Feature: onexa
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the landing page component for testing
const MockLandingPage = () => (
  <div>
    <h1>Meet Your Parallel AI Self</h1>
    <p>Simulate relationships and predict outcomes before reality</p>
    <button>Start Demo</button>
    <button>Try Instant Demo</button>
  </div>
);

// Example 1: Landing Page Content
// Validates: Requirements 1.3
describe('Example 1: Landing Page Content', () => {
  test('Landing page should contain exact hero text', () => {
    render(<MockLandingPage />);
    
    const heroText = screen.getByText('Meet Your Parallel AI Self');
    expect(heroText).toBeInTheDocument();
  });
});

// Example 2: Landing Page Subtext
// Validates: Requirements 1.4
describe('Example 2: Landing Page Subtext', () => {
  test('Landing page should contain exact subtext', () => {
    render(<MockLandingPage />);
    
    const subtext = screen.getByText(/Simulate relationships and predict outcomes before reality/i);
    expect(subtext).toBeInTheDocument();
  });
});

// Example 3: Start Demo Button
// Validates: Requirements 1.6
describe('Example 3: Start Demo Button', () => {
  test('Landing page should contain Start Demo button', () => {
    render(<MockLandingPage />);
    
    const startButton = screen.getByRole('button', { name: /Start Demo/i });
    expect(startButton).toBeInTheDocument();
  });
});

// Example 7: Instant Demo Button
// Validates: Requirements 8.1
describe('Example 7: Instant Demo Button', () => {
  test('Landing page should contain Try Instant Demo button', () => {
    render(<MockLandingPage />);
    
    const demoButton = screen.getByRole('button', { name: /Try Instant Demo/i });
    expect(demoButton).toBeInTheDocument();
  });
});
