'use client';
import { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface Props {
  skills: string[];
  onChange: (skills: string[]) => void;
}

const COLORS = [
  { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
  { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' },
  { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
  { bg: '#fff7ed', text: '#d97706', border: '#fed7aa' },
  { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  { bg: '#f0f9ff', text: '#0891b2', border: '#bae6fd' },
];

export default function SkillsForm({ skills, onChange }: Props) {
  const [input, setInput] = useState('');

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) onChange([...skills, trimmed]);
    setInput('');
  };

  const remove = (skill: string) => onChange(skills.filter(s => s !== skill));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }
  };

  return (
    <div className="pt-4 space-y-3">
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
          placeholder="Type a skill and press Enter..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] bg-gray-50 focus:bg-white focus:border-blue-400 transition-all placeholder-gray-400" />
        <button onClick={add}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)' }}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            const c = COLORS[i % COLORS.length];
            return (
              <span key={skill}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all hover:opacity-80"
                style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                {skill}
                <button onClick={() => remove(skill)}
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-gray-400 flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded bg-gray-100 text-center text-[9px] leading-4 font-bold text-gray-500">↵</span>
        Press Enter or comma to add a skill
      </p>
    </div>
  );
}
