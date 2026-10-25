import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.api.safety import router as safety_router
from app.api.cracks import router as cracks_router
from app.api.valuation import router as valuation_router
from app.api.planning import router as planning_router
from app.api.daily_site import router as daily_site_router
from app.api.weather import router as weather_router
from app.api.knowledge import router as knowledge_router
from app.api.system import router as system_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Multimodal Artificial Intelligence decision-support platform for construction planning, safety, structural integrity, and monitoring."
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers under /api/v1
api_prefix = settings.API_V1_STR
app.include_router(safety_router, prefix=api_prefix)
app.include_router(cracks_router, prefix=api_prefix)
app.include_router(valuation_router, prefix=api_prefix)
app.include_router(planning_router, prefix=api_prefix)
app.include_router(daily_site_router, prefix=api_prefix)
app.include_router(weather_router, prefix=api_prefix)
app.include_router(knowledge_router, prefix=api_prefix)
app.include_router(system_router, prefix=api_prefix)

# Mount sample images if directory exists
samples_dir = os.path.join(os.path.dirname(__file__), "..", "sample_images")
os.makedirs(samples_dir, exist_ok=True)
app.mount("/sample_images", StaticFiles(directory=samples_dir), name="sample_images")

@app.get("/")
async def root():
    return {
        "platform": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": "/docs",
        "api_v1": api_prefix
    }
