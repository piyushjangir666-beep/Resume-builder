import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatDate(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function calculateProfileCompletion(resume: {
  personalInfo?: { fullName?: string; email?: string; phone?: string; location?: string };
  summary?: string;
  experience?: unknown[];
  education?: unknown[];
  skills?: unknown[];
  projects?: unknown[];
  certifications?: unknown[];
}): number {
  const checks = [
    !!(resume.personalInfo?.fullName),
    !!(resume.personalInfo?.email),
    !!(resume.personalInfo?.phone),
    !!(resume.personalInfo?.location),
    !!(resume.summary),
    !!(resume.experience?.length),
    !!(resume.education?.length),
    !!(resume.skills?.length),
    !!(resume.projects?.length),
    !!(resume.certifications?.length),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
