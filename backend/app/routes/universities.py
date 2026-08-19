from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import CourseCost


router = APIRouter(
    prefix="/api/universities",
    tags=["Universities"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def get_universities(
    city: str = Query(...),
    db: Session = Depends(get_db)
):
    statement = (
        select(
            CourseCost.university,
            CourseCost.course
        )
        .where(CourseCost.city == city)
        .order_by(
            CourseCost.university,
            CourseCost.course
        )
    )

    result = db.execute(statement)

    return [
        {
            "university": university,
            "course": course
        }
        for university, course in result.all()
    ]