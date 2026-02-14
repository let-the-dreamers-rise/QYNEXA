import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export function Input({ label, value, onChange, placeholder, required, type = 'text' }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--c-text-2)] mb-2">
        {label}{required && <span className="text-[var(--c-accent)] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}
