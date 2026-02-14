import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15">
      <span className="text-red-400 text-sm mt-0.5">⚠</span>
      <p className="text-sm text-red-300 leading-relaxed">{message}</p>
    </div>
  );
}
