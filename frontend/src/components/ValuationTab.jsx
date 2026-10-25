import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  Building,
  Sparkles,
  Zap,
  RefreshCw,
  PieChart,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { api } from '../services/api';

export default function ValuationTab() {
  const [formData, setFormData] = useState({
    property_type: 'Commercial',
    built_up_area_sqft: 25000,
    land_area_sqft: 15000,
    location_tier: 'Prime Metro',
    construction_quality: 'Premium',
    amenities: ['High-speed Elevators', '24/7 Power Backup', 'Basement Parking', 'Fire Suppression System', 'HVAC Central Chiller'],
    age_years: 2,
    floors_count: 8
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const amenityOptions = [
    'High-speed Elevators',
    '24/7 Power Backup',
    'Basement Parking',
    'Fire Suppression System',
    'HVAC Central Chiller',
    'Clubhouse & Gym',
    'Rooftop Solar Plant',
    'Rainwater Harvesting'
  ];

  const toggleAmenity = (name) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== name)
          : [...prev.amenities, name]
      };
    });
  };

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.calculateValuation(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Valuation failed');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (type) => {
    if (type === 'luxury_res') {
      setFormData({
        property_type: 'Residential',
        built_up_area_sqft: 4200,
        land_area_sqft: 3200,
        location_tier: 'Tier 1 Urban',
        construction_quality: 'Luxury',
        amenities: ['Clubhouse & Gym', '24/7 Power Backup', 'Rooftop Solar Plant', 'Rainwater Harvesting'],
        age_years: 1,
        floors_count: 3
      });
    } else {
      setFormData({
        property_type: 'Commercial',
        built_up_area_sqft: 35000,
        land_area_sqft: 20000,
        location_tier: 'Prime Metro',
        construction_quality: 'Ultra-Luxury',
        amenities: ['High-speed Elevators', '24/7 Power Backup', 'Basement Parking', 'Fire Suppression System', 'HVAC Central Chiller'],
        age_years: 0,
        floors_count: 10
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Coins className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Real Estate Valuation & Cost Estimation Engine
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multimodal econometric valuation modeling construction quality, replacement cost breakdown, and ROI forecasts.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => loadPreset('commercial')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Preset: Metro Tech Hub
          </button>
          <button
            onClick={() => loadPreset('luxury_res')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Preset: Luxury Residence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleCalculate} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Property & Structural Parameters
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Property Asset Type
                </label>
                <select
                  value={formData.property_type}
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Mixed-Use</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location Tier
                </label>
                <select
                  value={formData.location_tier}
                  onChange={(e) => setFormData({ ...formData, location_tier: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                >
                  <option>Prime Metro</option>
                  <option>Tier 1 Urban</option>
                  <option>Tier 2 Developing</option>
                  <option>Suburban</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Built-up Area (Sq.Ft)
                </label>
                <input
                  type="number"
                  value={formData.built_up_area_sqft}
                  onChange={(e) => setFormData({ ...formData, built_up_area_sqft: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Construction Quality Tier
                </label>
                <select
                  value={formData.construction_quality}
                  onChange={(e) => setFormData({ ...formData, construction_quality: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                >
                  <option>Standard</option>
                  <option>Premium</option>
                  <option>Luxury</option>
                  <option>Ultra-Luxury</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Structure Age (Years)
                </label>
                <input
                  type="number"
                  value={formData.age_years}
                  onChange={(e) => setFormData({ ...formData, age_years: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Floors Count
                </label>
                <input
                  type="number"
                  value={formData.floors_count}
                  onChange={(e) => setFormData({ ...formData, floors_count: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Amenities Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Amenities & Infrastructure Multipliers
              </label>
              <div className="flex flex-wrap gap-1.5">
                {amenityOptions.map((am) => {
                  const selected = formData.amenities.includes(am);
                  return (
                    <button
                      key={am}
                      type="button"
                      onClick={() => toggleAmenity(am)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                        selected
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '} {am}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing Real Estate Valuation Model...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Calculate Valuation & Cost Breakdown</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {loading && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  AI Valuation Engine Running
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Computing regional price per sq.ft benchmarks, material cost inflation, and replacement cost depreciation...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !result && !error && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 space-y-3">
              <Coins className="w-12 h-12 mx-auto text-slate-300" />
              <div className="text-sm font-semibold text-slate-700">
                Awaiting Valuation Computation
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Adjust the property parameters on the left and click <strong>"Calculate Valuation"</strong>.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Primary Valuation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Total Estimated Asset Valuation
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                    ₹{(result.estimated_total_valuation_inr / 10000000).toFixed(2)} Cr
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Range: ₹{(result.market_range_min_inr / 10000000).toFixed(2)} - ₹{(result.market_range_max_inr / 10000000).toFixed(2)} Cr
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Rate per Sq.Ft
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    ₹{result.price_per_sqft_inr.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Confidence: {Math.round(result.confidence_score * 100)}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                    <span>5-Yr Projected ROI</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-1">
                    +{result.five_year_roi_projection_pct}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Capital Appreciation Model
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <PieChart className="w-4 h-4 text-emerald-600" />
                  <span>Replacement Cost & Asset Allocation Breakdown</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-slate-500 font-semibold text-[11px]">Land Valuation</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      ₹{(result.cost_breakdown.land_value_inr / 10000000).toFixed(2)} Cr
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-slate-500 font-semibold text-[11px]">Civil Structure</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      ₹{(result.cost_breakdown.civil_structure_cost_inr / 10000000).toFixed(2)} Cr
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-slate-500 font-semibold text-[11px]">Finishing & MEP</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      ₹{(result.cost_breakdown.finishing_and_mep_inr / 10000000).toFixed(2)} Cr
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-slate-500 font-semibold text-[11px]">Permits & Contingency</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      ₹{(result.cost_breakdown.permits_and_contingency_inr / 10000000).toFixed(2)} Cr
                    </div>
                  </div>
                </div>
              </div>

              {/* Value Drivers */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  Key Valuation Drivers & Economic Catalysts
                </h3>

                <div className="space-y-2">
                  {result.key_valuation_factors?.map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Narrative */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2 border border-slate-800 text-xs">
                <div className="font-bold text-amber-400 uppercase tracking-wider">
                  Chartered Appraiser AI Valuation Commentary
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {result.ai_valuation_narrative}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
