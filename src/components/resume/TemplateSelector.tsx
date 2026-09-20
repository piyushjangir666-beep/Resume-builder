'use client';

interface Props {
  value: 'modern' | 'classic' | 'ats';
  onChange: (value: 'modern' | 'classic' | 'ats') => void;
}

const templates = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'ats', label: 'ATS' },
] as const;

export default function TemplateSelector({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {templates.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
            value === t.id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
