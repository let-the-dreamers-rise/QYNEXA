import React from 'react';

interface SelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function Select({ label, value, onChange, options, required }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--c-text-2)] mb-2">
        {label}{required && <span className="text-[var(--c-accent)] ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23888' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#111] text-[#eee]">{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
