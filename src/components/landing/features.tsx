import { Brain, Target, BarChart3, Briefcase, Lightbulb, Layout, Download, FileText } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Resume Writer',
    description: 'Generate professional resume content using AI. Get tailored summaries, bullet points, and descriptions.',
    color: 'bg-blue-50 dark:bg-blue-950 text-blue-600',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    description: 'Analyze your resume for ATS compatibility and get actionable suggestions to pass automated screening.',
    color: 'bg-green-50 dark:bg-green-950 text-green-600',
  },
  {
    icon: BarChart3,
    title: 'Resume Score',
    description: 'Get a comprehensive resume score from 0–100 with detailed breakdown across key categories.',
    color: 'bg-violet-50 dark:bg-violet-950 text-violet-600',
  },
  {
    icon: Briefcase,
    title: 'Job Matching',
    description: 'Compare your resume against any job description and see exactly how well you match.',
    color: 'bg-orange-50 dark:bg-orange-950 text-orange-600',
  },
  {
    icon: Lightbulb,
    title: 'Smart Suggestions',
    description: 'AI automatically suggests improvements to make your resume more impactful and professional.',
    color: 'bg-yellow-50 dark:bg-yellow-950 text-yellow-600',
  },
  {
    icon: Layout,
    title: 'Professional Templates',
    description: 'Choose from 8+ professionally designed templates for every industry and career level.',
    color: 'bg-pink-50 dark:bg-pink-950 text-pink-600',
  },
  {
    icon: Download,
    title: 'One-Click PDF',
    description: 'Download a polished, print-ready PDF resume with perfect formatting and typography.',
    color: 'bg-teal-50 dark:bg-teal-950 text-teal-600',
  },
  {
    icon: FileText,
    title: 'Cover Letter AI',
    description: 'Generate customized cover letters tailored to specific job descriptions and companies.',
    color: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800 mb-4">
            Everything You Need
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features to Land Your Dream Job
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From AI writing to ATS optimization, ResumeAI gives you every tool to create a resume that stands out.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
