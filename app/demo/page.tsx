'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSessionStore } from '@/store/sessionStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const DEMO_CLONE = {
  name: 'Alex',
  personalityType: 'ambivert',
  interests: ['music', 'hiking', 'coding'],
  communicationStyle: 'casual',
  socialGoals: 'Find genuine connections',
};

const DEMO_PERSONALITY = {
  inputType: 'description' as const,
  content: 'An outgoing, adventurous person who loves travel and deep conversations. Witty, sometimes sarcastic, values authenticity.',
};

export default function DemoPage() {
  const router = useRouter();
  const { setAIClone, setSimulatedPersonality } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const steps = ['Creating clone...', 'Analyzing personality...', 'Launching simulation...'];

  const run = async () => {
    setLoading(true);
    try {
      setStep(0);
      const c = await fetch('/api/clone/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DEMO_CLONE) });
      const cd = await c.json();
      if (cd.success && cd.clone) setAIClone(cd.clone);

      setStep(1);
      const p = await fetch('/api/personality/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DEMO_PERSONALITY) });
      const pd = await p.json();
      if (pd.success && pd.personality) setSimulatedPersonality(pd.personality);

      setStep(2);
      await new Promise(r => setTimeout(r, 600));
      router.push('/simulate');
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <LoadingSpinner text={steps[step]} size="lg" />
          <div className="flex gap-2 mt-8 justify-center">
            {steps.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i <= step ? 'var(--c-accent)' : 'var(--c-surface-2)' }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-block text-sm mb-16 transition-colors hover:text-[var(--c-accent-light)]" style={{ color: 'var(--c-text-3)' }}>
          ← Back
        </Link>

        <p className="text-4xl mb-6">⚡</p>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-head)' }}>Instant Demo</h1>
        <p className="text-base mb-12" style={{ color: 'var(--c-text-2)' }}>
          One click, pre-built profiles, full simulation.
        </p>

        <div className="card p-6 text-left mb-8 space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--c-text-3)' }}>Clone</p>
            <p className="text-sm" style={{ color: 'var(--c-text)' }}>Alex — ambivert, casual, music & coding</p>
          </div>
          <div style={{ borderTop: '1px solid var(--c-border)' }} className="pt-4">
            <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--c-text-3)' }}>Target</p>
            <p className="text-sm" style={{ color: 'var(--c-text)' }}>Adventurous, witty, values authenticity</p>
          </div>
        </div>

        <button onClick={run} className="btn-primary w-full">Run Demo →</button>
      </div>
    </div>
  );
}
