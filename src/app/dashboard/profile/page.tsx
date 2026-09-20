'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Link2, GitBranch, Globe, Edit3 } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { calculateProfileCompletion } from '@/lib/utils';

const STORAGE_KEY = 'resume_builder_data';

export default function ProfilePage() {
  const [resume, setResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResume(JSON.parse(stored));
    } catch {}
  }, []);

  const completion = resume ? calculateProfileCompletion(resume) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← Profile</Link>
        <Link href="/builder/new"
          className="flex items-center gap-2 text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
          <Edit3 className="w-3.5 h-3.5" /> Edit Resume
        </Link>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        {!resume ? (
          <div className="bg-white rounded-xl border p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No profile yet</h3>
            <p className="text-gray-500 mb-6 text-sm">Create a resume to build your profile.</p>
            <Link href="/builder/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              Get Started
            </Link>
          </div>
        ) : (
          <>
            {/* Completion */}
            <div className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">Profile Completion</p>
                <span className="text-sm font-bold text-blue-600">{completion}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700"
                  style={{ width: `${completion}%` }} />
              </div>
              {completion < 100 && (
                <p className="text-xs text-gray-400 mt-2">Complete your resume to reach 100%</p>
              )}
            </div>

            {/* Info */}
            <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold">
                  {resume.personalInfo.fullName?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{resume.personalInfo.fullName || '—'}</h2>
                  <p className="text-gray-500">{resume.personalInfo.title || '—'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  { icon: Mail, label: resume.personalInfo.email },
                  { icon: Phone, label: resume.personalInfo.phone },
                  { icon: MapPin, label: resume.personalInfo.location },
                  { icon: Link2, label: resume.personalInfo.linkedin },
                  { icon: GitBranch, label: resume.personalInfo.github },
                  { icon: Globe, label: resume.personalInfo.portfolio },
                ].filter(i => i.label).map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Skills', value: resume.skills.length },
                { label: 'Experience', value: resume.experience.length },
                { label: 'Projects', value: resume.projects.length },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl border shadow-sm p-4 text-center">
                  <div className="text-2xl font-black text-blue-600">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
