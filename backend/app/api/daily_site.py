from fastapi import APIRouter
from app.models.schemas import DailyLogRequest, DailyLogResponse
from app.services.gemini_service import ai_service

router = APIRouter(prefix="/daily-site", tags=["Daily Site Assistance & Logging"])

@router.post("/log", response_model=DailyLogResponse)
async def log_daily_site(request: DailyLogRequest):
    return ai_service.process_daily_log(request)
