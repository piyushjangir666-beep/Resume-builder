'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume_builder_data';

const templates = [
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Clean serif layout with centered header. Classic resume style.',
    preview: ['Times New Roman', '#000'],
  },
  {
    id: 'classic' as const,
    name: 'Classic',
    description: 'Professional sans-serif with colored accent lines.',
    preview: ['Arial', '#2563eb'],
  },
  {
    id: 'ats' as const,
    name: 'ATS Optimized',
    description: 'Plain text format for maximum ATS compatibility.',
    preview: ['Arial', '#000'],
  },
];

export default function TemplatesPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [selected, setSelected] = useState<'modern' | 'classic' | 'ats'>('modern');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setResume(data);
        setSelected(data.settings?.template || 'modern');
      }
    } catch {}
  }, []);

  const applyTemplate = (id: 'modern' | 'classic' | 'ats') => {
    setSelected(id);
    if (resume) {
      const updated = { ...resume, settings: { ...resume.settings, template: id } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setResume(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← Templates</Link>
        {saved && <span className="text-sm text-green-600 font-semibold">✓ Template applied!</span>}
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-gray-500 text-sm mb-6">Choose a template for your resume. Changes are saved automatically.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {templates.map(t => (
            <button key={t.id} onClick={() => applyTemplate(t.id)}
              className={`text-left rounded-xl border-2 overflow-hidden transition-all hover:shadow-md ${
                selected === t.id ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}>
              {/* Preview mockup */}
              <div className="h-48 bg-white p-4 relative" style={{ fontFamily: t.preview[0] }}>
                <div className="text-center mb-2">
                  <div className="h-3 bg-gray-800 rounded mx-auto mb-1" style={{ width: '60%' }} />
                  <div className="h-2 rounded mx-auto" style={{ width: '40%', background: t.preview[1] }} />
                </div>
                <div className="h-px mb-2" style={{ background: t.preview[1] }} />
                {[70, 90, 80, 60, 85].map((w, i) => (
                  <div key={i} className="h-1.5 bg-gray-200 rounded mb-1.5" style={{ width: `${w}%` }} />
                ))}
                {selected === t.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500 mt-1">{t.description}</p>
              </div>
            </button>
          ))}
        </div>
        {resume && (
          <div className="mt-8 text-center">
            <Link href="/builder/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors">
              Open Resume Builder →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
