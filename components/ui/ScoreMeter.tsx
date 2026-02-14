'use client';

import React from 'react';

interface ScoreMeterProps {
  value: number;
  label: string;
  color?: 'violet' | 'cyan' | 'green';
  size?: number;
}

const COLORS: Record<string, string> = {
  violet: '#7c3aed',
  cyan: '#06b6d4',
  green: '#22c55e',
};

export function ScoreMeter({ value, label, color = 'violet', size = 100 }: ScoreMeterProps) {
  const stroke = COLORS[color] || COLORS.violet;
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1a1a" strokeWidth="5" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={stroke} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="text-center -mt-[calc(50%+12px)]" style={{ marginTop: `-${size / 2 + 12}px`, position: 'relative' }}>
        <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-head)', color: stroke }}>{value}</p>
      </div>
      <p className="text-xs text-[var(--c-text-3)] mt-4 uppercase tracking-widest font-medium">{label}</p>
    </div>
  );
}
