'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSessionStore } from '@/store/sessionStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FlagList } from '@/components/ui/FlagList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { hasWallet, unlockPremium, connectWallet } from '@/lib/blockchain';
import type { RunSimulationResponse, GenerateInsightsResponse } from '@/types';

export default function SimulatePage() {
    const router = useRouter();
    const {
        aiClone, simulatedPersonality,
        simulationResults, setSimulationResults,
    } = useSessionStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // LOCAL STATE for unlock — NEVER persisted, ALWAYS starts false
    // This is the ONLY way to control unlock — no Zustand, no localStorage
    const [paid, setPaid] = useState(false);
    const [insights, setInsights] = useState<any>(null);
    const [insightsLoading, setInsightsLoading] = useState(false);
    const [unlockLoading, setUnlockLoading] = useState(false);
    const [unlockError, setUnlockError] = useState('');

    const runSim = async () => {
        if (!aiClone || !simulatedPersonality) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/simulation/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aiClone, simulatedPersonality }),
            });
            const data: RunSimulationResponse = await res.json();
            if (!data.success || !data.results) throw new Error(data.error || 'Simulation failed');
            setSimulationResults(data.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const loadInsights = async () => {
        if (!simulationResults) return;
        setInsightsLoading(true);
        try {
            const res = await fetch('/api/insights/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ simulationResults, aiClone, simulatedPersonality }),
            });
            const data: GenerateInsightsResponse = await res.json();
            if (!data.success || !data.insights) throw new Error(data.error || 'Failed');
            setInsights(data.insights);
        } catch { /* silent */ } finally {
            setInsightsLoading(false);
        }
    };

    // STRICT unlock — requires MetaMask button click, NO auto-unlock
    const handleUnlock = async () => {
        setUnlockLoading(true);
        setUnlockError('');
        try {
            if (!hasWallet()) {
                throw new Error('MetaMask not detected. Install MetaMask to unlock premium insights.');
            }

            const txHash = await unlockPremium();

            // Verify transaction on backend
            const address = await connectWallet();
            const verifyRes = await fetch('/api/unlock/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    txHash: txHash === 'already-unlocked' ? '0x-contract-verified' : txHash,
                    walletAddress: address,
                }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyData.success || !verifyData.verified) {
                throw new Error('Transaction verification failed. Please try again.');
            }

            // ONLY set paid=true AFTER verified MetaMask payment
            setPaid(true);
        } catch (err) {
            setUnlockError(err instanceof Error ? err.message : 'Unlock failed. Check MetaMask and try again.');
        } finally {
            setUnlockLoading(false);
        }
    };

    useEffect(() => {
        if (aiClone && simulatedPersonality && !simulationResults && !loading) runSim();
    }, [aiClone, simulatedPersonality]);

    // Only load insights AFTER explicit MetaMask payment
    useEffect(() => {
        if (paid && simulationResults && !insights && !insightsLoading) loadInsights();
    }, [paid, simulationResults]);

    // ─── Empty state ───
    if (!aiClone && !simulationResults) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', maxWidth: '360px' }}>
                    <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>No Data</h1>
                    <p style={{ fontSize: '14px', marginBottom: '32px', color: 'var(--c-text-2)' }}>Create your AI clone first.</p>
                    <button onClick={() => router.push('/create')} className="btn-primary">Create Clone →</button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
                <LoadingSpinner text="Running simulation..." size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', maxWidth: '360px' }}>
                    <ErrorMessage message={error} />
                    <div style={{ marginTop: '24px' }}><button onClick={runSim} className="btn-primary">Retry</button></div>
                </div>
            </div>
        );
    }

    if (!simulationResults) return null;

    // Compute chemistry flow from conversation
    const chemistryFlow = simulationResults.conversation.map((_, i) => {
        const progress = (i + 1) / simulationResults.conversation.length;
        const base = simulationResults.compatibilityScore;
        const wave = Math.sin(progress * Math.PI * 2.5) * 15;
        return Math.min(100, Math.max(10, base * progress + wave));
    });

    // Verdict
    const verdict = simulationResults.compatibilityScore >= 75
        ? { emoji: '💚', text: 'Strong Match', sub: 'High chemistry detected — this could actually work.', color: '#22c55e' }
        : simulationResults.compatibilityScore >= 50
            ? { emoji: '💛', text: 'Worth Exploring', sub: 'Interesting dynamics — proceed with curiosity.', color: '#f59e0b' }
            : { emoji: '🔴', text: 'Risky Match', sub: 'Significant friction points — tread carefully.', color: '#ef4444' };

    return (
        <div style={{ minHeight: '100vh', padding: '80px 24px 60px' }}>
            <div className="wrap">
                {/* Header */}
                <Link href="/create" style={{ display: 'inline-block', fontSize: '14px', marginBottom: '48px', color: 'var(--c-text-3)' }}>
                    ← Back to Create
                </Link>

                <div style={{ marginBottom: '56px' }}>
                    <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, marginBottom: '12px' }}>Results</h1>
                    <p style={{ fontSize: '15px', color: 'var(--c-text-3)' }}>AI-powered relationship analysis</p>
                </div>

                {/* ═══ SWIPE VERDICT CARD — dating app style ═══ */}
                <div className="card-elevated" style={{ padding: '48px 40px', marginBottom: '40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${verdict.color}, transparent)` }} />
                    <p style={{ fontSize: '56px', marginBottom: '16px' }}>{verdict.emoji}</p>
                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '28px', fontWeight: 700, color: verdict.color, marginBottom: '8px' }}>{verdict.text}</h2>
                    <p style={{ fontSize: '15px', color: 'var(--c-text-2)', marginBottom: '28px', lineHeight: 1.7 }}>{verdict.sub}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '9999px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--c-border)' }}>
                        <span style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700, color: verdict.color }}>{simulationResults.compatibilityScore}%</span>
                        <span style={{ fontSize: '13px', color: 'var(--c-text-3)' }}>compatibility</span>
                    </div>
                </div>

                {/* ═══ Score Strip ═══ */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                    {[
                        { label: 'Attraction', val: `${simulationResults.attractionLevel}%`, accent: 'var(--c-cyan)' },
                        { label: 'Ghost Risk', val: `${simulationResults.ghostProbability}%`, accent: 'var(--c-red)' },
                        { label: 'Interest Level', val: simulationResults.predictedInterest, accent: 'var(--c-green)' },
                    ].map((m, i) => (
                        <div key={i} className="card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                            <p style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: '14px', color: 'var(--c-text-3)' }}>{m.label}</p>
                            <p style={{ fontFamily: 'var(--font-head)', fontSize: '28px', fontWeight: 700, textTransform: 'capitalize' as const, color: m.accent }}>{m.val}</p>
                        </div>
                    ))}
                </div>

                {/* ═══ CHEMISTRY TIMELINE — unique visual ═══ */}
                <div className="card" style={{ padding: '32px 32px', marginBottom: '40px' }}>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, marginBottom: '24px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📈</span> Chemistry Timeline
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '80px' }}>
                        {chemistryFlow.map((val, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                                <div style={{
                                    width: '100%',
                                    maxWidth: '32px',
                                    height: `${val}%`,
                                    borderRadius: '4px 4px 0 0',
                                    background: `linear-gradient(180deg, ${val > 60 ? '#7c3aed' : val > 40 ? '#f59e0b' : '#ef4444'}, transparent)`,
                                    opacity: 0.8,
                                    transition: 'height 0.5s ease',
                                }} />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--c-text-3)' }}>Opening</span>
                        <span style={{ fontSize: '10px', color: 'var(--c-text-3)' }}>Mid-convo</span>
                        <span style={{ fontSize: '10px', color: 'var(--c-text-3)' }}>Closing</span>
                    </div>
                </div>

                {/* ═══ Main: chat + sidebar ═══ */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    {/* Chat */}
                    <div className="card" style={{ padding: '36px 32px' }}>
                        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, marginBottom: '28px', color: '#fff' }}>Conversation</h2>
                        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px', maxHeight: '560px', overflowY: 'auto' as const, paddingRight: '8px' }}>
                            {simulationResults.conversation.map((turn, i) => (
                                <div key={i} className={turn.speaker === 'clone' ? 'chat-left' : 'chat-right'}
                                    style={{ padding: '20px 24px', maxWidth: '88%', ...(turn.speaker !== 'clone' ? { marginLeft: 'auto' } : {}) }}>
                                    <p style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: turn.speaker === 'clone' ? 'var(--c-accent-light)' : 'var(--c-cyan)' }}>
                                        {turn.speaker === 'clone' ? aiClone?.name || 'You' : 'Them'}
                                    </p>
                                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--c-text)' }}>{turn.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
                        {/* ═══ MESSAGE DECODER — unique feature ═══ */}
                        <div className="card-elevated" style={{ padding: '28px 28px' }}>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '16px' }}>🔍</span> What They Really Mean
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                                {simulationResults.conversation
                                    .filter(t => t.speaker !== 'clone')
                                    .slice(0, 3)
                                    .map((turn, i) => (
                                        <div key={i} style={{ padding: '16px 18px', borderRadius: '10px', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.1)' }}>
                                            <p style={{ fontSize: '12px', color: 'var(--c-cyan)', marginBottom: '6px', fontStyle: 'italic' }}>
                                                &ldquo;{turn.message.slice(0, 80)}{turn.message.length > 80 ? '...' : ''}&rdquo;
                                            </p>
                                            <p style={{ fontSize: '12px', color: 'var(--c-text-3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span>→</span>
                                                {turn.message.length > 100 ? 'Deeply engaged — investing effort means genuine interest' :
                                                    turn.message.includes('?') ? 'Curious & probing — wants to know you deeper' :
                                                        'Short but intentional — selective communicator'}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="card" style={{ padding: '28px 28px' }}>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>Breakdown</h3>
                            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
                                <ProgressBar label="Compatibility" value={simulationResults.compatibilityScore} color="violet" />
                                <ProgressBar label="Attraction" value={simulationResults.attractionLevel} color="cyan" />
                                <ProgressBar label="Ghost Risk" value={simulationResults.ghostProbability} color="rose" />
                            </div>
                        </div>

                        <div className="card" style={{ padding: '28px 28px' }}>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Potential</h3>
                            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--c-text-2)' }}>{simulationResults.relationshipPotential}</p>
                        </div>

                        {simulationResults.greenFlags.length > 0 && (
                            <FlagList title="Green Flags" type="green" flags={simulationResults.greenFlags} />
                        )}
                        {simulationResults.redFlags.length > 0 && (
                            <FlagList title="Red Flags" type="red" flags={simulationResults.redFlags} />
                        )}
                    </div>
                </div>

                {/* ═══ PREMIUM INSIGHTS — STRICTLY GATED BEHIND METAMASK ═══ */}
                {paid && insights ? (
                    <div className="card" style={{ padding: '48px 40px', marginBottom: '48px' }}>
                        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '22px', fontWeight: 700, marginBottom: '40px', color: '#fff', textAlign: 'center' }}>🔓 Premium Insights</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                            {[
                                { label: 'Best Opening Message', val: insights.recommendedMessage },
                                { label: 'Ideal First Date Plan', val: insights.idealDatePlan },
                                { label: 'Psychological Profile', val: insights.psychologicalAnalysis },
                                { label: 'Long-Term Forecast', val: insights.longTermPotential },
                            ].map((item, i) => (
                                <div key={i}>
                                    <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: '12px', color: 'var(--c-accent-light)' }}>{item.label}</p>
                                    <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--c-text-2)' }}>{item.val}</p>
                                </div>
                            ))}
                        </div>
                        {insights.topicsToAvoid?.length > 0 && (
                            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--c-border)', textAlign: 'center' }}>
                                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--c-red)' }}>Topics to Avoid</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px', justifyContent: 'center' }}>
                                    {insights.topicsToAvoid.map((t: string, i: number) => (
                                        <span key={i} style={{ padding: '8px 16px', borderRadius: '9999px', fontSize: '12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#fca5a5' }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {insights.confidenceTips?.length > 0 && (
                            <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--c-border)', textAlign: 'center' }}>
                                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--c-green)' }}>Confidence Tips</p>
                                <ul style={{ listStyle: 'none', maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                                    {insights.confidenceTips.map((tip: string, i: number) => (
                                        <li key={i} style={{ fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.7, color: 'var(--c-text-2)', textAlign: 'left' }}>
                                            <span style={{ color: 'var(--c-green)', marginTop: '2px' }}>•</span>{tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : insightsLoading ? (
                    <div className="card-elevated" style={{ padding: '72px 40px', textAlign: 'center', marginBottom: '48px' }}>
                        <LoadingSpinner text="Generating premium insights..." size="lg" />
                    </div>
                ) : (
                    <div className="card-elevated" style={{ padding: '64px 40px', textAlign: 'center', marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
                        {/* Blurred preview tease */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexWrap: 'wrap' as const, gap: '20px', padding: '40px', filter: 'blur(8px)', opacity: 0.15, pointerEvents: 'none' }}>
                            <div style={{ flex: '1 1 45%', padding: '20px', background: 'var(--c-surface)', borderRadius: '12px' }}>
                                <p style={{ fontSize: '11px', color: 'var(--c-accent-light)', marginBottom: '8px' }}>OPENING MESSAGE</p>
                                <p style={{ fontSize: '13px', color: 'var(--c-text-2)' }}>Hey! I noticed your profile mentions hiking trails...</p>
                            </div>
                            <div style={{ flex: '1 1 45%', padding: '20px', background: 'var(--c-surface)', borderRadius: '12px' }}>
                                <p style={{ fontSize: '11px', color: 'var(--c-accent-light)', marginBottom: '8px' }}>IDEAL DATE</p>
                                <p style={{ fontSize: '13px', color: 'var(--c-text-2)' }}>A scenic morning hike followed by brunch at a...</p>
                            </div>
                            <div style={{ flex: '1 1 45%', padding: '20px', background: 'var(--c-surface)', borderRadius: '12px' }}>
                                <p style={{ fontSize: '11px', color: 'var(--c-accent-light)', marginBottom: '8px' }}>PSYCHOLOGY</p>
                                <p style={{ fontSize: '13px', color: 'var(--c-text-2)' }}>This individual values authenticity and emotional...</p>
                            </div>
                            <div style={{ flex: '1 1 45%', padding: '20px', background: 'var(--c-surface)', borderRadius: '12px' }}>
                                <p style={{ fontSize: '11px', color: 'var(--c-accent-light)', marginBottom: '8px' }}>LONG-TERM</p>
                                <p style={{ fontSize: '13px', color: 'var(--c-text-2)' }}>Strong potential for lasting connection as both...</p>
                            </div>
                        </div>

                        {/* Actual unlock UI */}
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{ fontSize: '56px', marginBottom: '20px' }}>🔒</p>
                            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>Premium Insights</h2>
                            <p style={{ fontSize: '16px', marginBottom: '12px', maxWidth: '460px', margin: '0 auto 12px', lineHeight: 1.7, color: 'var(--c-text-2)' }}>
                                Unlock personalised advice, psychological analysis, ideal date plans, and the perfect opening message.
                            </p>
                            <p style={{ fontSize: '13px', marginBottom: '36px', color: 'var(--c-text-3)' }}>
                                Content is AI-generated uniquely for this simulation — not available on ChatGPT.
                            </p>

                            {unlockError && (
                                <div style={{ marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px' }}>
                                    <ErrorMessage message={unlockError} />
                                </div>
                            )}

                            {unlockLoading ? (
                                <LoadingSpinner text="Waiting for MetaMask transaction..." />
                            ) : (
                                <div>
                                    <button onClick={handleUnlock} className="btn-primary" style={{ padding: '18px 40px', fontSize: '16px', position: 'relative' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                                            Pay 0.00001 sFUEL to Unlock
                                        </span>
                                    </button>
                                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '6px' }}>
                                        <p style={{ fontSize: '12px', color: 'var(--c-text-3)' }}>
                                            Powered by SKALE Network · Near-zero gas fees
                                        </p>
                                        <p style={{ fontSize: '11px', color: 'var(--c-text-3)', opacity: 0.7 }}>
                                            Requires MetaMask wallet · One-time payment per simulation
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* New sim */}
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <button onClick={() => router.push('/create')} className="btn-ghost" style={{ padding: '14px 32px' }}>← New Simulation</button>
                </div>
            </div>
        </div>
    );
}
