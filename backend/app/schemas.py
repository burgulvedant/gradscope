from pydantic import BaseModel


class CourseCostResponse(BaseModel):
    city: str
    university: str
    course: str
    
    # New GradScope fields
    duration_min_years: float | None
    duration_max_years: float | None
    annual_tuition_aud: float | None
    scholarship_percent: float = 0.0
    remaining_tuition_min_aud: float | None
    remaining_tuition_max_aud: float | None
    monthly_living_cost_aud: float
    living_cost_min_aud: float
    living_cost_max_aud: float
    total_cost_min_aud: float | None
    total_cost_max_aud: float | None
    tuition_available: bool

    # Legacy breakdown fields (kept for backward compatibility)
    duration_years: float | None
    annual_tuition_fee_aud: float | None
    monthly_rent_cost: float
    monthly_food_cost: float
    monthly_transport_cost: float
    monthly_utilities_cost: float
    total_monthly_living_cost: float
    annual_living_cost: float
    annual_total_cost: float | None
    estimated_total_masters_cost: float | None