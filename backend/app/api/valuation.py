from fastapi import APIRouter
from app.models.schemas import ValuationRequest, ValuationResponse
from app.services.gemini_service import ai_service

router = APIRouter(prefix="/valuation", tags=["Real Estate Valuation & Estimation"])

@router.post("/estimate", response_model=ValuationResponse)
async def estimate_valuation(request: ValuationRequest):
    return ai_service.evaluate_valuation(request)
