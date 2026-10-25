from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# ----------------- Safety Monitoring -----------------
class PPEItem(BaseModel):
    item: str = Field(..., description="e.g. Safety Helmet / Hard Hat, High-Vis Vest, Safety Boots, Harness, Eye Protection")
    detected: bool
    confidence: float = Field(..., ge=0.0, le=1.0)
    note: str = Field(..., description="Location or compliance observation")

class HazardItem(BaseModel):
    hazard_type: str = Field(..., description="e.g. Unprotected Edge, Missing Scaffolding Guardrail, Trip Hazard, Heavy Machinery Proximity")
    severity: str = Field(..., description="Low | Medium | High | Critical")
    description: str
    location: str
    recommendation: str

class SafetyAnalysisResponse(BaseModel):
    safety_score: int = Field(..., ge=0, le=100, description="Overall safety index 0-100")
    compliance_status: str = Field(..., description="Compliant | Partially Compliant | Non-Compliant")
    detected_workers_count: int
    ppe_checklist: List[PPEItem]
    hazards: List[HazardItem]
    immediate_actions: List[str]
    ai_summary: str
    is_mock: bool = False

# ----------------- Crack Detection -----------------
class CrackItem(BaseModel):
    crack_type: str = Field(..., description="Hairline | Shear | Settlement | Shrinkage | Thermal | Structural")
    location: str = Field(..., description="e.g. Beam-column junction, Masonry wall mid-span")
    estimated_width_mm: str
    severity: str = Field(..., description="Low | Moderate | Severe | Critical")
    propagation_risk: str = Field(..., description="Stable | Low | High | Dangerous")

class RepairRecommendation(BaseModel):
    method: str = Field(..., description="e.g. Low-viscosity Epoxy Injection, Carbon Fiber Polymer Wrap, Stitching, Grouting")
    materials_needed: str
    urgency: str = Field(..., description="Immediate | Within 1 Week | Routine Monitoring")
    estimated_cost_tier: str = Field(..., description="Low | Moderate | High")

class CrackAnalysisResponse(BaseModel):
    structural_integrity_score: int = Field(..., ge=0, le=100)
    overall_severity: str = Field(..., description="Low | Moderate | Severe | Critical")
    safe_for_occupancy: bool
    detected_cracks: List[CrackItem]
    root_causes: List[str]
    structural_impact_analysis: str
    repair_recommendations: List[RepairRecommendation]
    is_mock: bool = False

# ----------------- Real Estate Valuation -----------------
class ValuationRequest(BaseModel):
    property_type: str = Field(..., description="Residential | Commercial | Industrial | Mixed-Use")
    built_up_area_sqft: float
    land_area_sqft: Optional[float] = None
    location_tier: str = Field(..., description="Prime Metro | Tier 1 Urban | Tier 2 Developing | Suburban")
    construction_quality: str = Field(..., description="Standard | Premium | Luxury | Ultra-Luxury")
    amenities: List[str] = []
    age_years: int = 0
    floors_count: int = 1

class CostBreakdown(BaseModel):
    land_value_inr: float
    civil_structure_cost_inr: float
    finishing_and_mep_inr: float
    permits_and_contingency_inr: float
    total_estimated_value_inr: float

class ValuationResponse(BaseModel):
    estimated_total_valuation_inr: float
    price_per_sqft_inr: float
    market_range_min_inr: float
    market_range_max_inr: float
    cost_breakdown: CostBreakdown
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    key_valuation_factors: List[str]
    five_year_roi_projection_pct: float
    ai_valuation_narrative: str
    is_mock: bool = False

# ----------------- Construction Project Planning -----------------
class ProjectPlanRequest(BaseModel):
    project_name: str
    project_type: str = Field(..., description="Residential Villa | High-rise Apartment | Commercial Complex | Industrial Warehouse")
    total_area_sqft: float
    estimated_budget_inr: float
    desired_duration_months: int
    site_location: str
    special_requirements: Optional[str] = None

class PhaseTask(BaseModel):
    task_name: str
    duration_days: int
    resource_type: str

class PhaseItem(BaseModel):
    phase_number: int
    phase_name: str
    duration_weeks: int
    estimated_cost_inr: float
    is_critical_path: bool
    tasks: List[str]

class MilestoneItem(BaseModel):
    milestone_name: str
    month: int
    deliverable: str
    budget_milestone_pct: int

class RiskItem(BaseModel):
    risk_title: str
    likelihood: str = Field(..., description="Low | Medium | High")
    impact: str = Field(..., description="Low | Medium | High")
    mitigation_strategy: str

class ProjectPlanResponse(BaseModel):
    project_name: str
    total_estimated_cost_inr: float
    total_duration_months: int
    phases: List[PhaseItem]
    milestones: List[MilestoneItem]
    risks: List[RiskItem]
    resource_allocation_summary: Dict[str, str]
    executive_summary: str
    is_mock: bool = False

# ----------------- Daily Site Assistant -----------------
class DailyLogRequest(BaseModel):
    project_name: str
    date: str
    weather_condition: str
    workers_present: int
    equipment_deployed: List[str] = []
    completed_activities: List[str] = []
    materials_consumed: Dict[str, str] = {}
    delays_or_bottlenecks: Optional[str] = None

class DailyLogResponse(BaseModel):
    date: str
    daily_productivity_score: int = Field(..., ge=0, le=100)
    status_assessment: str = Field(..., description="Ahead of Schedule | On Schedule | Minor Delay | Critical Bottleneck")
    progress_summary: str
    safety_observations: List[str]
    tomorrow_priorities: List[str]
    material_restock_alerts: List[str]
    risk_flags: List[str]
    is_mock: bool = False

# ----------------- Weather-Aware Advisory -----------------
class WeatherAdvisoryRequest(BaseModel):
    location: str
    temperature_c: float
    condition: str = Field(..., description="Sunny | Heavy Rain | Thunderstorm | High Winds | Foggy | Extreme Heat")
    humidity_pct: int
    wind_speed_kmh: float
    precipitation_chance_pct: int

class ActivityAdvisory(BaseModel):
    activity_name: str = Field(..., description="e.g. Concrete Pouring, High-Elevation Crane Work, Exterior Painting, Excavation, Roofing")
    status: str = Field(..., description="Safe / Optimal | Proceed with Caution | Halt / Unsafe")
    reasoning: str
    safety_protocol: str

class WeatherAdvisoryResponse(BaseModel):
    location: str
    overall_site_hazard_level: str = Field(..., description="Green (Normal) | Yellow (Moderate Risk) | Red (Severe Risk)")
    concrete_curing_guidance: str
    crane_and_height_work_status: str
    activities: List[ActivityAdvisory]
    heat_or_cold_stress_protocol: str
    actionable_superintendent_summary: str
    is_mock: bool = False

# ----------------- Knowledge Assistant -----------------
class ChatMessage(BaseModel):
    role: str = Field(..., description="user | assistant")
    content: str

class KnowledgeChatRequest(BaseModel):
    query: str
    domain_topic: Optional[str] = "General Structural & Codes"
    history: List[ChatMessage] = []

class KnowledgeChatResponse(BaseModel):
    reply: str
    applicable_codes: List[str] = Field(..., description="e.g. IS 456:2000, ACI 318, NBC 2016, OSHA 1926")
    technical_highlights: List[str]
    recommended_next_steps: List[str]
    suggested_followups: List[str]
    is_mock: bool = False
