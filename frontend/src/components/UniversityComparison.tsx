import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EDUCATION_RECORDS } from '../services/dataService';
import { getCourseComparison, getCourses } from '../services/apiService';
import type { CourseComparisonRecord } from '../services/apiService';
import { ChevronDown, ChevronUp, AlertCircle, Building2 } from 'lucide-react';

interface UniversityComparisonProps {
  selectedCourse?: string;
  selectedUniversity?: string;
  onUniversitySelect?: (university: string, city: string) => void;
}

export const UniversityComparison: React.FC<UniversityComparisonProps> = ({
  selectedCourse,
  selectedUniversity,
  onUniversitySelect
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [courses, setCourses] = useState<string[]>([]);
  const [comparedCourse, setComparedCourse] = useState<string>(
    selectedCourse || 'Master of Data Science'
  );
  const [comparisonRecords, setComparisonRecords] = useState<CourseComparisonRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Fetch available courses from the backend database on mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const list = await getCourses();
        setCourses(list);
        if (list.length > 0 && !selectedCourse) {
          setComparedCourse(list[0]);
        }
      } catch (err) {
        console.error('Failed to load courses for comparison dropdown:', err);
      }
    };
    loadCourses();
  }, [selectedCourse]);

  // Fetch comparison records dynamically when comparedCourse changes
  useEffect(() => {
    let cancelled = false;
    const loadComparison = async () => {
      setLoading(true);
      setError(false);
      try {
        const records = await getCourseComparison(comparedCourse);
        if (!cancelled) {
          setComparisonRecords(records);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch course comparison data:', err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };
    loadComparison();
    return () => {
      cancelled = true;
    };
  }, [comparedCourse]);

  // Sort by tuition fee (handle nulls by pushing them to the bottom)
  const sortedData = [...comparisonRecords].sort((a, b) => {
    const tA = a.annual_tuition_aud ?? Infinity;
    const tB = b.annual_tuition_aud ?? Infinity;
    return tA - tB;
  });

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const formatCurrency = (val: number | null) => {
    if (val === null || val === 0) return 'Unavailable';
    return `A$${Math.round(val).toLocaleString()}`;
  };

  const formatRange = (min: number | null, max: number | null) => {
    if (min === null && max === null) return 'Unavailable';
    if (min === null) return formatCurrency(max);
    if (max === null) return formatCurrency(min);
    if (min === max) return formatCurrency(min);
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  };

  const formatDuration = (min: number | null, max: number | null) => {
    if (min === null && max === null) return 'Duration N/A';
    if (min === null) return `${max} Years`;
    if (max === null) return `${min} Years`;
    if (min === max) return `${min} ${min === 1 ? 'Year' : 'Years'}`;
    return `${min} - ${max} Years`;
  };

  return (
    <section id="university-comparison" className="py-24 px-6 bg-bg-light-warm border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-brand-teal uppercase tracking-widest block mb-2">Cross-Institutional Comparison</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-charcoal">
            Compare Master's Programs
          </h2>
          <p className="text-base sm:text-lg text-text-grey-medium mt-3 max-w-xl mx-auto leading-relaxed">
            Explore tuition, living costs, and estimated total cost across universities — and see how different Master's programs compare.
          </p>
        </div>

        {/* Dynamic Selector Dropdown */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-white border border-border-subtle p-5 rounded-xl shadow-sm text-left">
          <div className="flex flex-col gap-1">
            <label htmlFor="course-select" className="text-sm sm:text-base font-bold text-text-charcoal uppercase tracking-wider">
              Select a Master's course
            </label>
            <p className="text-sm text-text-grey-medium">
              Choose a degree to update university comparative tuition and regional living indexes.
            </p>
          </div>
          <div className="relative min-w-[260px] w-full sm:w-auto">
            <select
              id="course-select"
              value={comparedCourse}
              onChange={(e) => {
                setComparedCourse(e.target.value);
                setExpandedIndex(null); // Collapse any open items on change
              }}
              disabled={courses.length === 0}
              className="w-full sm:w-64 px-4 py-2.5 bg-bg-light-warm border border-border-subtle rounded-lg text-sm sm:text-base font-bold text-text-charcoal focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal cursor-pointer shadow-inner appearance-none transition-all pr-10"
            >
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-grey-medium">
              <ChevronDown className="w-4.5 h-4.5" />
            </div>
          </div>
        </div>

        {/* Comparison List with Progressive Disclosure */}
        <div className="bg-surface-white border border-border-subtle rounded-2xl overflow-hidden shadow-md max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-bg-light-warm/60 border-b border-border-subtle text-xs sm:text-sm font-bold uppercase tracking-wider text-text-grey-medium">
            <div className="col-span-5 text-left">Institution & City</div>
            <div className="col-span-2 text-right">Annual Tuition</div>
            <div className="col-span-2 text-right">Annual Living</div>
            <div className="col-span-2 text-right">Est. Total Cost</div>
            <div className="col-span-1"></div>
          </div>

          {/* Records */}
          <div className="divide-y divide-border-subtle">
            {loading ? (
              <div className="px-8 py-12 text-center text-text-grey-medium animate-pulse">
                <p className="text-base">Loading cross-institutional comparison data...</p>
              </div>
            ) : error || sortedData.length === 0 ? (
              <div className="px-8 py-12 text-center text-text-grey-medium flex flex-col items-center justify-center gap-3">
                <AlertCircle className="w-8 h-8 text-brand-teal/60" />
                <p className="text-base">No institutional comparative data found for this specific course query.</p>
              </div>
            ) : (
              sortedData.map((item, idx) => {
                const isSelected = selectedUniversity && item.university.toLowerCase() === selectedUniversity.toLowerCase();
                const isExpanded = expandedIndex === idx;
                const tuition = item.annual_tuition_aud;

                // Lookup extra metadata from original local records if available
                const matchingEdu = EDUCATION_RECORDS.find(
                  (r) =>
                    r.university.toLowerCase() === item.university.toLowerCase() &&
                    r.course.toLowerCase() === comparedCourse.toLowerCase() &&
                    r.city.toLowerCase() === item.city.toLowerCase()
                );
                const campus = matchingEdu ? matchingEdu.campus : 'Main Campus';
                const delivery = matchingEdu ? matchingEdu.delivery : 'On campus';
                const notes = matchingEdu ? matchingEdu.notes : 'Verified from course listing.';

                return (
                  <div 
                    key={idx} 
                    className={`transition-colors duration-300 ${
                      isSelected 
                        ? 'bg-brand-teal/5 border-l-4 border-l-brand-teal' 
                        : 'hover:bg-bg-light-warm/40 border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Interactive Summary Row */}
                    <div 
                      onClick={() => toggleExpand(idx)}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-8 py-5 items-center cursor-pointer select-none"
                    >
                      {/* Name & City */}
                      <div className="col-span-1 md:col-span-5 flex items-center gap-3 text-left">
                        <div className={`p-2 rounded bg-bg-light-warm border ${isSelected ? 'border-brand-teal/30 text-brand-teal shadow-sm' : 'border-border-subtle text-text-grey-medium'}`}>
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-text-charcoal text-base block md:inline-block mr-2">
                            {item.university}
                          </span>
                          <span className="text-sm text-text-grey-medium">
                            ({item.city})
                          </span>
                        </div>
                      </div>

                      {/* Tuition */}
                      <div className="col-span-1 md:col-span-2 md:text-right flex justify-between md:block">
                        <span className="md:hidden text-xs font-bold text-text-grey-medium">Annual Tuition:</span>
                        <span className={`text-base font-bold ${tuition === null ? 'text-red-500/80 font-normal italic' : 'text-text-charcoal'}`}>
                          {formatCurrency(tuition)}
                        </span>
                      </div>

                      {/* Living */}
                      <div className="col-span-1 md:col-span-2 md:text-right flex justify-between md:block">
                        <span className="md:hidden text-xs font-bold text-text-grey-medium">Annual Living:</span>
                        <span className="text-base text-text-grey-medium font-medium">
                          {formatRange(item.living_cost_min_aud, item.living_cost_max_aud)}
                        </span>
                      </div>

                      {/* Est Total */}
                      <div className="col-span-1 md:col-span-2 md:text-right flex justify-between md:block">
                        <span className="md:hidden text-xs font-bold text-text-grey-medium">Est. Total:</span>
                        <div>
                          <span className="text-base font-extrabold text-brand-teal block">
                            {formatRange(item.total_cost_min_aud, item.total_cost_max_aud)}
                          </span>
                          {!item.tuition_available && (
                            <span className="text-[10px] text-text-grey-medium block leading-none font-bold">
                              Excluding tuition
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expand Toggle icon */}
                      <div className="col-span-1 md:col-span-1 text-right hidden md:block text-text-grey-medium">
                        {isExpanded ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />}
                      </div>
                    </div>

                    {/* Progressive Disclosure Section */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 pb-6 pt-2 border-t border-border-subtle bg-bg-light-warm/20 text-sm text-text-grey-medium grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="space-y-2">
                              <div>
                                <span className="font-bold text-text-charcoal block">Campus & Delivery</span>
                                <p className="text-[15px] mt-1">{campus} Campus &middot; {delivery}</p>
                              </div>
                              <div>
                                <span className="font-bold text-text-charcoal block">Duration</span>
                                <p className="text-[15px] mt-1">{formatDuration(item.duration_min_years, item.duration_max_years)}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <span className="font-bold text-text-charcoal block">Official Database Notes</span>
                                <p className="italic leading-relaxed text-[15px] mt-1">
                                  {notes}
                                </p>
                              </div>
                              {onUniversitySelect && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUniversitySelect(item.university, item.city);
                                  }}
                                  className="mt-3 px-4 py-2 bg-brand-teal text-surface-white hover:bg-brand-teal-dark text-[10px] font-bold uppercase rounded tracking-wider cursor-pointer shadow-sm"
                                >
                                  Select this Option
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
