from fastapi import APIRouter
from app.models.schemas import ProjectPlanRequest, ProjectPlanResponse
from app.services.gemini_service import ai_service

router = APIRouter(prefix="/planning", tags=["Construction Project Planning"])

@router.post("/generate", response_model=ProjectPlanResponse)
async def generate_project_plan(request: ProjectPlanRequest):
    return ai_service.generate_project_plan(request)
