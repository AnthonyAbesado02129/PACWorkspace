"use client";

import { useState } from "react";

const FIELDS = [
  "Person Name",
  "Organization",
  "Full Address",
  "Date/Time",
  "Contact Info",
  "IDs / Reference #s",
  "Monetary Values",
];

export default function EntitiesPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [detect, setDetect] = useState(true);
  const [mask, setMask] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: input, mask }),
      });
      const data = await res.json();
      setOutput(data.result ?? data.error ?? "No results.");
    } catch (e) {
      setOutput("Error extracting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Entities</h1>
        <p className="text-gray-600">
          Extract and mask sensitive data fields from transcripts.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-medium text-gray-900">Fields to Extract</h3>
        <div className="flex flex-wrap gap-2">
          {FIELDS.map((f) => (
            <span
              key={f}
              className="rounded-full bg-[#6a1b9a] px-3 py-1 text-sm text-white"
            >
              {f}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={detect}
              onChange={(e) => setDetect(e.target.checked)}
              className="rounded"
            />
            <span>Detect</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={mask}
              onChange={(e) => setMask(e.target.checked)}
              className="rounded"
            />
            <span>Mask</span>
          </label>
          <span className="text-sm text-gray-500">7 fields active</span>
          <button
            type="button"
            onClick={handleExtract}
            disabled={loading}
            className="ml-auto rounded-lg bg-[#6a1b9a] px-4 py-2 font-medium text-white hover:bg-[#7b1fa2] disabled:opacity-60"
          >
            Extract Fields
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Confidence:{" "}
          <span className="text-green-600">HIGH = Labeled/patterned</span>{" "}
          <span className="text-orange-600">MED = Context-based</span>{" "}
          <span className="text-red-600">LOW = Filtered out (&lt;70%)</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>📄</span> Input Transcript
          </h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your raw transcript here..."
            className="h-64 w-full resize-y rounded-lg border border-gray-200 p-3 text-sm"
          />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>🛡️</span> Extraction Results{" "}
            <span className="text-xs font-normal text-gray-500">(editable)</span>
          </h3>
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Extracted fields will appear here (only ≥70% confidence shown)..."
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
