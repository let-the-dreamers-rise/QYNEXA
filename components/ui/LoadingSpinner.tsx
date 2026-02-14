import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ text, size = 'md' }: LoadingSpinnerProps) {
  const s = size === 'sm' ? 20 : size === 'lg' ? 40 : 28;
  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className="animate-spin">
        <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="3" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {text && <p className="text-sm text-[var(--c-text-2)]">{text}</p>}
    </div>
  );
}
