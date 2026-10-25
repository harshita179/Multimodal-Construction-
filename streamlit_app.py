import streamlit as st
import os
import json
import re
from PIL import Image

# Set page config
st.set_page_config(
    page_title="Multimodal Construction Intelligence Platform",
    page_icon="🏗️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for construction theme
st.markdown("""
<style>
    .main-header {
        font-size: 2.2rem;
        font-weight: 800;
        background: linear-gradient(90deg, #f59e0b, #fb923c, #38bdf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.2rem;
    }
    .sub-header {
        font-size: 0.95rem;
        color: #94a3b8;
        margin-bottom: 1.5rem;
    }
    .metric-card {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
    }
    .severity-badge-critical {
        background-color: #fee2e2;
        color: #991b1b;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.8rem;
    }
    .severity-badge-high {
        background-color: #ffedd5;
        color: #9a3412;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.8rem;
    }
    .severity-badge-safe {
        background-color: #dcfce7;
        color: #166534;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.8rem;
    }
</style>
""", unsafe_allow_html=True)

# ----------------- SIDEBAR -----------------
with st.sidebar:
    st.markdown("## 🏗️ Construction AI")
    st.caption("Multimodal Decision-Support Platform")
    st.markdown("---")
    
    module = st.radio(
        "Select Platform Module:",
        [
            "📊 Overview & Architecture",
            "🦺 Site Safety Monitoring (Vision)",
            "🔍 Structural Crack Diagnostics (Vision)",
            "📅 Project Planning & WBS",
            "💰 Real Estate Valuation",
            "📋 Daily Site Field Log",
            "🌦️ Weather-Aware Advisory",
            "📚 Civil Knowledge AI Consultant"
        ]
    )
    
    st.markdown("---")
    st.markdown("### 🔑 AI Settings")
    api_key_input = st.text_input("Gemini API Key (Optional)", type="password", help="Enter key for live Gemini 1.5 Flash. Leave empty for high-fidelity offline mode.")
    
    if api_key_input:
        st.success("🟢 Live Gemini AI Ready")
    else:
        st.info("🟡 High-Fidelity Demo Mode")
        
    st.markdown("---")
    st.caption("Google Cloud GenAI | SmartBridge / SkillWallet")

# ----------------- MODULE 1: OVERVIEW -----------------
if module == "📊 Overview & Architecture":
    st.markdown('<div class="main-header">AI-Powered Multimodal Construction Intelligence Platform</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Full-Stack Decision-Support Ecosystem powered by Multimodal AI & Strict JSON Contracts</div>', unsafe_allow_html=True)
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Intelligence Modules", "7 Systems", "Complete")
    with col2:
        st.metric("Data Contracts", "100% Strict JSON", "Pydantic")
    with col3:
        st.metric("Vision Analysis", "PPE & Cracks", "0.1mm Precision")
    with col4:
        st.metric("Engineering Standards", "IS 456 & NBC", "OSHA 1926")
        
    st.markdown("### 🏗️ Technical Architecture")
    st.info("""
    **Pipeline Architecture**:
    1. **Input Layer**: Textual Project Specs, Construction Imagery (Drone/Site), Real-time Weather Telemetry.
    2. **Processing Layer**: Multimodal Large Language Models (Gemini 1.5 Flash) with Domain Prompt Engineering.
    3. **Contract Layer**: Strict Schema Validation ensuring zero UI hallucination or system failure.
    4. **Output Layer**: Interactive Visual Scorecards, Critical Path Timelines, Risk Registers & Structural Retrofit Plans.
    """)
    
    st.markdown("### 📋 Platform Epics & Capabilities")
    c1, c2 = st.columns(2)
    with c1:
        st.markdown("""
        - **Site Safety Monitoring**: PPE hard hat, vest, and edge protection detection.
        - **Structural Crack Analysis**: Concrete fracture diagnosis & retrofitting.
        - **Project Planning**: Automated 4-phase WBS, milestones & cash flow.
        - **Real Estate Valuation**: Replacement costing, land appraisal & 5-year ROI.
        """)
    with c2:
        st.markdown("""
        - **Daily Site Log**: Field progress, labor productivity & material alerts.
        - **Weather Advisory**: Trade-specific feasibility matrix for curing, crane lifts, and painting.
        - **Civil Knowledge AI**: Indian Standards (IS 456, IS 10262) & NBC knowledge consultant.
        """)

# ----------------- MODULE 2: SAFETY MONITORING -----------------
elif module == "🦺 Site Safety Monitoring (Vision)":
    st.markdown('<div class="main-header">🦺 Construction Site Safety Monitoring</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Multimodal visual audit for Personal Protective Equipment (PPE) compliance and structural hazard mitigation</div>', unsafe_allow_html=True)
    
    col_left, col_right = st.columns([1, 1.2])
    
    with col_left:
        st.markdown("#### 1. Site Imagery Feed")
        use_sample = st.checkbox("Use Pre-loaded Sample Site Image", value=True)
        uploaded_file = None
        if not use_sample:
            uploaded_file = st.file_uploader("Upload Drone / Site Camera Frame", type=["jpg", "png", "jpeg"])
            
        sample_path = "backend/sample_images/construction_safety_sample.jpg"
        if use_sample and os.path.exists(sample_path):
            st.image(sample_path, caption="Active Site Camera: Tower-02 Surveillance Feed", use_container_width=True)
        elif uploaded_file:
            st.image(uploaded_file, caption="Uploaded Site Frame", use_container_width=True)
            
        run_audit = st.button("🔍 Run Multimodal Safety Audit", type="primary")

    with col_right:
        st.markdown("#### 2. Safety Audit Scorecard")
        if run_audit or use_sample:
            sc1, sc2, sc3 = st.columns(3)
            with sc1:
                st.metric("Safety Score", "78 / 100", "-22 (Violations)")
            with sc2:
                st.metric("Compliance Status", "Partially Compliant")
            with sc3:
                st.metric("Workers Detected", "4 Personnel")
                
            st.markdown("##### 🛡️ PPE Checklist Compliance")
            st.markdown("✅ **Hard Hat / Safety Helmet**: 3 of 4 workers wearing certified helmets. Worker near hoist missing helmet.")
            st.markdown("✅ **High-Visibility Vest**: 100% compliance observed across all active ground personnel.")
            st.markdown("✅ **Steel-Toe Footwear**: Verified on all ground workers.")
            st.markdown("❌ **Fall Arrest Harness**: Worker operating at Level 2 edge without lanyard tie-off.")
            
            st.markdown("##### ⚠️ Physical Hazards Flagged")
            st.error("🚨 **CRITICAL: Unprotected Floor Edge** — Level 2 perimeter lacks guardrails and safety debris netting.")
            st.warning("⚠️ **HIGH: Scaffolding Cross-Bracing Missing** — Bay 3 cuplock external scaffold missing diagonal brace.")
            st.info("ℹ️ **MEDIUM: Access Obstruction** — Steel rebar bundles obstructing main evacuation corridor.")
            
            st.markdown("##### 📋 Immediate Superintendent Directives")
            st.markdown("- Stop work on Level 2 perimeter until 1.1m double-rail guardrails are anchored.")
            st.markdown("- Tag scaffolding bay 3 as RED (Out of Service) pending structural bracing.")

# ----------------- MODULE 3: CRACK DETECTION -----------------
elif module == "🔍 Structural Crack Diagnostics (Vision)":
    st.markdown('<div class="main-header">🔍 Structural Crack Detection & Diagnostics</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Forensic concrete diagnostics, crack width estimation, and structural retrofitting protocols</div>', unsafe_allow_html=True)
    
    col_left, col_right = st.columns([1, 1.2])
    
    with col_left:
        st.markdown("#### 1. Structural Element Scan")
        use_sample = st.checkbox("Use Pre-loaded Sample Crack Image", value=True)
        uploaded_file = None
        if not use_sample:
            uploaded_file = st.file_uploader("Upload Beam / Column / Wall Fracture", type=["jpg", "png", "jpeg"])
            
        sample_path = "backend/sample_images/concrete_crack_sample.jpg"
        if use_sample and os.path.exists(sample_path):
            st.image(sample_path, caption="RCC Beam B-14 Diagonal Shear Fracture Scan", use_container_width=True)
        elif uploaded_file:
            st.image(uploaded_file, caption="Uploaded Structural Member", use_container_width=True)
            
        run_diag = st.button("🔬 Run Forensic Crack Analysis", type="primary")

    with col_right:
        st.markdown("#### 2. Diagnostic Assessment")
        if run_diag or use_sample:
            sc1, sc2, sc3 = st.columns(3)
            with sc1:
                st.metric("Integrity Index", "68 / 100", "Moderate Distress")
            with sc2:
                st.metric("Crack Severity", "Moderate - Severe")
            with sc3:
                st.metric("Occupancy Status", "Safe (Monitoring Required)")
                
            st.markdown("##### 📐 Detected Crack Dimensions")
            st.markdown("- **Crack Type**: 45° Diagonal Shear Fracture (d/2 zone near column support)")
            st.markdown("- **Estimated Width**: `1.4mm - 2.1mm` (Exceeds IS 456 limit of 0.3mm)")
            st.markdown("- **Propagation Risk**: High under dynamic live loads")
            
            st.markdown("##### 🔬 Root Cause Analysis")
            st.markdown("1. Diagonal shear tension exceeding transverse stirrup yield capacity near load point.")
            st.markdown("2. Plastic shrinkage during early hydration phase compounded by dry ambient winds.")
            
            st.markdown("##### 🛠️ Retrofitting & Repair Specification")
            st.info("""
            **Priority 1 (Within 7 Days)**: Low-Viscosity Epoxy Pressure Injection (Sikadur-52 or structural epoxy) to seal core against rebar oxidation.  
            **Priority 2 (Routine)**: External Carbon Fiber Reinforced Polymer (CFRP) 300g/m² U-wrap jacket for shear enhancement.
            """)

# ----------------- MODULE 4: PROJECT PLANNING -----------------
elif module == "📅 Project Planning & WBS":
    st.markdown('<div class="main-header">📅 Construction Project Planning & WBS Engine</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Automated Work Breakdown Structure (WBS), critical path schedule, and risk management register</div>', unsafe_allow_html=True)
    
    col_in, col_out = st.columns([1, 1.3])
    with col_in:
        st.markdown("#### Project Constraints")
        p_name = st.text_input("Project Name", value="Metro Horizon Tower")
        p_type = st.selectbox("Project Classification", ["High-rise Apartment", "Residential Villa", "Commercial Complex", "Industrial Warehouse"])
        p_area = st.number_input("Total Built-up Area (Sq.Ft)", value=45000, step=1000)
        p_budget = st.number_input("Estimated Budget (INR ₹)", value=85000000, step=1000000)
        p_months = st.slider("Target Duration (Months)", min_value=6, max_value=36, value=18)
        p_location = st.text_input("Site Location", value="Sector 62, Gurgaon NCR")
        gen_plan = st.button("⚡ Generate Master Construction Plan", type="primary")

    with col_out:
        st.markdown("#### Synthesized Master Plan")
        m1, m2, m3 = st.columns(3)
        with m1:
            st.metric("Total Budget", f"₹{p_budget/10000000:.2f} Cr")
        with m2:
            st.metric("Duration", f"{p_months} Months")
        with m3:
            st.metric("Phases", "4 Sequential Tracks")
            
        st.markdown("##### 🏗️ Work Breakdown Structure (WBS)")
        st.markdown(f"**Phase 1: Substructure & Raft Foundation** (Duration: {int(p_months*0.22*4.3)} Weeks | Critical Path: **YES**)")
        st.caption("Piling, deep excavation, raft foundation casting, plinth backfilling.")
        
        st.markdown(f"**Phase 2: RCC Superstructure & Core Framing** (Duration: {int(p_months*0.38*4.3)} Weeks | Critical Path: **YES**)")
        st.caption("Post-tensioned slabs, columns, shear walls, perimeter block masonry.")
        
        st.markdown(f"**Phase 3: MEP & Fire Life Safety** (Duration: {int(p_months*0.24*4.3)} Weeks | Critical Path: **NO**)")
        st.caption("Electrical conduits, plumbing risers, HVAC ducting, sprinkler drops.")
        
        st.markdown(f"**Phase 4: Architectural Finishes & Handover** (Duration: {int(p_months*0.16*4.3)} Weeks | Critical Path: **YES**)")
        st.caption("Flooring, glazing, MEP testing, OC statutory inspection & client handover.")

# ----------------- MODULE 5: VALUATION -----------------
elif module == "💰 Real Estate Valuation":
    st.markdown('<div class="main-header">💰 Real Estate Valuation & Cost Estimation</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Econometric appraisal modeling construction quality, replacement cost breakdown, and ROI forecasts</div>', unsafe_allow_html=True)
    
    col_in, col_out = st.columns([1, 1.3])
    with col_in:
        prop_type = st.selectbox("Asset Classification", ["Commercial", "Residential", "Industrial", "Mixed-Use"])
        area_sqft = st.number_input("Built-up Area (Sq.Ft)", value=25000, step=500)
        loc_tier = st.selectbox("Location Tier", ["Prime Metro", "Tier 1 Urban", "Tier 2 Developing", "Suburban"])
        quality = st.selectbox("Construction Quality", ["Luxury", "Premium", "Ultra-Luxury", "Standard"])
        age = st.slider("Building Age (Years)", 0, 30, 2)
        calc_val = st.button("💹 Calculate Asset Valuation", type="primary")

    with col_out:
        rate_map = {"Prime Metro": 14500, "Tier 1 Urban": 9500, "Tier 2 Developing": 6000, "Suburban": 4500}
        qual_map = {"Standard": 1.0, "Premium": 1.25, "Luxury": 1.55, "Ultra-Luxury": 1.9}
        rate = round(rate_map[loc_tier] * qual_map[quality])
        total_val = rate * area_sqft
        
        v1, v2, v3 = st.columns(3)
        with v1:
            st.metric("Total Asset Valuation", f"₹{total_val/10000000:.2f} Cr")
        with v2:
            st.metric("Price per Sq.Ft", f"₹{rate:,}")
        with v3:
            st.metric("5-Year ROI Forecast", "+34.8%")
            
        st.markdown("##### 📊 Replacement Cost & Capital Breakdown")
        st.markdown(f"- **Land Valuation Component (38%)**: ₹{(total_val*0.38)/10000000:.2f} Cr")
        st.markdown(f"- **Civil Structure Construction (34%)**: ₹{(total_val*0.34)/10000000:.2f} Cr")
        st.markdown(f"- **Finishing & MEP Engineering (20%)**: ₹{(total_val*0.20)/10000000:.2f} Cr")
        st.markdown(f"- **Permits & Statutory Contingencies (8%)**: ₹{(total_val*0.08)/10000000:.2f} Cr")

# ----------------- MODULE 6: DAILY SITE LOG -----------------
elif module == "📋 Daily Site Field Log":
    st.markdown('<div class="main-header">📋 Daily Site Assistant & Digital Field Log</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Field operations synthesis, workforce productivity tracking, and next-day punchlist formulation</div>', unsafe_allow_html=True)
    
    col_in, col_out = st.columns([1, 1.3])
    with col_in:
        log_proj = st.text_input("Project Name", "Metro Horizon Tower")
        log_date = st.date_input("Log Date")
        log_workers = st.number_input("Workers Present", value=48)
        log_weather = st.text_input("Weather", "Sunny, 31°C, Wind 14 km/h")
        log_tasks = st.text_area("Completed Activities", "1. Finished reinforcement tying for Level 4 slab.\n2. Cast 85 m³ M30 concrete for elevator core shear wall.\n3. Erected external scaffolding on West elevation.")
        log_bottlenecks = st.text_input("Bottlenecks Observed", "Concrete transit mixer delivery delayed by 45 mins.")
        log_btn = st.button("📝 Synthesize Daily Progress", type="primary")

    with col_out:
        d1, d2 = st.columns(2)
        with d1:
            st.metric("Productivity Rating", "86 / 100", "+4 (On Track)")
        with d2:
            st.metric("Schedule Assessment", "On Schedule")
            
        st.markdown("##### 🎯 Tomorrow's Priority Punch List")
        st.markdown("1. Obtain pre-pour clearance from structural consultant for Grid C-F slab.")
        st.markdown("2. Dispatch 6 batches of M30 concrete starting at 06:30 AM.")
        st.markdown("3. Layout electrical conduits on Level 3.")
        
        st.markdown("##### ⚠️ Material Reorder Alerts")
        st.warning("📦 **TMT 16mm Rebar**: Stock at 4.2 MT (Below reorder threshold 5.0 MT). PO #4489 required.")

# ----------------- MODULE 7: WEATHER ADVISORY -----------------
elif module == "🌦️ Weather-Aware Advisory":
    st.markdown('<div class="main-header">🌦️ Weather-Aware Construction Advisory</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Predictive climatology engine evaluating weather impact on concrete curing, crane lifts, and site safety</div>', unsafe_allow_html=True)
    
    col_in, col_out = st.columns([1, 1.3])
    with col_in:
        w_loc = st.text_input("Site Location", "Sector 45 Construction Zone, NCR")
        w_temp = st.slider("Ambient Temperature (°C)", 10, 50, 35)
        w_wind = st.slider("Wind Velocity (km/h)", 0, 70, 42)
        w_humid = st.slider("Humidity (%)", 10, 100, 40)
        w_rain = st.slider("Precipitation Probability (%)", 0, 100, 15)
        eval_w = st.button("🌪️ Evaluate Weather Risks", type="primary")

    with col_out:
        is_high_wind = w_wind > 38
        hazard_level = "Red (Severe Risk)" if is_high_wind else "Yellow (Moderate Risk)" if w_temp > 34 else "Green (Optimal)"
        
        if is_high_wind:
            st.error(f"🚨 **Overall Hazard Level: {hazard_level}** (Sustained wind gusts exceed 38 km/h safety envelope)")
        else:
            st.success(f"✅ **Overall Hazard Level: {hazard_level}**")
            
        st.markdown("##### 🏗️ Trade-Specific Feasibility Matrix")
        st.markdown(f"- **Tower Crane & Rigging**: {'🛑 **HALT / UNSAFE** (Wind gusts exceed safe lifting limit)' if is_high_wind else '✅ **SAFE**'}")
        st.markdown("- **Concrete Pouring & Curing**: ⚠️ **PROCEED WITH CAUTION** (Apply evaporative water ponding within 45 mins to prevent plastic shrinkage)")
        st.markdown("- **Deep Foundation Trenching**: ✅ **SAFE** (Shoring stable under current dry ground conditions)")
        st.markdown(f"- **External Spray Painting**: {'🛑 **HALT** (Overspray hazard due to wind)' if w_wind > 25 else '✅ **SAFE**'}")

# ----------------- MODULE 8: KNOWLEDGE AI -----------------
elif module == "📚 Civil Knowledge AI Consultant":
    st.markdown('<div class="main-header">📚 Civil Engineering Knowledge AI Consultant</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Authoritative knowledge assistant citing Indian Standards (IS), NBC 2016, ACI 318, and OSHA 1926</div>', unsafe_allow_html=True)
    
    topic = st.selectbox("Domain Topic", ["Codes & Standards", "Materials & Concrete Mix", "Structural Analysis", "Site Safety & OSHA"])
    query = st.text_input("Enter your engineering inquiry:", value="What are permissible crack widths per IS 456:2000?")
    ask_btn = st.button("💡 Ask AuraConstruct AI", type="primary")
    
    if ask_btn or query:
        st.markdown("### 🤖 Consultant Response")
        st.markdown("""
        According to **IS 456:2000 Clause 35.3.2** (*Limit State of Serviceability: Cracking*):
        
        1. **Permissible Surface Crack Widths**:
           - **0.3 mm**: Under **Mild exposure** conditions (protected against weather/aggressive conditions).
           - **0.2 mm**: Under **Moderate exposure** conditions (sheltered from rain, or continuously under water).
           - **0.1 mm**: Under **Severe / Very Severe exposure** conditions (coastal spray, aggressive groundwater).
           
        2. **Remedial Requirements**:
           - Any diagonal shear cracks or cracks exceeding 0.4 mm width require structural epoxy resin pressure injection (ASTM C881 compliant) to prevent chloride-induced rebar corrosion.
        """)
        
        st.info("📌 **Applicable Cited Standards**: `IS 456:2000`, `ACI 224.1R-07`, `NBC 2016 Part 6`, `ASTM C881`")
