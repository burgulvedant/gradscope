import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onCalculateClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onCalculateClick }) => {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-bg-light-warm to-surface-white border-t border-border-subtle relative overflow-hidden flex flex-col items-center text-center">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand-teal/5 blur-[100px] rounded-full pointer-events-none" />

      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-charcoal mb-6">
        Your Master's is more than tuition.
      </h2>
      <p className="text-lg sm:text-xl text-text-grey-medium max-w-xl leading-relaxed mb-10">
        See the full financial picture — including local rent, utilities, and grocery baskets — before you choose where to study.
      </p>

      <button
        onClick={onCalculateClick}
        className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-surface-white text-sm font-semibold rounded-full hover:bg-brand-teal-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_14px_rgba(13,148,136,0.2)] cursor-pointer focus:outline-none"
      >
        <span>Calculate Cost</span>
        <ArrowRight className="w-4.5 h-4.5" />
      </button>
    </section>
  );
};
