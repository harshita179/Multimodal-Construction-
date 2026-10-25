import React, { useState } from 'react';
import {
  BookOpen,
  Send,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  BookmarkCheck,
  Lightbulb,
  CornerDownRight,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

export default function KnowledgeTab() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: {
        reply: `Hello Engineer! I am AuraConstruct, your Principal Civil & Structural Engineering AI Consultant. 

I am equipped with knowledge across national and international building codes (IS 456:2000, IS 13920:2016, NBC 2016, ACI 318, Eurocodes, OSHA 1926). You can ask me about concrete mix designs, structural crack tolerances, formwork striking times, seismic detailing, or site safety standards.`,
        applicable_codes: ['IS 456:2000', 'IS 10262:2019', 'NBC 2016', 'ACI 318-19'],
        technical_highlights: ['Concrete compressive strength verification', 'Seismic ductility confinement'],
        recommended_next_steps: ['Select a suggested topic below or type your technical query.'],
        suggested_followups: [
          'What are the permissible crack widths in reinforced concrete per IS 456?',
          'How is M25 grade concrete mix proportioned per IS 10262?',
          'What are the minimum formwork striking times for RCC beams and slabs?'
        ]
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [domainTopic, setDomainTopic] = useState('Codes & Standards');
  const [loading, setLoading] = useState(false);

  const handleSend = async (queryToSend = inputQuery) => {
    if (!queryToSend.trim()) return;
    const query = queryToSend.trim();
    setInputQuery('');

    // Append user message
    const newHistory = [...messages, { role: 'user', content: query }];
    setMessages(newHistory);
    setLoading(true);

    try {
      // Build lightweight history payload
      const historyPayload = newHistory.map((m) => ({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : m.content.reply
      }));

      const res = await api.askKnowledgeAssistant(query, historyPayload, domainTopic);
      setMessages([...newHistory, { role: 'assistant', content: res }]);
    } catch (err) {
      setMessages([
        ...newHistory,
        {
          role: 'assistant',
          content: {
            reply: `I encountered an issue processing your query: ${err.message}. Please try again.`,
            applicable_codes: [],
            technical_highlights: [],
            recommended_next_steps: [],
            suggested_followups: []
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleChips = [
    'Permissible crack widths per IS 456',
    'M25 concrete mix design proportions',
    'Seismic ductile detailing for column stirrups',
    'Formwork striking times for slabs and props'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Civil Engineering Knowledge Consultant
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative civil engineering knowledge assistant citing Indian Standards (IS), ACI, Eurocodes, and OSHA guidelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Domain:</span>
          <select
            value={domainTopic}
            onChange={(e) => setDomainTopic(e.target.value)}
            className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-semibold focus:outline-none"
          >
            <option>Codes & Standards</option>
            <option>Materials & Mix Design</option>
            <option>Structural Analysis</option>
            <option>Site Safety & OSHA</option>
          </select>
        </div>
      </div>

      {/* Suggested Quick Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Inquiries:</span>
        </span>
        {sampleChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            disabled={loading}
            className="text-xs bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm font-medium transition disabled:opacity-50"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6 min-h-[450px] max-h-[600px] overflow-y-auto space-y-5">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          const content = msg.content;

          return (
            <div
              key={index}
              className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-3 ${
                  isUser
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none'
                }`}
              >
                {isUser ? (
                  <p className="text-sm font-medium leading-relaxed">{content}</p>
                ) : (
                  <>
                    {/* Reply Narrative */}
                    <div className="whitespace-pre-line text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                      {content.reply}
                    </div>

                    {/* Cited Codes */}
                    {content.applicable_codes?.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/80">
                        <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1.5">
                          <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>Applicable Building Codes & Standards</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {content.applicable_codes.map((code, cidx) => (
                            <span
                              key={cidx}
                              className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200"
                            >
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Highlights */}
                    {content.technical_highlights?.length > 0 && (
                      <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60 space-y-1">
                        <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          <span>Engineering Benchmarks & Formulas</span>
                        </div>
                        <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-0.5">
                          {content.technical_highlights.map((th, tidx) => (
                            <li key={tidx}>{th}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Follow-up Chips */}
                    {content.suggested_followups?.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                          Related Engineering Queries:
                        </div>
                        <div className="flex flex-col gap-1">
                          {content.suggested_followups.map((fu, fidx) => (
                            <button
                              key={fidx}
                              onClick={() => handleSend(fu)}
                              className="text-left text-[11px] font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                            >
                              <CornerDownRight className="w-3 h-3 shrink-0" />
                              <span>{fu}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 text-xs items-center text-slate-500">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>Consulting civil engineering codes & knowledge base...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask anything about IS 456, concrete mix design, structural crack repairs, or safety..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 shadow-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-sm disabled:opacity-50"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
