from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io

from app.models.schemas import SafetyAnalysisResponse
from app.services.gemini_service import ai_service
from app.services.mock_service import MockService

router = APIRouter(prefix="/safety", tags=["Site Safety Monitoring"])

@router.post("/analyze", response_model=SafetyAnalysisResponse)
async def analyze_site_safety(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image format.")
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        return ai_service.analyze_site_safety(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing error: {str(e)}")

@router.get("/sample-demo", response_model=SafetyAnalysisResponse)
async def get_sample_safety_demo():
    """Returns high-fidelity precomputed safety analysis for instantaneous demo."""
    return MockService.get_safety_analysis()
