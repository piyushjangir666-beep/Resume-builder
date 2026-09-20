import { ResumeData } from '@/types/resume';

type ImproveType = 'summary' | 'experience' | 'project';

// Client-side AI improvement using rule-based enhancement
// In production, replace with actual AI API call
export async function improveText(
  text: string,
  type: ImproveType,
  resume?: ResumeData,
  context?: string
): Promise<string> {
  // Simulate async operation
  await new Promise(r => setTimeout(r, 1200));

  if (type === 'summary') {
    return improveSummary(text, resume);
  } else if (type === 'experience') {
    return improveExperience(text, context);
  } else {
    return improveProject(text, context);
  }
}

function improveSummary(text: string, resume?: ResumeData): string {
  const title = resume?.personalInfo?.title || 'professional';
  const skillsStr = resume?.skills?.slice(0, 4).join(', ') || '';
  const expCount = resume?.experience?.length || 0;

  // Enhance the existing text without fabricating information
  let improved = text.trim();

  // Ensure it starts with a strong opener
  if (!improved.match(/^(results-driven|experienced|passionate|dedicated|skilled|dynamic|motivated)/i)) {
    improved = `Results-driven ${title} with ${improved.charAt(0).toLowerCase()}${improved.slice(1)}`;
  }

  // Add skills mention if not present and skills exist
  if (skillsStr && !improved.toLowerCase().includes(skillsStr.split(',')[0].toLowerCase())) {
    improved += ` Proficient in ${skillsStr}.`;
  }

  // Ensure it ends with value proposition
  if (!improved.includes('deliver') && !improved.includes('contribute') && !improved.includes('drive')) {
    improved += ' Committed to delivering high-quality solutions and driving business value.';
  }

  return improved;
}

function improveExperience(text: string, jobTitle?: string): string {
  const lines = text.split('\n').filter(Boolean);

  const actionVerbs = ['Developed', 'Implemented', 'Designed', 'Built', 'Led', 'Managed',
    'Optimized', 'Delivered', 'Collaborated', 'Architected', 'Enhanced', 'Streamlined'];

  const improved = lines.map((line, i) => {
    const trimmed = line.trim().replace(/^[-•*]\s*/, '');
    // Check if line already starts with action verb
    const startsWithVerb = actionVerbs.some(v => trimmed.toLowerCase().startsWith(v.toLowerCase()));
    if (!startsWithVerb && trimmed.length > 0) {
      const verb = actionVerbs[i % actionVerbs.length];
      return `${verb} ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
    }
    return trimmed;
  });

  return improved.join('\n');
}

function improveProject(text: string, projectName?: string): string {
  let improved = text.trim();

  // Ensure description is professional
  if (improved.length < 50) {
    improved += ' This project demonstrates proficiency in modern development practices and problem-solving skills.';
  }

  // Add impact statement if missing
  if (!improved.toLowerCase().includes('result') && !improved.toLowerCase().includes('impact') &&
    !improved.toLowerCase().includes('improv') && !improved.toLowerCase().includes('reduc')) {
    improved += ' Focused on delivering a seamless user experience with clean, maintainable code.';
  }

  return improved;
}
