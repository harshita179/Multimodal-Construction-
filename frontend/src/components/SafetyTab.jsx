import React, { useState } from 'react';
import {
  ShieldAlert,
  Upload,
  HardHat,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
  Zap,
  Users,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

export default function SafetyTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async (fileToAnalyze = selectedFile) => {
    if (!fileToAnalyze) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.analyzeSafetyImage(fileToAnalyze);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Safety analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      // Set preview to sample image url
      setPreviewUrl('/sample_images/construction_safety_sample.jpg');
      setSelectedFile(null);
      const data = await api.getSampleSafetyDemo();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to load sample demo');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-500/15 text-red-700 border-red-300 font-bold';
      case 'high':
        return 'bg-orange-500/15 text-orange-700 border-orange-300 font-bold';
      case 'medium':
        return 'bg-amber-500/15 text-amber-700 border-amber-300';
      default:
        return 'bg-blue-500/15 text-blue-700 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <HardHat className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Construction Site Safety Monitoring
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multimodal AI surveillance for Personal Protective Equipment (PPE) compliance and structural hazard mitigation.
          </p>
        </div>

        <button
          onClick={loadSampleDemo}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition self-start sm:self-center"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Load Preset Site Image</span>
        </button>
      </div>

      {/* Upload & Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Upload Site Photo / Drone Capture
            </label>

            <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-4 text-center cursor-pointer transition bg-slate-50 relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Click to upload or drag & drop
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                PNG, JPG, WEBP up to 20MB
              </p>
            </div>

            {previewUrl && (
              <div className="mt-4 space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-950 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Site Frame Active
                  </div>
                </div>

                {selectedFile && (
                  <button
                    onClick={() => handleAnalyze()}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md shadow-amber-500/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Running Multimodal Vision Audit...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Run Safety Vision Audit</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {loading && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Multimodal AI Scanning In Progress
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Detecting hard hats, safety vests, fall harnesses, open edges, and scaffolding stability...
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
              <ShieldAlert className="w-12 h-12 mx-auto text-slate-300" />
              <div className="text-sm font-semibold text-slate-700">
                No Safety Audit Loaded Yet
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Upload a site image or click <strong>"Load Preset Site Image"</strong> above to see multimodal safety analysis.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Scorecard Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Safety Score
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
                    <span className={result.safety_score >= 80 ? 'text-emerald-600' : result.safety_score >= 60 ? 'text-amber-600' : 'text-red-600'}>
                      {result.safety_score}
                    </span>
                    <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Compliance Status
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        result.compliance_status.toLowerCase().includes('non')
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : result.compliance_status.toLowerCase().includes('partially')
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {result.compliance_status}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Workers Detected</span>
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-1">
                    {result.detected_workers_count}
                  </div>
                </div>
              </div>

              {/* PPE Checklist */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Personal Protective Equipment (PPE) Verification</span>
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Vision Confidence Model
                  </span>
                </div>

                <div className="space-y-2">
                  {result.ppe_checklist?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        {item.detected ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-bold text-slate-800">{item.item}</div>
                          <div className="text-slate-600 text-[11px] mt-0.5">{item.note}</div>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-slate-500 shrink-0">
                        {Math.round(item.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hazards Identified */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Physical Hazards & Violations Identified</span>
                  </h3>
                  <span className="text-xs font-bold text-red-600">
                    {result.hazards?.length || 0} Critical Flags
                  </span>
                </div>

                <div className="space-y-3">
                  {result.hazards?.map((haz, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          {haz.hazard_type}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] border uppercase ${getSeverityBadge(
                            haz.severity
                          )}`}
                        >
                          {haz.severity}
                        </span>
                      </div>
                      <p className="text-slate-600">{haz.description}</p>
                      <div className="bg-amber-500/10 p-2.5 rounded-lg text-amber-900 border border-amber-500/20 text-[11px]">
                        <strong>Action:</strong> {haz.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Summary & Actions */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Site Auditor Executive Briefing</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.ai_summary}
                </p>

                {result.immediate_actions?.length > 0 && (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 mb-1.5 uppercase">
                      Immediate Corrective Directives:
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                      {result.immediate_actions.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
