import type { EducationRecord, CityCostOfLiving, CalculationResult } from '../types';

export const CITIES_COST_OF_LIVING: CityCostOfLiving[] = [
  {
    "city": "Sydney",
    "numbeoUpdateDate": "2026-08-15",
    "milk_1l": 2.65,
    "bread_500g": 3.7,
    "rice_1kg": 3.36,
    "eggs_12": 7.7,
    "local_cheese_1kg": 17.39,
    "chicken_1kg": 13.73,
    "beef_1kg": 23.43,
    "apples_1kg": 5.23,
    "bananas_1kg": 4.36,
    "oranges_1kg": 4.71,
    "tomatoes_1kg": 6.49,
    "potatoes_1kg": 4.32,
    "onions_1kg": 3.5,
    "lettuce_1head": 3.3,
    "water_15l": 1.72,
    "transport_monthly_pass": 217.39,
    "utilities_85sqm": 319.84,
    "mobile_plan": 36.0,
    "internet": 79.16,
    "rent_1br_outside_centre": 2403.33
  },
  {
    "city": "Melbourne",
    "numbeoUpdateDate": "2026-08-17",
    "milk_1l": 2.46,
    "bread_500g": 4.61,
    "rice_1kg": 4.0,
    "eggs_12": 8.49,
    "local_cheese_1kg": 15.14,
    "chicken_1kg": 13.62,
    "beef_1kg": 21.64,
    "apples_1kg": 5.95,
    "bananas_1kg": 4.43,
    "oranges_1kg": 4.76,
    "tomatoes_1kg": 6.92,
    "potatoes_1kg": 4.66,
    "onions_1kg": 3.87,
    "lettuce_1head": 3.56,
    "water_15l": 2.32,
    "transport_monthly_pass": 198.0,
    "utilities_85sqm": 320.71,
    "mobile_plan": 39.7,
    "internet": 79.47,
    "rent_1br_outside_centre": 1979.54
  },
  {
    "city": "Brisbane",
    "numbeoUpdateDate": "2026-08-17",
    "milk_1l": 2.5,
    "bread_500g": 3.75,
    "rice_1kg": 3.01,
    "eggs_12": 7.22,
    "local_cheese_1kg": 13.23,
    "chicken_1kg": 12.41,
    "beef_1kg": 19.85,
    "apples_1kg": 5.75,
    "bananas_1kg": 4.31,
    "oranges_1kg": 4.25,
    "tomatoes_1kg": 7.01,
    "potatoes_1kg": 4.04,
    "onions_1kg": 3.35,
    "lettuce_1head": 3.56,
    "water_15l": 1.78,
    "transport_monthly_pass": 30.0,
    "utilities_85sqm": 251.4,
    "mobile_plan": 42.12,
    "internet": 88.24,
    "rent_1br_outside_centre": 2018.44
  },
  {
    "city": "Perth",
    "numbeoUpdateDate": "2026-08-14",
    "milk_1l": 2.34,
    "bread_500g": 4.33,
    "rice_1kg": 2.86,
    "eggs_12": 7.49,
    "local_cheese_1kg": 12.42,
    "chicken_1kg": 13.14,
    "beef_1kg": 19.86,
    "apples_1kg": 6.34,
    "bananas_1kg": 4.6,
    "oranges_1kg": 4.73,
    "tomatoes_1kg": 7.47,
    "potatoes_1kg": 4.03,
    "onions_1kg": 2.79,
    "lettuce_1head": 3.26,
    "water_15l": 1.91,
    "transport_monthly_pass": 140.0,
    "utilities_85sqm": 287.69,
    "mobile_plan": 45.93,
    "internet": 89.0,
    "rent_1br_outside_centre": 2272.0
  },
  {
    "city": "Adelaide",
    "numbeoUpdateDate": "2026-08-15",
    "milk_1l": 2.93,
    "bread_500g": 4.15,
    "rice_1kg": 3.16,
    "eggs_12": 8.07,
    "local_cheese_1kg": 15.46,
    "chicken_1kg": 13.13,
    "beef_1kg": 24.92,
    "apples_1kg": 5.59,
    "bananas_1kg": 4.23,
    "oranges_1kg": 5.2,
    "tomatoes_1kg": 7.14,
    "potatoes_1kg": 4.71,
    "onions_1kg": 3.46,
    "lettuce_1head": 3.62,
    "water_15l": 3.23,
    "transport_monthly_pass": 120.0,
    "utilities_85sqm": 257.39,
    "mobile_plan": 35.08,
    "internet": 78.5,
    "rent_1br_outside_centre": 1930.0
  },
  {
    "city": "Canberra",
    "numbeoUpdateDate": "2026-08-17",
    "milk_1l": 2.29,
    "bread_500g": 4.7,
    "rice_1kg": 3.74,
    "eggs_12": 7.61,
    "local_cheese_1kg": 19.68,
    "chicken_1kg": 15.23,
    "beef_1kg": 22.8,
    "apples_1kg": 5.71,
    "bananas_1kg": 4.53,
    "oranges_1kg": 5.02,
    "tomatoes_1kg": 7.22,
    "potatoes_1kg": 4.46,
    "onions_1kg": 3.77,
    "lettuce_1head": 3.84,
    "water_15l": 2.06,
    "transport_monthly_pass": 132.8,
    "utilities_85sqm": 263.39,
    "mobile_plan": 39.43,
    "internet": 79.6,
    "rent_1br_outside_centre": 2111.82
  },
  {
    "city": "Hobart",
    "numbeoUpdateDate": "2026-08-01",
    "milk_1l": 2.55,
    "bread_500g": 3.52,
    "rice_1kg": 2.66,
    "eggs_12": 8.08,
    "local_cheese_1kg": 13.95,
    "chicken_1kg": 12.43,
    "beef_1kg": 25.0,
    "apples_1kg": 4.46,
    "bananas_1kg": 4.67,
    "oranges_1kg": 4.23,
    "tomatoes_1kg": 6.65,
    "potatoes_1kg": 3.7,
    "onions_1kg": 3.15,
    "lettuce_1head": 3.7,
    "water_15l": 2.37,
    "transport_monthly_pass": 140.0,
    "utilities_85sqm": 320.11,
    "mobile_plan": 41.12,
    "internet": 86.47,
    "rent_1br_outside_centre": 1970.0
  },
  {
    "city": "Darwin",
    "numbeoUpdateDate": "2026-07-10",
    "milk_1l": 2.17,
    "bread_500g": 4.35,
    "rice_1kg": 3.21,
    "eggs_12": 6.34,
    "local_cheese_1kg": 13.0,
    "chicken_1kg": 12.0,
    "beef_1kg": 13.0,
    "apples_1kg": 5.62,
    "bananas_1kg": 4.0,
    "oranges_1kg": 3.98,
    "tomatoes_1kg": 7.22,
    "potatoes_1kg": 3.67,
    "onions_1kg": 3.37,
    "lettuce_1head": 3.0,
    "water_15l": 3.07,
    "transport_monthly_pass": 69.69,
    "utilities_85sqm": 311.56,
    "mobile_plan": 48.33,
    "internet": 87.0,
    "rent_1br_outside_centre": 2426.67
  },
  {
    "city": "Gold Coast",
    "numbeoUpdateDate": "2026-06-01",
    "milk_1l": 2.33,
    "bread_500g": 3.86,
    "rice_1kg": 3.4,
    "eggs_12": 6.91,
    "local_cheese_1kg": 12.68,
    "chicken_1kg": 13.45,
    "beef_1kg": 21.04,
    "apples_1kg": 5.55,
    "bananas_1kg": 4.45,
    "oranges_1kg": 4.88,
    "tomatoes_1kg": 6.05,
    "potatoes_1kg": 3.67,
    "onions_1kg": 3.56,
    "lettuce_1head": 3.56,
    "water_15l": 3.36,
    "transport_monthly_pass": 80.0,
    "utilities_85sqm": 311.81,
    "mobile_plan": 43.59,
    "internet": 77.0,
    "rent_1br_outside_centre": 2127.5
  }
];

export const EDUCATION_RECORDS: EducationRecord[] = [
  {
    "city": "Melbourne",
    "university": "RMIT University",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 44160.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Melbourne City",
    "notes": "Official course page; international annual fee"
  },
  {
    "city": "Melbourne",
    "university": "RMIT University",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Melbourne City",
    "notes": "Course confirmed for 2026; 2026 international fee not exposed on current official page"
  },
  {
    "city": "Melbourne",
    "university": "RMIT University",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Melbourne City",
    "notes": "Course confirmed; current official page exposes 2027 international fee, not a 2026 on-campus international fee"
  },
  {
    "city": "Melbourne",
    "university": "Deakin University",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 44200.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Burwood",
    "notes": "Official international course page"
  },
  {
    "city": "Melbourne",
    "university": "Deakin University",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 44200.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Burwood",
    "notes": "Official international course page"
  },
  {
    "city": "Melbourne",
    "university": "Deakin University",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 50400.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Burwood",
    "notes": "Official international title is Master of Business Administration (International); standardized here to locked GradScope course"
  },
  {
    "city": "Melbourne",
    "university": "The University of Melbourne",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 57984.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Parkville",
    "notes": "2026 international fee per EFTSL"
  },
  {
    "city": "Melbourne",
    "university": "The University of Melbourne",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Parkville",
    "notes": "Course confirmed for 2026; exact 2026 international fee not captured in the verified source set"
  },
  {
    "city": "Melbourne",
    "university": "The University of Melbourne",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 56268.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Parkville",
    "notes": "Derived from official 2026 indicative total course fee A$112,536 / 2 years"
  },
  {
    "city": "Sydney",
    "university": "UNSW Sydney",
    "course": "Master of Data Science",
    "available": false,
    "durationYears": null,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Kensington",
    "notes": "UNSW offers Master of Data Science and Decisions, not the locked exact course name"
  },
  {
    "city": "Sydney",
    "university": "UNSW Sydney",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 63000.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Kensington",
    "notes": "Official 2026 indicative first-year international full fee"
  },
  {
    "city": "Sydney",
    "university": "UNSW Sydney",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 1.0,
    "annualTuitionFeeAud": 83500.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Kensington",
    "notes": "AGSM full-time MBA; official 2026 international fee"
  },
  {
    "city": "Sydney",
    "university": "Macquarie University",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "North Ryde",
    "notes": "Exact course confirmed; 2026 international fee not captured in verified source set"
  },
  {
    "city": "Sydney",
    "university": "Macquarie University",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "North Ryde",
    "notes": "Exact course confirmed; 2026 international fee not captured in verified source set"
  },
  {
    "city": "Sydney",
    "university": "Macquarie University",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "North Ryde",
    "notes": "Exact course confirmed; 2026 international fee not captured in verified source set"
  },
  {
    "city": "Brisbane",
    "university": "University of Queensland",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 60952.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Brisbane",
    "notes": "Official 2026 international annual fee; course can also be 1.5 years depending on pathway"
  },
  {
    "city": "Brisbane",
    "university": "University of Queensland",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 58056.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Brisbane",
    "notes": "Official 2026 international annual fee"
  },
  {
    "city": "Brisbane",
    "university": "University of Queensland",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 1.5,
    "annualTuitionFeeAud": 69112.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Brisbane",
    "notes": "Official 2026 international annual fee"
  },
  {
    "city": "Brisbane",
    "university": "Queensland University of Technology",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": null,
    "annualTuitionFeeAud": 44200.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Brisbane",
    "notes": "Official 2026 international fee; duration not captured in verified source set"
  },
  {
    "city": "Brisbane",
    "university": "Queensland University of Technology",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": null,
    "annualTuitionFeeAud": 45000.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Brisbane",
    "notes": "Official 2026 international fee; duration not captured in verified source set"
  },
  {
    "city": "Brisbane",
    "university": "James Cook University",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 1.5,
    "annualTuitionFeeAud": 33133.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Brisbane",
    "notes": "Official 2026 estimated annual international tuition"
  },
  {
    "city": "Adelaide",
    "university": "Adelaide University",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 57100.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Adelaide City / Mawson Lakes",
    "notes": "Official 2026 international annual fee"
  },
  {
    "city": "Adelaide",
    "university": "Adelaide University",
    "course": "Master of Information Technology",
    "available": false,
    "durationYears": null,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Adelaide",
    "notes": "Exact locked course name not found; Adelaide University offers named MIT specialisations such as Applied AI, Cyber Security, Enterprise Management and Computing & Innovation"
  },
  {
    "city": "Adelaide",
    "university": "Adelaide University",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 1.5,
    "annualTuitionFeeAud": 54900.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Adelaide City",
    "notes": "Official 2026 international annual fee"
  },
  {
    "city": "Canberra",
    "university": "University of Canberra",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 42000.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Bruce",
    "notes": "Official international course guide: 2026 annual fee A$42,000"
  },
  {
    "city": "Canberra",
    "university": "University of Canberra",
    "course": "Master of Information Technology",
    "available": false,
    "durationYears": null,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Bruce",
    "notes": "UC's 2026 exact offering is Master of Information Technology and Systems, not the locked exact course name"
  },
  {
    "city": "Canberra",
    "university": "University of Canberra",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 1.5,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Bruce",
    "notes": "Exact course confirmed for international admissions; 2026 international fee not captured in verified source set"
  },
  {
    "city": "Perth",
    "university": "The University of Western Australia",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 52000.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Perth",
    "notes": "Official 2026 international annual fee"
  },
  {
    "city": "Perth",
    "university": "The University of Western Australia",
    "course": "Master of Information Technology",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Perth",
    "notes": "Exact course confirmed and available to international students; fee calculator value not captured in verified source set"
  },
  {
    "city": "Perth",
    "university": "The University of Western Australia",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 1.5,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Perth",
    "notes": "Exact MBA confirmed; fee calculator value not captured in verified source set"
  },
  {
    "city": "Hobart",
    "university": "University of Tasmania",
    "course": "Master of Data Science",
    "available": false,
    "durationYears": null,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Hobart",
    "notes": "No exact Master of Data Science verified in the 2026 international course guide"
  },
  {
    "city": "Hobart",
    "university": "University of Tasmania",
    "course": "Master of Information Technology",
    "available": false,
    "durationYears": null,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Hobart",
    "notes": "Exact offering is Master of Information Technology and Systems, not the locked exact course name"
  },
  {
    "city": "Hobart",
    "university": "University of Tasmania",
    "course": "Master of Business Administration",
    "available": false,
    "durationYears": null,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Hobart",
    "notes": "Exact offering is Master of Business Administration (Global), not the locked exact course name"
  },
  {
    "city": "Darwin",
    "university": "Charles Darwin University",
    "course": "Master of Data Science",
    "available": true,
    "durationYears": 2.0,
    "annualTuitionFeeAud": 36809.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Darwin / Danala ECP",
    "notes": "2026 international fee verified from course listing"
  },
  {
    "city": "Darwin",
    "university": "Charles Darwin University",
    "course": "Master of Information Technology",
    "available": false,
    "durationYears": null,
    "annualTuitionFeeAud": null,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Darwin",
    "notes": "CDU's 2026 IT offerings are named specialisations (AI, Software Engineering, Information Systems, Cyber Security), not the locked exact course"
  },
  {
    "city": "Darwin",
    "university": "Charles Darwin University",
    "course": "Master of Business Administration",
    "available": true,
    "durationYears": 1.5,
    "annualTuitionFeeAud": 38560.0,
    "feeYear": 2026,
    "delivery": "On campus",
    "campus": "Darwin / Danala ECP",
    "notes": "2026 international fee verified from course listing"
  }
];

export const FOOD_QUANTITIES = {
  "Milk (1L)": 8,
  "Bread (500g)": 8,
  "Rice (1kg)": 4,
  "Eggs (12)": 2,
  "Chicken (1kg)": 2,
  "Beef (1kg)": 1
};

export const FOOD_COLUMN_MAP = {
  "Milk (1L)": "milk_1l",
  "Bread (500g)": "bread_500g",
  "Rice (1kg)": "rice_1kg",
  "Eggs (12)": "eggs_12",
  "Chicken (1kg)": "chicken_1kg",
  "Beef (1kg)": "beef_1kg"
};

// Service Methods
export const getCities = (): string[] => {
  return Array.from(new Set(CITIES_COST_OF_LIVING.map(c => c.city))).sort();
};

export const getUniversities = (city: string): string[] => {
  return Array.from(
    new Set(
      EDUCATION_RECORDS
        .filter(r => r.city.toLowerCase() === city.toLowerCase() && r.available)
        .map(r => r.university)
    )
  ).sort();
};

export const getCourses = (city: string, university: string): string[] => {
  return Array.from(
    new Set(
      EDUCATION_RECORDS
        .filter(
          r =>
            r.city.toLowerCase() === city.toLowerCase() &&
            r.university.toLowerCase() === university.toLowerCase() &&
            r.available
        )
        .map(r => r.course)
    )
  ).sort();
};

export const getAvailableCourses = (): string[] => {
  return Array.from(new Set(EDUCATION_RECORDS.filter(r => r.available).map(r => r.course))).sort();
};

export const getCitiesForCourse = (courseName: string): string[] => {
  return Array.from(
    new Set(
      EDUCATION_RECORDS
        .filter(r => r.course.toLowerCase() === courseName.toLowerCase() && r.available)
        .map(r => r.city)
    )
  ).sort();
};

export const getUniversitiesForCourseAndCity = (courseName: string, cityName: string): string[] => {
  return Array.from(
    new Set(
      EDUCATION_RECORDS
        .filter(
          r =>
            r.course.toLowerCase() === courseName.toLowerCase() &&
            r.city.toLowerCase() === cityName.toLowerCase() &&
            r.available
        )
        .map(r => r.university)
    )
  ).sort();
};

export const getCityCostOfLiving = (cityName: string): CityCostOfLiving | undefined => {
  return CITIES_COST_OF_LIVING.find(c => c.city.toLowerCase() === cityName.toLowerCase());
};

export const calculateLifeCost = (
  city: string,
  university: string,
  course: string
): CalculationResult | null => {
  const col = getCityCostOfLiving(city);
  const edu = EDUCATION_RECORDS.find(
    r =>
      r.city.toLowerCase() === city.toLowerCase() &&
      r.university.toLowerCase() === university.toLowerCase() &&
      r.course.toLowerCase() === course.toLowerCase()
  );

  if (!col || !edu) return null;

  // Calculate detailed Food monthly cost
  const foodItems = Object.entries(FOOD_QUANTITIES).map(([name, quantity]) => {
    const key = FOOD_COLUMN_MAP[name as keyof typeof FOOD_COLUMN_MAP] as keyof CityCostOfLiving;
    const unitPrice = col[key] as number;
    return {
      name,
      unitPrice,
      quantity,
      monthlyCost: Number((unitPrice * quantity).toFixed(2))
    };
  });
  
  const foodMonthly = Number(foodItems.reduce((acc, item) => acc + item.monthlyCost, 0).toFixed(2));

  // Housing
  const housingMonthly = col.rent_1br_outside_centre;

  // Transport
  const transportMonthly = col.transport_monthly_pass;

  // Utilities
  const utilitiesMonthly = Number((col.utilities_85sqm + col.mobile_plan + col.internet).toFixed(2));
  
  const utilitiesItems = [
    { name: 'Basic Utilities (Electricity, Heating, Cooling, Water)', monthlyCost: col.utilities_85sqm },
    { name: 'Mobile Phone Plan', monthlyCost: col.mobile_plan },
    { name: 'Internet (Unlimited Data, 60 Mbps or more)', monthlyCost: col.internet }
  ];

  // Total living cost monthly
  const monthlyLiving = Number((housingMonthly + foodMonthly + transportMonthly + utilitiesMonthly).toFixed(2));
  const annualLiving = Number((monthlyLiving * 12).toFixed(2));

  const durationYears = edu.durationYears ?? 2.0;
  const annualTuition = edu.annualTuitionFeeAud;
  
  const annualCombined = annualTuition !== null 
    ? Number((annualTuition + annualLiving).toFixed(2)) 
    : null;
    
  const estimatedTotalMastersCost = annualTuition !== null
    ? Number((annualCombined! * durationYears).toFixed(2))
    : null;

  return {
    city,
    university,
    course,
    durationMinYears: durationYears,
    durationMaxYears: durationYears,
    annualTuition,
    scholarshipPercent: 0,
    remainingTuitionMin: annualTuition !== null ? annualTuition * durationYears : null,
    remainingTuitionMax: annualTuition !== null ? annualTuition * durationYears : null,
    monthlyLiving,
    livingCostMin: annualLiving,
    livingCostMax: annualLiving,
    totalCostMin: estimatedTotalMastersCost,
    totalCostMax: estimatedTotalMastersCost,
    tuitionAvailable: annualTuition !== null,

    housingMonthly,
    foodMonthly,
    transportMonthly,
    utilitiesMonthly,
    
    // Legacy fields aliases
    durationYears,
    estimatedTotalMastersCost,
    annualLiving,
    annualCombined,
    
    foodItems,
    utilitiesItems
  };
};
