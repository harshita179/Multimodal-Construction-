from fastapi import APIRouter
from app.models.schemas import KnowledgeChatRequest, KnowledgeChatResponse
from app.services.gemini_service import ai_service

router = APIRouter(prefix="/knowledge", tags=["Construction Knowledge Assistant"])

@router.post("/chat", response_model=KnowledgeChatResponse)
async def chat_knowledge_assistant(request: KnowledgeChatRequest):
    return ai_service.chat_knowledge_assistant(request)
