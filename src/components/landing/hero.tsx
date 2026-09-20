'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: TrendingUp, label: 'ATS Score', value: '92%', color: 'text-green-500' },
  { icon: Target, label: 'Keyword Match', value: '87%', color: 'text-blue-500' },
  { icon: Zap, label: 'AI Suggestions', value: '12', color: 'text-violet-500' },
  { icon: CheckCircle2, label: 'Resume Strength', value: 'Excellent', color: 'text-emerald-500' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Builder
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Build a Resume That{' '}
              <span className="gradient-text">Gets You Hired.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Create an ATS-friendly, professional resume in minutes with AI-powered writing, optimization, and job matching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="xl" asChild>
                <Link href="/dashboard">
                  Create My Resume
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#templates">Explore Templates</a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              {['50K+ Resumes Created', '10K+ Users', '25+ Templates'].map(item => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Resume Preview Card */}
          <div className="relative lg:block animate-fade-in">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6 max-w-sm mx-auto">
              {/* Mock Resume Header */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
                  <div>
                    <div className="font-bold text-lg">Alex Johnson</div>
                    <div className="text-sm text-muted-foreground">Full Stack Developer</div>
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>alex@email.com</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Mock sections */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Experience</div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'].map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`absolute bg-white dark:bg-gray-800 rounded-xl shadow-lg border p-3 flex items-center gap-2 text-sm font-medium ${
                    i === 0 ? '-top-4 -right-4' :
                    i === 1 ? '-bottom-4 -left-4' :
                    i === 2 ? 'top-1/3 -right-8' :
                    'top-2/3 -left-8'
                  }`}
                >
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <div>
                    <div className={`font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
