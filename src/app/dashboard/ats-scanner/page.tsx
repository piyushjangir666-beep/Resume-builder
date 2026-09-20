'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BarChart3, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume_builder_data';

export default function ATSScannerPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState<{ score: number; matched: string[]; missing: string[] } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResume(JSON.parse(stored));
    } catch {}
  }, []);

  const analyze = () => {
    if (!resume || !jobDesc.trim()) return;
    const resumeText = [
      resume.summary, resume.skills.join(' '),
      ...resume.experience.map(e => e.responsibilities + ' ' + e.jobTitle),
      ...resume.projects.map(p => p.technologies + ' ' + p.description),
    ].join(' ').toLowerCase();

    const stopWords = new Set(['the','and','for','with','that','this','are','you','will','have','from','work','team','role','good','great','strong','using','used','use']);
    const words = jobDesc.toLowerCase().match(/\b[a-z][a-z.+#]{2,}\b/g) || [];
    const unique = [...new Set(words)].filter(w => !stopWords.has(w) && w.length > 3);
    const matched = unique.filter(w => resumeText.includes(w)).slice(0, 15);
    const missing = unique.filter(w => !resumeText.includes(w)).slice(0, 10);
    const score = Math.min(100, Math.round((matched.length / Math.max(unique.length, 1)) * 100));
    setResult({ score, matched, missing });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← ATS Scanner</Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {!resume && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
            ⚠ No resume found. <Link href="/builder/new" className="font-semibold underline">Create one first</Link>.
          </div>
        )}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">Paste Job Description</h2>
          </div>
          <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={8}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-blue-400 transition-all resize-none" />
          <button onClick={analyze} disabled={!resume || !jobDesc.trim()}
            className="w-full py-3 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 transition-colors">
            Analyze Match
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-5">
            <div className={`flex items-center justify-between p-4 rounded-xl ${result.score >= 70 ? 'bg-green-50' : result.score >= 50 ? 'bg-blue-50' : 'bg-red-50'}`}>
              <span className="font-bold text-gray-700">Match Score</span>
              <span className={`text-4xl font-black ${result.score >= 70 ? 'text-green-600' : result.score >= 50 ? 'text-blue-600' : 'text-red-600'}`}>
                {result.score}%
              </span>
            </div>
            {result.matched.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">✅ Matched Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.matched.map(k => (
                    <span key={k} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                      <CheckCircle2 className="w-3 h-3" /> {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.missing.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">❌ Missing Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.missing.map(k => (
                    <span key={k} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
                      <XCircle className="w-3 h-3" /> {k}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Add missing keywords only if they genuinely match your skills.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
