import os
import json
import re
import logging
import warnings
from typing import Optional, Any
from PIL import Image

warnings.filterwarnings('ignore', category=FutureWarning)
import google.generativeai as genai

from app.core.config import settings
from app.core.prompts import (
    SAFETY_SYSTEM_PROMPT,
    CRACK_SYSTEM_PROMPT,
    VALUATION_SYSTEM_PROMPT,
    PLANNING_SYSTEM_PROMPT,
    DAILY_SITE_PROMPT,
    WEATHER_SYSTEM_PROMPT,
    KNOWLEDGE_SYSTEM_PROMPT
)
from app.models.schemas import (
    SafetyAnalysisResponse,
    CrackAnalysisResponse,
    ValuationRequest, ValuationResponse,
    ProjectPlanRequest, ProjectPlanResponse,
    DailyLogRequest, DailyLogResponse,
    WeatherAdvisoryRequest, WeatherAdvisoryResponse,
    KnowledgeChatRequest, KnowledgeChatResponse
)
from app.services.mock_service import MockService

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        self._current_key = settings.GEMINI_API_KEY
        self._is_configured = False
        self._configure_client()

    def set_api_key(self, api_key: str):
        self._current_key = api_key.strip()
        self._configure_client()

    def _configure_client(self):
        if self._current_key:
            try:
                genai.configure(api_key=self._current_key)
                self._is_configured = True
                logger.info("Google Generative AI configured successfully.")
            except Exception as e:
                logger.error(f"Failed to configure Gemini: {e}")
                self._is_configured = False
        else:
            self._is_configured = False

    def is_live_ai_ready(self) -> bool:
        return bool(self._is_configured and self._current_key)

    def _extract_json_from_text(self, text: str) -> dict:
        text = text.strip()
        # Remove markdown code fences if present
        if "```json" in text:
            match = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
            if match:
                return json.loads(match.group(1))
        if "```" in text:
            match = re.search(r"```\s*(\{.*?\})\s*```", text, re.DOTALL)
            if match:
                return json.loads(match.group(1))
        # Find first { and last }
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            json_str = text[start:end+1]
            return json.loads(json_str)
        return json.loads(text)

    def analyze_site_safety(self, image: Image.Image) -> SafetyAnalysisResponse:
        if not self.is_live_ai_ready():
            return MockService.get_safety_analysis()
        try:
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            prompt = f"{SAFETY_SYSTEM_PROMPT}\nAnalyze this construction site photo. Return strictly valid JSON."
            response = model.generate_content([prompt, image])
            data = self._extract_json_from_text(response.text)
            data["is_mock"] = False
            return SafetyAnalysisResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini live safety analysis failed ({e}). Falling back to mock dataset.")
            return MockService.get_safety_analysis()

    def analyze_cracks(self, image: Image.Image) -> CrackAnalysisResponse:
        if not self.is_live_ai_ready():
            return MockService.get_crack_analysis()
        try:
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            prompt = f"{CRACK_SYSTEM_PROMPT}\nAnalyze this structural element image for cracks and defects. Return strictly valid JSON."
            response = model.generate_content([prompt, image])
            data = self._extract_json_from_text(response.text)
            data["is_mock"] = False
            return CrackAnalysisResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini live crack analysis failed ({e}). Falling back to mock dataset.")
            return MockService.get_crack_analysis()

    def evaluate_valuation(self, request: ValuationRequest) -> ValuationResponse:
        if not self.is_live_ai_ready():
            return MockService.get_valuation(request)
        try:
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            user_payload = request.model_dump_json(indent=2)
            prompt = f"{VALUATION_SYSTEM_PROMPT}\nProperty Parameters:\n{user_payload}\nGenerate valuation report strictly in JSON."
            response = model.generate_content(prompt)
            data = self._extract_json_from_text(response.text)
            data["is_mock"] = False
            return ValuationResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini valuation failed ({e}). Falling back to mock calculation.")
            return MockService.get_valuation(request)

    def generate_project_plan(self, request: ProjectPlanRequest) -> ProjectPlanResponse:
        if not self.is_live_ai_ready():
            return MockService.get_project_plan(request)
        try:
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            user_payload = request.model_dump_json(indent=2)
            prompt = f"{PLANNING_SYSTEM_PROMPT}\nProject Parameters:\n{user_payload}\nGenerate comprehensive construction plan strictly in JSON."
            response = model.generate_content(prompt)
            data = self._extract_json_from_text(response.text)
            data["is_mock"] = False
            return ProjectPlanResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini project plan failed ({e}). Falling back to mock calculation.")
            return MockService.get_project_plan(request)

    def process_daily_log(self, request: DailyLogRequest) -> DailyLogResponse:
        if not self.is_live_ai_ready():
            return MockService.get_daily_log(request)
        try:
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            user_payload = request.model_dump_json(indent=2)
            prompt = f"{DAILY_SITE_PROMPT}\nDaily Site Input:\n{user_payload}\nGenerate site assessment report strictly in JSON."
            response = model.generate_content(prompt)
            data = self._extract_json_from_text(response.text)
            data["is_mock"] = False
            return DailyLogResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini daily log failed ({e}). Falling back to mock dataset.")
            return MockService.get_daily_log(request)

    def generate_weather_advisory(self, request: WeatherAdvisoryRequest) -> WeatherAdvisoryResponse:
        if not self.is_live_ai_ready():
            return MockService.get_weather_advisory(request)
        try:
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            user_payload = request.model_dump_json(indent=2)
            prompt = f"{WEATHER_SYSTEM_PROMPT}\nSite Weather Telemetry:\n{user_payload}\nGenerate construction safety advisory strictly in JSON."
            response = model.generate_content(prompt)
            data = self._extract_json_from_text(response.text)
            data["is_mock"] = False
            return WeatherAdvisoryResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini weather advisory failed ({e}). Falling back to mock dataset.")
            return MockService.get_weather_advisory(request)

    def chat_knowledge_assistant(self, request: KnowledgeChatRequest) -> KnowledgeChatResponse:
        if not self.is_live_ai_ready():
            return MockService.get_knowledge_reply(request)
        try:
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            history_text = "\n".join([f"{msg.role.upper()}: {msg.content}" for msg in request.history[-4:]])
            prompt = f"{KNOWLEDGE_SYSTEM_PROMPT}\nTopic Focus: {request.domain_topic}\nRecent Conversation:\n{history_text}\nUser Query: {request.query}\nProvide expert civil engineering response strictly in JSON."
            response = model.generate_content(prompt)
            data = self._extract_json_from_text(response.text)
            data["is_mock"] = False
            return KnowledgeChatResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini knowledge chat failed ({e}). Falling back to mock reply.")
            return MockService.get_knowledge_reply(request)

ai_service = GeminiService()
