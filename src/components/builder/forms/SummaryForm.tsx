'use client';
import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { improveText } from '@/lib/ai/improve';

interface Props {
  value: string;
  resume: ResumeData;
  onChange: (value: string) => void;
}

export default function SummaryForm({ value, resume, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (!value.trim()) return;
    setLoading(true);
    try {
      const improved = await improveText(value, 'summary', resume);
      onChange(improved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 space-y-3">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write a short professional summary highlighting your key skills, experience, and what makes you stand out..."
        rows={5}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all resize-none"
      />
      <button
        onClick={handleImprove}
        disabled={loading || !value.trim()}
        className="flex items-center gap-2 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg,#7c3aed15,#4f46e515)', color: '#7c3aed', border: '1px solid #7c3aed30' }}>
        {loading
          ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Improving with AI...</>
          : <><Sparkles className="w-3.5 h-3.5" /> Improve with AI</>}
      </button>
    </div>
  );
}
