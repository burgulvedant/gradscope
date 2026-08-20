# GradScope

An interactive study-planning financial calculator helping international students compare Master's program tuition, scholarships, and city-level living costs in Australia.

[🌐 Live Demo](https://gradscope.netlify.app) | [💻 GitHub Repository](https://github.com/burgulvedant/gradscope)

---

## Overview

GradScope is a full-stack decision-support platform designed to help prospective international students plan their Master's education in Australia. By combining tuition fees, scholarship packages, program durations, and localized consumer indexes (rent, groceries, transit, utilities), the platform provides students with a single, clear estimated program-length baseline. This allows users to compare options across different cities and universities using a consistent cost baseline.

---

## The Problem

When researching international study opportunities, students are typically presented with tuition fees in isolation. This creates significant financial blind spots:
* **Hidden Local Costs:** Living expenses vary greatly between capital cities (e.g., Sydney vs. Hobart).
* **Varying Durations:** Different Master's programs take between 1 to 2+ years, scaling both living expenses and overall tuition requirements differently.
* **Scholarship Complexity:** Calculating the net tuition after a scholarship discount and combining it with local cost indices over the exact duration is complex and prone to errors.

---

## The Solution

GradScope solves this by providing a unified, transparent decision-support calculator. Instead of manually cross-referencing university brochures, Numbeo indexes, and currency exchange tables, students can select their desired course, city, and institution, apply their expected scholarship percentage, and immediately receive a personalized cost breakdown based on the project's 2026 dataset.

---

## Features

* **4-Step Configure Your Study Plan Wizard:** Interactive stepper guiding users to select a Course, City, University, and enter/configure an Expected Scholarship percentage.
* **Dynamic Viewport Stepper Transitions:** Planner page automatically center-scrolls to the next active step upon selection to guide the user seamlessly through the flow.
* **"Where Your Total Comes From" Cost Breakdown Card:** A clear comparative dashboard showing the cumulative program cost *Without Scholarship* vs. *With Scholarship*, highlighting net payable tuition and program-length savings.
* **Interactive Financial Visualization Charts:**
  * **Tuition vs. Living Expenses Split (Pie/Donut Chart):** Visualizes how much of the budget is allocated to study vs. living.
  * **Annual Cost Ratio (Bar Chart):** Compares the tuition fee to living costs on an annual basis.
  * **Monthly Expenses Breakdown (Horizontal Bar Chart):** Breaks down the monthly living baseline into Housing, Food, Transit, and Utilities.
* **Detailed Expandable Accordions:** Displays itemized grocery and utility costs dynamically mapped to the target city.
* **Institutional Comparison Table:** Compares the selected course against other universities across Australia offering the same program, showing comparative tuition, living, and total costs side-by-side.

---

## How GradScope Works

1. **Step 1: Select Course:** Choose from postgraduate programs (e.g., Master of Data Science).
2. **Step 2: Select City:** Select from capital cities where the program is offered (e.g., Melbourne, Sydney, Adelaide).
3. **Step 3: Choose University:** Pick the specific university (e.g., RMIT, Monash University).
4. **Step 4: Configure Scholarship:** Enter your expected scholarship percentage (0% to 100%) or use quick presets.
5. **Estimate:** Get the comprehensive cost breakdown and comparison charts instantly.

---

## Cost Calculation Methodology

The platform performs calculations based on the following standardized, program-length formulas:

$$\text{Total Tuition (Before Scholarship)} = \text{Annual Tuition Fee} \times \text{Program Duration (Years)}$$

$$\text{Scholarship Savings} = \text{Total Tuition (Before Scholarship)} \times \left(\frac{\text{Scholarship Percentage}}{100}\right)$$

$$\text{Tuition After Scholarship} = \text{Total Tuition (Before Scholarship)} - \text{Scholarship Savings}$$

$$\text{Living Costs} = \text{Monthly Living Cost} \times 12 \times \text{Program Duration (Years)}$$

$$\text{Estimated Master's Cost} = \text{Tuition After Scholarship} + \text{Living Costs}$$

---

## Tech Stack

* **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Recharts, Lucide React.
* **Backend:** FastAPI (Python), SQLAlchemy 2.0 (ORM), Pydantic, Uvicorn.
* **Database:** PostgreSQL, psycopg v3.
* **Data Processing & Analysis:** Pandas, Python CSV library, Jupyter Notebooks.
* **Hosting:** Netlify (Frontend), Render (FastAPI Backend + PostgreSQL Database).

---

## Data & Analysis

The application runs on a dataset containing **68 validated course/university combinations** across Australian capital cities:
* **Processed Dataset:** `data/processed/gradscope_calculator_2026.csv` (The source of truth for tuition and program duration baselines).
* **Raw Cost-of-Living Dataset:** `data/raw/australia_cost_of_living_2026_v2.csv` (Compiled city-level consumer prices).
* **Data Pipelines:** Jupyter Notebooks (`notebooks/01_data_cleaning.ipynb` to `04_build_lifecost_data_model.ipynb`) clean raw metrics, merge statistics, and build relational databases. Seeding is automated via `scripts/generate_processed_data.py` and `backend/app/seed.py`.

---

## API Endpoints

The FastAPI backend exposes the following REST endpoints:
* `GET /api/courses` - Returns available courses.
* `GET /api/cities` - Returns available capital cities.
* `GET /api/universities` - Returns universities, with optional `city` and `course` query parameters.
* `GET /api/course-cost` - Calculates and returns total cost indices for a combination (`city`, `university`, `course`, `scholarship_percent`).
* `GET /api/course-comparison` - Returns other institutional records matching the queried `course` name.

---

## Project Structure

```text
├── backend/
│   └── app/
│       ├── routes/          # API endpoint controllers (calculator, cities, universities)
│       ├── database.py      # SQLAlchemy connection, dynamic SSL & scheme parsing
│       ├── main.py          # FastAPI application initialization & CORS config
│       ├── models.py        # SQLAlchemy model schemas
│       └── seed.py          # PostgreSQL database seeder script
├── frontend/
│   ├── src/
│   │   ├── components/      # Shared layout visual blocks (Navbar, Footer, Comparisons)
│   │   ├── pages/           # Screen routing layout files (Landing, Planner, Results)
│   │   ├── services/        # Fetch API clients (apiService) & local static helpers (dataService)
│   │   └── types/           # TypeScript interfaces
│   └── package.json
├── data/
│   ├── raw/                 # Source Numbeo & education statistics
│   ├── processed/           # Cleaned datasets loaded by database seeder
│   └── analysis/            # Validation spreadsheets
├── notebooks/               # Jupyter cleaning & modeling pipelines
├── scripts/                 # Data generation helper scripts
└── requirements.txt         # FastAPI backend Python packages
```

---

## Getting Started

### Prerequisites
* Node.js (v18+) & npm
* Python (v3.10+)
* PostgreSQL running locally (optional, defaults to hosted Render service if DATABASE_URL is not set)

---

### Backend Setup

1. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables (Optional):**
   Set `DATABASE_URL` to point to your local PostgreSQL instance (default local fallback is `postgresql+psycopg://username:password@localhost:5432/gradscope_db`):
   ```bash
   export DATABASE_URL="postgresql+psycopg://username:password@localhost:5432/db_name"
   ```

4. **Initialize & Seed the Database:**
   ```bash
   python -m backend.app.seed
   ```

5. **Start the Backend Server:**
   ```bash
   uvicorn backend.app.main:app --reload
   ```
   The backend will start running on [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Vite automatically defaults to the production backend. If you want to connect to a local backend, create a `frontend/.env.local` file:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## Deployment

* **Frontend:** Deployed on **Netlify** at [https://gradscope.netlify.app](https://gradscope.netlify.app).
* **Backend:** Deployed on **Render** at [https://gradscope-api.onrender.com](https://gradscope-api.onrender.com).
* **Repository Source:** Hosted on GitHub at [https://github.com/burgulvedant/gradscope](https://github.com/burgulvedant/gradscope).
* **CI/CD Integration:** Builds and deploys automatically upon pushing new commits to the GitHub `main` branch.

---

## Current Limitations

* **2026 Data Horizon:** All tuition fee figures and Numbeo consumer pricing baselines correspond directly to the year 2026, without dynamic forecasting.
* **Postgraduate Focus:** The platform currently models Master's level programs only, excluding undergraduate, diploma, or doctoral structures.
* **Limited Selections:** The database is limited to 68 validated course/city/university combinations.
* **Stateless Wizard:** Configured selections in the wizard reset to Step 1 upon browser refresh.

---

## Future Improvements (V2 Roadmap)

* **Extended Program Support:** Expand datasets to encompass Bachelor's (undergraduate) and PhD research study models.
* **Wizard State Retention:** Integrate `localStorage` or session persistence to retain study selections upon page refresh.
* **Custom Grocery Basket Adjustments:** Allow users to adjust unit quantities of individual food items in the groceries list to dynamically customize living cost indices.
* **Dynamic Exchange Rates:** Integrate an API to convert costs into student-specific home country currencies in real-time.

---

## Author

**Vedant Burgul**  
BTech Computer Science — VIT Pune  
2024–2028  
