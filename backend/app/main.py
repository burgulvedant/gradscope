from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.cities import router as cities_router
from .routes.universities import router as universities_router
from .routes.calculator import router as calculator_router


app = FastAPI(
    title="GradScope API",
    description="Australian Master's cost comparison API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(cities_router)
app.include_router(universities_router)
app.include_router(calculator_router)


@app.get("/")
def root():
    return {
        "message": "GradScope API is running"
    }