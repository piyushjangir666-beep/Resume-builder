'use client';
import { useRef } from 'react';
import { ResumeData } from '@/types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import ATSTemplate from './templates/ATSTemplate';
import TemplateSelector from './TemplateSelector';
import CustomizationPanel from './CustomizationPanel';

interface Props {
  resume: ResumeData;
  onChange: (updates: Partial<ResumeData>) => void;
}

export default function ResumePreview({ resume, onChange }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);

  const updateSettings = (settings: Partial<ResumeData['settings']>) =>
    onChange({ settings: { ...resume.settings, ...settings } });

  const fontSizeMap = { small: '10pt', medium: '11pt', large: '12pt' };
  const spacingMap = { compact: '1.3', normal: '1.5', comfortable: '1.7' };

  const templateProps = {
    resume,
    style: {
      fontFamily: resume.settings.font,
      fontSize: fontSizeMap[resume.settings.fontSize],
      lineHeight: spacingMap[resume.settings.spacing],
      color: '#1a1a1a',
    },
    accentColor: resume.settings.accentColor,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex flex-wrap items-center gap-3">
        <TemplateSelector
          value={resume.settings.template}
          onChange={t => updateSettings({ template: t })}
        />
        <div className="ml-auto">
          <CustomizationPanel settings={resume.settings} onChange={updateSettings} />
        </div>
      </div>

      {/* A4 Preview */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div
          id="resume-preview"
          ref={previewRef}
          style={{
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: '#ffffff',
            fontFamily: resume.settings.font,
            boxShadow: '0 4px 32px rgba(0,0,0,0.13)',
          }}
        >
          {resume.settings.template === 'modern' && <ModernTemplate {...templateProps} />}
          {resume.settings.template === 'classic' && <ClassicTemplate {...templateProps} />}
          {resume.settings.template === 'ats' && <ATSTemplate {...templateProps} />}
        </div>
      </div>
    </div>
  );
}
