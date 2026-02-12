"use client";

import { useState } from "react";
import { useExtensionMode } from "@/hooks/use-extension-mode";

const INDUSTRIES = [
  "BFSI",
  "Travel",
  "Retail / E-commerce",
  "Telco",
  "Healthcare",
  "Public Sector",
];
const PERSONAS = ["Customer Care", "Sales", "Support"];
const TONES = ["Formal", "Friendly", "Empathetic"];
const MOODS = ["Neutral", "Frustrated", "Urgent", "Anxious", "Happy"];

export default function ComposePage() {
  const isExtension = useExtensionMode();
  const [industry, setIndustry] = useState("BFSI");
  const [persona, setPersona] = useState("Customer Care");
  const [tone, setTone] = useState("Formal");
  const [mood, setMood] = useState("Neutral");
  const [salutation, setSalutation] = useState("Mr./Ms.");
  const [conversationContext, setConversationContext] = useState("");
  const [agentKeyPoints, setAgentKeyPoints] = useState("");
  const [draft, setDraft] = useState("");
  const [policySafe, setPolicySafe] = useState(false);
  const [qualityCheck, setQualityCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          persona,
          tone,
          customerMood: mood,
          salutation,
          conversationContext,
          agentKeyPoints,
          policySafe,
        }),
      });
      const data = await res.json();
      setDraft(data.draft ?? data.error ?? "No draft generated.");
    } catch (e) {
      setDraft("Error generating draft. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(draft);
  };

  const content = (
    <>
      <div className="min-w-0 flex-1 space-y-4">
        <div>
          <h1 className={isExtension ? "text-lg font-bold text-gray-900" : "text-2xl font-bold text-gray-900"}>Compose</h1>
          <p className={isExtension ? "text-xs text-gray-600" : "text-gray-600"}>
            Draft AI-powered responses with policy compliance.
          </p>
        </div>

        <div className={`grid gap-3 ${isExtension ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-5"}`}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="select-arrow-inset w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {INDUSTRIES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Persona
            </label>
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="select-arrow-inset w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {PERSONAS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="select-arrow-inset w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {TONES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Customer Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="select-arrow-inset w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {MOODS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Salutation
            </label>
            <input
              type="text"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
              className="select-arrow-inset w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              placeholder="Mr./Ms."
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={`flex items-center gap-2 rounded-lg bg-[#6a1b9a] font-medium text-white hover:bg-[#7b1fa2] disabled:opacity-60 ${isExtension ? "px-4 py-2 text-sm" : "px-6 py-3"}`}
          >
            <span>✨</span> Generate Draft
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900">
            <span>💬</span> Conversation Context
          </h3>
          <textarea
            value={conversationContext}
            onChange={(e) => setConversationContext(e.target.value)}
            placeholder="Paste the conversation transcript here..."
            className={`w-full resize-y rounded-lg border border-gray-200 p-3 text-sm ${isExtension ? "h-24 min-h-[80px]" : "h-32"}`}
            rows={isExtension ? 3 : 4}
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <h3 className="mb-2 text-sm font-medium text-gray-900">Agent Key Points</h3>
          <textarea
            value={agentKeyPoints}
            onChange={(e) => setAgentKeyPoints(e.target.value)}
            placeholder="Key points to include in the response..."
            className={`w-full resize-y rounded-lg border border-gray-200 p-3 text-sm ${isExtension ? "h-20 min-h-[60px]" : "h-24"}`}
            rows={isExtension ? 2 : 3}
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900">
            <span>📄</span> AI Generated Draft (editable)
          </h3>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Generated draft will appear here... You can edit it before copying."
            className={`w-full resize-y rounded-lg border border-gray-200 p-3 text-sm ${isExtension ? "h-36 min-h-[120px]" : "h-48"}`}
            rows={isExtension ? 6 : 8}
          />
          <div className={`mt-3 flex flex-wrap gap-2 ${isExtension ? "flex-col sm:flex-row" : ""}`}>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>✓</span> Run Quality Check
            </button>
            <button
              type="button"
              onClick={copyOutput}
              className="flex items-center gap-2 rounded-lg bg-[#6a1b9a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7b1fa2]"
            >
              <span>📋</span> Copy Output
            </button>
          </div>
        </div>
      </div>

      {isExtension ? (
        <div className="w-full shrink-0">
          <button
            type="button"
            onClick={() => setOptionsOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
          >
            <span className="font-semibold text-gray-900">Processing Options</span>
            <span className="text-gray-500">{optionsOpen ? "▼" : "▶"}</span>
          </button>
          {optionsOpen && (
            <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                      <span>🛡️</span> Policy-Safe
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={policySafe}
                      onClick={() => setPolicySafe(!policySafe)}
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                        policySafe ? "bg-[#6a1b9a]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          policySafe ? "translate-x-5" : "translate-x-0.5"
                        } mt-0.5`}
                      />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Enforces industry-specific compliance rules during generation.
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                      <span>✓</span> Quality Check
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={qualityCheck}
                      onClick={() => setQualityCheck(!qualityCheck)}
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                        qualityCheck ? "bg-[#6a1b9a]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          qualityCheck ? "translate-x-5" : "translate-x-0.5"
                        } mt-0.5`}
                      />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Auto-runs policy audit when draft is generated.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Tip: You can always re-run quality check manually after editing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-72 shrink-0">
          <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Processing Options</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-gray-800">
                    <span>🛡️</span> Policy-Safe
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={policySafe}
                    onClick={() => setPolicySafe(!policySafe)}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                      policySafe ? "bg-[#6a1b9a]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        policySafe ? "translate-x-5" : "translate-x-0.5"
                      } mt-0.5`}
                    />
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enforces industry-specific compliance rules during generation.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-gray-800">
                    <span>✓</span> Quality Check
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={qualityCheck}
                    onClick={() => setQualityCheck(!qualityCheck)}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                      qualityCheck ? "bg-[#6a1b9a]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        qualityCheck ? "translate-x-5" : "translate-x-0.5"
                      } mt-0.5`}
                    />
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Auto-runs policy audit when draft is generated.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Tip: You can always re-run quality check manually after editing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className={isExtension ? "flex flex-col gap-4" : "flex gap-6"}>
      {content}
    </div>
  );
}
