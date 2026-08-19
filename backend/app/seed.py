import csv
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from .database import DATABASE_URL, Base
from .models import CourseCost


CSV_PATH = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "processed"
    / "gradscope_calculator_2026.csv"
)

RAW_COL_PATH = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "raw"
    / "australia_cost_of_living_2026_v2.csv"
)

engine = create_engine(DATABASE_URL)

# Food basket quantities defined in GradScope v1 methodology
food_basket = {
    "milk_1l": 8,
    "bread_500g": 8,
    "rice_1kg": 4,
    "eggs_12": 2,
    "chicken_1kg": 2,
    "beef_1kg": 1
}


def seed_database():
    with Session(engine) as session:
        # Recreate tables to ensure schema matches model definitions
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
        
        # Load city-level raw cost data
        raw_costs = {}
        with open(RAW_COL_PATH, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                city_name = row["city"].strip()
                raw_costs[city_name.lower()] = row

        with open(CSV_PATH, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            rows = []

            for row in reader:
                city = row["city"].strip()
                col = raw_costs.get(city.lower())
                
                if not col:
                    print(f"Warning: City {city} not found in raw costs!")
                    rent = 0.0
                    food = 0.0
                    transport = 0.0
                    utilities = 0.0
                else:
                    rent = float(col["rent_1br_outside_centre"])
                    transport = float(col["transport_monthly_pass"])
                    utilities = float(col["utilities_85sqm"])
                    
                    # Sum food basket elements
                    food = 0.0
                    for item, qty in food_basket.items():
                        food += float(col[item]) * qty
                    food = round(food, 2)

                def safe_float(val):
                    return float(val) if (val and val.strip() and val.strip().lower() not in ["null", "nan", "none", ""]) else None

                def safe_bool(val):
                    return val.strip().lower() in ["true", "yes", "1"]

                duration_min = safe_float(row["duration_min_years"])
                duration_max = safe_float(row["duration_max_years"])
                annual_tuition = safe_float(row["annual_tuition_aud"])
                
                remaining_tuition_min = safe_float(row["remaining_tuition_min_aud"])
                remaining_tuition_max = safe_float(row["remaining_tuition_max_aud"])
                monthly_living = float(row["monthly_living_cost_aud"])
                living_cost_min = float(row["living_cost_min_aud"])
                living_cost_max = float(row["living_cost_max_aud"])
                
                total_cost_min = safe_float(row["total_cost_min_aud"])
                total_cost_max = safe_float(row["total_cost_max_aud"])
                tuition_available = safe_bool(row["tuition_available"])

                # Calculate legacy values for backward compatibility
                duration = duration_min if duration_min is not None else 0.0
                annual_living = round(monthly_living * 12, 2)
                
                if annual_tuition is not None:
                    annual_total = annual_tuition + annual_living
                    estimated_total = total_cost_min if total_cost_min is not None else (annual_tuition + annual_living) * duration
                else:
                    annual_total = annual_living
                    estimated_total = living_cost_min if living_cost_min is not None else annual_living * duration

                rows.append(
                    CourseCost(
                        city=city,
                        university=row["university"].strip(),
                        course=row["course"].strip(),
                        
                        duration_min_years=duration_min,
                        duration_max_years=duration_max,
                        annual_tuition_aud=annual_tuition,
                        remaining_tuition_min_aud=remaining_tuition_min,
                        remaining_tuition_max_aud=remaining_tuition_max,
                        monthly_living_cost_aud=monthly_living,
                        living_cost_min_aud=living_cost_min,
                        living_cost_max_aud=living_cost_max,
                        total_cost_min_aud=total_cost_min,
                        total_cost_max_aud=total_cost_max,
                        tuition_available=tuition_available,

                        duration_years=duration,
                        annual_tuition_fee_aud=annual_tuition,
                        monthly_rent_cost=rent,
                        monthly_food_cost=food,
                        monthly_transport_cost=transport,
                        monthly_utilities_cost=utilities,
                        total_monthly_living_cost=monthly_living,
                        annual_living_cost=annual_living,
                        annual_total_cost=annual_total,
                        estimated_total_masters_cost=estimated_total,
                    )
                )

            session.add_all(rows)
            session.commit()

            print(f"Successfully imported {len(rows)} rows.")


if __name__ == "__main__":
    seed_database()