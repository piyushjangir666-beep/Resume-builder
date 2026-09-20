import Link from 'next/link';
import { Sparkles, GitBranch, X, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">ResumeAI</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Build a resume that gets you hired with AI-powered tools.
            </p>
            <div className="flex gap-3">
              {[GitBranch, X, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Product', links: ['Features', 'Templates', 'AI Tools', 'Pricing', 'Changelog'] },
            { title: 'Resources', links: ['Blog', 'Resume Tips', 'Career Guide', 'Help Center', 'API Docs'] },
            { title: 'Company', links: ['About', 'Privacy Policy', 'Terms of Service', 'Contact', 'Status'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 ResumeAI. All rights reserved.</p>
          <p>Built with ❤️ for job seekers worldwide</p>
        </div>
      </div>
    </footer>
  );
}
