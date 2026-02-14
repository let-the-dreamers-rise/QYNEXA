'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSessionStore } from '@/store/sessionStore';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import type { CreateCloneResponse, CreatePersonalityResponse } from '@/types';

export default function CreatePage() {
  const router = useRouter();
  const { aiClone, setAIClone, simulatedPersonality, setSimulatedPersonality, clearSession } = useSessionStore();

  // ALL hooks before any conditional return
  const [step, setStep] = useState<1 | 2>(aiClone ? 2 : 1);
  const [name, setName] = useState('');
  const [personalityType, setPersonalityType] = useState('');
  const [interests, setInterests] = useState('');
  const [communicationStyle, setCommunicationStyle] = useState('');
  const [socialGoals, setSocialGoals] = useState('');
  const [cloneLoading, setCloneLoading] = useState(false);
  const [cloneError, setCloneError] = useState('');
  const [inputType, setInputType] = useState('description');
  const [personalityText, setPersonalityText] = useState('');
  const [personalityLoading, setPersonalityLoading] = useState(false);
  const [personalityError, setPersonalityError] = useState('');

  const handleClone = async () => {
    if (!name || !personalityType || !interests || !communicationStyle || !socialGoals) {
      setCloneError('All fields are required.');
      return;
    }
    setCloneLoading(true);
    setCloneError('');
    try {
      const res = await fetch('/api/clone/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          personalityType,
          interests: interests.split(',').map(s => s.trim()).filter(Boolean),
          communicationStyle,
          socialGoals,
        }),
      });
      const data: CreateCloneResponse = await res.json();
      if (!data.success || !data.clone) throw new Error(data.error || 'Failed to create clone');
      setAIClone(data.clone);
      setStep(2);
    } catch (err) {
      setCloneError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setCloneLoading(false);
    }
  };

  const handlePersonality = async () => {
    if (!personalityText || personalityText.trim().length < 10) {
      setPersonalityError('Enter at least 10 characters.');
      return;
    }
    setPersonalityLoading(true);
    setPersonalityError('');
    try {
      const res = await fetch('/api/personality/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputType: inputType as 'chat' | 'bio' | 'description', content: personalityText }),
      });
      const data: CreatePersonalityResponse = await res.json();
      if (!data.success || !data.personality) throw new Error(data.error || 'Failed to analyze');
      setSimulatedPersonality(data.personality);
      router.push('/simulate');
    } catch (err) {
      setPersonalityError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setPersonalityLoading(false);
    }
  };

  // Already has both — offer choices
  if (aiClone && simulatedPersonality) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="wrap-sm text-center">
          <p className="text-4xl mb-6">✨</p>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-head)' }}>Ready to Simulate</h1>
          <p className="text-base mb-10" style={{ color: 'var(--c-text-2)' }}>Your profiles are set up.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => router.push('/simulate')} className="btn-primary flex-1" style={{ padding: '14px 24px' }}>View Results →</button>
            <button onClick={() => { clearSession(); setStep(1); }} className="btn-ghost flex-1" style={{ padding: '14px 24px' }}>Start Fresh</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* Back */}
        <Link href="/" className="inline-block text-sm mb-12 transition-colors hover:text-[var(--c-accent-light)]" style={{ color: 'var(--c-text-3)' }}>
          ← Back
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[var(--c-accent)] text-white' : 'bg-[var(--c-surface)] text-[var(--c-text-3)]'}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <span className="text-sm font-medium" style={{ color: step >= 1 ? 'var(--c-text)' : 'var(--c-text-3)' }}>Clone</span>
          </div>
          <div className="flex-1 h-px" style={{ background: step > 1 ? 'var(--c-accent)' : 'var(--c-border)' }} />
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-[var(--c-accent)] text-white' : 'bg-[var(--c-surface)] text-[var(--c-text-3)]'}`}>
              2
            </div>
            <span className="text-sm font-medium" style={{ color: step === 2 ? 'var(--c-text)' : 'var(--c-text-3)' }}>Target</span>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-head)' }}>Create Your Clone</h1>
            <p className="text-sm mb-10" style={{ color: 'var(--c-text-2)' }}>Build a digital twin of your personality</p>

            <div className="space-y-5">
              <Input label="Name" value={name} onChange={setName} placeholder="Alex" required />
              <Select label="Personality" value={personalityType} onChange={setPersonalityType} options={[
                { value: '', label: 'Choose...' },
                { value: 'introverted', label: 'Introverted' },
                { value: 'extroverted', label: 'Extroverted' },
                { value: 'ambivert', label: 'Ambivert' },
                { value: 'analytical', label: 'Analytical' },
                { value: 'creative', label: 'Creative' },
              ]} required />
              <Input label="Interests" value={interests} onChange={setInterests} placeholder="music, hiking, coding" required />
              <Select label="Communication" value={communicationStyle} onChange={setCommunicationStyle} options={[
                { value: '', label: 'Choose...' },
                { value: 'direct', label: 'Direct' },
                { value: 'casual', label: 'Casual' },
                { value: 'formal', label: 'Formal' },
                { value: 'humorous', label: 'Humorous' },
              ]} required />
              <Input label="Social Goals" value={socialGoals} onChange={setSocialGoals} placeholder="genuine connections" required />
            </div>

            {cloneError && <div className="mt-5"><ErrorMessage message={cloneError} /></div>}

            <div className="mt-10">
              {cloneLoading ? (
                <LoadingSpinner text="Building your AI clone..." />
              ) : (
                <button onClick={handleClone} className="btn-primary w-full">Continue →</button>
              )}
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-head)' }}>Add Target Person</h1>
            <p className="text-sm mb-10" style={{ color: 'var(--c-text-2)' }}>Paste text about the person you&apos;re curious about</p>

            {aiClone && (
              <div className="card p-4 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'var(--c-accent-glow)' }}>🧬</div>
                <div>
                  <p className="text-sm font-medium text-white">{aiClone.name}</p>
                  <p className="text-xs" style={{ color: 'var(--c-text-3)' }}>{aiClone.summary}</p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <Select label="Input Type" value={inputType} onChange={setInputType} options={[
                { value: 'description', label: 'Description' },
                { value: 'chat', label: 'Chat Messages' },
                { value: 'bio', label: 'Social Media Bio' },
              ]} required />
              <TextArea label="Text" value={personalityText} onChange={setPersonalityText} placeholder="Paste their bio, messages, or describe them..." rows={7} required />
            </div>

            {personalityError && <div className="mt-5"><ErrorMessage message={personalityError} /></div>}

            <div className="mt-10 flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1">← Back</button>
              {personalityLoading ? (
                <div className="flex-1 flex justify-center"><LoadingSpinner text="Analyzing..." /></div>
              ) : (
                <button onClick={handlePersonality} className="btn-primary flex-1">Simulate →</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
