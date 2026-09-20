'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FileText, Plus, Trash2, Edit3, Download } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { downloadPDF } from '@/lib/pdf/download';

const STORAGE_KEY = 'resume_builder_data';

export default function ResumesPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResume(JSON.parse(stored));
    } catch {}
  }, []);

  const handleDelete = () => {
    localStorage.removeItem(STORAGE_KEY);
    setResume(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← My Resumes</Link>
        <Link href="/builder/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> New Resume
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {resume ? (
          <div className="bg-white rounded-xl border shadow-sm p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{resume.personalInfo.fullName || 'Untitled Resume'}</p>
                <p className="text-sm text-gray-500">{resume.personalInfo.title || 'No title'} · {resume.settings.template} template</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => downloadPDF(resume)}
                className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <Link href="/builder/new"
                className="flex items-center gap-1.5 text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </Link>
              <button onClick={handleDelete}
                className="flex items-center gap-1.5 text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
            <p className="text-gray-500 mb-6 text-sm">Create your first professional resume.</p>
            <Link href="/builder/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Create Resume
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
