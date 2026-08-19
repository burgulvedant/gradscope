import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CITIES_COST_OF_LIVING, FOOD_QUANTITIES, FOOD_COLUMN_MAP } from '../services/dataService';
import type { CityCostOfLiving } from '../types';

interface CityComparisonProps {
  selectedCity?: string;
  onCitySelect?: (city: string) => void;
}

export const CityComparison: React.FC<CityComparisonProps> = ({ selectedCity, onCitySelect }) => {
  // Pre-calculate total monthly living costs for all 8 cities from raw data
  const data = CITIES_COST_OF_LIVING.map((col: CityCostOfLiving) => {
    // Food Monthly
    const foodCost = Object.entries(FOOD_QUANTITIES).reduce((acc, [name, qty]) => {
      const colName = FOOD_COLUMN_MAP[name as keyof typeof FOOD_COLUMN_MAP] as keyof CityCostOfLiving;
      const price = col[colName] as number;
      return acc + (price * qty);
    }, 0);

    const rent = col.rent_1br_outside_centre;
    const transit = col.transport_monthly_pass;
    const utilities = col.utilities_85sqm + col.mobile_plan + col.internet;

    const total = Math.round(rent + foodCost + transit + utilities);

    return {
      cityName: col.city,
      rent: Math.round(rent),
      food: Math.round(foodCost),
      transit: Math.round(transit),
      utilities: Math.round(utilities),
      total: total
    };
  }).sort((a, b) => b.total - a.total); // Sort highest to lowest

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface-white border border-border-subtle p-4 rounded-lg shadow-xl text-xs text-left">
          <p className="font-bold text-text-charcoal mb-2">{data.cityName}</p>
          <div className="space-y-1 text-text-grey-medium">
            <div className="flex justify-between gap-6">
              <span>Housing (Rent):</span>
              <span className="text-text-charcoal font-semibold">A${data.rent}/mo</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Utilities:</span>
              <span className="text-text-charcoal font-semibold">A${data.utilities}/mo</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Food & Basket:</span>
              <span className="text-text-charcoal font-semibold">A${data.food}/mo</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Transport:</span>
              <span className="text-text-charcoal font-semibold">A${data.transit}/mo</span>
            </div>
            <div className="border-t border-border-subtle pt-1.5 mt-1.5 flex justify-between gap-6 font-bold text-brand-teal">
              <span>Total Est. Living:</span>
              <span>A${data.total}/mo</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="city-comparison" className="py-24 px-6 bg-surface-white border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-brand-teal uppercase tracking-widest block mb-2">Comparative Analysis</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-charcoal">
            Cost of Living Across Australian Cities
          </h2>
          <p className="text-base text-text-grey-medium mt-3 max-w-xl mx-auto leading-relaxed">
            Compare monthly living expenses (Housing + Utilities + Food + Transit) based on verified 2026 data.
          </p>
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chart View */}
          <div className="lg:col-span-8 bg-surface-white border border-border-subtle p-6 rounded-2xl h-[450px] shadow-md relative">
            <div className="absolute top-4 left-6 text-xs text-text-grey-medium uppercase tracking-wider font-mono">
              Monthly Living Cost Comparison (AUD)
            </div>
            
            <div className="w-full h-full pt-8">
              <ResponsiveContainer width="100%" height="95%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
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
                    dataKey="cityName" 
                    type="category" 
                    stroke="#4B5563" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(243, 244, 246, 0.6)' }} />
                  <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={16}>
                    {data.map((entry, index) => {
                      const isSelected = selectedCity && entry.cityName.toLowerCase() === selectedCity.toLowerCase();
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isSelected ? '#0D9488' : '#D1D5DB'}
                          className="transition-all duration-300 hover:opacity-85"
                          onClick={() => onCitySelect && onCitySelect(entry.cityName)}
                          style={{ cursor: onCitySelect ? 'pointer' : 'default' }}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Text Info / Metrics */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <div className="p-6 bg-bg-light-warm border border-border-subtle rounded-xl shadow-sm">
              <h3 className="text-sm font-bold uppercase text-brand-teal tracking-wider mb-4">Cost Observations</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-bold text-text-charcoal text-sm block">Sydney remains the peak cost city</span>
                  <p className="text-[15px] text-text-grey-medium mt-1 leading-relaxed">
                    Mainly driven by steep housing rates, the monthly living baseline for a single student exceeds A$3,200.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-text-charcoal text-sm block">Mid-tier regional balance</span>
                  <p className="text-[15px] text-text-grey-medium mt-1 leading-relaxed">
                    Brisbane, Adelaide, and Hobart offer slightly lower averages ranging between A$2,600 and A$2,700 monthly.
                  </p>
                </div>
              </div>
            </div>

            {/* Selected stats box */}
            {selectedCity && (
              <div className="p-6 bg-brand-teal/5 border border-brand-teal/20 rounded-xl shadow-sm">
                <span className="text-[10px] text-brand-teal uppercase tracking-wider font-bold block mb-1">Your Focus Selection</span>
                <h4 className="text-lg font-bold text-text-charcoal">{selectedCity}</h4>
                <p className="text-sm text-text-grey-medium mt-1">
                  Selected target city is highlighted in teal on the comparison dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
