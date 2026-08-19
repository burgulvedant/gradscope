import type { CalculationResult } from '../types';
import { getCityCostOfLiving, FOOD_QUANTITIES, FOOD_COLUMN_MAP } from './dataService';

const API_BASE_URL = 'http://127.0.0.1:8000';

export interface CourseComparisonRecord {
  city: string;
  university: string;
  course: string;
  duration_min_years: number | null;
  duration_max_years: number | null;
  annual_tuition_aud: number | null;
  scholarship_percent: number;
  remaining_tuition_min_aud: number | null;
  remaining_tuition_max_aud: number | null;
  monthly_living_cost_aud: number;
  living_cost_min_aud: number;
  living_cost_max_aud: number;
  total_cost_min_aud: number | null;
  total_cost_max_aud: number | null;
  tuition_available: boolean;

  // Legacy fields for backward compatibility
  duration_years: number | null;
  annual_tuition_fee_aud: number | null;
  monthly_rent_cost: number;
  monthly_food_cost: number;
  monthly_transport_cost: number;
  monthly_utilities_cost: number;
  total_monthly_living_cost: number;
  annual_living_cost: number;
  annual_total_cost: number | null;
  estimated_total_masters_cost: number | null;
}

export const getCourseCost = async (
  city: string,
  university: string,
  course: string,
  scholarshipPercent: number = 0
): Promise<CalculationResult | null> => {
  const params = new URLSearchParams({
    city,
    university,
    course,
    scholarship_percent: scholarshipPercent.toString()
  });

  const response = await fetch(
    `${API_BASE_URL}/api/course-cost?${params.toString()}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  const col = getCityCostOfLiving(data.city);

  let foodItems: any[] = [];
  if (col) {
    foodItems = Object.entries(FOOD_QUANTITIES).map(([name, quantity]) => {
      const key = FOOD_COLUMN_MAP[name as keyof typeof FOOD_COLUMN_MAP] as keyof typeof col;
      const unitPrice = col[key] as number;
      return {
        name,
        unitPrice,
        quantity,
        monthlyCost: Number((unitPrice * quantity).toFixed(2))
      };
    });
  }

  const utilitiesItems = col ? [
    { name: 'Basic Utilities (Electricity, Heating, Cooling, Water)', monthlyCost: col.utilities_85sqm }
  ] : [];

  return {
    city: data.city,
    university: data.university,
    course: data.course,
    durationMinYears: data.duration_min_years,
    durationMaxYears: data.duration_max_years,
    annualTuition: data.annual_tuition_aud,
    scholarshipPercent: data.scholarship_percent,
    remainingTuitionMin: data.remaining_tuition_min_aud,
    remainingTuitionMax: data.remaining_tuition_max_aud,
    monthlyLiving: data.monthly_living_cost_aud,
    livingCostMin: data.living_cost_min_aud,
    livingCostMax: data.living_cost_max_aud,
    totalCostMin: data.total_cost_min_aud,
    totalCostMax: data.total_cost_max_aud,
    tuitionAvailable: data.tuition_available,

    housingMonthly: data.monthly_rent_cost,
    foodMonthly: data.monthly_food_cost,
    transportMonthly: data.monthly_transport_cost,
    utilitiesMonthly: data.monthly_utilities_cost,

    // Legacy fields aliases
    durationYears: data.duration_min_years,
    estimatedTotalMastersCost: data.total_cost_min_aud,
    annualLiving: data.monthly_living_cost_aud * 12,
    annualCombined: data.annual_total_cost,

    foodItems,
    utilitiesItems
  };
};

export const getCourseComparison = async (
  course: string
): Promise<CourseComparisonRecord[]> => {
  const params = new URLSearchParams({
    course,
  });

  const response = await fetch(
    `${API_BASE_URL}/api/course-comparison?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return await response.json();
};

export const getCourses = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/api/courses`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return await response.json();
};