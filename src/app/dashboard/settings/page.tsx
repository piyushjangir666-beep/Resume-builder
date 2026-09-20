'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Settings, Trash2, Download, Moon, Sun } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { downloadPDF } from '@/lib/pdf/download';

const STORAGE_KEY = 'resume_builder_data';

export default function SettingsPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResume(JSON.parse(stored));
    } catch {}
  }, []);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setResume(null);
    setConfirmClear(false);
    setCleared(true);
  };

  const exportJSON = () => {
    if (!resume) return;
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.personalInfo.fullName || 'resume'}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setResume(data);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <Link href="/dashboard" className="font-bold text-xl text-gray-900">← Settings</Link>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-10 space-y-4">

        {/* Data Management */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-4 h-4 text-gray-600" />
            <h2 className="font-bold text-gray-900">Data Management</h2>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800 text-sm">Export Resume Data</p>
              <p className="text-xs text-gray-500">Download your resume as a JSON backup</p>
            </div>
            <button onClick={exportJSON} disabled={!resume}
              className="flex items-center gap-1.5 text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 disabled:opacity-40 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800 text-sm">Import Resume Data</p>
              <p className="text-xs text-gray-500">Restore from a JSON backup file</p>
            </div>
            <label className="flex items-center gap-1.5 text-sm text-green-600 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
              <Download className="w-3.5 h-3.5 rotate-180" /> Import
              <input type="file" accept=".json" onChange={importJSON} className="hidden" />
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800 text-sm">Download PDF</p>
              <p className="text-xs text-gray-500">Download your resume as PDF</p>
            </div>
            <button onClick={() => resume && downloadPDF(resume)} disabled={!resume}
              className="flex items-center gap-1.5 text-sm text-violet-600 border border-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-50 disabled:opacity-40 transition-colors">
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-red-600 text-sm">Clear All Data</p>
              <p className="text-xs text-gray-500">Permanently delete your resume data</p>
            </div>
            {!confirmClear ? (
              <button onClick={() => setConfirmClear(true)} disabled={!resume}
                className="flex items-center gap-1.5 text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-40 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setConfirmClear(false)}
                  className="text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleClear}
                  className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors">
                  Confirm Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {cleared && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
            ✓ All data cleared. <Link href="/builder/new" className="font-semibold underline">Start fresh</Link>.
          </div>
        )}

        {/* About */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-3">About</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>ResumeBuilder Pro — Build ATS-friendly resumes with live preview.</p>
            <p className="text-xs text-gray-400">Data is stored locally in your browser. No account required.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
