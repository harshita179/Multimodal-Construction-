import React, { useState } from 'react';
import {
  CalendarDays,
  Sparkles,
  Zap,
  RefreshCw,
  Clock,
  Coins,
  AlertTriangle,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Truck
} from 'lucide-react';
import { api } from '../services/api';

export default function PlanningTab() {
  const [formData, setFormData] = useState({
    project_name: 'Metro Horizon Tower',
    project_type: 'High-rise Apartment',
    total_area_sqft: 45000,
    estimated_budget_inr: 85000000,
    desired_duration_months: 18,
    site_location: 'Sector 62, Gurgaon, NCR',
    special_requirements: 'Post-tensioned slabs, solar rooftop integration, fast-track monsoon construction.'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.generateProjectPlan(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate plan');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (presetType) => {
    if (presetType === 'villa') {
      setFormData({
        project_name: 'Palm Meadows Luxury Villa',
        project_type: 'Residential Villa',
        total_area_sqft: 6500,
        estimated_budget_inr: 22000000,
        desired_duration_months: 10,
        site_location: 'Whitefield, Bengaluru',
        special_requirements: 'Italian marble finishes, smart home automation, rainwater harvesting.'
      });
    } else {
      setFormData({
        project_name: 'Apex Cyber Park Tower',
        project_type: 'Commercial Complex',
        total_area_sqft: 85000,
        estimated_budget_inr: 160000000,
        desired_duration_months: 24,
        site_location: 'Hitec City, Hyderabad',
        special_requirements: 'LEED Gold Certification, double-glazed curtain wall facade, twin tower cranes.'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <CalendarDays className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Construction Project Planning & WBS Engine
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated Work Breakdown Structure, critical-path scheduling, milestone roadmap, and risk management.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => loadPreset('commercial')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Preset: Commercial
          </button>
          <button
            onClick={() => loadPreset('villa')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Preset: Villa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Project Specification Parameters
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Type
                </label>
                <select
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option>Residential Villa</option>
                  <option>High-rise Apartment</option>
                  <option>Commercial Complex</option>
                  <option>Industrial Warehouse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Built-up Area (Sq.Ft)
                </label>
                <input
                  type="number"
                  value={formData.total_area_sqft}
                  onChange={(e) => setFormData({ ...formData, total_area_sqft: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estimated Budget (INR ₹)
                </label>
                <input
                  type="number"
                  value={formData.estimated_budget_inr}
                  onChange={(e) => setFormData({ ...formData, estimated_budget_inr: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Duration (Months)
                </label>
                <input
                  type="number"
                  value={formData.desired_duration_months}
                  onChange={(e) => setFormData({ ...formData, desired_duration_months: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Site Location
              </label>
              <input
                type="text"
                value={formData.site_location}
                onChange={(e) => setFormData({ ...formData, site_location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Constraints & Requirements
              </label>
              <textarea
                rows={3}
                value={formData.special_requirements}
                onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-md shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Master Construction Schedule...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Generate WBS & Schedule</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {loading && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  AI Construction Project Scheduler Running
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Synthesizing work breakdown structure, computing critical path sequences, and generating risk mitigation protocols...
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
              <CalendarDays className="w-12 h-12 mx-auto text-slate-300" />
              <div className="text-sm font-semibold text-slate-700">
                Ready to Generate Project Plan
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Configure project specifications on the left and click <strong>"Generate WBS & Schedule"</strong>.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Top Banner Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-slate-400" />
                    <span>Estimated Budget</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    ₹{(result.total_estimated_cost_inr / 10000000).toFixed(2)} Cr
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Total Duration</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {result.total_duration_months} Months
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                    <span>Execution Phases</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-blue-600 mt-1">
                    {result.phases?.length || 4} Sequential Tracks
                  </div>
                </div>
              </div>

              {/* 4-Phase Work Breakdown Structure (WBS) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <ListTodo className="w-4 h-4 text-blue-600" />
                  <span>Work Breakdown Structure (WBS) & Timeline</span>
                </h3>

                <div className="space-y-3">
                  {result.phases?.map((ph, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                            {ph.phase_number}
                          </span>
                          <span>{ph.phase_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {ph.is_critical_path && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                              Critical Path
                            </span>
                          )}
                          <span className="font-mono text-slate-600 font-semibold">
                            {ph.duration_weeks} Weeks • ₹{(ph.estimated_cost_inr / 10000000).toFixed(2)} Cr
                          </span>
                        </div>
                      </div>

                      <div className="pt-1.5">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {ph.tasks?.map((t, tidx) => (
                            <li key={tidx} className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Milestones */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                  Milestone Roadmap & Cashflow Trigger Points
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {result.milestones?.map((ms, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{ms.milestone_name}</span>
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-100 text-blue-800">
                          Month {ms.month}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{ms.deliverable}</p>
                      <div className="text-[10px] text-slate-400 font-semibold">
                        Progress Billing Target: {ms.budget_milestone_pct}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Mitigation Register */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Risk Register & Contingency Protocols</span>
                </h3>

                <div className="space-y-2">
                  {result.risks?.map((r, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{r.risk_title}</span>
                        <div className="flex gap-1.5 text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Likelihood: {r.likelihood}</span>
                          <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-semibold">Impact: {r.impact}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Mitigation Strategy:</strong> {r.mitigation_strategy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2 border border-slate-800 text-xs">
                <div className="font-bold text-amber-400 uppercase tracking-wider">
                  Project Director Executive Directive
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {result.executive_summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
