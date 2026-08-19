import csv
import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parents[1]
RAW_EDU_PATH = BASE_DIR / "data" / "raw" / "lifecost_education_2026.csv"
CLEAN_COL_PATH = BASE_DIR / "data" / "processed" / "australia_cost_of_living_clean.csv"
OUTPUT_CSV_PATH = BASE_DIR / "data" / "processed" / "lifecost_final_2026.csv"

food_items_quantities = {
    "milk_1l": 8,
    "bread_500g": 8,
    "rice_1kg": 4,
    "eggs_12": 2,
    "local_cheese_1kg": 0.5,
    "chicken_1kg": 2,
    "beef_1kg": 1,
    "apples_1kg": 2,
    "bananas_1kg": 2,
    "oranges_1kg": 1,
    "tomatoes_1kg": 2,
    "potatoes_1kg": 2,
    "onions_1kg": 1,
    "lettuce_1head": 4,
    "water_15l": 4
}

def generate_data():
    # 1. Load city cost data
    city_costs = {}
    with open(CLEAN_COL_PATH, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            city_name = row["city"].strip()
            city_key = city_name.lower()
            city_costs[city_key] = {}
            for k, v in row.items():
                if k not in ["city", "numbeo_update_date", "data_status"]:
                    city_costs[city_key][k] = float(v) if (v and v.strip()) else 0.0
            city_costs[city_key]["city_original_name"] = city_name
            
    # 2. Process education records
    output_rows = []
    
    with open(RAW_EDU_PATH, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for edu in reader:
            if edu["available"].strip().lower() != "yes":
                continue
                
            city_name = edu["city"].strip()
            city_key = city_name.lower()
            
            if city_key not in city_costs:
                print(f"Warning: City {city_name} not found in cost of living dataset.")
                continue
                
            col = city_costs[city_key]
            
            # Calculate living costs
            monthly_rent = col.get("rent_1br_outside_centre", 0.0)
            
            # Food cost
            monthly_food = 0.0
            for item, qty in food_items_quantities.items():
                monthly_food += col.get(item, 0.0) * qty
            monthly_food = round(monthly_food, 2)
            
            # Transport
            monthly_transport = col.get("transport_monthly_pass", 0.0)
            
            # Utilities
            monthly_utilities = (
                col.get("utilities_85sqm", 0.0) +
                col.get("internet", 0.0) +
                col.get("mobile_plan", 0.0)
            )
            monthly_utilities = round(monthly_utilities, 2)
            
            total_monthly = round(monthly_rent + monthly_food + monthly_transport + monthly_utilities, 2)
            annual_living = round(total_monthly * 12, 2)
            
            # Tuition & Duration
            duration_str = edu["duration_years"].strip()
            duration = float(duration_str) if duration_str else None
            
            tuition_str = edu["annual_tuition_fee_aud"].strip()
            annual_tuition = float(tuition_str) if tuition_str else None
            
            # Calculations
            if annual_tuition is not None:
                annual_total = round(annual_tuition + annual_living, 2)
            else:
                annual_total = None
                
            if annual_total is not None and duration is not None:
                estimated_masters = round(annual_total * duration, 2)
            else:
                estimated_masters = None
                
            output_rows.append({
                "city": col["city_original_name"],
                "university": edu["university"].strip(),
                "course": edu["course"].strip(),
                "duration_years": duration if duration is not None else "",
                "annual_tuition_fee_aud": annual_tuition if annual_tuition is not None else "",
                "monthly_rent_cost": monthly_rent,
                "monthly_food_cost": monthly_food,
                "monthly_transport_cost": monthly_transport,
                "monthly_utilities_cost": monthly_utilities,
                "total_monthly_living_cost": total_monthly,
                "annual_living_cost": annual_living,
                "annual_total_cost": annual_total if annual_total is not None else "",
                "estimated_total_masters_cost": estimated_masters if estimated_masters is not None else ""
            })
            
    # Write output to CSV
    fieldnames = [
        "city", "university", "course", "duration_years", "annual_tuition_fee_aud",
        "monthly_rent_cost", "monthly_food_cost", "monthly_transport_cost",
        "monthly_utilities_cost", "total_monthly_living_cost", "annual_living_cost",
        "annual_total_cost", "estimated_total_masters_cost"
    ]
    
    os.makedirs(OUTPUT_CSV_PATH.parent, exist_ok=True)
    with open(OUTPUT_CSV_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(output_rows)
        
    print(f"Generated {len(output_rows)} processed education cost records in {OUTPUT_CSV_PATH}")

if __name__ == "__main__":
    generate_data()
