import React from 'react';
import { Hero } from '../components/Hero';
import { HeroVisualization } from '../components/HeroVisualization';
import { HowItWorks } from '../components/HowItWorks';
import { CityComparison } from '../components/CityComparison';
import { UniversityComparison } from '../components/UniversityComparison';
import { ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'planner' | 'results') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-bg-light-warm">
      {/* Hero section */}
      <Hero 
        onCalculateClick={() => onNavigate('planner')} 
        onExploreClick={() => {
          document.getElementById('city-comparison')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hero visualization (mockup preview) */}
      <HeroVisualization />

      {/* Trust / Data Statement */}
      <section className="py-12 bg-bg-light-warm border-b border-border-subtle px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-surface-white border border-border-subtle shadow-sm">
          <div className="p-3 rounded-full bg-brand-teal-light/50 text-brand-teal shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-bold text-text-charcoal mb-1">Empirical Cost Modeling</h3>
            <p className="text-[15px] sm:text-base text-text-grey-medium leading-relaxed">
              Built to help students understand the real financial picture behind studying in Australia. All figures represent raw data extracted directly from official 2026 academic portals and verified consumer price index metrics.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* City Comparison */}
      <CityComparison />

      {/* University comparison */}
      <UniversityComparison />

      {/* Data & Methodology */}
      <section id="data-methodology" className="py-24 px-6 bg-surface-white border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-brand-teal uppercase tracking-widest block mb-2">Rigorous Sourcing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-charcoal">
              Data &amp; Methodology
            </h2>
            <p className="text-base sm:text-lg text-text-grey-medium mt-3 max-w-xl mx-auto leading-relaxed">
              GradScope operates on verified official databases and statistical local indices to calculate realistic study cost expectations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            
            {/* Card 1 */}
            <div className="bg-bg-light-warm border border-border-subtle p-6 rounded-2xl shadow-sm text-left">
              <h3 className="text-lg font-bold text-text-charcoal mb-3">Education Data</h3>
              <p className="text-[16px] text-text-grey-medium leading-[1.75]">
                University and course availability, course locations, CRICOS registration, course duration, international-student availability and tuition information were researched using official university sources and cross-checked against the Australian Government's Commonwealth Register of Institutions and Courses for Overseas Students (CRICOS) and Study Australia. CRICOS is the Australian Government's official register of institutions and courses available to students studying in Australia on student visas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-bg-light-warm border border-border-subtle p-6 rounded-2xl shadow-sm text-left">
              <h3 className="text-lg font-bold text-text-charcoal mb-3">Course &amp; Tuition Verification</h3>
              <p className="text-[16px] text-text-grey-medium leading-[1.75]">
                Course duration, campus, international availability, tuition fees and start dates were verified against university course pages and 2026 international fee information where available. Study Australia's Course Search provides course information including provider, location, fees, start dates and duration and was used as a secondary verification source.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-bg-light-warm border border-border-subtle p-6 rounded-2xl shadow-sm text-left">
              <h3 className="text-lg font-bold text-text-charcoal mb-3">Cost of Living Data</h3>
              <p className="text-[16px] text-text-grey-medium leading-[1.75]">
                City-level consumer prices, rent, groceries, transportation and utilities are based on Numbeo city-level data. Numbeo combines user-submitted price information with statistical validation and provides city-level consumer-price and rent data.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-bg-light-warm border border-border-subtle p-6 rounded-2xl shadow-sm text-left">
              <h3 className="text-lg font-bold text-text-charcoal mb-3">Cost Calculation</h3>
              <p className="text-[16px] text-text-grey-medium leading-[1.75]">
                GradScope combines the selected university's tuition information with the selected city's living-cost data. Living expenses are estimated using monthly city-level costs and projected across the selected study duration. Where an exact reliable 2026 tuition figure could not be established, tuition is excluded from the calculated total and clearly identified to the user rather than being treated as zero.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
