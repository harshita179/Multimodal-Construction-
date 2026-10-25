import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function SettingsModal({ isOpen, onClose, onKeyUpdated, currentStatus }) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setLoading(true);
    setMessage(null);
    try {
      const res = await api.setApiKey(apiKey.trim());
      setIsError(false);
      setMessage('Gemini API Key successfully updated! Live Multimodal AI enabled.');
      if (onKeyUpdated) onKeyUpdated();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setIsError(true);
      setMessage(err.message || 'Failed to apply key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Google Gemini AI Configuration</h3>
            <p className="text-xs text-slate-400">
              Enable real-time multimodal vision & reasoning
            </p>
          </div>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3.5 mb-5 text-xs text-slate-300 space-y-2 border border-slate-700/60">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> The platform already runs out-of-the-box in <strong>High-Fidelity Offline / Demo Mode</strong> with precomputed real-world engineering datasets.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              To run live analysis on custom uploaded photos, grab a free API key from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 underline hover:text-amber-300"
              >
                Google AI Studio
              </a>
              .
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono transition"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                isError
                  ? 'bg-red-500/10 border border-red-500/30 text-red-300'
                  : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              }`}
            >
              {isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              <span>{message}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading || !apiKey.trim()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition disabled:opacity-50"
            >
              {loading ? 'Saving Key...' : 'Save & Activate Live AI'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
