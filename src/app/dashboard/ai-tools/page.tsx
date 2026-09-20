'use client';
import Link from 'next/link';
import { Sparkles, FileText, Target, Mail, BarChart3 } from 'lucide-react';

const tools = [
  {
    icon: Sparkles,
    title: 'AI Summary Writer',
    description: 'Generate a professional summary from your experience and skills.',
    href: '/builder/new',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: FileText,
    title: 'Cover Letter Generator',
    description: 'Create a tailored cover letter for any job in seconds.',
    href: '/dashboard/cover-letter',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    icon: Target,
    title: 'Job Match Analyzer',
    description: 'See how well your resume matches a job description.',
    href: '/dashboard/job-match',
    color: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: BarChart3,
    title: 'ATS Scanner',
    description: 'Check your resume against ATS systems and get improvement tips.',
    href: '/dashboard/ats-scanner',
    color: '#d97706',
    bg: '#fffbeb',
  },
  {
    icon: Mail,
    title: 'Experience Improver',
    description: 'Rewrite your job responsibilities with strong action verbs.',
    href: '/builder/new',
    color: '#dc2626',
    bg: '#fef2f2',
  },
];

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← AI Tools</Link>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-gray-500 text-sm mb-6">Supercharge your resume with AI-powered tools.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {tools.map(tool => (
            <Link key={tool.title} href={tool.href}
              className="bg-white rounded-xl border shadow-sm p-5 flex items-start gap-4 hover:shadow-md hover:border-gray-300 transition-all group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: tool.bg }}>
                <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
              </div>
              <div>
                <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
