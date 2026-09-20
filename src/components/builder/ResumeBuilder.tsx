'use client';
import { useState, useEffect, useCallback } from 'react';
import { Download, FileText, Check, Trash2, Loader2 } from 'lucide-react';
import { ResumeData, defaultResumeData } from '@/types/resume';
import ResumeForm from './ResumeForm';
import ResumePreview from '../resume/ResumePreview';
import ATSScore from './ATSScore';
import { downloadPDF } from '@/lib/pdf/download';

const STORAGE_KEY = 'resume_builder_data';

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeData>(defaultResumeData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saved, setSaved] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResume(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
    return () => clearTimeout(timer);
  }, [resume]);

  const updateResume = useCallback((updates: Partial<ResumeData>) => {
    setResume(prev => ({ ...prev, ...updates }));
  }, []);

  const handleClear = () => {
    setResume(defaultResumeData);
    localStorage.removeItem(STORAGE_KEY);
    setShowClearConfirm(false);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try { await downloadPDF(resume); } finally { setIsDownloading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f1f5f9' }}>

      {/* ── Header ── */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}
        className="sticky top-0 z-50">
        <div className="max-w-[1700px] mx-auto px-5 h-[58px] flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)' }}>
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-[15px] tracking-tight">ResumeBuilder</span>
              <span className="hidden sm:inline text-[11px] text-gray-400 ml-2 font-medium">PRO</span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Auto-save badge */}
            <div className={`hidden sm:flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full transition-all duration-300 ${
              saved ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <Check className="w-3 h-3" />
              {saved ? 'Saved' : 'Auto-save on'}
            </div>

            {/* Mobile tab toggle */}
            <button onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
              className="lg:hidden text-[13px] font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              {activeTab === 'edit' ? 'Preview →' : '← Edit'}
            </button>

            {/* Clear */}
            <button onClick={() => setShowClearConfirm(true)}
              className="hidden sm:flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>

            {/* Download */}
            <button onClick={handleDownload} disabled={isDownloading}
              className="flex items-center gap-2 text-[13px] font-semibold text-white px-4 py-2 rounded-lg transition-all disabled:opacity-60 shadow-sm hover:shadow-md active:scale-95"
              style={{ background: isDownloading ? '#6b7280' : 'linear-gradient(135deg,#2563eb,#4f46e5)' }}>
              {isDownloading
                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...</>
                : <><Download className="w-3.5 h-3.5" /> Download PDF</>}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Tabs ── */}
      <div className="lg:hidden flex border-b" style={{ background: '#fff', borderColor: '#e2e8f0' }}>
        {(['edit', 'preview'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[13px] font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}>
            {tab === 'edit' ? '✏️  Edit Resume' : '👁  Preview'}
          </button>
        ))}
      </div>

      {/* ── Main Layout ── */}
      <div className="flex-1 max-w-[1700px] mx-auto w-full flex" style={{ height: 'calc(100vh - 58px)' }}>

        {/* Left Panel — Form */}
        <div className={`w-full lg:w-[40%] flex flex-col overflow-hidden ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}
          style={{ borderRight: '1px solid #e2e8f0' }}>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <ResumeForm resume={resume} onChange={updateResume} />
            <ATSScore resume={resume} />
            <div className="h-6" />
          </div>
        </div>

        {/* Right Panel — Preview */}
        <div className={`w-full lg:w-[60%] flex flex-col overflow-hidden ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}
          style={{ background: '#e8edf5' }}>
          <ResumePreview resume={resume} onChange={updateResume} />
        </div>
      </div>

      {/* ── Clear Confirm Modal ── */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-center text-[16px] mb-1">Clear All Data?</h3>
            <p className="text-[13px] text-gray-500 text-center mb-6">
              All resume information will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowClearConfirm(false)}
                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-[13px] font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleClear}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-[13px] font-semibold transition-colors">
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
