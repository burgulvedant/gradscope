export interface EducationRecord {
  city: string;
  university: string;
  course: string;
  available: boolean;
  durationYears: number | null;
  annualTuitionFeeAud: number | null; // Null if unavailable
  feeYear: number;
  delivery: string;
  campus: string;
  notes: string;
}

export interface CityCostOfLiving {
  city: string;
  numbeoUpdateDate: string;
  milk_1l: number;
  bread_500g: number;
  rice_1kg: number;
  eggs_12: number;
  local_cheese_1kg: number;
  chicken_1kg: number;
  beef_1kg: number;
  apples_1kg: number;
  bananas_1kg: number;
  oranges_1kg: number;
  tomatoes_1kg: number;
  potatoes_1kg: number;
  onions_1kg: number;
  lettuce_1head: number;
  water_15l: number;
  transport_monthly_pass: number;
  utilities_85sqm: number;
  mobile_plan: number;
  internet: number;
  rent_1br_outside_centre: number;
}

export interface CostBreakdownItem {
  name: string;
  monthlyCost: number;
  annualCost: number;
  details?: {
    name: string;
    unitPrice?: number;
    quantity?: number;
    monthlyCost: number;
  }[];
}

export interface CalculationResult {
  city: string;
  university: string;
  course: string;
  durationMinYears: number | null;
  durationMaxYears: number | null;
  annualTuition: number | null; // null if unavailable
  scholarshipPercent: number;
  remainingTuitionMin: number | null;
  remainingTuitionMax: number | null;
  monthlyLiving: number;
  livingCostMin: number;
  livingCostMax: number;
  totalCostMin: number | null;
  totalCostMax: number | null;
  tuitionAvailable: boolean;
  
  // Specific breakdowns
  housingMonthly: number;
  foodMonthly: number;
  transportMonthly: number;
  utilitiesMonthly: number;
  
  // Details for accordion
  foodItems: {
    name: string;
    unitPrice: number;
    quantity: number;
    monthlyCost: number;
  }[];
  utilitiesItems: {
    name: string;
    monthlyCost: number;
  }[];

  // Backward compatibility fields
  durationYears: number | null;
  estimatedTotalMastersCost: number | null;
  annualLiving: number;
  annualCombined: number | null;
}
