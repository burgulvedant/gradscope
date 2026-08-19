from sqlalchemy import String, Integer, Numeric, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class CourseCost(Base):
    __tablename__ = "course_costs"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    city: Mapped[str] = mapped_column(String(100), nullable=False)
    university: Mapped[str] = mapped_column(String(200), nullable=False)
    course: Mapped[str] = mapped_column(String(200), nullable=False)

    # New GradScope fields
    duration_min_years: Mapped[float] = mapped_column(Numeric(3, 1), nullable=True)
    duration_max_years: Mapped[float] = mapped_column(Numeric(3, 1), nullable=True)
    annual_tuition_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=True)
    remaining_tuition_min_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=True)
    remaining_tuition_max_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=True)
    monthly_living_cost_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    living_cost_min_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    living_cost_max_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    total_cost_min_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=True)
    total_cost_max_aud: Mapped[float] = mapped_column(Numeric(12, 2), nullable=True)
    tuition_available: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Legacy fields for backward compatibility and breakdown charts
    duration_years: Mapped[float] = mapped_column(
        Numeric(3, 1),
        nullable=True
    )

    annual_tuition_fee_aud: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=True
    )

    monthly_rent_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    monthly_food_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    monthly_transport_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    monthly_utilities_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    total_monthly_living_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    annual_living_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    annual_total_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=True
    )

    estimated_total_masters_cost: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=True
    )