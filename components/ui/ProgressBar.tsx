import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  color?: 'violet' | 'cyan' | 'rose' | 'green' | 'amber';
}

const COLORS: Record<string, string> = {
  violet: '#7c3aed',
  cyan: '#06b6d4',
  rose: '#ef4444',
  green: '#22c55e',
  amber: '#f59e0b',
};

export function ProgressBar({ label, value, color = 'violet' }: ProgressBarProps) {
  const bg = COLORS[color] || COLORS.violet;
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-[var(--c-text-2)]">{label}</span>
        <span className="text-sm font-semibold text-[var(--c-text)]" style={{ fontFamily: 'var(--font-head)' }}>{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-[var(--c-surface-2)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(value, 100)}%`, background: bg }}
        />
      </div>
    </div>
  );
}
