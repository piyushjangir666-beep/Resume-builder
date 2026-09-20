'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume_builder_data';

export default function CoverLetterPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResume(JSON.parse(stored));
    } catch {}
  }, []);

  const generate = async () => {
    if (!resume || !jobTitle || !company) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const name = resume.personalInfo.fullName || 'I';
    const title = resume.personalInfo.title || 'professional';
    const skills = resume.skills.slice(0, 4).join(', ');
    const expCount = resume.experience.length;
    const latestExp = resume.experience[0];

    const generated = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${company}. As a ${title} with ${expCount > 0 ? `experience at ${latestExp?.company || 'leading companies'}` : 'a strong technical background'}, I am confident in my ability to contribute meaningfully to your team.

${skills ? `My expertise in ${skills} aligns well with the requirements of this role.` : ''} ${resume.summary ? resume.summary : `I am passionate about delivering high-quality solutions and continuously improving my skills.`}

${latestExp ? `In my previous role as ${latestExp.jobTitle} at ${latestExp.company}, I ${latestExp.responsibilities.split('\n')[0]?.replace(/^[-•]\s*/, '').toLowerCase() || 'delivered impactful results'}.` : ''}

I am excited about the opportunity to bring my skills and dedication to ${company}. I would welcome the chance to discuss how my background aligns with your needs.

Thank you for your time and consideration.

Sincerely,
${resume.personalInfo.fullName || 'Your Name'}
${resume.personalInfo.email || ''}
${resume.personalInfo.phone || ''}`;

    setLetter(generated);
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← Cover Letter</Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {!resume && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
            ⚠ No resume found. <Link href="/builder/new" className="font-semibold underline">Create one first</Link>.
          </div>
        )}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <h2 className="font-bold text-gray-900">Generate Cover Letter</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Job Title *</label>
              <input value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-blue-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Company *</label>
              <input value={company} onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Google"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-blue-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Job Description (optional)</label>
            <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)}
              placeholder="Paste job description for a more tailored letter..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-blue-400 transition-all resize-none" />
          </div>
          <button onClick={generate} disabled={loading || !resume || !jobTitle || !company}
            className="w-full py-3 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 disabled:opacity-40 transition-all">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate Cover Letter</>}
          </button>
        </div>

        {letter && (
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Your Cover Letter</h3>
              <button onClick={copy}
                className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                {copied ? <><Check className="w-3.5 h-3.5 text-green-600" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            </div>
            <textarea value={letter} onChange={e => setLetter(e.target.value)}
              rows={18}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-blue-400 transition-all resize-none font-mono" />
          </div>
        )}
      </main>
    </div>
  );
}
