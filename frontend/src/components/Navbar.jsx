import React from 'react';
import {
  HardHat,
  ShieldAlert,
  Activity,
  CalendarDays,
  Coins,
  ClipboardList,
  CloudSun,
  BookOpen,
  LayoutDashboard,
  Key,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemStatus, onOpenSettings }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'safety', label: 'Site Safety AI', icon: ShieldAlert, badge: 'Vision' },
    { id: 'cracks', label: 'Crack Analysis', icon: Activity, badge: 'Vision' },
    { id: 'planning', label: 'Project Planner', icon: CalendarDays },
    { id: 'valuation', label: 'Valuation & Cost', icon: Coins },
    { id: 'daily-site', label: 'Daily Site Log', icon: ClipboardList },
    { id: 'weather', label: 'Weather Advisory', icon: CloudSun },
    { id: 'knowledge', label: 'Knowledge AI', icon: BookOpen },
  ];

  const isLive = systemStatus?.live_ai_ready;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-slate-800/80">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-slate-950 font-bold">
              <HardHat className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Multimodal Construction Intelligence
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Full Stack Platform
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Decision-Support System powered by Multimodal AI & FastAPI
              </p>
            </div>
          </div>

          {/* Right Action: AI Status & API Key Config */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                isLive
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden md:inline">
                {isLive ? 'Gemini 1.5 Flash Live' : 'High-Fidelity Mock Mode'}
              </span>
            </div>

            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Configure Gemini API Key"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>API Key</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-bold ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-orange-500/20 text-orange-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
