from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import CourseCost
from ..schemas import CourseCostResponse


router = APIRouter(
    prefix="/api",
    tags=["Calculator"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/course-cost",
    response_model=CourseCostResponse
)
def get_course_cost(
    city: str,
    university: str,
    course: str,
    scholarship_percent: float = 0.0,
    db: Session = Depends(get_db)
):
    result = (
        db.query(CourseCost)
        .filter(
            CourseCost.city == city,
            CourseCost.university == university,
            CourseCost.course == course
        )
        .first()
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Course cost data not found"
        )

    # Normalize scholarship percent (0 to 100)
    scholarship_percent = max(0.0, min(100.0, scholarship_percent))

    # Calculate scholarship discount and remaining tuition
    if result.annual_tuition_aud is not None:
        duration_min = float(result.duration_min_years or 0.0)
        total_tuition_min = float(result.annual_tuition_aud) * duration_min
        remaining_tuition_min = total_tuition_min * (1.0 - scholarship_percent / 100.0)

        duration_max = float(result.duration_max_years or 0.0)
        total_tuition_max = float(result.annual_tuition_aud) * duration_max
        remaining_tuition_max = total_tuition_max * (1.0 - scholarship_percent / 100.0)

        total_cost_min = remaining_tuition_min + float(result.living_cost_min_aud)
        total_cost_max = remaining_tuition_max + float(result.living_cost_max_aud)
    else:
        remaining_tuition_min = None
        remaining_tuition_max = None
        # Total cost is living cost only if tuition is unavailable
        total_cost_min = float(result.living_cost_min_aud)
        total_cost_max = float(result.living_cost_max_aud)

    # Dynamically assign calculated attributes to the loaded model instance
    result.scholarship_percent = scholarship_percent
    result.remaining_tuition_min_aud = remaining_tuition_min
    result.remaining_tuition_max_aud = remaining_tuition_max
    result.total_cost_min_aud = total_cost_min
    result.total_cost_max_aud = total_cost_max

    # Update legacy attributes for backward compatibility
    result.estimated_total_masters_cost = total_cost_min
    if result.annual_tuition_aud is not None:
        annual_tuition_discounted = float(result.annual_tuition_aud) * (1.0 - scholarship_percent / 100.0)
        result.annual_total_cost = annual_tuition_discounted + float(result.annual_living_cost)
    else:
        result.annual_total_cost = float(result.annual_living_cost)

    return result

@router.get(
    "/course-comparison",
    response_model=list[CourseCostResponse]
)
def get_course_comparison(
    course: str,
    db: Session = Depends(get_db)
):
    results = (
        db.query(CourseCost)
        .filter(CourseCost.course == course)
        .all()
    )

    for r in results:
        r.scholarship_percent = 0.0

    return results

@router.get(
    "/courses",
    response_model=list[str]
)
def get_courses(db: Session = Depends(get_db)):
    statement = (
        select(CourseCost.course)
        .distinct()
        .order_by(CourseCost.course)
    )
    result = db.execute(statement)
    return [course for (course,) in result.all()]