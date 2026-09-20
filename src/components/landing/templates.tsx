import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const templates = [
  {
    id: 'modern',
    name: 'Modern Pro',
    category: 'Modern',
    ats: 95,
    color: '#2563eb',
    accent: 'bg-blue-600',
    description: 'Clean two-tone design with sidebar',
    popular: true,
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    category: 'Minimal',
    ats: 98,
    color: '#1a1a1a',
    accent: 'bg-gray-900',
    description: 'Ultra-clean single column layout',
    popular: false,
  },
  {
    id: 'professional',
    name: 'Executive',
    category: 'Professional',
    ats: 96,
    color: '#0f4c81',
    accent: 'bg-blue-900',
    description: 'Traditional professional format',
    popular: false,
  },
  {
    id: 'creative',
    name: 'Creative Edge',
    category: 'Creative',
    ats: 82,
    color: '#7c3aed',
    accent: 'bg-violet-600',
    description: 'Bold design for creative roles',
    popular: false,
  },
  {
    id: 'developer',
    name: 'Dev Portfolio',
    category: 'Developer',
    ats: 94,
    color: '#059669',
    accent: 'bg-emerald-600',
    description: 'Tech-focused with skills matrix',
    popular: true,
  },
  {
    id: 'student',
    name: 'Fresh Start',
    category: 'Student',
    ats: 97,
    color: '#0891b2',
    accent: 'bg-cyan-600',
    description: 'Perfect for new graduates',
    popular: false,
  },
  {
    id: 'ats',
    name: 'ATS Master',
    category: 'ATS Friendly',
    ats: 100,
    color: '#16a34a',
    accent: 'bg-green-600',
    description: 'Maximum ATS compatibility',
    popular: false,
  },
  {
    id: 'designer',
    name: 'Design Studio',
    category: 'Designer',
    ats: 85,
    color: '#db2777',
    accent: 'bg-pink-600',
    description: 'Visual-first for designers',
    popular: false,
  },
];

function TemplateMockup({ template }: { template: typeof templates[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-inner overflow-hidden h-48 relative">
      {/* Header bar */}
      <div className={`${template.accent} h-12 flex items-center px-3`}>
        <div className="space-y-1">
          <div className="h-2 bg-white/80 rounded w-20" />
          <div className="h-1.5 bg-white/50 rounded w-14" />
        </div>
      </div>
      {/* Content lines */}
      <div className="p-3 space-y-2">
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-4/5" />
        <div className="h-1.5 bg-gray-200 rounded w-3/4" />
        <div className="mt-3 h-1.5 rounded w-16" style={{ backgroundColor: template.color }} />
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-5/6" />
        <div className="flex gap-1 mt-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-4 rounded px-2 text-[6px] flex items-center text-white" style={{ backgroundColor: template.color }}>
              skill
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TemplatesSection() {
  return (
    <section id="templates" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full text-sm font-medium border border-violet-200 dark:border-violet-800 mb-4">
            Template Gallery
          </div>
          <h2 className="text-4xl font-bold mb-4">Professional Templates for Every Career</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from 8+ professionally designed templates. Each one is unique, modern, and optimized for ATS.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="group bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="p-3 bg-muted/30">
                <TemplateMockup template={template} />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold">{template.name}</h3>
                  {template.popular && <Badge variant="info" className="text-xs">Popular</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">{template.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle2 className="w-3 h-3" />
                    ATS {template.ats}%
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors" asChild>
                  <Link href="/dashboard">Use Template</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/dashboard">Browse All Templates</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
