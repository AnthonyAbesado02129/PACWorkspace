"use client";

import { useState } from "react";

export default function IntentsPage() {
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setAnalysis(data.analysis ?? data.error ?? "No analysis.");
    } catch (e) {
      setAnalysis("Error analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(analysis);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Intents</h1>
        <p className="text-gray-600">
          Identify customer goals and mission from their message.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2">
          <span className="text-lg">🎯</span>
          <span className="font-medium">Intent Detection</span>
          <span className="rounded bg-[#e1bee7] px-2 py-0.5 text-xs font-medium text-[#4a148c]">
            AI-Powered
          </span>
        </div>
        <button
          type="button"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          📖 Best Practices
        </button>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-lg bg-[#6a1b9a] px-4 py-2 font-medium text-white hover:bg-[#7b1fa2] disabled:opacity-60"
        >
          🎯 Analyze Intent
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>💬</span> Customer Message
          </h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste customer message or conversation..."
            className="h-64 w-full resize-y rounded-lg border border-gray-200 p-3 text-sm"
          />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>🎯</span> Intent Analysis{" "}
            <span className="text-xs font-normal text-gray-500">(editable)</span>
          </h3>
          <textarea
            value={analysis}
            onChange={(e) => setAnalysis(e.target.value)}
            placeholder="Intent analysis will appear here..."
            className="h-64 w-full resize-y rounded-lg border border-gray-200 p-3 text-sm"
          />
          <div className="mt-2 flex justify-end">
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
    </div>
  );
}
