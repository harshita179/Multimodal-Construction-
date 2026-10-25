"""
Automated Test Suite using AsyncClient for FastAPI 0.162+
"""
import sys
import os
import asyncio

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from httpx import ASGITransport, AsyncClient
from app.main import app

async def run_all_tests():
    print("\n================ STARTING MULTIMODAL API TEST SUITE ================")
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # 1. System Status
        print("1. Testing /api/v1/system/status...")
        res = await client.get("/api/v1/system/status")
        assert res.status_code == 200, f"Status failed: {res.text}"
        data = res.json()
        assert data["status"] == "online"
        assert len(data["features"]) == 7
        print("   [OK] System Status: ONLINE | Features: 7")

        # 2. Safety Sample
        print("2. Testing /api/v1/safety/sample-demo...")
        res = await client.get("/api/v1/safety/sample-demo")
        assert res.status_code == 200
        safety_data = res.json()
        assert "safety_score" in safety_data
        assert safety_data["safety_score"] == 78
        print(f"   [OK] Safety Score: {safety_data['safety_score']}/100 | Workers: {safety_data['detected_workers_count']}")

        # 3. Safety Upload Image
        print("3. Testing /api/v1/safety/analyze (Image Upload)...")
        img_path = os.path.join(os.path.dirname(__file__), "sample_images", "construction_safety_sample.jpg")
        with open(img_path, "rb") as f:
            files = {"file": ("safety.jpg", f.read(), "image/jpeg")}
            res = await client.post("/api/v1/safety/analyze", files=files)
        assert res.status_code == 200
        print("   [OK] Safety Multimodal Analysis Successful")

        # 4. Crack Sample
        print("4. Testing /api/v1/cracks/sample-demo...")
        res = await client.get("/api/v1/cracks/sample-demo")
        assert res.status_code == 200
        crack_data = res.json()
        assert "structural_integrity_score" in crack_data
        print(f"   [OK] Structural Integrity Score: {crack_data['structural_integrity_score']}/100")

        # 5. Crack Upload Image
        print("5. Testing /api/v1/cracks/analyze (Image Upload)...")
        crack_img_path = os.path.join(os.path.dirname(__file__), "sample_images", "concrete_crack_sample.jpg")
        with open(crack_img_path, "rb") as f:
            files = {"file": ("crack.jpg", f.read(), "image/jpeg")}
            res = await client.post("/api/v1/cracks/analyze", files=files)
        assert res.status_code == 200
        print("   [OK] Structural Crack Analysis Successful")

        # 6. Real Estate Valuation
        print("6. Testing /api/v1/valuation/estimate...")
        val_payload = {
            "property_type": "Commercial",
            "built_up_area_sqft": 25000,
            "location_tier": "Prime Metro",
            "construction_quality": "Luxury",
            "amenities": ["Elevators", "Power Backup"],
            "age_years": 1,
            "floors_count": 8
        }
        res = await client.post("/api/v1/valuation/estimate", json=val_payload)
        assert res.status_code == 200
        val_data = res.json()
        print(f"   [OK] Valuation: INR {val_data['estimated_total_valuation_inr']:,} (Rate: INR {val_data['price_per_sqft_inr']}/sqft)")

        # 7. Project Planning & WBS
        print("7. Testing /api/v1/planning/generate...")
        plan_payload = {
            "project_name": "Horizon Heights",
            "project_type": "High-rise Apartment",
            "total_area_sqft": 45000,
            "estimated_budget_inr": 85000000,
            "desired_duration_months": 18,
            "site_location": "Gurgaon NCR"
        }
        res = await client.post("/api/v1/planning/generate", json=plan_payload)
        assert res.status_code == 200
        plan_data = res.json()
        print(f"   [OK] Project Plan Generated: {len(plan_data['phases'])} Phases, {len(plan_data['milestones'])} Milestones")

        # 8. Daily Site Assistant
        print("8. Testing /api/v1/daily-site/log...")
        log_payload = {
            "project_name": "Horizon Heights",
            "date": "2026-10-25",
            "weather_condition": "Sunny, 30C",
            "workers_present": 48,
            "completed_activities": ["Slab reinforcement tying", "Formwork shuttering"],
            "materials_consumed": {"Cement": "320 bags"}
        }
        res = await client.post("/api/v1/daily-site/log", json=log_payload)
        assert res.status_code == 200
        log_data = res.json()
        print(f"   [OK] Daily Log Processed: Productivity {log_data['daily_productivity_score']}/100, Status: {log_data['status_assessment']}")

        # 9. Weather Advisory
        print("9. Testing /api/v1/weather/advisory...")
        weather_payload = {
            "location": "Gurgaon Sector 62",
            "temperature_c": 34.0,
            "condition": "High Winds",
            "humidity_pct": 40,
            "wind_speed_kmh": 42.0,
            "precipitation_chance_pct": 10
        }
        res = await client.post("/api/v1/weather/advisory", json=weather_payload)
        assert res.status_code == 200
        weather_data = res.json()
        print(f"   [OK] Weather Advisory: Hazard Level: {weather_data['overall_site_hazard_level']} | Activities: {len(weather_data['activities'])}")

        # 10. Knowledge Assistant
        print("10. Testing /api/v1/knowledge/chat...")
        know_payload = {
            "query": "What are permissible crack widths per IS 456?",
            "domain_topic": "Codes & Standards",
            "history": []
        }
        res = await client.post("/api/v1/knowledge/chat", json=know_payload)
        assert res.status_code == 200
        know_data = res.json()
        print(f"   [OK] Knowledge Consultant Response OK | Codes Cited: {know_data['applicable_codes']}")

    print("\n================ ALL 10 TESTS PASSED WITH 100% SUCCESS ================\n")

if __name__ == "__main__":
    asyncio.run(run_all_tests())
