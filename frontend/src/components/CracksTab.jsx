import React, { useState } from 'react';
import {
  Activity,
  Upload,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Wrench,
  Sparkles,
  Zap,
  RefreshCw,
  Layers,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function CracksTab() {
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
      const data = await api.analyzeCrackImage(fileToAnalyze);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Crack analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      setPreviewUrl('/sample_images/concrete_crack_sample.jpg');
      setSelectedFile(null);
      const data = await api.getSampleCrackDemo();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to load sample demo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-500/10 text-red-600">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Structural Crack Detection & Diagnostics
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multimodal vision AI for forensic concrete analysis, crack width estimation, and structural retrofitting protocols.
          </p>
        </div>

        <button
          onClick={loadSampleDemo}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition self-start sm:self-center"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Load Preset Crack Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Upload Concrete / Wall / Beam Photo
            </label>

            <div className="border-2 border-dashed border-slate-300 hover:border-red-500 rounded-xl p-4 text-center cursor-pointer transition bg-slate-50 relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Click to upload structural fracture image
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Supports concrete beams, columns, foundation slabs, masonry
              </p>
            </div>

            {previewUrl && (
              <div className="mt-4 space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-950 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Crack Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    Inspection Frame
                  </div>
                </div>

                {selectedFile && (
                  <button
                    onClick={() => handleAnalyze()}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition shadow-md shadow-red-600/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Analyzing Structural Integrity...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Run Forensic Crack Diagnostics</span>
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
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Forensic Structural Vision Scanner Active
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Measuring crack geometry, identifying shear vs shrinkage patterns, and checking load-bearing risks...
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
              <Activity className="w-12 h-12 mx-auto text-slate-300" />
              <div className="text-sm font-semibold text-slate-700">
                No Structural Scan Loaded
              </div>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Upload a concrete beam/wall image or click <strong>"Load Preset Crack Image"</strong> above to see structural diagnostics.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Scorecard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Integrity Index
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
                    <span className={result.structural_integrity_score >= 80 ? 'text-emerald-600' : result.structural_integrity_score >= 60 ? 'text-amber-600' : 'text-red-600'}>
                      {result.structural_integrity_score}
                    </span>
                    <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Severity Classification
                  </div>
                  <div className="mt-1">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                      {result.overall_severity} Risk
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Occupancy Status
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    {result.safe_for_occupancy ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Safe for Occupancy
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-700 text-xs font-bold bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                        <XCircle className="w-3.5 h-3.5" /> Evacuation Advised
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detected Cracks Matrix */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Layers className="w-4 h-4 text-red-500" />
                  <span>Detected Crack Patterns & Dimensions</span>
                </h3>

                <div className="space-y-2">
                  {result.detected_cracks?.map((crack, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          {crack.crack_type}
                        </span>
                        <span className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-red-100 text-red-800 font-semibold">
                          Width: {crack.estimated_width_mm}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        <strong>Location:</strong> {crack.location}
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                        <span>Severity: <strong className="text-slate-700">{crack.severity}</strong></span>
                        <span>Propagation Risk: <strong className="text-red-600">{crack.propagation_risk}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Impact Analysis & Causes */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  <span>Forensic Engineering Assessment</span>
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {result.structural_impact_analysis}
                </p>

                {result.root_causes?.length > 0 && (
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase">
                      Identified Root Causes:
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {result.root_causes.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Retrofitting & Repair Recommendations */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  <span>Structural Retrofitting & Repair Strategy</span>
                </div>

                <div className="space-y-3 pt-1">
                  {result.repair_recommendations?.map((rep, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">
                          {rep.method}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Urgency: {rep.urgency}
                        </span>
                      </div>
                      <p className="text-slate-300">
                        <strong>Specified Materials:</strong> {rep.materials_needed}
                      </p>
                      <div className="text-[11px] text-slate-400">
                        Cost Tier: <strong className="text-slate-200">{rep.estimated_cost_tier}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
