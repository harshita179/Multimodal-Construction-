import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OverviewTab from './components/OverviewTab';
import SafetyTab from './components/SafetyTab';
import CracksTab from './components/CracksTab';
import PlanningTab from './components/PlanningTab';
import ValuationTab from './components/ValuationTab';
import DailySiteTab from './components/DailySiteTab';
import WeatherTab from './components/WeatherTab';
import KnowledgeTab from './components/KnowledgeTab';
import SettingsModal from './components/SettingsModal';
import { api } from './services/api';
import { HardHat, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const fetchStatus = async () => {
    try {
      const data = await api.getStatus();
      setSystemStatus(data);
    } catch (err) {
      console.warn('System status check:', err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemStatus={systemStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewTab setActiveTab={setActiveTab} systemStatus={systemStatus} />
        )}
        {activeTab === 'safety' && <SafetyTab />}
        {activeTab === 'cracks' && <CracksTab />}
        {activeTab === 'planning' && <PlanningTab />}
        {activeTab === 'valuation' && <ValuationTab />}
        {activeTab === 'daily-site' && <DailySiteTab />}
        {activeTab === 'weather' && <WeatherTab />}
        {activeTab === 'knowledge' && <KnowledgeTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HardHat className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-700">
              Multimodal Construction Intelligence Platform
            </span>
            <span>• Full Stack Decision-Support System</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Swagger API Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>FastAPI Python + React.js</span>
            <span className="text-slate-300">|</span>
            <span>SkillWallet / Google Cloud GenAI</span>
          </div>
        </div>
      </footer>

      {/* API Key Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onKeyUpdated={fetchStatus}
        currentStatus={systemStatus}
      />
    </div>
  );
}
