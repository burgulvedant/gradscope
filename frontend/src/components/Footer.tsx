import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-white border-t border-border-subtle py-16 px-6 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand block */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-bg-light-warm border border-brand-teal/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-text-charcoal">
                GradScope
              </span>
            </div>
            <p className="text-[15px] text-text-grey-medium max-w-sm leading-relaxed">
              Empowering international students with structural financial insights to choose the right Master's degree in Australia.
            </p>
          </div>

          {/* Methodology Block */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-teal">
              Methodology & Data Disclaimers
            </h4>
            <ul className="text-[14.5px] text-text-grey-medium space-y-2.5 leading-[1.65] max-w-lg list-disc pl-4">
              <li>Tuition figures are based on verified 2026 international student fees.</li>
              <li>Living costs are monthly estimates compiled from capital city datasets (including rent, groceries, transit, and utilities).</li>
              <li>Actual individual spending will vary depending on personal lifestyle choices, housing arrangements, and general cost-of-living adjustments.</li>
              <li>University tuition fees are subject to indexation and can change without notice.</li>
              <li>The calculated total Master's cost represents an illustrative estimation rather than a binding financial offer.</li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-text-grey-medium">
            &copy; {new Date().getFullYear()} GradScope Australia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm sm:text-base text-text-grey-medium">
              Built by Vedant Burgul
            </span>
            <span className="text-sm sm:text-base text-text-grey-medium">
              2026 Dataset
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
