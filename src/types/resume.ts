export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  responsibilities: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface ResumeSettings {
  template: 'modern' | 'classic' | 'ats';
  font: string;
  fontSize: 'small' | 'medium' | 'large';
  accentColor: string;
  spacing: 'compact' | 'normal' | 'comfortable';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  settings: ResumeSettings;
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  settings: {
    template: 'modern',
    font: 'Inter',
    fontSize: 'medium',
    accentColor: '#2563eb',
    spacing: 'normal',
  },
};
