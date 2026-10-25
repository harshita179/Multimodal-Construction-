import React, { useState } from 'react';
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  CloudRain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  RefreshCw,
  ShieldAlert
} from 'lucide-react';
import { api } from '../services/api';

export default function WeatherTab() {
  const [formData, setFormData] = useState({
    location: 'Sector 45 Construction Zone, NCR',
    temperature_c: 34.5,
    condition: 'High Winds',
    humidity_pct: 42,
    wind_speed_kmh: 41.2,
    precipitation_chance_pct: 15
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFetchAdvisory = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.getWeatherAdvisory(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Weather advisory failed');
    } finally {
      setLoading(false);
    }
  };

  const setWeatherPreset = (preset) => {
    switch (preset) {
      case 'monsoon':
        setFormData({
          location: 'Coastal Pier Project, Mumbai',
          temperature_c: 27.0,
          condition: 'Heavy Rain',
          humidity_pct: 92,
          wind_speed_kmh: 32.0,
          precipitation_chance_pct: 85
        });
        break;
      case 'heat':
        setFormData({
          location: 'Industrial Corridor, Ahmedabad',
          temperature_c: 42.5,
          condition: 'Extreme Heat',
          humidity_pct: 28,
          wind_speed_kmh: 18.0,
          precipitation_chance_pct: 0
        });
        break;
      case 'optimal':
        setFormData({
          location: 'Greenfield City, Pune',
          temperature_c: 24.0,
          condition: 'Sunny',
          humidity_pct: 48,
          wind_speed_kmh: 12.0,
          precipitation_chance_pct: 5
        });
        break;
      default:
        setFormData({
          location: 'High-Rise Site, Delhi NCR',
          temperature_c: 33.0,
          condition: 'High Winds',
          humidity_pct: 40,
          wind_speed_kmh: 44.0,
          precipitation_chance_pct: 10
        });
    }
  };

  const getStatusBadge = (status) => {
    if (status.includes('Halt') || status.includes('Unsafe')) {
      return 'bg-red-50 text-red-700 border-red-200 font-bold';
    }
    if (status.includes('Caution')) {
      return 'bg-amber-50 text-amber-700 border-amber-200 font-bold';
    }
    return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-600">
              <CloudSun className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Weather-Aware Construction Advisory
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive climatology engine evaluating weather impact on concrete curing, crane lifts, excavation, and worker safety.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center text-xs">
          <button
            onClick={() => setWeatherPreset('wind')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
          >
            Gusts (44 km/h)
          </button>
          <button
            onClick={() => setWeatherPreset('monsoon')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
          >
            Heavy Rain (85%)
          </button>
          <button
            onClick={() => setWeatherPreset('heat')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
          >
            Heatwave (42.5°C)
          </button>
          <button
            onClick={() => setWeatherPreset('optimal')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
          >
            Clear / Optimal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleFetchAdvisory} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Site Micro-Climate Telemetry
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Site Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                  <span>Ambient Temp (°C)</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.temperature_c}
                  onChange={(e) => setFormData({ ...formData, temperature_c: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-blue-500" />
                  <span>Wind Speed (km/h)</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.wind_speed_kmh}
                  onChange={(e) => setFormData({ ...formData, wind_speed_kmh: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                  <span>Humidity (%)</span>
                </label>
                <input
                  type="number"
                  value={formData.humidity_pct}
                  onChange={(e) => setFormData({ ...formData, humidity_pct: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Precipitation (%)</span>
                </label>
                <input
                  type="number"
                  value={formData.precipitation_chance_pct}
                  onChange={(e) => setFormData({ ...formData, precipitation_chance_pct: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dominant Forecast Condition
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              >
                <option>Sunny</option>
                <option>Heavy Rain</option>
                <option>Thunderstorm</option>
                <option>High Winds</option>
                <option>Foggy</option>
                <option>Extreme Heat</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition shadow-md shadow-sky-600/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Calculating Weather Risks...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Evaluate Activity Advisory Matrix</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {loading && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Climatology Risk Model Processing
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Correlating wind gusts against crane tolerances, humidity against concrete curing, and thermal stress thresholds...
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
              <CloudSun className="w-12 h-12 mx-auto text-slate-300" />
              <div className="text-sm font-semibold text-slate-700">
                Weather Advisory Ready
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Set weather telemetry or click one of the preset weather states above.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Hazard Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  result.overall_site_hazard_level.includes('Red')
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : result.overall_site_hazard_level.includes('Yellow')
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    Overall Site Weather Hazard Level
                  </div>
                  <div className="text-lg font-black mt-0.5">
                    {result.overall_site_hazard_level}
                  </div>
                </div>
                <ShieldAlert className="w-8 h-8 opacity-75" />
              </div>

              {/* Concrete & Crane Specific Guidance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Concrete Hydration & Curing Protocol</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {result.concrete_curing_guidance}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Crane Rigging & Height Limits</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {result.crane_and_height_work_status}
                  </p>
                </div>
              </div>

              {/* Activity Advisory Matrix */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  Trade-Specific Activity Feasibility Matrix
                </h3>

                <div className="space-y-2.5">
                  {result.activities?.map((act, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          {act.activity_name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase border ${getStatusBadge(act.status)}`}>
                          {act.status}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Condition Impact:</strong> {act.reasoning}
                      </p>
                      <div className="text-[11px] text-sky-900 bg-sky-50 p-2 rounded-lg border border-sky-100">
                        <strong>Safety Protocol:</strong> {act.safety_protocol}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worker Heat Stress Protocol & Directive */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 border border-slate-800 text-xs">
                <div className="font-bold text-amber-400 uppercase tracking-wider">
                  Morning Safety Briefing Directive
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {result.actionable_superintendent_summary}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong>Worker Health Protocol:</strong> {result.heat_or_cold_stress_protocol}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
