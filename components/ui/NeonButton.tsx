'use client';

import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function NeonButton({
  children,
  onClick,
  color = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: NeonButtonProps) {
  const sizes: Record<string, string> = {
    sm: 'padding: 10px 20px; font-size: 13px;',
    md: '',
    lg: 'padding: 16px 32px; font-size: 16px;',
  };

  const base = color === 'outline' ? 'btn-ghost' : 'btn-primary';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${className}`}
      style={size !== 'md' ? Object.fromEntries(sizes[size].split(';').filter(Boolean).map(s => { const [k, v] = s.split(':'); return [k.trim(), v.trim()]; })) : undefined}
    >
      {children}
    </button>
  );
}
