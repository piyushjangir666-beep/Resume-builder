'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, User, FileText, GraduationCap, Briefcase, Code2, FolderGit2, Award, Trophy } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import AchievementsForm from './forms/AchievementsForm';

interface Props {
  resume: ResumeData;
  onChange: (updates: Partial<ResumeData>) => void;
}

const sections = [
  { id: 'personal',        label: 'Personal Information',   icon: User,        color: '#2563eb' },
  { id: 'summary',         label: 'Professional Summary',   icon: FileText,    color: '#7c3aed' },
  { id: 'experience',      label: 'Experience',             icon: Briefcase,   color: '#0891b2' },
  { id: 'education',       label: 'Education',              icon: GraduationCap, color: '#059669' },
  { id: 'skills',          label: 'Skills',                 icon: Code2,       color: '#d97706' },
  { id: 'projects',        label: 'Projects',               icon: FolderGit2,  color: '#dc2626' },
  { id: 'certifications',  label: 'Certifications',         icon: Award,       color: '#7c3aed' },
  { id: 'achievements',    label: 'Achievements',           icon: Trophy,      color: '#059669' },
];

export default function ResumeForm({ resume, onChange }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({ personal: true });

  const toggle = (id: string) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  const renderSection = (id: string) => {
    switch (id) {
      case 'personal':       return <PersonalInfoForm data={resume.personalInfo} onChange={v => onChange({ personalInfo: v })} />;
      case 'summary':        return <SummaryForm value={resume.summary} resume={resume} onChange={v => onChange({ summary: v })} />;
      case 'education':      return <EducationForm items={resume.education} onChange={v => onChange({ education: v })} />;
      case 'experience':     return <ExperienceForm items={resume.experience} onChange={v => onChange({ experience: v })} />;
      case 'skills':         return <SkillsForm skills={resume.skills} onChange={v => onChange({ skills: v })} />;
      case 'projects':       return <ProjectsForm items={resume.projects} onChange={v => onChange({ projects: v })} />;
      case 'certifications': return <CertificationsForm items={resume.certifications} onChange={v => onChange({ certifications: v })} />;
      case 'achievements':   return <AchievementsForm items={resume.achievements} onChange={v => onChange({ achievements: v })} />;
    }
  };

  const getCount = (id: string): number => {
    switch (id) {
      case 'experience':     return resume.experience.length;
      case 'education':      return resume.education.length;
      case 'skills':         return resume.skills.length;
      case 'projects':       return resume.projects.length;
      case 'certifications': return resume.certifications.length;
      case 'achievements':   return resume.achievements.length;
      default: return 0;
    }
  };

  return (
    <div className="space-y-2">
      {sections.map(({ id, label, icon: Icon, color }) => {
        const count = getCount(id);
        const isOpen = open[id];
        return (
          <div key={id}
            className="rounded-xl overflow-hidden transition-shadow"
            style={{
              background: '#fff',
              border: isOpen ? `1px solid ${color}30` : '1px solid #e2e8f0',
              boxShadow: isOpen ? `0 0 0 3px ${color}08` : '0 1px 3px rgba(0,0,0,0.04)',
            }}>
            <button onClick={() => toggle(id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50/80">
              {/* Icon bubble */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15` }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
              </div>

              <span className="flex-1 font-semibold text-gray-800 text-[13px]">{label}</span>

              {count > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${color}15`, color }}>
                  {count}
                </span>
              )}

              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: isOpen ? `${color}15` : '#f1f5f9' }}>
                {isOpen
                  ? <ChevronUp className="w-3 h-3" style={{ color }} />
                  : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-5 border-t" style={{ borderColor: `${color}20` }}
                   key={`content-${id}`}>
                {renderSection(id)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
