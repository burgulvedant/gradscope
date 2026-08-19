# LifeCost V1 — Data Source Map

## Cities

1. Sydney
2. Melbourne
3. Brisbane
4. Adelaide
5. Perth
6. Hobart
7. Darwin
8. Canberra

## Categories

### Housing
- Shared accommodation
- 1-bedroom apartment

### Food
- Groceries
- Eating out

### Transport
- Public transport
- Fuel

### Utilities
- Electricity
- Internet
- Mobile

### Education
- Student-related education cost

### Lifestyle
- Gym
- Entertainment
- Miscellaneous

---

## Data Rules

- Currency: AUD
- Frequency: Monthly
- Year: 2026
- Every observation must have a source.
- Raw source values must not be invented.
- If a source uses weekly pricing, convert it to monthly during the Python cleaning stage.
- Keep the original source information documented.
- Do not add new categories or subcategories for V1.

---

## Primary Source

Australian Bureau of Statistics (ABS)

Consumer Price Index, Australia — June 2026

ABS capital-city CPI data will be used for the cost-trend analysis.

Relevant ABS tables:

- Table 10 — CPI Group, Sub-group and Expenditure Class, Index Numbers by Capital City
- Table 11 — Annual percentage change by Capital City
- Table 12 — Monthly percentage change by Capital City
- Table 16 — Analytical Series by Capital City

Source:
https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/jun-2026

---

## Important Data Distinction

CPI is an index measuring price change.

It is NOT a monthly dollar cost.

Therefore:

- CPI data → used for trend analysis.
- Actual prices → used for monthly cost estimates.

We must not convert a CPI index directly into a fake monthly living cost.

---

## Actual Cost Sources

For the personalized monthly estimate, each subcategory must use an appropriate real-world source.

Housing:
- City-level rental/accommodation source

Food:
- Appropriate Australian food-price source

Transport:
- Official state/city transport source where available

Utilities:
- Appropriate Australian utility/provider/regulatory source

Education:
- Appropriate official Australian student/education source

Lifestyle:
- Appropriate city-level pricing source

Every actual cost observation must record its source in lifecost_data.csv.