import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

interface HeroProps {
  onCalculateClick: () => void;
  onExploreClick: () => void;
}

const WORDS = [
  { phrase: "THE REAL COST", color: "text-brand-teal" },
  { phrase: "THE TOTAL COST", color: "text-brand-teal" },
  { phrase: "THE TRUE COST", color: "text-brand-teal" },
  { phrase: "THE FULL COST", color: "text-brand-teal" }
];

export const Hero: React.FC<HeroProps> = ({ onCalculateClick, onExploreClick }) => {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="relative pt-28 pb-16 px-6 overflow-hidden flex flex-col items-center text-center">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Trust Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" as any }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/10 bg-brand-teal-light/20 text-brand-teal-dark text-xs font-semibold uppercase tracking-widest mb-8"
      >
        <span>Data-driven decision support</span>
      </motion.div>

      {/* Heading */}
      <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mb-6 text-text-charcoal select-none">
        <span className="inline-flex items-baseline justify-center gap-[0.2em] flex-wrap">
          <span>KNOW</span>
          <span className="inline-flex items-baseline h-[1.2em] min-w-[240px] sm:min-w-[450px] text-left overflow-hidden relative">
            {shouldReduceMotion ? (
              <span className="text-brand-teal">THE REAL COST</span>
            ) : (
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                  className={`relative left-0 inline-block font-sans ${WORDS[index].color}`}
                >
                  {WORDS[index].phrase}
                </motion.span>
              </AnimatePresence>
            )}
          </span>
        </span>
        <br />
        BEFORE YOU CHOOSE
        <br />
        YOUR MASTER'S.
      </h1>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as any }}
        className="text-lg sm:text-xl text-text-grey-medium max-w-2xl leading-relaxed mb-10"
      >
        Compare Australian cities, universities and Master's courses — and understand the real financial picture before you make your decision.
      </motion.p>

      {/* Call to Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as any }}
        className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full sm:w-auto"
      >
        <button
          onClick={onCalculateClick}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-surface-white text-sm font-semibold rounded-full hover:bg-brand-teal-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_14px_rgba(13,148,136,0.2)] cursor-pointer focus:outline-none"
        >
          <span>Calculate Cost</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={onExploreClick}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-border-subtle bg-surface-white text-text-charcoal text-sm font-semibold rounded-full hover:bg-surface-light-grey hover:border-brand-teal/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none shadow-sm"
        >
          <Compass className="w-4.5 h-4.5 text-text-grey-medium" />
          <span>Explore Cities</span>
        </button>
      </motion.div>
    </div>
  );
};
