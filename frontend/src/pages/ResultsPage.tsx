import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getCourseCost } from '../services/apiService';
import type { CalculationResult } from '../types';
import { CityComparison } from '../components/CityComparison';
import { UniversityComparison } from '../components/UniversityComparison';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Home, Utensils, Bus, Zap, 
  ChevronDown, ChevronUp, AlertCircle, Info, Calendar, ArrowLeft 
} from 'lucide-react';

interface ResultsPageProps {
  city: string;
  university: string;
  course: string;
  scholarshipPercent: number;
  onBackToPlanner: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  city,
  university,
  course,
  scholarshipPercent,
  onBackToPlanner
}) => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<'housing' | 'food' | 'transport' | 'utilities' | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCourseCost = async () => {
      setLoading(true);
      setError(false);
      try {
        const calculated = await getCourseCost(city, university, course, scholarshipPercent);

        if (!cancelled) {
          if (calculated) {
            setResult(calculated);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load course cost:', err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadCourseCost();

    return () => {
      cancelled = true;
    };
  }, [city, university, course, scholarshipPercent]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-bg-light-warm flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-brand-teal mb-4 animate-pulse" />
        <h2 className="text-xl font-bold text-text-charcoal mb-2">Calculating Cost Indexes...</h2>
        <p className="text-sm sm:text-base text-text-grey-medium">Evaluating city consumer index profiles.</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-bg-light-warm flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-black text-text-charcoal mb-3">Cost data unavailable for this combination.</h2>
        <p className="text-sm sm:text-base text-text-grey-medium mb-8 leading-relaxed">
          The selected Course & University combination does not have validated fee or living cost metrics for this city in our 2026 dataset.
        </p>
        <button
          onClick={onBackToPlanner}
          className="px-8 py-4 bg-brand-teal text-surface-white text-[15px] font-bold rounded-full hover:bg-brand-teal-dark hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-brand-teal/15 focus:outline-none"
        >
          Return to Planner
        </button>
      </div>
    );
  }


  // Formatting helpers
  const formatCurrency = (val: number | null) => {
    if (val === null) return 'Unavailable';
    return `A$${val.toLocaleString(undefined, { 
      minimumFractionDigits: val % 1 === 0 ? 0 : 2, 
      maximumFractionDigits: 2 
    })}`;
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

  const durationMin = result.durationMinYears || 0;
  const tuitionTotal = result.remainingTuitionMin || 0;
  const livingTotal = result.livingCostMin;
  
  // Pie chart data
  const pieData = result.annualTuition ? [
    { name: 'Tuition Fee', value: tuitionTotal, color: '#0D9488' },
    { name: 'Living Expenses', value: livingTotal, color: '#9CA3AF' }
  ] : [];

  // Bar chart data (Annual comparison)
  // Tuition annual after scholarship = remainingTuitionMin / durationMin
  const annualTuitionAfterScholarship = result.remainingTuitionMin !== null && durationMin > 0
    ? result.remainingTuitionMin / durationMin
    : 0;

  const annualBarData = result.annualTuition ? [
    {
      name: 'Annual Splitting',
      Tuition: annualTuitionAfterScholarship,
      Living: result.monthlyLiving * 12
    }
  ] : [];

  const monthlyBarData = [
    { name: 'Rent', cost: result.housingMonthly, fill: '#0D9488' },
    { name: 'Utilities', cost: result.utilitiesMonthly, fill: '#6B7280' },
    { name: 'Food', cost: result.foodMonthly, fill: '#9CA3AF' },
    { name: 'Transport', cost: result.transportMonthly, fill: '#D1D5DB' }
  ];

  const toggleSection = (section: 'housing' | 'food' | 'transport' | 'utilities') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-bg-light-warm pt-32 pb-24 px-6 min-h-screen text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Link */}
        <button
          onClick={onBackToPlanner}
          className="text-[13px] sm:text-sm font-bold uppercase tracking-wider text-brand-teal hover:text-brand-teal-dark flex items-center gap-1.5 mb-8 cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Adjust Selections</span>
        </button>

        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 border-b border-border-subtle pb-8">
          <div>
            <span className="text-sm sm:text-base font-bold text-brand-teal uppercase tracking-widest block mb-1">
              Personalized Master's Index
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-charcoal">
              {result.course}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg text-text-grey-medium mt-2">
              <span className="font-bold text-text-charcoal">{result.university}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
              <span>{result.city}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-text-grey-medium" /> {formatDuration(result.durationMinYears, result.durationMaxYears)} Duration
              </span>
            </div>
          </div>

          {/* Hero Combined Cost */}
          <div className="bg-surface-white border border-border-subtle p-6 rounded-2xl w-full lg:w-auto min-w-[280px] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-brand-teal/5">
              <Building2 className="w-20 h-20" />
            </div>
            <span className="text-sm font-bold text-text-grey-medium uppercase tracking-wider block mb-1">
              {result.annualTuition === null ? "Estimated Master's Cost (excluding tuition)" : "Estimated Master's Cost"}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-text-charcoal tracking-tight">
              {formatRange(result.totalCostMin, result.totalCostMax)}
            </div>
            <span className="text-sm text-text-grey-medium block mt-1 font-medium">
              {result.annualTuition === null 
                ? 'Excluding tuition — tuition fee unavailable for this course' 
                : 'Combined Tuition & Living baseline'}
            </span>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
          {/* Tuition Fee Card */}
          <div className="bg-surface-white border border-border-subtle p-6 rounded-xl shadow-sm text-left">
            <span className="text-sm font-bold text-text-grey-medium uppercase tracking-wider block mb-1">Annual Tuition</span>
            <div className={`text-2xl font-bold ${result.annualTuition === null ? 'text-red-500/80 font-normal italic' : 'text-text-charcoal'}`}>
              {result.annualTuition === null ? 'Unavailable' : formatCurrency(result.annualTuition)}
            </div>
            <span className="text-sm text-text-grey-medium mt-1 block font-medium">
              {result.annualTuition === null 
                ? 'Indicative tuition fee unexposed' 
                : 'Indicative fee per academic year'}
            </span>
          </div>

          {/* Expected Scholarship Card */}
          <div className="bg-surface-white border border-border-subtle p-6 rounded-xl shadow-sm text-left">
            <span className="text-sm font-bold text-text-grey-medium uppercase tracking-wider block mb-1">Expected Scholarship</span>
            <div className="text-2xl font-bold text-text-charcoal">
              {result.scholarshipPercent}%
            </div>
            <span className="text-sm text-text-grey-medium mt-1 block font-medium">
              {result.annualTuition === null 
                ? 'No tuition fee data' 
                : `Tuition left: ${formatRange(result.remainingTuitionMin, result.remainingTuitionMax)}`}
            </span>
          </div>

          {/* Monthly Living Cost */}
          <div className="bg-surface-white border border-border-subtle p-6 rounded-xl shadow-sm text-left">
            <span className="text-sm font-bold text-text-grey-medium uppercase tracking-wider block mb-1">Monthly Living Expenses</span>
            <div className="text-2xl font-bold text-text-charcoal">
              {formatCurrency(result.monthlyLiving)}
            </div>
            <span className="text-sm text-text-grey-medium mt-1 block font-medium">Rent + Basket + Transport + Utilities</span>
          </div>

          {/* Annual Living Cost */}
          <div className="bg-surface-white border border-border-subtle p-6 rounded-xl shadow-sm text-left">
            <span className="text-sm font-bold text-text-grey-medium uppercase tracking-wider block mb-1">Annual Living Cost</span>
            <div className="text-2xl font-bold text-text-charcoal">
              {formatCurrency(result.annualLiving)}
            </div>
            <span className="text-sm text-text-grey-medium mt-1 block font-medium">Aggregated baseline over 12 months</span>
          </div>
        </div>

        {/* Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Chart 1: Donut (Tuition vs Living) */}
          {result.annualTuition !== null && (
            <div className="lg:col-span-4 bg-surface-white border border-border-subtle p-6 rounded-2xl shadow-sm flex flex-col h-[320px]">
              <span className="text-sm font-bold text-text-grey-medium uppercase font-mono tracking-wider mb-2 text-left block">Tuition vs. Living Split</span>
              <div className="flex-1 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `A$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[11px] text-text-grey-medium uppercase tracking-wider font-bold">Total</span>
                  <span className="text-base font-bold text-text-charcoal">{formatRange(result.totalCostMin, result.totalCostMax)}</span>
                </div>
              </div>
              <div className="flex justify-center gap-6 text-sm uppercase font-bold tracking-wider mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0D9488' }} />
                  <span className="text-text-charcoal">Tuition ({Math.round((tuitionTotal / result.totalCostMin!) * 100)}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#9CA3AF' }} />
                  <span className="text-text-charcoal">Living ({Math.round((livingTotal / result.totalCostMin!) * 100)}%)</span>
                </div>
              </div>
            </div>
          )}

          {/* Chart 2: Annual Cost Breakdown Comparison */}
          {result.annualTuition !== null && (
            <div className="lg:col-span-4 bg-surface-white border border-border-subtle p-6 rounded-2xl shadow-sm flex flex-col h-[320px]">
              <span className="text-sm font-bold text-text-grey-medium uppercase font-mono tracking-wider mb-2 text-left block">Annual Cost Ratio</span>
              <div className="flex-1 pt-6">
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={annualBarData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="name" stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value: any) => `A$${value.toLocaleString()}`} />
                    <Bar dataKey="Tuition" fill="#0D9488" radius={[4, 4, 0, 0]} barSize={28} />
                    <Bar dataKey="Living" fill="#9CA3AF" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Chart 3: Monthly Living Cost breakdown (Horizontal bars) */}
          <div className={`${result.annualTuition !== null ? 'lg:col-span-4' : 'lg:col-span-12'} bg-surface-white border border-border-subtle p-6 rounded-2xl shadow-sm flex flex-col h-[320px]`}>
            <span className="text-sm font-bold text-text-grey-medium uppercase font-mono tracking-wider mb-2 text-left block">Monthly Living breakdown</span>
            <div className="flex-grow pt-4">
              <ResponsiveContainer width="100%" height="95%">
                <BarChart
                  data={monthlyBarData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <XAxis 
                    type="number" 
                    stroke="#4B5563" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `A$${val}`}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#4B5563" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={65}
                  />
                  <Tooltip formatter={(value: any) => `A$${value.toLocaleString()}`} />
                  <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={14}>
                    {monthlyBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Interactive Expense Accordion */}
        <div className="bg-surface-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm mb-12">
          <div className="px-6 sm:px-8 py-5 bg-bg-light-warm/50 border-b border-border-subtle flex items-center justify-between">
            <h3 className="text-base font-extrabold text-text-charcoal">Granular Living Expense Breakdown</h3>
            <span className="text-base font-black text-brand-teal uppercase tracking-wider">
              {formatCurrency(result.monthlyLiving)}/month
            </span>
          </div>

          <div className="divide-y divide-border-subtle text-left">
            
            {/* Housing Accordion */}
            <div>
              <div 
                onClick={() => toggleSection('housing')}
                className="flex items-center justify-between px-6 sm:px-8 py-5 cursor-pointer hover:bg-bg-light-warm/40 select-none transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-bg-light-warm border border-brand-teal/10 text-brand-teal shadow-sm">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-text-charcoal block">Housing (Accommodations)</span>
                    <span className="text-sm text-text-grey-medium">Single bedroom arrangement outside city centre</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-bold text-text-charcoal">{formatCurrency(result.housingMonthly)}/mo</span>
                  {openSection === 'housing' ? <ChevronUp className="w-4 h-4 text-text-grey-medium" /> : <ChevronDown className="w-4 h-4 text-text-grey-medium" />}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {openSection === 'housing' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-border-subtle/50 bg-bg-light-warm/10 text-sm sm:text-base text-text-grey-medium">
                      <div className="flex items-center justify-between py-2 border-b border-border-subtle">
                        <span>1-bedroom apartment outside city centre</span>
                        <span className="font-bold text-text-charcoal">{formatCurrency(result.housingMonthly)}</span>
                      </div>
                      <p className="mt-3 italic text-[13px] text-text-grey-medium leading-relaxed">
                        * Estimate represents average monthly rental price index compiled from raw city reports.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Food Accordion */}
            <div>
              <div 
                onClick={() => toggleSection('food')}
                className="flex items-center justify-between px-6 sm:px-8 py-5 cursor-pointer hover:bg-bg-light-warm/40 select-none transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-bg-light-warm border border-brand-teal/10 text-brand-teal shadow-sm">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-text-charcoal block">Groceries & Food Basket</span>
                    <span className="text-sm text-text-grey-medium">6 essential raw grocery products index</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-bold text-text-charcoal">{formatCurrency(result.foodMonthly)}/mo</span>
                  {openSection === 'food' ? <ChevronUp className="w-4 h-4 text-text-grey-medium" /> : <ChevronDown className="w-4 h-4 text-text-grey-medium" />}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {openSection === 'food' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-border-subtle/50 bg-bg-light-warm/10 text-sm sm:text-base text-text-grey-medium">
                      
                      {/* Groceries grid list */}
                      {result.foodItems && result.foodItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 py-3">
                          {result.foodItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-2 border-b border-border-subtle/60 items-center">
                              <span>{item.name} &times; {item.quantity}</span>
                              <div className="text-right">
                                <span className="text-text-charcoal font-bold">{formatCurrency(item.monthlyCost)}</span>
                                <span className="text-[11px] sm:text-xs block text-text-grey-medium">({formatCurrency(item.unitPrice)} / unit)</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-text-grey-medium">
                          <Info className="w-5 h-5 mx-auto text-brand-teal/60 mb-2" />
                          <p className="font-bold text-text-charcoal mb-1">Detailed item data unavailable</p>
                          <p className="text-[13px] leading-relaxed max-w-sm mx-auto">
                            Individual item price indexing is not loaded for this record. The validated aggregate groceries basket is capped at <span className="font-bold text-text-charcoal">{formatCurrency(result.foodMonthly)}/mo</span>.
                          </p>
                        </div>
                      )}

                      <p className="mt-3 italic text-[13px] text-text-grey-medium leading-relaxed">
                        * Basket quantities are calculated to baseline essential monthly consumption benchmarks.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Transport Accordion */}
            <div>
              <div 
                onClick={() => toggleSection('transport')}
                className="flex items-center justify-between px-6 sm:px-8 py-5 cursor-pointer hover:bg-bg-light-warm/40 select-none transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-bg-light-warm border border-brand-teal/10 text-brand-teal shadow-sm">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-text-charcoal block">Transit & Transport</span>
                    <span className="text-sm text-text-grey-medium">Standard city public transportation passes</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-bold text-text-charcoal">{formatCurrency(result.transportMonthly)}/mo</span>
                  {openSection === 'transport' ? <ChevronUp className="w-4 h-4 text-text-grey-medium" /> : <ChevronDown className="w-4 h-4 text-text-grey-medium" />}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {openSection === 'transport' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-border-subtle/50 bg-bg-light-warm/10 text-sm sm:text-base text-text-grey-medium">
                      <div className="flex items-center justify-between py-2 border-b border-border-subtle">
                        <span>Standard monthly public transport pass index</span>
                        <span className="font-bold text-text-charcoal">{formatCurrency(result.transportMonthly)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Utilities Accordion */}
            <div>
              <div 
                onClick={() => toggleSection('utilities')}
                className="flex items-center justify-between px-6 sm:px-8 py-5 cursor-pointer hover:bg-bg-light-warm/40 select-none transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-bg-light-warm border border-brand-teal/10 text-brand-teal shadow-sm">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-text-charcoal block">Household Utilities & Services</span>
                    <span className="text-sm text-text-grey-medium">Basic electricity/heating index, internet data, and mobile line</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-bold text-text-charcoal">{formatCurrency(result.utilitiesMonthly)}/mo</span>
                  {openSection === 'utilities' ? <ChevronUp className="w-4 h-4 text-text-grey-medium" /> : <ChevronDown className="w-4 h-4 text-text-grey-medium" />}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {openSection === 'utilities' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-border-subtle/50 bg-bg-light-warm/10 text-sm sm:text-base text-text-grey-medium text-left">
                      
                      {result.utilitiesItems && result.utilitiesItems.length > 0 ? (
                        <div className="space-y-2">
                          {result.utilitiesItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-2 border-b border-border-subtle">
                              <span>{item.name}</span>
                              <span className="text-text-charcoal font-bold">{formatCurrency(item.monthlyCost)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-text-grey-medium">
                          <Info className="w-5 h-5 mx-auto text-brand-teal/60 mb-2" />
                          <p className="font-bold text-text-charcoal mb-1">Detailed item data unavailable</p>
                          <p className="text-[13px] leading-relaxed max-w-sm mx-auto">
                            Individual service price indexing is not loaded for this record. The validated aggregate household utilities expense is capped at <span className="font-bold text-text-charcoal">{formatCurrency(result.utilitiesMonthly)}/mo</span>.
                          </p>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Contextual City Comparison Block */}
        <CityComparison selectedCity={result.city} />

        {/* Contextual University Comparison Block */}
        <UniversityComparison 
          selectedCourse={result.course} 
          selectedUniversity={result.university} 
        />

        {/* Methodology Notice */}
        <div className="mt-12 p-6 bg-surface-white border border-border-subtle rounded-xl flex items-start gap-4 shadow-sm text-left">
          <Info className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-text-grey-medium leading-relaxed">
            <span className="font-bold text-text-charcoal block mb-1">Cost Projection Assumptions</span>
            Estimated Master's cost calculations represent <strong> indicative indices based on raw 2026 data points</strong>. All living values (Rent, Basket items, transit pass index, utilities base) are estimated based on local capital cost tables. Individual lifestyle choices, exchange rate oscillations, and official fee revisions will affect real-world spending parameters.
          </div>
        </div>

      </div>
    </div>
  );
};
