'use client';
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertTriangle, Target, Zap } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface Props { resume: ResumeData; }
interface ScoreCategory { label: string; score: number; max: number; feedback: string; icon: string; }

function calculateATS(resume: ResumeData): { total: number; categories: ScoreCategory[] } {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  // 1. Completeness (20pts)
  const completenessChecks = [
    !!personalInfo.fullName, !!personalInfo.title, !!personalInfo.email,
    !!personalInfo.phone, !!personalInfo.location, !!summary,
    experience.length > 0, education.length > 0, skills.length > 0,
    projects.length > 0 || certifications.length > 0,
  ];
  const completeness = Math.round((completenessChecks.filter(Boolean).length / completenessChecks.length) * 20);

  // 2. Contact Info (20pts)
  const contactChecks = [!!personalInfo.email, !!personalInfo.phone, !!personalInfo.location, !!personalInfo.linkedin];
  const contact = Math.round((contactChecks.filter(Boolean).length / contactChecks.length) * 20);

  // 3. Keywords — action verbs across all text (20pts)
  const allText = [
    summary,
    ...experience.map(e => e.responsibilities + ' ' + e.jobTitle),
    ...projects.map(p => p.description + ' ' + p.technologies),
    ...certifications.map(c => c.name),
    skills.join(' '),
  ].join(' ').toLowerCase();
  const actionVerbs = ['developed', 'implemented', 'designed', 'built', 'managed', 'led', 'created',
    'optimized', 'improved', 'delivered', 'collaborated', 'architected', 'deployed', 'launched',
    'increased', 'reduced', 'automated', 'integrated', 'maintained', 'tested'];
  const keywordMatches = actionVerbs.filter(k => allText.includes(k)).length;
  const keywords = Math.min(20, Math.round((keywordMatches / 6) * 20));

  // 4. Skills (20pts) — 5+ skills = full score
  const skillsScore = Math.min(20, Math.round((skills.length / 5) * 20));

  // 5. Experience quality (20pts)
  let expScore = 0;
  if (experience.length > 0) {
    const perExp = experience.map(e => {
      let pts = 0;
      if (e.company) pts += 3;
      if (e.jobTitle) pts += 3;
      if (e.startDate) pts += 2;
      if (e.responsibilities.length > 80) pts += 7;
      else if (e.responsibilities.length > 30) pts += 4;
      const hasAction = actionVerbs.some(w => e.responsibilities.toLowerCase().includes(w));
      if (hasAction) pts += 5;
      return Math.min(20, pts);
    });
    expScore = Math.round(perExp.reduce((a, b) => a + b, 0) / perExp.length);
  }

  const total = Math.min(100, completeness + contact + keywords + skillsScore + expScore);

  return {
    total,
    categories: [
      { label: 'Completeness', score: completeness, max: 20, feedback: 'Fill all key sections (name, email, summary, etc.)', icon: '📋' },
      { label: 'Contact Info',  score: contact,      max: 20, feedback: 'Add email, phone, location & LinkedIn', icon: '📞' },
      { label: 'Keywords',      score: keywords,     max: 20, feedback: 'Use action verbs like built, led, improved', icon: '🔑' },
      { label: 'Skills',        score: skillsScore,  max: 20, feedback: 'Add at least 5 relevant skills', icon: '⚡' },
      { label: 'Experience',    score: expScore,     max: 20, feedback: 'Add detailed responsibilities with action verbs', icon: '💼' },
    ],
  };
}

function getGrade(score: number) {
  if (score >= 85) return { label: 'Excellent', color: '#059669', bg: '#ecfdf5', ring: '#6ee7b7' };
  if (score >= 70) return { label: 'Very Good', color: '#2563eb', bg: '#eff6ff', ring: '#93c5fd' };
  if (score >= 55) return { label: 'Good',      color: '#d97706', bg: '#fffbeb', ring: '#fcd34d' };
  return                 { label: 'Needs Work', color: '#dc2626', bg: '#fef2f2', ring: '#fca5a5' };
}

export default function ATSScore({ resume }: Props) {
  const [open, setOpen] = useState(false);
  const [jobDesc, setJobDesc] = useState('');
  const [jobMatch, setJobMatch] = useState<{ matched: string[]; missing: string[]; score: number } | null>(null);

  const { total, categories } = useMemo(() => calculateATS(resume), [resume]);
  const grade = getGrade(total);

  const checkJobMatch = () => {
    if (!jobDesc.trim()) return;
    const resumeText = [resume.summary, resume.skills.join(' '),
      ...resume.experience.map(e => e.responsibilities + ' ' + e.jobTitle),
      ...resume.projects.map(p => p.technologies + ' ' + p.description),
      ...resume.certifications.map(c => c.name),
      ...resume.education.map(e => e.degree + ' ' + e.field),
    ].join(' ').toLowerCase();

    const stopWords = new Set(['the','and','for','with','that','this','are','you','will','have','from','our','your','their','they','been','has','not','but','can','all','any','who','its','was','were','also','into','than','then','when','what','how','about','more','other','some','such','each','which','there','these','those','must','should','would','could','may','might','shall','need','able','work','team','role','good','great','strong','using','used','use','make','take','give','get','set','put','run','see','let','try','ask','end','new','old','big','high','low','long','full','open','free','real','best','next','last','same','just','even','back','only','over','well','day','much','many','most','very','still','here','both','few']);

    const words = jobDesc.toLowerCase().match(/\b[a-z][a-z.+#]{1,}\b/g) || [];
    const unique = [...new Set(words)].filter(w => !stopWords.has(w) && w.length > 2);
    const matched = unique.filter(w => resumeText.includes(w));
    const missing = unique.filter(w => !resumeText.includes(w)).slice(0, 10);
    // Score based on matched ratio but with a generous curve
    const rawRatio = matched.length / Math.max(unique.length, 1);
    const score = Math.min(100, Math.round(rawRatio * 130)); // curve up so 75% match = ~97%
    setJobMatch({ matched: matched.slice(0, 14), missing, score });
  };

  return (
    <div className="rounded-xl overflow-hidden transition-shadow"
      style={{ background: '#fff', border: open ? '1px solid #2563eb30' : '1px solid #e2e8f0', boxShadow: open ? '0 0 0 3px #2563eb08' : '0 1px 3px rgba(0,0,0,0.04)' }}>

      {/* Header */}
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50/80 transition-colors">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${grade.color}15` }}>
          <Target className="w-3.5 h-3.5" style={{ color: grade.color }} />
        </div>
        <span className="flex-1 font-semibold text-gray-800 text-[13px]">ATS Score</span>

        {/* Score pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full"
          style={{ background: grade.bg, border: `1px solid ${grade.ring}` }}>
          <span className="text-[15px] font-black" style={{ color: grade.color }}>{total}</span>
          <span className="text-[10px] font-semibold text-gray-400">/100</span>
          <span className="text-[11px] font-bold" style={{ color: grade.color }}>{grade.label}</span>
        </div>

        <div className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: open ? '#2563eb15' : '#f1f5f9' }}>
          {open ? <ChevronUp className="w-3 h-3 text-blue-600" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-5 border-t border-gray-100 space-y-5 animate-fade-up">

          {/* Score Ring */}
          <div className="flex items-center justify-center pt-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke={grade.color}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(total / 100) * 314.16} 314.16`}
                  style={{ transition: 'stroke-dasharray 0.8s ease' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900">{total}</span>
                <span className="text-[11px] font-semibold text-gray-400">out of 100</span>
                <span className="text-[11px] font-bold mt-0.5" style={{ color: grade.color }}>{grade.label}</span>
              </div>
            </div>
          </div>

          {/* Category Bars */}
          <div className="space-y-3">
            {categories.map(cat => {
              const pct = cat.score / cat.max;
              const barColor = pct >= 0.8 ? '#059669' : pct >= 0.6 ? '#2563eb' : '#f59e0b';
              return (
                <div key={cat.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-semibold text-gray-700 flex items-center gap-1.5">
                      <span>{cat.icon}</span> {cat.label}
                    </span>
                    <span className="text-[12px] font-bold" style={{ color: barColor }}>
                      {cat.score}/{cat.max}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct * 100}%`, background: barColor }} />
                  </div>
                  {pct < 0.75 && (
                    <p className="text-[11px] mt-1 flex items-center gap-1" style={{ color: '#d97706' }}>
                      <AlertTriangle className="w-3 h-3" /> {cat.feedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Job Description Matcher */}
          <div className="rounded-xl p-4 space-y-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <p className="text-[13px] font-bold text-gray-800">Job Description Match</p>
            </div>
            <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)}
              placeholder="Paste the job description here to check how well your resume matches..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[12px] bg-white focus:border-blue-400 transition-all resize-none placeholder-gray-400" />
            <button onClick={checkJobMatch} disabled={!jobDesc.trim()}
              className="w-full py-2.5 rounded-lg text-[13px] font-bold text-white transition-all disabled:opacity-40 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)' }}>
              Analyze Match
            </button>

            {jobMatch && (
              <div className="space-y-3 animate-fade-up">
                <div className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: jobMatch.score >= 70 ? '#ecfdf5' : jobMatch.score >= 50 ? '#eff6ff' : '#fef2f2' }}>
                  <span className="text-[13px] font-bold text-gray-700">Match Score</span>
                  <span className="text-2xl font-black"
                    style={{ color: jobMatch.score >= 70 ? '#059669' : jobMatch.score >= 50 ? '#2563eb' : '#dc2626' }}>
                    {jobMatch.score}%
                  </span>
                </div>

                {jobMatch.matched.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">✅ Matched Keywords</p>
                    <div className="flex flex-wrap gap-1.5">
                      {jobMatch.matched.map(k => (
                        <span key={k} className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                          <CheckCircle2 className="w-3 h-3" /> {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {jobMatch.missing.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">❌ Missing Keywords</p>
                    <div className="flex flex-wrap gap-1.5">
                      {jobMatch.missing.map(k => (
                        <span key={k} className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                          <XCircle className="w-3 h-3" /> {k}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                      💡 Add relevant missing keywords only if they genuinely match your skills.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
