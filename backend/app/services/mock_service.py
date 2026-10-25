"""
Mock fallback service providing realistic construction intelligence data.
Ensures zero runtime errors when API key is unconfigured or during demo testing.
"""
from typing import Dict, Any
from app.models.schemas import (
    SafetyAnalysisResponse, PPEItem, HazardItem,
    CrackAnalysisResponse, CrackItem, RepairRecommendation,
    ValuationResponse, CostBreakdown,
    ProjectPlanResponse, PhaseItem, MilestoneItem, RiskItem,
    DailyLogResponse,
    WeatherAdvisoryResponse, ActivityAdvisory,
    KnowledgeChatResponse
)

class MockService:
    @staticmethod
    def get_safety_analysis() -> SafetyAnalysisResponse:
        return SafetyAnalysisResponse(
            safety_score=78,
            compliance_status="Partially Compliant",
            detected_workers_count=4,
            ppe_checklist=[
                PPEItem(item="Safety Helmet / Hard Hat", detected=True, confidence=0.96, note="3 of 4 workers wearing certified helmets. Worker near lift hoist missing helmet."),
                PPEItem(item="High-Visibility Reflective Vest", detected=True, confidence=0.94, note="Compliant EN ISO 20471 reflective vests observed on all active personnel."),
                PPEItem(item="Safety Boots / Toe-Cap Footwear", detected=True, confidence=0.88, note="Standard steel-toe boots visible across ground crews."),
                PPEItem(item="Fall Arrest Harness", detected=False, confidence=0.92, note="Worker operating at elevated edge without secondary lanyard attachment."),
                PPEItem(item="Eye & Face Protection", detected=False, confidence=0.75, note="Grinding/rebar cutting happening without polycarbonate face shields.")
            ],
            hazards=[
                HazardItem(
                    hazard_type="Unprotected Floor Edge",
                    severity="Critical",
                    description="Second floor cantilever edge lacks toe-boards and perimeter safety netting.",
                    location="North-East Slab Edge, Level 2",
                    recommendation="Immediately erect double-rail guardrails (height 1.1m) and install safety debris netting."
                ),
                HazardItem(
                    hazard_type="Improper Scaffolding Bracing",
                    severity="High",
                    description="Diagonal cross-bracing missing on bay 3 of external cuplock scaffolding.",
                    location="Western Facade Scaffolding, Bays 2-4",
                    recommendation="Halt scaffold loading until tag system is updated to 'RED' and missing couplers/braces are installed."
                ),
                HazardItem(
                    hazard_type="Trip & Material Stacking Hazard",
                    severity="Medium",
                    description="Unbundled steel rebars and timber shuttering obstructing main evacuation pathway.",
                    location="Ground Floor Access Corridor",
                    recommendation="Clear passage to minimum 1.5m clearance and stack timber orderly on raised dunnage."
                )
            ],
            immediate_actions=[
                "Issue stop-work warning for Level 2 perimeter until edge protection is anchored.",
                "Supply face shield to rebar fabrication crew immediately.",
                "Tag scaffolding bay 3 as out of service pending structural cross-bracing."
            ],
            ai_summary="Site demonstrates moderate safety diligence with high PPE vest compliance. However, critical fall-from-height hazards and scaffolding deficiencies present immediate OSHA non-compliance that requires corrective intervention before work continues.",
            is_mock=True
        )

    @staticmethod
    def get_crack_analysis() -> CrackAnalysisResponse:
        return CrackAnalysisResponse(
            structural_integrity_score=68,
            overall_severity="Moderate",
            safe_for_occupancy=True,
            detected_cracks=[
                CrackItem(
                    crack_type="Shear Crack",
                    location="RCC Beam near column support (d/2 zone)",
                    estimated_width_mm="1.4mm - 2.1mm",
                    severity="Severe",
                    propagation_risk="High"
                ),
                CrackItem(
                    crack_type="Flexural Crack",
                    location="Bottom face mid-span tensile zone",
                    estimated_width_mm="0.4mm - 0.7mm",
                    severity="Moderate",
                    propagation_risk="Low"
                ),
                CrackItem(
                    crack_type="Shrinkage / Hairline Crazing",
                    location="Plaster coating surface across soffit",
                    estimated_width_mm="0.1mm - 0.25mm",
                    severity="Low",
                    propagation_risk="Stable"
                )
            ],
            root_causes=[
                "Diagonal shear tension exceeding transverse stirrup yield capacity near heavy point load support.",
                "Plastic shrinkage during early curing phase aggravated by high ambient wind speed.",
                "Minor differential settlement of foundation pile cap causing localized load redistribution."
            ],
            structural_impact_analysis="The 45-degree diagonal shear crack indicates structural distress under current service loads. While not facing imminent collapse, moisture infiltration could accelerate rebar oxidation and spalling within 3-6 months if left untreated.",
            repair_recommendations=[
                RepairRecommendation(
                    method="Low-Viscosity Structural Epoxy Injection",
                    materials_needed="Sikadur-52 or equivalent two-component epoxy resin, surface sealing putty, injection ports",
                    urgency="Within 1 Week",
                    estimated_cost_tier="Moderate"
                ),
                RepairRecommendation(
                    method="External Carbon Fiber Reinforced Polymer (CFRP) Strengthening",
                    materials_needed="High-tensile unidirectional carbon fiber fabric (300 g/m²) + epoxy saturant matrix",
                    urgency="Routine Monitoring",
                    estimated_cost_tier="High"
                ),
                RepairRecommendation(
                    method="Crack Width Monitoring Demec Strain Gauge Installation",
                    materials_needed="Demec brass gauge studs and calibrated optical dial indicator",
                    urgency="Immediate",
                    estimated_cost_tier="Low"
                )
            ],
            is_mock=True
        )

    @staticmethod
    def get_valuation(request) -> ValuationResponse:
        area = request.built_up_area_sqft
        tier_multipliers = {
            "Prime Metro": 12500,
            "Tier 1 Urban": 8500,
            "Tier 2 Developing": 5500,
            "Suburban": 4200
        }
        quality_multipliers = {
            "Standard": 1.0,
            "Premium": 1.25,
            "Luxury": 1.55,
            "Ultra-Luxury": 1.95
        }

        base_rate = tier_multipliers.get(request.location_tier, 7000)
        qual_factor = quality_multipliers.get(request.construction_quality, 1.1)
        price_per_sqft = round(base_rate * qual_factor)
        total_valuation = round(price_per_sqft * area)

        # Cost breakdown estimations
        land_val = round(total_valuation * 0.38)
        civil_val = round(total_valuation * 0.34)
        mep_finishes = round(total_valuation * 0.20)
        permits_contingency = round(total_valuation * 0.08)

        min_range = round(total_valuation * 0.93)
        max_range = round(total_valuation * 1.08)

        return ValuationResponse(
            estimated_total_valuation_inr=total_valuation,
            price_per_sqft_inr=price_per_sqft,
            market_range_min_inr=min_range,
            market_range_max_inr=max_range,
            cost_breakdown=CostBreakdown(
                land_value_inr=land_val,
                civil_structure_cost_inr=civil_val,
                finishing_and_mep_inr=mep_finishes,
                permits_and_contingency_inr=permits_contingency,
                total_estimated_value_inr=total_valuation
            ),
            confidence_score=0.91,
            key_valuation_factors=[
                f"Location Premium: Situated in {request.location_tier} exhibiting strong 8.2% annual capital appreciation.",
                f"Specification Tier: {request.construction_quality} finishing grade with high residual asset valuation.",
                f"Infrastructure Connectivity: High accessibility index and presence of {len(request.amenities)} premium amenities.",
                f"Depreciation Adjustment: Factored {request.age_years} years structural age with RCC design lifespan benchmark."
            ],
            five_year_roi_projection_pct=34.8,
            ai_valuation_narrative=f"Comprehensive valuation conducted for a {area:,.0f} sq.ft {request.property_type} in {request.location_tier}. Incorporating current construction index rates, replacement cost depreciation, and regional sales comparables, the fair market asset value stands at ₹{total_valuation:,.0f} (₹{price_per_sqft:,.0f}/sq.ft).",
            is_mock=True
        )

    @staticmethod
    def get_project_plan(request) -> ProjectPlanResponse:
        budget = request.estimated_budget_inr
        months = request.desired_duration_months
        name = request.project_name

        phases = [
            PhaseItem(
                phase_number=1,
                phase_name="Site Mobilization, Excavation & Substructure",
                duration_weeks=max(4, int(months * 0.22 * 4.3)),
                estimated_cost_inr=round(budget * 0.22),
                is_critical_path=True,
                tasks=[
                    "Soil geotagging and trial pit core sampling",
                    "Bulk excavation and shoring pile wall installation",
                    "PCC blinding and raft foundation waterproofing membrane",
                    "RCC foundation casting and stub column backfilling"
                ]
            ),
            PhaseItem(
                phase_number=2,
                phase_name="RCC Superstructure & Core Framing",
                duration_weeks=max(8, int(months * 0.38 * 4.3)),
                estimated_cost_inr=round(budget * 0.38),
                is_critical_path=True,
                tasks=[
                    "Formwork shuttering, rebar tying & post-tensioned tendon placement",
                    "Ready-Mix Concrete (RMC) pouring for columns and elevated floor slabs",
                    "Post-curing de-shuttering and compressive cube strength testing",
                    "Perimeter autoclaved aerated concrete (AAC) block masonry"
                ]
            ),
            PhaseItem(
                phase_number=3,
                phase_name="MEP, HVAC & Fire Life Safety Rough-ins",
                duration_weeks=max(6, int(months * 0.24 * 4.3)),
                estimated_cost_inr=round(budget * 0.23),
                is_critical_path=False,
                tasks=[
                    "Concealed electrical conduit and plumbing riser installation",
                    "HVAC chiller pipe routing and ventilation ductwork",
                    "Fire suppression sprinkler drops and alarm sensor trunking",
                    "Hydrostatic pressure testing of plumbing risers"
                ]
            ),
            PhaseItem(
                phase_number=4,
                phase_name="Architectural Finishes, Commissioning & Handover",
                duration_weeks=max(4, int(months * 0.16 * 4.3)),
                estimated_cost_inr=round(budget * 0.17),
                is_critical_path=True,
                tasks=[
                    "Vitrified tile flooring, drywall gypsum partitioning & false ceiling",
                    "Exterior elastomeric texture paint and double-glazed facade glazing",
                    "Integrated MEP testing, elevator certification & HVAC balancing",
                    "Occupancy Certificate (OC) statutory inspection and client punch list closure"
                ]
            )
        ]

        milestones = [
            MilestoneItem(milestone_name="Ground Zero Raft Completion", month=max(1, int(months * 0.2)), deliverable="Substructure raft cast & backfilled to plinth level", budget_milestone_pct=22),
            MilestoneItem(milestone_name="Topping Out / Superstructure Framework", month=max(2, int(months * 0.6)), deliverable="Final rooftop slab cast and cured", budget_milestone_pct=60),
            MilestoneItem(milestone_name="MEP Energization & Dry Run", month=max(3, int(months * 0.85)), deliverable="Main substation energized and elevators running", budget_milestone_pct=83),
            MilestoneItem(milestone_name="Final Commissioning & Handover", month=months, deliverable="Client key handover with statutory NOCs", budget_milestone_pct=100)
        ]

        risks = [
            RiskItem(
                risk_title="Subsurface groundwater ingress during foundation excavation",
                likelihood="Medium",
                impact="High",
                mitigation_strategy="Deploy high-capacity wellpoint dewatering pumps and pre-install bentonite slurry trench cutoff."
            ),
            RiskItem(
                risk_title="Ready Mix Concrete supply disruption or traffic delivery delays",
                likelihood="High",
                impact="Medium",
                mitigation_strategy="Contract twin batching plants with GPS-tracked transit mixers and cold-joint retarder admixtures."
            ),
            RiskItem(
                risk_title="Monsoon weather causing stoppage of external facade work",
                likelihood="High",
                impact="Medium",
                mitigation_strategy="Buffer 2.5 weeks float time into interior dry-trades schedule during wet season."
            )
        ]

        return ProjectPlanResponse(
            project_name=name,
            total_estimated_cost_inr=budget,
            total_duration_months=months,
            phases=phases,
            milestones=milestones,
            risks=risks,
            resource_allocation_summary={
                "Civil Labor": "Peak 85 skilled masons and 140 general laborers at superstructure peak.",
                "Heavy Machinery": "2x 50-ton Tower Cranes, 1x Putzmeister Boom Concrete Pump, 2x JCB 3DX Excavators.",
                "Key Materials": "1,450 MT Fe500D TMT rebar steel, 9,200 bags OPC 53 cement, 35,000 AAC blocks."
            },
            executive_summary=f"Synthesized comprehensive 4-phase Master Construction Schedule for '{name}'. Critical path is constrained by Phase 1 Foundation and Phase 2 Structural slabs. With recommended contingency float and parallel MEP track, target duration of {months} months is statistically viable within 92% confidence limits.",
            is_mock=True
        )

    @staticmethod
    def get_daily_log(request) -> DailyLogResponse:
        return DailyLogResponse(
            date=request.date,
            daily_productivity_score=86,
            status_assessment="On Schedule",
            progress_summary=f"Logged operations on {request.project_name} with {request.workers_present} workers on-site under {request.weather_condition} weather. Achieved significant progress on slab reinforcement and masonry.",
            safety_observations=[
                "Toolbox talk conducted at 08:00 AM covering working-at-heights and edge protection.",
                "All workers in full compliance with helmets and high-vis vests.",
                "Scaffold safety tag verified Green on Eastern elevation."
            ],
            tomorrow_priorities=[
                "Receive pre-pour inspection clearance from structural consultant for Grid C-F slab.",
                "Schedule 6 transit mixer batches of M30 grade concrete starting 06:30 AM.",
                "Commence electrical conduit layout on Level 3."
            ],
            material_restock_alerts=[
                "TMT 16mm rebar stock at 4.2 MT (reorder threshold 5 MT reached). Restock PO #4489 required.",
                "Cement stock sufficient for 4 days continuous casting."
            ],
            risk_flags=[
                "Forecasted afternoon gusts may require halting tower crane operations after 14:00."
            ],
            is_mock=True
        )

    @staticmethod
    def get_weather_advisory(request) -> WeatherAdvisoryResponse:
        temp = request.temperature_c
        wind = request.wind_speed_kmh
        precip = request.precipitation_chance_pct

        is_high_wind = wind > 38.0
        is_high_heat = temp > 38.0
        is_rain = precip > 45 or "Rain" in request.condition

        hazard_level = "Red (Severe Risk)" if (is_high_wind or (is_rain and precip > 70)) else ("Yellow (Moderate Risk)" if (temp > 34 or wind > 25 or precip > 30) else "Green (Normal)")

        concrete_status = "Halt / Unsafe" if (is_rain and precip > 60) else ("Proceed with Caution" if (is_high_heat or precip > 25) else "Safe / Optimal")
        crane_status = "Halt / Unsafe" if is_high_wind else ("Proceed with Caution" if wind > 28 else "Safe / Optimal")

        return WeatherAdvisoryResponse(
            location=request.location,
            overall_site_hazard_level=hazard_level,
            concrete_curing_guidance="High ambient temperature requires evaporative water ponding or chemical curing compound membrane application within 45 minutes of final float finish to avoid plastic shrinkage cracks.",
            crane_and_height_work_status=f"Measured wind gust {wind:.1f} km/h. " + ("CRITICAL: Exceeds 38 km/h safety threshold. Lock crane jibs into weathervane mode and halt high lifts immediately." if is_high_wind else "Within permissible operating envelope (safe limit 38 km/h). Monitor anemometer hourly."),
            activities=[
                ActivityAdvisory(
                    activity_name="Concrete Pouring & Curing",
                    status=concrete_status,
                    reasoning=f"Precipitation probability {precip}% and temp {temp}°C. Rain washes out cement paste before initial set; extreme heat accelerates hydration.",
                    safety_protocol="Cover fresh pours with impervious tarpaulins; ensure chilled mixing water or ice flakes if concrete temperature exceeds 32°C."
                ),
                ActivityAdvisory(
                    activity_name="Tower Crane & High-Elevation Rigging",
                    status=crane_status,
                    reasoning=f"Sustained wind speed at {wind:.1f} km/h induces aerodynamic drag on suspended loads.",
                    safety_protocol="Affix dual tag lines to all lifted bundles; verify anemometer telemetry before every pick."
                ),
                ActivityAdvisory(
                    activity_name="Deep Foundation & Trench Excavation",
                    status="Proceed with Caution" if is_rain else "Safe / Optimal",
                    reasoning="Soil pore water saturation diminishes shear angle of internal friction, increasing trench wall collapse risk.",
                    safety_protocol="Inspect shoring struts and ensure edge soil berms are kept at least 1.5m back from trench crests."
                ),
                ActivityAdvisory(
                    activity_name="Exterior Spray Painting & Plastering",
                    status="Halt / Unsafe" if (is_rain or wind > 30) else "Safe / Optimal",
                    reasoning="Relative humidity above 85% or wind gusts impede coating adhesion and cause excessive overspray.",
                    safety_protocol="Suspend exterior coatings; divert finishing labor to interior drywall and tiling tasks."
                ),
                ActivityAdvisory(
                    activity_name="Structural Steel Welding & Hot Work",
                    status="Safe / Optimal" if not is_high_wind else "Proceed with Caution",
                    reasoning="Wind can blow shielding gas away from weld arc, causing porosity; sparks can ignite dry debris.",
                    safety_protocol="Erect fire-resistant flame screens around welder work zones; keep ABC extinguishers on standby."
                )
            ],
            heat_or_cold_stress_protocol="Enforce mandatory 15-minute shaded rest breaks every 90 minutes. Provide electrolyte oral rehydration solution stations across each floor tier.",
            actionable_superintendent_summary=f"Weather condition: {request.condition}, {temp}°C, {wind} km/h wind. Maintain high alert for crane lift limits and ensure freshly cast concrete is protected with curing blankets. Shift external trades indoors if squall develops.",
            is_mock=True
        )

    @staticmethod
    def get_knowledge_reply(request) -> KnowledgeChatResponse:
        query_lower = request.query.lower()
        if "crack" in query_lower:
            reply = """Structural cracks can generally be classified into structural (load-induced) and non-structural (environmental/material) distress:

1. **Flexural Cracks (Tensile Zone)**:
   - Appear perpendicular to the member's longitudinal axis in high bending moment zones (e.g., bottom of mid-span beams).
   - Permissible crack width per IS 456 Clause 35.3.2 is **0.3 mm** for mild exposure and **0.2 mm** for moderate/severe exposure to avoid rebar depassivation.

2. **Shear Cracks (Diagonal Tension)**:
   - Form at approximately 45° angles near beam-column supports or point loads.
   - These are high-priority structural distress indicators requiring immediate shoring, crack mapping, and epoxy pressure injection or CFRP jacket retrofitting.

3. **Plastic Shrinkage & Settlement Cracks**:
   - Occur within 2-6 hours after casting when surface evaporation rate exceeds bleed water rate (typically > 1.0 kg/m²/hr).
   - Preventable through early fog spraying, aliphatic alcohol monomolecular films, or prompt wet hessian curing."""
            codes = ["IS 456:2000 (Plain and Reinforced Concrete - Code of Practice)", "ACI 224.1R-07 (Causes, Evaluation, and Repair of Cracks in Concrete)", "ASTM C881 (Epoxy-Resin-Base Bonding Systems for Concrete)"]
            highlights = ["Max permissible surface crack width: 0.3 mm (IS 456)", "Evaporation threshold for plastic shrinkage: > 1.0 kg/m²/hr (ACI 305R)"]
            steps = ["Measure crack depth and active movement with optical crack gauge", "Check stirrup spacing against IS 456 Clause 26.5.1.5", "Specify low-viscosity epoxy resin injection for cracks > 0.4 mm"]
            followups = ["What are the repair procedures for structural shear cracks using CFRP?", "How does IS 13920 govern ductile detailing for beam stirrup confinement?"]
        elif "m25" in query_lower or "mix" in query_lower or "concrete" in query_lower:
            reply = """For **M25 Grade Concrete** (Characteristic compressive strength of 25 N/mm² at 28 days), mix design is carried out per **IS 10262:2019**:

1. **Standard Design Targets**:
   - Target Mean Strength ($f_{ck}'$): $f_{ck} + 1.65 \times s = 25 + 1.65 \times 4.0 = 31.6\text{ N/mm²}$.
   - Water-Cement Ratio: Maximum 0.50 (for Moderate exposure) per Table 5 of IS 456.
   - Minimum Cement Content: 300 kg/m³.

2. **Typical Nominal Mix Ratio (Approximate Volumetric Guide)**:
   - Cement : Fine Aggregate (River/M-Sand) : Coarse Aggregate (20mm down) $\approx$ **1 : 1 : 2** by weight (approx. 1:1.5:3 volumetric nominal).
   - Slump Requirement: 75–100 mm for standard RCC beams/slabs, 120–150 mm for pumped concrete using PCE-based superplasticizers.

3. **Curing Protocol**:
   - Minimum 7 days continuous wet ponding/hessian curing for OPC, extending to 10–14 days for fly-ash / mineral admixture blended cements."""
            codes = ["IS 10262:2019 (Concrete Mix Proportioning - Guidelines)", "IS 456:2000 (Table 5: Minimum Cementitious Content & W/C Ratio)", "IS 383:2016 (Coarse and Fine Aggregates Specification)"]
            highlights = ["Maximum W/C ratio for M25 under moderate exposure: 0.50", "28-day target mean cube strength: 31.6 MPa"]
            steps = ["Conduct sieve analysis on aggregate per IS 2386", "Cast 150mm standard test cubes for 7-day and 28-day compressive crushing", "Use slump cone test per IS 1199 on each transit mixer batch"]
            followups = ["How to calculate dosage of polycarboxylate ether superplasticizer for slump retention?", "What is the difference between M25 and M30 for seismic design zone IV?"]
        else:
            reply = f"""Thank you for your construction engineering inquiry: **"{request.query}"**.

In modern civil and structural engineering practice, compliance with national building codes and performance-based design is paramount:

1. **Statutory Standards & Safety**:
   - Ensure all designs adhere strictly to the National Building Code (NBC) and localized structural safety guidelines (IS, ACI, or Eurocodes depending on regional jurisdiction).
   - Structural stability certificates must be endorsed by a Chartered Structural Engineer before commencing heavy site operations.

2. **Quality Assurance & Testing**:
   - Maintain rigorous Material Test Certificates (MTC) for all structural steel (Fe500D/Fe550D) and cement batches.
   - Non-Destructive Testing (NDT) such as Ultrasonic Pulse Velocity (UPV) and Rebound Hammer testing should be used to verify in-situ member integrity.

3. **Digital & Sustainable Construction**:
   - Integrate BIM (Building Information Modeling) Level 2 for clash detection across MEP, structural, and architectural trades to prevent expensive rework.
   - Consider low-carbon fly ash or GGBS replacements (up to 30-40%) to reduce embodied carbon while improving durability against sulfate attack."""
            codes = ["NBC 2016 (National Building Code of India)", "IS 456:2000 (Plain and Reinforced Concrete)", "OSHA 1926 (Safety and Health Regulations for Construction)"]
            highlights = ["Always verify Grade designation (e.g. Fe500D denotes high ductility for seismic zones)", "Maintain QA/QC calibration certificates for all batching equipment"]
            steps = ["Review project structural drawings against architectural specifications", "Cross-check site load conditions against initial design criteria", "Consult localized municipality bylaws for setback and FSI compliance"]
            followups = ["What are the critical checklist items before casting a post-tensioned slab?", "How to resolve MEP pipe clash with structural transfer girders?"]

        return KnowledgeChatResponse(
            reply=reply,
            applicable_codes=codes,
            technical_highlights=highlights,
            recommended_next_steps=steps,
            suggested_followups=followups,
            is_mock=True
        )
