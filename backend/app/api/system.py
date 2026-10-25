from fastapi import APIRouter
from pydantic import BaseModel
from app.services.gemini_service import ai_service
from app.core.config import settings

router = APIRouter(prefix="/system", tags=["System & Settings"])

class ApiKeyUpdate(BaseModel):
    api_key: str

@router.get("/status")
async def get_system_status():
    return {
        "status": "online",
        "live_ai_ready": ai_service.is_live_ai_ready(),
        "model": settings.GEMINI_MODEL,
        "features": [
            "Site Safety Monitoring (Multimodal Vision)",
            "Crack Detection and Structural Analysis (Multimodal Vision)",
            "Real Estate Valuation & Estimation",
            "Construction Project Planning & WBS",
            "Daily Site Assistance & Logging",
            "Weather-Aware Construction Advisory",
            "Civil Engineering Knowledge Assistant"
        ]
    }

@router.post("/set-key")
async def set_api_key(payload: ApiKeyUpdate):
    ai_service.set_api_key(payload.api_key)
    return {
        "success": True,
        "live_ai_ready": ai_service.is_live_ai_ready(),
        "message": "Gemini API Key updated successfully for this session."
    }
