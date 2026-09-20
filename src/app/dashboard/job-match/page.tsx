'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Target, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume_builder_data';

export default function JobMatchPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState<{
    score: number; matched: string[]; missing: string[]; recommendations: string[];
  } | null>(null);

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

    const stopWords = new Set(['the','and','for','with','that','this','are','you','will','have','from','work','team','role','good','great','strong','using','used','use','able','must','should','would','could','may','might']);
    const words = jobDesc.toLowerCase().match(/\b[a-z][a-z.+#]{2,}\b/g) || [];
    const unique = [...new Set(words)].filter(w => !stopWords.has(w) && w.length > 3);
    const matched = unique.filter(w => resumeText.includes(w)).slice(0, 15);
    const missing = unique.filter(w => !resumeText.includes(w)).slice(0, 8);
    const score = Math.min(100, Math.round((matched.length / Math.max(unique.length, 1)) * 100));

    const recommendations: string[] = [];
    if (missing.length > 0) recommendations.push(`Add these skills to your resume if applicable: ${missing.slice(0, 3).join(', ')}`);
    if (resume.summary.length < 100) recommendations.push('Expand your professional summary to include more relevant keywords.');
    if (resume.skills.length < 6) recommendations.push('Add more relevant technical skills to improve keyword matching.');
    if (resume.experience.length === 0) recommendations.push('Add work experience to strengthen your application.');

    setResult({ score, matched, missing, recommendations });
  };

  const scoreColor = result ? (result.score >= 70 ? '#059669' : result.score >= 50 ? '#2563eb' : '#dc2626') : '#2563eb';
  const scoreBg = result ? (result.score >= 70 ? '#ecfdf5' : result.score >= 50 ? '#eff6ff' : '#fef2f2') : '#eff6ff';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← Job Match</Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {!resume && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
            ⚠ No resume found. <Link href="/builder/new" className="font-semibold underline">Create one first</Link>.
          </div>
        )}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">Job Match Analyzer</h2>
          </div>
          <p className="text-sm text-gray-500">Paste a job description to see how well your resume matches the role.</p>
          <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={8}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-blue-400 transition-all resize-none" />
          <button onClick={analyze} disabled={!resume || !jobDesc.trim()}
            className="w-full py-3 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 transition-colors">
            Analyze Job Match
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between p-4 rounded-xl mb-4" style={{ background: scoreBg }}>
                <div>
                  <p className="font-bold text-gray-700">Overall Match</p>
                  <p className="text-sm text-gray-500">{result.matched.length} of {result.matched.length + result.missing.length} keywords matched</p>
                </div>
                <span className="text-5xl font-black" style={{ color: scoreColor }}>{result.score}%</span>
              </div>

              {result.matched.length > 0 && (
                <div className="mb-4">
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
                </div>
              )}
            </div>

            {result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <p className="font-bold text-gray-900">Recommendations</p>
                </div>
                <ul className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-amber-500 mt-0.5">→</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
