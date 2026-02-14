import React from 'react';

interface FlagListProps {
  title: string;
  type: 'red' | 'green';
  flags: string[];
}

export function FlagList({ title, type, flags }: FlagListProps) {
  const isGreen = type === 'green';
  return (
    <div className="card" style={{ padding: '28px 28px', borderColor: isGreen ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: isGreen ? '#4ade80' : '#f87171' }}>
        <span>{isGreen ? '✓' : '✗'}</span>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
        {flags.map((flag, i) => (
          <li key={i} style={{ fontSize: '13px', color: 'var(--c-text-2)', display: 'flex', alignItems: 'flex-start', gap: '12px', lineHeight: 1.7 }}>
            <span style={{ marginTop: '6px', width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: isGreen ? '#22c55e' : '#ef4444' }} />
            {flag}
          </li>
        ))}
      </ul>
    </div>
  );
}
