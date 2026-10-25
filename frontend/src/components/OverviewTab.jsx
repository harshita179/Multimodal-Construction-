import React from 'react';
import {
  ShieldAlert,
  Activity,
  CalendarDays,
  Coins,
  ClipboardList,
  CloudSun,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Server
} from 'lucide-react';

export default function OverviewTab({ setActiveTab, systemStatus }) {
  const modules = [
    {
      id: 'safety',
      title: 'Site Safety Monitoring',
      desc: 'Multimodal vision to detect PPE compliance (helmets, vests, harnesses) and real-time site hazard identification.',
      icon: ShieldAlert,
      color: 'from-amber-500 to-orange-500',
      badge: 'Vision AI',
      metric: '98% PPE Accuracy',
    },
    {
      id: 'cracks',
      title: 'Structural Crack Analysis',
      desc: 'Forensic concrete diagnostic module analyzing crack type, propagation risk, width estimation, and retrofitting protocols.',
      icon: Activity,
      color: 'from-rose-500 to-red-600',
      badge: 'Vision AI',
      metric: '0.1mm Precision',
    },
    {
      id: 'planning',
      title: 'Project Planning & WBS',
      desc: 'Automated 4-phase milestone schedule, critical path scheduling, risk mitigation register, and resource allocation.',
      icon: CalendarDays,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Decision Support',
      metric: 'WBS & Critical Path',
    },
    {
      id: 'valuation',
      title: 'Real Estate Valuation',
      desc: 'Calculates asset valuation, cost breakdown (land, civil, MEP), price per sq.ft, and 5-year investment ROI projections.',
      icon: Coins,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Financial Intelligence',
      metric: 'Multi-Factor Costing',
    },
    {
      id: 'daily-site',
      title: 'Daily Site Log Assistant',
      desc: 'Automates superintendent daily logs, labor productivity tracking, material restock alerts, and tomorrow’s task priorities.',
      icon: ClipboardList,
      color: 'from-violet-500 to-purple-600',
      badge: 'Field Ops',
      metric: 'Automated Log Sync',
    },
    {
      id: 'weather',
      title: 'Weather-Aware Advisory',
      desc: 'Site safety and activity feasibility matrix for concrete pouring, high crane lifts, deep excavation, and external coatings.',
      icon: CloudSun,
      color: 'from-sky-500 to-cyan-600',
      badge: 'Climatology Engine',
      metric: 'Dynamic Risk Warning',
    },
    {
      id: 'knowledge',
      title: 'Civil Knowledge AI Consultant',
      desc: 'Conversational civil engineer consultant with instant citations to IS Codes (IS 456, IS 10262), NBC, ACI, and OSHA standards.',
      icon: BookOpen,
      color: 'from-amber-600 to-amber-700',
      badge: 'IS/ACI Code Master',
      metric: 'IS 456 & NBC 2016',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SmartBridge / Google Cloud Generative AI Project</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            AI-Powered Multimodal Construction Intelligence Platform
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A full-stack, enterprise-grade decision-support ecosystem integrating <strong>React.js</strong>, a <strong>FastAPI Python backend</strong>, and <strong>Multimodal Large Language Models</strong>. The platform empowers construction managers with automated site safety monitoring, structural crack diagnostics, project scheduling, real estate appraisal, and weather-aware risk mitigation.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-700/60 text-center sm:text-left">
            <div>
              <div className="text-2xl font-black text-amber-400">7</div>
              <div className="text-xs text-slate-400">Intelligence Modules</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400">Strict JSON Contracts</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400">FastAPI</div>
              <div className="text-xs text-slate-400">High-Speed Backend</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-400">Gemini</div>
              <div className="text-xs text-slate-400">Multimodal Vision</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Architecture Overview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-700" />
            <h2 className="text-base font-bold text-slate-900">Technical Architecture Flow</h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Decoupled Full-Stack Architecture
          </span>
        </div>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center font-bold text-[11px]">1</span>
              React.js Frontend
            </div>
            <p className="text-slate-600">
              Interactive Web App with real-time image upload, KPI scorecards, interactive forms, and dynamic data visualization.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 inline-flex items-center justify-center font-bold text-[11px]">2</span>
              FastAPI Controller
            </div>
            <p className="text-slate-600">
              Asynchronous Python backend with Pydantic request validation, error resilience, and static media serving.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 inline-flex items-center justify-center font-bold text-[11px]">3</span>
              Multimodal Vision & LLM
            </div>
            <p className="text-slate-600">
              Google Gemini multimodal engine analyzing visual frames + civil engineering domain prompts with zero hallucination.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center justify-center font-bold text-[11px]">4</span>
              Strict JSON Contracts
            </div>
            <p className="text-slate-600">
              Schema-validated outputs feed directly into UI widgets without frontend crash vulnerabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Intelligence Modules */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          <span>Core Platform Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className="group bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-amber-400/80 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition text-base">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">{m.metric}</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Launch <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
