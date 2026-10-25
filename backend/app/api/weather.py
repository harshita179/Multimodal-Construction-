from fastapi import APIRouter
from app.models.schemas import WeatherAdvisoryRequest, WeatherAdvisoryResponse
from app.services.gemini_service import ai_service

router = APIRouter(prefix="/weather", tags=["Weather-Aware Advisory Engine"])

@router.post("/advisory", response_model=WeatherAdvisoryResponse)
async def generate_weather_advisory(request: WeatherAdvisoryRequest):
    return ai_service.generate_weather_advisory(request)
