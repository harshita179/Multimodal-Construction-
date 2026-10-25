import React, { useState } from 'react';
import {
  ClipboardList,
  Sparkles,
  Zap,
  RefreshCw,
  Users,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  PackageSearch,
  ListTodo,
  TrendingUp
} from 'lucide-react';
import { api } from '../services/api';

export default function DailySiteTab() {
  const [formData, setFormData] = useState({
    project_name: 'Metro Horizon Tower - Block B',
    date: new Date().toISOString().split('T')[0],
    weather_condition: 'Sunny, 31°C, Mild Wind 14 km/h',
    workers_present: 48,
    equipment_deployed: ['Tower Crane #1', 'Putzmeister Concrete Pump', 'Bar Bending Machine', '2x Transit Mixers'],
    completed_activities: [
      'Completed reinforcement tying for 4th floor slab Grid A to E',
      'Poured 85 m³ M30 grade concrete for central elevator core shear wall',
      'Erected external cuplock scaffolding on western elevation up to 5th tier'
    ],
    materials_consumed: {
      'OPC 53 Cement': '320 bags',
      'Fe500D TMT 16mm Steel': '4.8 MT',
      'Crushed Sand': '45 tonnes'
    },
    delays_or_bottlenecks: 'Cement transit mixer delivery delayed by 45 mins due to city morning traffic restrictions.'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.logDailySite(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Daily log submission failed');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = () => {
    setFormData({
      project_name: 'Apex Commercial Hub - Phase 2',
      date: new Date().toISOString().split('T')[0],
      weather_condition: 'Overcast, 28°C, Humidity 75%',
      workers_present: 72,
      equipment_deployed: ['2x Tower Cranes', 'Batching Plant Unit 1', 'Boom Placer', 'Excavator Cat 320D'],
      completed_activities: [
        'Finished post-tensioning tendon stressing on Level 6 post-tensioned beam',
        'AAC blockwork completed across 2,400 sq.ft on Level 3 interior corridors',
        'Hydrostatic pressure testing completed on fire riser line with zero pressure drop'
      ],
      materials_consumed: {
        'Ready Mix Concrete M35': '120 m³',
        'AAC Blocks 600x200x150': '1,400 units',
        'Bonding Mortar': '35 bags'
      },
      delays_or_bottlenecks: 'Tower crane hoist line inspection scheduled at 14:00 paused lifting for 1 hour.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600">
              <ClipboardList className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Daily Site Assistant & Digital Field Log
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time daily progress assessment, workforce productivity tracking, and superintendent next-day planning.
          </p>
        </div>

        <button
          onClick={loadPreset}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition self-start sm:self-center"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Load Sample Field Log</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Daily Field Superintendent Log
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Log Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Workers on Site
                </label>
                <input
                  type="number"
                  value={formData.workers_present}
                  onChange={(e) => setFormData({ ...formData, workers_present: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Weather Condition
              </label>
              <input
                type="text"
                value={formData.weather_condition}
                onChange={(e) => setFormData({ ...formData, weather_condition: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Completed Activities (Comma or newline separated)
              </label>
              <textarea
                rows={3}
                value={formData.completed_activities.join('\n')}
                onChange={(e) => setFormData({ ...formData, completed_activities: e.target.value.split('\n') })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bottlenecks / Stoppages Observed
              </label>
              <input
                type="text"
                value={formData.delays_or_bottlenecks}
                onChange={(e) => setFormData({ ...formData, delays_or_bottlenecks: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white transition shadow-md shadow-violet-600/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Daily Site Log...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Synthesize Daily Progress & Priorities</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {loading && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  AI Superintendent Assistant Analyzing Log
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Correlating worker output, evaluating schedule deviation, and compiling next-day action punchlist...
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
              <ClipboardList className="w-12 h-12 mx-auto text-slate-300" />
              <div className="text-sm font-semibold text-slate-700">
                Awaiting Daily Log Submission
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Review the daily activity inputs on the left and click <strong>"Synthesize Daily Progress"</strong>.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Scorecard */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Daily Productivity Rating
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
                    <span className="text-violet-600">{result.daily_productivity_score}</span>
                    <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Schedule Status Assessment
                  </div>
                  <div className="mt-1">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {result.status_assessment}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <TrendingUp className="w-4 h-4 text-violet-600" />
                  <span>Daily Synthesis & Operational Summary</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.progress_summary}
                </p>
              </div>

              {/* Tomorrow Priorities */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <ListTodo className="w-4 h-4 text-blue-600" />
                  <span>Tomorrow's Priority Action Punch List</span>
                </h3>

                <div className="space-y-2">
                  {result.tomorrow_priorities?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restock & Risk alerts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <PackageSearch className="w-4 h-4 text-amber-500" />
                    <span>Material Reorder Alerts</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600">
                    {result.material_restock_alerts?.map((alert, i) => (
                      <li key={i} className="bg-amber-50 p-2 rounded-lg border border-amber-100 text-[11px] text-amber-900">
                        {alert}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span>Safety & Delay Risk Flags</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600">
                    {result.risk_flags?.map((flag, i) => (
                      <li key={i} className="bg-red-50 p-2 rounded-lg border border-red-100 text-[11px] text-red-900">
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
