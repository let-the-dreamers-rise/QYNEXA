import React from 'react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function TextArea({ label, value, onChange, placeholder, rows = 4, required }: TextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--c-text-2)] mb-2">
        {label}{required && <span className="text-[var(--c-accent)] ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="input-field resize-none"
      />
    </div>
  );
}
