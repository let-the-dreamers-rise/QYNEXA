'use client';

import Link from 'next/link';

const log = [
  {
    phase: 'Foundation',
    items: [
      { t: 'Project Setup', d: 'Next.js 14, TypeScript, Tailwind CSS v4, Framer Motion' },
      { t: 'AI Integration', d: 'Google Gemini 2.5 Pro for personality cloning and simulation' },
      { t: 'State Management', d: 'Zustand with local storage persistence' },
    ],
  },
  {
    phase: 'Core Features',
    items: [
      { t: 'AI Clone Generation', d: 'Creates a digital twin from personality inputs' },
      { t: 'Personality Analysis', d: 'Extracts behavioral patterns from text, bios, and chats' },
      { t: 'Simulation Engine', d: 'Multi-turn AI conversations with compatibility metrics' },
      { t: 'Premium Insights', d: 'Psychological profiling, dating advice, long-term predictions' },
    ],
  },
  {
    phase: 'Design System',
    items: [
      { t: 'Typography', d: 'Space Grotesk for headings, DM Sans for body text' },
      { t: 'Components', d: 'Cards, inputs, selects, progress bars, score meters, flag lists' },
      { t: 'Theme', d: 'Pure black background, electric violet accent, minimal surfaces' },
    ],
  },
  {
    phase: 'Architecture',
    items: [
      { t: 'API Routes', d: '/api/clone/create, /api/personality/create, /api/simulation/run, /api/insights/generate' },
      { t: 'Type Safety', d: 'Strict TypeScript interfaces for all request/response types' },
      { t: 'Error Handling', d: 'Retry logic with exponential backoff for AI calls' },
    ],
  },
];

export default function BuildLogPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24 px-6">
      <div className="wrap-md">
        <Link href="/" className="inline-block text-sm mb-10 transition-colors hover:text-[var(--c-accent-light)]" style={{ color: 'var(--c-text-3)' }}>
          ← Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-head)' }}>Build Log</h1>
        <p className="text-sm mb-14" style={{ color: 'var(--c-text-3)' }}>Architecture, decisions, and details.</p>

        <div className="space-y-6">
          {log.map((s, i) => (
            <div key={i} className="card p-7 sm:p-9">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--c-accent-light)', fontFamily: 'var(--font-head)' }}>{s.phase}</h2>
              <div className="space-y-4">
                {s.items.map((item, j) => (
                  <div key={j} className={j > 0 ? 'pt-4' : ''} style={j > 0 ? { borderTop: '1px solid var(--c-border)' } : undefined}>
                    <h3 className="text-sm font-semibold text-white mb-1">{item.t}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
