from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import CourseCost


router = APIRouter(
    prefix="/api/cities",
    tags=["Cities"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def get_cities(db: Session = Depends(get_db)):
    statement = (
        select(CourseCost.city)
        .distinct()
        .order_by(CourseCost.city)
    )

    result = db.execute(statement)

    return [city for (city,) in result.all()]