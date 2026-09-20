'use client';
import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface Props {
  settings: ResumeData['settings'];
  onChange: (settings: Partial<ResumeData['settings']>) => void;
}

const fonts = ['Inter', 'Roboto', 'Lato', 'Open Sans'];
const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2', '#374151'];
const fontSizes = ['small', 'medium', 'large'] as const;
const spacings = ['compact', 'normal', 'comfortable'] as const;

export default function CustomizationPanel({ settings, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Settings2 className="w-3.5 h-3.5" /> Customize
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-20 bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-64 space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Font</p>
              <div className="grid grid-cols-2 gap-1.5">
                {fonts.map(f => (
                  <button key={f} onClick={() => onChange({ font: f })}
                    className={`text-xs py-1.5 px-2 rounded-lg border transition-all ${
                      settings.font === f ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                    }`} style={{ fontFamily: f }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Font Size</p>
              <div className="flex gap-1.5">
                {fontSizes.map(s => (
                  <button key={s} onClick={() => onChange({ fontSize: s })}
                    className={`flex-1 text-xs py-1.5 rounded-lg border capitalize transition-all ${
                      settings.fontSize === s ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Accent Color</p>
              <div className="flex gap-2 flex-wrap">
                {colors.map(c => (
                  <button key={c} onClick={() => onChange({ accentColor: c })}
                    className={`w-6 h-6 rounded-full transition-all ${settings.accentColor === c ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : 'hover:scale-110'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Spacing</p>
              <div className="flex gap-1.5">
                {spacings.map(s => (
                  <button key={s} onClick={() => onChange({ spacing: s })}
                    className={`flex-1 text-xs py-1.5 rounded-lg border capitalize transition-all ${
                      settings.spacing === s ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
