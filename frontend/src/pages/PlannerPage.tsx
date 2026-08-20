import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getCourseComparison, getCourses } from '../services/apiService';
import { MapPin, GraduationCap, Book, ArrowRight, CheckCircle2, RotateCcw, AlertCircle, Coins } from 'lucide-react';

interface PlannerPageProps {
  onCalculate: (city: string, university: string, course: string, scholarship: number) => void;
  onBackToHome: () => void;
}

export const PlannerPage: React.FC<PlannerPageProps> = ({ onCalculate, onBackToHome }) => {
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  
  const [universities, setUniversities] = useState<string[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [scholarship, setScholarship] = useState<number>(0);
  const [scholarshipInteracted, setScholarshipInteracted] = useState<boolean>(false);

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const calculateRef = useRef<HTMLDivElement>(null);

  // Scroll to Step 2 when course is selected
  useEffect(() => {
    if (selectedCourse) {
      const timer = setTimeout(() => {
        step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedCourse]);

  // Scroll to Step 3 when city is selected
  useEffect(() => {
    if (selectedCity) {
      const timer = setTimeout(() => {
        step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedCity]);

  // Scroll to Step 4 when university is selected
  useEffect(() => {
    if (selectedUniversity) {
      const timer = setTimeout(() => {
        step4Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedUniversity]);

  // Scroll to Calculate button when scholarship changes after user interaction
  useEffect(() => {
    if (scholarshipInteracted) {
      const timer = setTimeout(() => {
        calculateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scholarship, scholarshipInteracted]);

// Load available courses from the backend database
useEffect(() => {
  const loadCourses = async () => {
    try {
      const courses = await getCourses();
      setAvailableCourses(courses);
    } catch (error) {
      console.error('Failed to load courses:', error);
      setAvailableCourses([]);
    }
  };

  loadCourses();
}, []);

// Load cities from the backend when course changes
useEffect(() => {
  if (!selectedCourse) return;

  const loadCities = async () => {
    try {
      const records = await getCourseComparison(selectedCourse);

      const uniqueCities = Array.from(
        new Set(records.map(record => record.city))
      ).sort();

      setCities(uniqueCities);
      setSelectedCity('');
      setSelectedUniversity('');
      setUniversities([]);

      if (uniqueCities.length > 0) {
        setActiveStep(2);
      }
    } catch (error) {
      console.error('Failed to load cities:', error);
      setCities([]);
      setUniversities([]);
    }
  };

  loadCities();
}, [selectedCourse]);

// Load universities from the backend when city and course are selected
useEffect(() => {
  if (!selectedCity || !selectedCourse) return;

  const loadUniversities = async () => {
    try {
      const records = await getCourseComparison(selectedCourse);

      const uniqueUniversities = Array.from(
        new Set(
          records
            .filter(record => record.city === selectedCity)
            .map(record => record.university)
        )
      ).sort();

      setUniversities(uniqueUniversities);
      setSelectedUniversity('');

      if (uniqueUniversities.length > 0) {
        setActiveStep(3);
      }
    } catch (error) {
      console.error('Failed to load universities:', error);
      setUniversities([]);
    }
  };

  loadUniversities();
}, [selectedCity, selectedCourse]);

  const handleReset = () => {
    setSelectedCourse('');
    setSelectedCity('');
    setSelectedUniversity('');
    setCities([]);
    setUniversities([]);
    setScholarship(0);
    setScholarshipInteracted(false);
    setActiveStep(1);
  };

  const handleCalculate = () => {
    if (selectedCity && selectedUniversity && selectedCourse) {
      onCalculate(selectedCity, selectedUniversity, selectedCourse, scholarship);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-bg-light-warm flex items-center justify-center relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Side: Instructions / Progress */}
        <div className="lg:col-span-4 flex flex-col items-start gap-6 text-left">
          <button
            onClick={onBackToHome}
            className="text-[13px] font-bold uppercase tracking-wider text-brand-teal hover:text-brand-teal-dark flex items-center gap-1.5 cursor-pointer focus:outline-none"
          >
            &larr; Back to Landing Page
          </button>
          
          <div>
            <span className="text-[13px] font-bold text-brand-teal uppercase tracking-widest block">Step Guide</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-text-charcoal mt-1 mb-3">
              Configure Your Study Plan
            </h1>
            <p className="text-base sm:text-lg text-text-grey-medium leading-relaxed">
              Use this wizard to select your destination, university, and desired degree. We will retrieve the exact cost baseline.
            </p>
          </div>

          {/* Stepper Indicators */}
          <div className="space-y-4 w-full mt-6">
            {/* Step 1 Indicator */}
            <div className={`flex items-center gap-4 p-3.5 rounded-lg border transition-all ${
              activeStep === 1 
                ? 'bg-surface-white border-brand-teal/30 text-text-charcoal shadow-sm' 
                : selectedCourse 
                  ? 'bg-surface-white/60 border-border-subtle/80 text-text-grey-medium' 
                  : 'bg-transparent border-transparent text-text-grey-medium'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[13px] font-bold transition-all ${
                selectedCourse ? 'bg-brand-teal text-surface-white shadow-sm' : 'bg-surface-white border border-border-subtle text-text-grey-medium'
              }`}>
                {selectedCourse ? <CheckCircle2 className="w-5 h-5" /> : '01'}
              </div>
              <div className="text-sm">
                <span className="font-bold block text-text-charcoal">Academic Degree</span>
                <span className="text-xs text-text-grey-medium">{selectedCourse || 'Awaiting selection'}</span>
              </div>
            </div>

            {/* Step 2 Indicator */}
            <div className={`flex items-center gap-4 p-3.5 rounded-lg border transition-all ${
              activeStep === 2 
                ? 'bg-surface-white border-brand-teal/30 text-text-charcoal shadow-sm' 
                : selectedCity 
                  ? 'bg-surface-white/60 border-border-subtle/80 text-text-grey-medium' 
                  : 'bg-transparent border-transparent text-text-grey-medium'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[13px] font-bold transition-all ${
                selectedCity ? 'bg-brand-teal text-surface-white shadow-sm' : 'bg-surface-white border border-border-subtle text-text-grey-medium'
              }`}>
                {selectedCity ? <CheckCircle2 className="w-5 h-5" /> : '02'}
              </div>
              <div className="text-sm">
                <span className="font-bold block text-text-charcoal">Target City</span>
                <span className="text-xs text-text-grey-medium">{selectedCity || 'Awaiting selection'}</span>
              </div>
            </div>

            {/* Step 3 Indicator */}
            <div className={`flex items-center gap-4 p-3.5 rounded-lg border transition-all ${
              activeStep === 3 
                ? 'bg-surface-white border-brand-teal/30 text-text-charcoal shadow-sm' 
                : selectedUniversity 
                  ? 'bg-surface-white/60 border-border-subtle/80 text-text-grey-medium' 
                  : 'bg-transparent border-transparent text-text-grey-medium'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[13px] font-bold transition-all ${
                selectedUniversity ? 'bg-brand-teal text-surface-white shadow-sm' : 'bg-surface-white border border-border-subtle text-text-grey-medium'
              }`}>
                {selectedUniversity ? <CheckCircle2 className="w-5 h-5" /> : '03'}
              </div>
              <div className="text-sm">
                <span className="font-bold block text-text-charcoal">Institution</span>
                <span className="text-xs text-text-grey-medium">{selectedUniversity || 'Awaiting selection'}</span>
              </div>
            </div>

            {/* Step 4 Indicator */}
            <div className={`flex items-center gap-4 p-3.5 rounded-lg border transition-all ${
              activeStep === 4 
                ? 'bg-surface-white border-brand-teal/30 text-text-charcoal shadow-sm' 
                : 'bg-transparent border-transparent text-text-grey-medium'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[13px] font-bold transition-all ${
                activeStep > 3 ? 'bg-brand-teal text-surface-white shadow-sm' : 'bg-surface-white border border-border-subtle text-text-grey-medium'
              }`}>
                {activeStep > 4 ? <CheckCircle2 className="w-5 h-5" /> : '04'}
              </div>
              <div className="text-sm">
                <span className="font-bold block text-text-charcoal">Scholarship</span>
                <span className="text-xs text-text-grey-medium">{selectedUniversity ? `${scholarship}% Expected` : 'Awaiting university'}</span>
              </div>
            </div>
          </div>

          {(selectedCourse || selectedCity || selectedUniversity) && (
            <button
              onClick={handleReset}
              className="mt-6 flex items-center gap-2 text-sm font-bold text-text-grey-medium hover:text-brand-teal transition-colors focus:outline-none cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset selections</span>
            </button>
          )}
        </div>

        {/* Right Side: Step Interface */}
        <div className="lg:col-span-8 w-full flex flex-col gap-6 text-left">
          
          {/* STEP 1: COURSE SELECTION */}
          <div className={`bg-surface-white border rounded-2xl p-6 sm:p-8 transition-all ${
            activeStep === 1 ? 'border-brand-teal/30 shadow-md' : 'border-border-subtle opacity-60'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-teal-light/50 text-brand-teal rounded-lg">
                <Book className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-text-charcoal">Step 01: What do you want to study?</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {availableCourses.map((course) => {
                const isSelected = selectedCourse === course;
                return (
                  <button
                    key={course}
                    onClick={() => {
                      setSelectedCourse(course);
                    }}
                    className={`p-4 rounded-xl border text-left font-bold text-[15px] sm:text-base transition-all cursor-pointer flex justify-between items-center ${
                      isSelected
                        ? 'bg-brand-teal border-brand-teal text-surface-white shadow-md'
                        : 'bg-surface-white border-border-subtle text-text-grey-medium hover:text-text-charcoal hover:border-brand-teal/30 shadow-sm'
                    }`}
                  >
                    <span>{course}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-surface-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: CITY SELECTION */}
          {selectedCourse && (
            <div ref={step2Ref} className={`bg-surface-white border rounded-2xl p-6 sm:p-8 transition-all ${
              activeStep === 2 ? 'border-brand-teal/30 shadow-md' : 'border-border-subtle opacity-60'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-teal-light/50 text-brand-teal rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-charcoal">Step 02: Choose City</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cities.map((city) => {
                  const isSelected = selectedCity === city;
                  return (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                      }}
                      className={`p-4 rounded-xl border text-center font-bold text-[15px] sm:text-base transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-teal border-brand-teal text-surface-white shadow-md'
                          : 'bg-surface-white border-border-subtle text-text-grey-medium hover:text-text-charcoal hover:border-brand-teal/30 shadow-sm'
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: UNIVERSITY SELECTION */}
          {selectedCity && selectedCourse && (
            <div ref={step3Ref} className={`bg-surface-white border rounded-2xl p-6 sm:p-8 transition-all ${
              activeStep === 3 ? 'border-brand-teal/30 shadow-md' : 'border-border-subtle opacity-60'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-teal-light/50 text-brand-teal rounded-lg">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-charcoal">Step 03: Choose University</h3>
              </div>

              {universities.length === 0 ? (
                <div className="p-6 bg-red-500/5 border border-red-500/20 text-text-grey-medium rounded-xl flex items-center gap-3 text-sm sm:text-base leading-relaxed">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="font-bold text-text-charcoal block">No active university records</span>
                    No active 2026 courses are listed for {selectedCity} in our database. Choose a different city to continue.
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {universities.map((uni) => {
                    const isSelected = selectedUniversity === uni;
                    return (
                      <button
                        key={uni}
                        onClick={() => {
                          setSelectedUniversity(uni);
                          setActiveStep(4);
                        }}
                        className={`p-4 rounded-xl border text-left font-bold text-[15px] sm:text-base transition-all cursor-pointer flex justify-between items-center ${
                          isSelected
                            ? 'bg-brand-teal border-brand-teal text-surface-white shadow-md'
                            : 'bg-surface-white border-border-subtle text-text-grey-medium hover:text-text-charcoal hover:border-brand-teal/30 shadow-sm'
                        }`}
                      >
                        <span>{uni}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-surface-white" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: EXPECTED SCHOLARSHIP */}
          {selectedUniversity && selectedCity && selectedCourse && (
            <div ref={step4Ref} className={`bg-surface-white border rounded-2xl p-6 sm:p-8 transition-all ${
              activeStep === 4 ? 'border-brand-teal/30 shadow-md' : 'border-border-subtle opacity-60'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-teal-light/50 text-brand-teal rounded-lg">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-charcoal">Step 04: Expected Scholarship</h3>
              </div>

              <div className="max-w-md text-left space-y-6">
                <div>
                  <h4 className="text-base font-bold text-text-charcoal mb-1">What scholarship do you expect?</h4>
                  <p className="text-sm text-text-grey-medium">
                    Enter the percentage of tuition you expect to receive.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative rounded-lg border border-border-subtle shadow-inner bg-bg-light-warm w-32 flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scholarship}
                      onChange={(e) => {
                        setScholarshipInteracted(true);
                        const val = parseInt(e.target.value);
                        if (isNaN(val)) {
                          setScholarship(0);
                        } else {
                          setScholarship(Math.max(0, Math.min(100, val)));
                        }
                      }}
                      className="w-full bg-transparent px-4 py-3 font-mono font-bold text-lg text-text-charcoal focus:outline-none text-right pr-8"
                    />
                    <span className="absolute right-3 font-mono font-bold text-text-grey-medium text-lg pointer-events-none">%</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[0, 10, 20, 25, 50].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setScholarshipInteracted(true);
                          setScholarship(preset);
                        }}
                        className={`px-4 py-2.5 text-xs sm:text-sm font-bold border rounded-lg cursor-pointer transition-all ${
                          scholarship === preset
                            ? 'bg-brand-teal border-brand-teal text-surface-white'
                            : 'bg-surface-white border-border-subtle text-text-grey-medium hover:border-brand-teal/30 hover:text-text-charcoal'
                        }`}
                      >
                        {preset}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Final submission trigger */}
                <motion.div
                  ref={calculateRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-6 border-t border-border-subtle flex justify-end"
                >
                  <button
                    onClick={handleCalculate}
                    className="flex items-center gap-2 px-8 py-4 bg-brand-teal text-surface-white text-[15px] font-bold rounded-full hover:bg-brand-teal-dark hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-brand-teal/15"
                  >
                    <span>Calculate Cost</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </motion.div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
