import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, GraduationCap, BookOpen, Calculator } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <section id="how-it-works" className="py-24 px-6 relative bg-bg-light-warm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-brand-teal uppercase tracking-widest block mb-2">Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-charcoal">
            How GradScope Guides You
          </h2>
          <p className="text-base text-text-grey-medium mt-3 max-w-lg mx-auto leading-relaxed">
            A simple, guided financial analysis workflow in three structural steps.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          {/* Step 1 */}
          <motion.div variants={itemVariants} className="bg-surface-white border border-border-subtle p-8 rounded-xl relative group shadow-sm">
            <span className="absolute top-4 right-6 text-5xl font-extrabold text-surface-light-grey font-mono select-none group-hover:text-brand-teal/5 transition-colors">01</span>
            <div className="w-12 h-12 rounded-lg bg-bg-light-warm border border-brand-teal/10 flex items-center justify-center text-brand-teal mb-6 group-hover:border-brand-teal transition-colors shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-text-charcoal mb-2">Choose your city</h3>
            <p className="text-base text-text-grey-medium leading-relaxed">
              Select your target Australian city. Costs of groceries, rent, utilities, and transit are loaded dynamically.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={itemVariants} className="bg-surface-white border border-border-subtle p-8 rounded-xl relative group shadow-sm">
            <span className="absolute top-4 right-6 text-5xl font-extrabold text-surface-light-grey font-mono select-none group-hover:text-brand-teal/5 transition-colors">02</span>
            <div className="w-12 h-12 rounded-lg bg-bg-light-warm border border-brand-teal/10 flex items-center justify-center text-brand-teal mb-6 group-hover:border-brand-teal transition-colors shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-text-charcoal mb-2">Choose your university</h3>
            <p className="text-base text-text-grey-medium leading-relaxed">
              Pick your university. Selection is automatically filtered based on institutions operating in your chosen city.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={itemVariants} className="bg-surface-white border border-border-subtle p-8 rounded-xl relative group shadow-sm">
            <span className="absolute top-4 right-6 text-5xl font-extrabold text-surface-light-grey font-mono select-none group-hover:text-brand-teal/5 transition-colors">03</span>
            <div className="w-12 h-12 rounded-lg bg-bg-light-warm border border-brand-teal/10 flex items-center justify-center text-brand-teal mb-6 group-hover:border-brand-teal transition-colors shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-text-charcoal mb-2">Choose your course</h3>
            <p className="text-base text-text-grey-medium leading-relaxed">
              Select the exact Master's course. GradScope compiles the specific 2026 indicative tuition fee.
            </p>
          </motion.div>
        </motion.div>

        {/* Conclusion / Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-surface-white border border-border-subtle text-text-charcoal shadow-sm">
            <div className="w-6 h-6 rounded-full bg-brand-teal-light/50 flex items-center justify-center text-brand-teal">
              <Calculator className="w-3.5 h-3.5" />
            </div>
            <span className="text-[15px] font-medium">Receive a comprehensive Master's cost index immediately.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
