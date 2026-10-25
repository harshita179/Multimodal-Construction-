/**
 * API Service for Multimodal Construction Intelligence Platform
 */

const BASE_URL = '/api/v1';

export const api = {
  // System Status & API Key
  async getStatus() {
    const res = await fetch(`${BASE_URL}/system/status`);
    if (!res.ok) throw new Error('Failed to fetch system status');
    return res.json();
  },

  async setApiKey(apiKey) {
    const res = await fetch(`${BASE_URL}/system/set-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey }),
    });
    if (!res.ok) throw new Error('Failed to update API key');
    return res.json();
  },

  // Site Safety Analysis
  async analyzeSafetyImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BASE_URL}/safety/analyze`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Safety analysis failed');
    }
    return res.json();
  },

  async getSampleSafetyDemo() {
    const res = await fetch(`${BASE_URL}/safety/sample-demo`);
    if (!res.ok) throw new Error('Failed to load sample safety demo');
    return res.json();
  },

  // Structural Crack Detection
  async analyzeCrackImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BASE_URL}/cracks/analyze`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Crack analysis failed');
    }
    return res.json();
  },

  async getSampleCrackDemo() {
    const res = await fetch(`${BASE_URL}/cracks/sample-demo`);
    if (!res.ok) throw new Error('Failed to load sample crack demo');
    return res.json();
  },

  // Real Estate Valuation
  async calculateValuation(payload) {
    const res = await fetch(`${BASE_URL}/valuation/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Valuation calculation failed');
    }
    return res.json();
  },

  // Project Planning
  async generateProjectPlan(payload) {
    const res = await fetch(`${BASE_URL}/planning/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Project planning failed');
    }
    return res.json();
  },

  // Daily Site Assistant
  async logDailySite(payload) {
    const res = await fetch(`${BASE_URL}/daily-site/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Daily site logging failed');
    }
    return res.json();
  },

  // Weather-Aware Advisory
  async getWeatherAdvisory(payload) {
    const res = await fetch(`${BASE_URL}/weather/advisory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Weather advisory failed');
    }
    return res.json();
  },

  // Knowledge Consultant
  async askKnowledgeAssistant(query, history = [], domainTopic = 'General Structural & Codes') {
    const res = await fetch(`${BASE_URL}/knowledge/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        history,
        domain_topic: domainTopic,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Knowledge query failed');
    }
    return res.json();
  },
};
