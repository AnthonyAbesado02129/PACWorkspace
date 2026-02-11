"use client";

import { useState } from "react";

export default function SummarizePage() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      setSummary(data.summary ?? data.error ?? "No summary.");
    } catch (e) {
      setSummary("Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Summarize</h1>
        <p className="text-gray-600">
          Generate case notes and conversation summaries.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2">
          <span className="font-medium">Case Notes Generator</span>
          <span className="ml-2 rounded bg-[#e1bee7] px-2 py-0.5 text-xs font-medium text-[#4a148c]">
            3-Bullet Rule
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
          onClick={handleSummarize}
          disabled={loading}
          className="rounded-lg bg-[#6a1b9a] px-4 py-2 font-medium text-white hover:bg-[#7b1fa2] disabled:opacity-60"
        >
          ✨ Summarize
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
          <span>📄</span> Conversation Transcript
        </h3>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste the full conversation transcript..."
          className="h-40 w-full resize-y rounded-lg border border-gray-200 p-3 text-sm"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
          <span>📄</span> Generated Summary{" "}
          <span className="text-xs font-normal text-gray-500">(editable)</span>
        </h3>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Generated summary will appear here..."
          className="h-48 w-full resize-y rounded-lg border border-gray-200 p-3 text-sm"
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
  );
}
