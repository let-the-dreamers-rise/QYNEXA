import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
}

export function GlassCard({ children, className = '', strong = false }: GlassCardProps) {
  return (
    <div className={`${strong ? 'card-elevated' : 'card'} p-7 sm:p-9 ${className}`}>
      {children}
    </div>
  );
}
