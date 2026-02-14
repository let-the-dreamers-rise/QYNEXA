'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main>
      {/* ══ Nav ══ */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(14px)' }}>
        <span style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          <span style={{ color: 'var(--c-accent-light)' }}>Q</span>YNEXA
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => router.push('/demo')} className="btn-ghost" style={{ padding: '10px 20px', fontSize: '13px' }}>Demo</button>
          <button onClick={() => router.push('/create')} className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Get Started</button>
        </div>
      </nav>

      {/* ══ Hero ══ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto', paddingTop: '80px' }}>
          <div style={{ display: 'inline-block', marginBottom: '32px', padding: '8px 20px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, background: 'var(--c-accent-glow)', color: 'var(--c-accent-light)', border: '1px solid rgba(124,58,237,0.2)' }}>
            AI Relationship Simulator
          </div>

          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(42px, 6vw, 80px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '32px' }}>
            Predict Before<br />You <span className="gradient-text">Connect</span>
          </h1>

          <p style={{ fontSize: '18px', lineHeight: 1.7, marginBottom: '56px', maxWidth: '520px', margin: '0 auto 56px', color: 'var(--c-text-2)' }}>
            Create an AI twin of yourself, simulate conversations with anyone, and see compatibility scores before you even say hello.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => router.push('/create')} className="btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
              Start Simulation →
            </button>
            <button onClick={() => router.push('/demo')} className="btn-ghost" style={{ padding: '16px 36px', fontSize: '16px' }}>
              ▶ Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* ══ How ══ */}
      <section style={{ padding: '120px 24px' }}>
        <div className="wrap">
          <div style={{ marginBottom: '72px', maxWidth: '500px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.2em', marginBottom: '16px', color: 'var(--c-accent-light)' }}>How it works</p>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700 }}>Three steps to your parallel reality</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { num: '01', title: 'Clone Yourself', desc: 'Define your personality, interests, and communication style. Our AI builds a digital twin.' },
              { num: '02', title: 'Add Someone', desc: 'Paste their bio, messages, or describe them. We extract their core personality patterns.' },
              { num: '03', title: 'Simulate', desc: 'Watch your AI twins interact. Get compatibility scores, red flags, and predictions.' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: '36px 32px', transition: 'border-color 0.2s' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, display: 'block', marginBottom: '24px', color: 'var(--c-accent-light)' }}>Step {s.num}</span>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>{s.title}</h3>
                <p style={{ color: 'var(--c-text-2)', fontSize: '14px', lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Features ══ */}
      <section style={{ padding: '120px 24px', background: 'var(--c-surface)' }}>
        <div className="wrap">
          <div style={{ marginBottom: '72px', maxWidth: '500px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.2em', marginBottom: '16px', color: 'var(--c-accent-light)' }}>Features</p>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700 }}>What you get</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
            {[
              { icon: '🧬', title: 'AI Personality Cloning', desc: 'Advanced AI builds a behavioral model that mirrors your communication patterns and traits.' },
              { icon: '📊', title: 'Compatibility Analysis', desc: 'Detailed scoring on attraction, interest levels, ghost probability, and long-term potential.' },
              { icon: '🛡️', title: 'Red & Green Flags', desc: 'AI detects behavioral patterns and flags both positive signals and warning signs.' },
              { icon: '💬', title: 'Simulated Conversations', desc: 'Full multi-turn conversations between AI versions of both people, showing natural interaction flow.' },
            ].map((f, i) => (
              <div key={i} className="card-elevated" style={{ padding: '36px 36px', display: 'flex', alignItems: 'flex-start', gap: '24px', transition: 'border-color 0.2s' }}>
                <span style={{ fontSize: '28px', flexShrink: 0, marginTop: '2px' }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ color: 'var(--c-text-2)', fontSize: '15px', lineHeight: 1.8 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding: '120px 24px' }}>
        <div className="wrap-md" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, marginBottom: '24px' }}>
            Ready to simulate?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '48px', maxWidth: '440px', margin: '0 auto 48px', color: 'var(--c-text-2)' }}>
            No sign-up. No payment. Just AI-powered insight.
          </p>
          <button onClick={() => router.push('/create')} className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
            Get Started Free →
          </button>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid var(--c-border)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--c-text-3)' }}>© 2026 QYNEXA</p>
          <Link href="/build-log" style={{ fontSize: '12px', color: 'var(--c-text-3)' }}>Build Log</Link>
        </div>
      </footer>
    </main>
  );
}
