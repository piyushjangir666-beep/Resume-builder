export interface AIRequest {
  type: 'summary' | 'experience' | 'improve' | 'job-match' | 'ats-score' | 'cover-letter' | 'skills';
  data: Record<string, unknown>;
}

export interface AIResponse {
  success: boolean;
  content?: string;
  suggestions?: string[];
  score?: number;
  error?: string;
}

export interface JobMatchResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  requiredSkills: string[];
  preferredSkills: string[];
}

export interface ATSResult {
  score: number;
  formatting: number;
  keywords: number;
  experience: number;
  skills: number;
  readability: number;
  suggestions: string[];
  strengths: string[];
}
