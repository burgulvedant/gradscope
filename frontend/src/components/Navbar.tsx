import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'landing' | 'planner' | 'results') => void;
  currentPage: 'landing' | 'planner' | 'results';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-surface-white/90 backdrop-blur-md border-b border-border-subtle shadow-sm'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-lg bg-surface-white border border-brand-teal/20 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-brand-teal shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="w-4 h-4 text-brand-teal transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-text-charcoal transition-colors duration-300 group-hover:text-brand-teal-dark">
            GradScope
          </span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[15px] font-medium text-text-grey-medium hover:text-brand-teal transition-colors cursor-pointer focus:outline-none"
          >
            How it works
          </button>
          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                document.getElementById('city-comparison')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[15px] font-medium text-text-grey-medium hover:text-brand-teal transition-colors cursor-pointer focus:outline-none"
          >
            Explore
          </button>
          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                document.getElementById('university-comparison')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[15px] font-medium text-text-grey-medium hover:text-brand-teal transition-colors cursor-pointer focus:outline-none"
          >
            Compare
          </button>
        </div>

        {/* CTA */}
        <div>
          <button
            onClick={() => onNavigate('planner')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none ${
              currentPage === 'planner'
                ? 'bg-transparent border border-brand-teal text-brand-teal hover:bg-brand-teal/5'
                : 'bg-brand-teal text-surface-white hover:bg-brand-teal-dark hover:shadow-[0_4px_12px_rgba(13,148,136,0.2)]'
            }`}
          >
            Calculate Cost
          </button>
        </div>
      </div>
    </nav>
  );
};
