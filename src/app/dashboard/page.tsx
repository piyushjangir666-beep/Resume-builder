'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sparkles, FileText, Plus, BarChart3, User, Target, Mail, Settings, Layout, Zap } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { calculateProfileCompletion } from '@/lib/utils';

const STORAGE_KEY = 'resume_builder_data';

export default function DashboardPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResume(JSON.parse(stored));
    } catch {}
  }, []);

  const resumeCount = resume ? 1 : 0;
  const atsScore = resume ? '—' : '—';
  const profilePct = resume ? `${calculateProfileCompletion(resume)}%` : '0%';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl">ResumeAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: 'Resumes', href: '/dashboard/resumes' },
            { label: 'Templates', href: '/dashboard/templates' },
            { label: 'AI Tools', href: '/dashboard/ai-tools' },
            { label: 'Settings', href: '/dashboard/settings' },
          ].map(n => (
            <Link key={n.label} href={n.href}
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Good morning 👋</h1>
          <p className="text-gray-500 mt-1">Ready to build a resume that gets you hired?</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Resumes', value: String(resumeCount), icon: FileText, color: 'text-blue-600 bg-blue-50' },
            { label: 'ATS Score', value: atsScore, icon: BarChart3, color: 'text-green-600 bg-green-50' },
            { label: 'Profile', value: profilePct, icon: User, color: 'text-violet-600 bg-violet-50' },
            { label: 'AI Tools', value: '5', icon: Sparkles, color: 'text-orange-600 bg-orange-50' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Create Resume', href: '/builder/new', icon: Plus, primary: true },
              { label: 'My Resumes', href: '/dashboard/resumes', icon: FileText, primary: false },
              { label: 'ATS Scanner', href: '/dashboard/ats-scanner', icon: BarChart3, primary: false },
              { label: 'Cover Letter', href: '/dashboard/cover-letter', icon: Mail, primary: false },
            ].map(action => (
              <Link key={action.label} href={action.href}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md ${
                  action.primary ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'bg-white hover:border-blue-300'
                }`}>
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All Tools */}
        <div>
          <h2 className="text-lg font-semibold mb-4">All Tools</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Job Match', href: '/dashboard/job-match', icon: Target, desc: 'Match resume to job description', color: '#059669', bg: '#ecfdf5' },
              { label: 'AI Tools', href: '/dashboard/ai-tools', icon: Zap, desc: 'AI-powered writing assistance', color: '#7c3aed', bg: '#f5f3ff' },
              { label: 'Templates', href: '/dashboard/templates', icon: Layout, desc: 'Choose your resume template', color: '#2563eb', bg: '#eff6ff' },
              { label: 'Profile', href: '/dashboard/profile', icon: User, desc: 'View your profile overview', color: '#d97706', bg: '#fffbeb' },
              { label: 'Settings', href: '/dashboard/settings', icon: Settings, desc: 'Export, import, and manage data', color: '#374151', bg: '#f9fafb' },
            ].map(tool => (
              <Link key={tool.label} href={tool.href}
                className="bg-white rounded-xl border p-4 flex items-center gap-3 hover:shadow-md hover:border-gray-300 transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: tool.bg }}>
                  <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{tool.label}</p>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* My Resumes */}
        <div>
          <h2 className="text-lg font-semibold mb-4">My Resumes</h2>
          {resume ? (
            <div className="bg-white rounded-xl border p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{resume.personalInfo.fullName || 'Untitled Resume'}</p>
                  <p className="text-sm text-gray-500">{resume.personalInfo.title || 'No title'} · {resume.settings.template} template</p>
                </div>
              </div>
              <Link href="/builder/new"
                className="text-sm font-semibold text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Edit →
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl border p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-gray-500 mb-6 text-sm">Create your first professional resume with AI assistance.</p>
              <Link href="/builder/new"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all">
                <Plus className="w-4 h-4" /> Create Resume
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
