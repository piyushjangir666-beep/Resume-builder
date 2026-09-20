import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '1 Resume',
      'Basic Templates (3)',
      'Basic AI Writing',
      'PDF Export',
      'ATS Score Preview',
    ],
    cta: 'Get Started Free',
    href: '/dashboard',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'For serious job seekers',
    features: [
      'Unlimited Resumes',
      'All Premium Templates',
      'Advanced AI Writing',
      'Full ATS Scanner',
      'Job Description Matching',
      'Cover Letter Generator',
      'Resume Analytics',
      'Priority Support',
    ],
    cta: 'Start Pro Trial',
    href: '/dashboard',
    variant: 'gradient' as const,
    popular: true,
  },
  {
    name: 'Career',
    price: '$24',
    period: 'per month',
    description: 'For career professionals',
    features: [
      'Everything in Pro',
      'Advanced Job Matching',
      'Unlimited AI Requests',
      'LinkedIn Optimization',
      'Interview Prep AI',
      'Career Coaching Tips',
      'White-label Resume',
      'Dedicated Support',
    ],
    cta: 'Start Career Trial',
    href: '/dashboard',
    variant: 'outline' as const,
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium border border-green-200 dark:border-green-800 mb-4">
            Simple Pricing
          </div>
          <h2 className="text-4xl font-bold mb-4">Invest in Your Career</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl border p-8 ${plan.popular ? 'border-blue-500 shadow-xl shadow-blue-500/10 scale-105' : 'shadow-sm'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} size="lg" className="w-full" asChild>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
