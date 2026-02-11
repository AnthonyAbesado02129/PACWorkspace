"use client";

import { useState } from "react";

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Tagalog",
  "Japanese",
  "Chinese",
];

export default function TranslatePage() {
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [sourceText, setSourceText] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translation);
    setTranslation(sourceText);
  };

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, targetLang }),
      });
      const data = await res.json();
      setTranslation(data.translation ?? data.error ?? "No translation.");
    } catch (e) {
      setTranslation("Error translating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(translation);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Translate</h1>
        <p className="text-gray-600">
          Translate messages for multilingual customer support.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={swapLanguages}
          className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-50"
          aria-label="Swap languages"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l4-4M4 17h12m0 0l4-4m-4 4l4 4" />
          </svg>
        </button>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          📖 Best Practices
        </button>
        <button
          type="button"
          onClick={handleTranslate}
          disabled={loading}
          className="rounded-lg bg-[#6a1b9a] px-4 py-2 font-medium text-white hover:bg-[#7b1fa2] disabled:opacity-60"
        >
          🔤 Translate
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>🔤</span> Source ({sourceLang})
          </h3>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className="h-64 w-full resize-y rounded-lg border border-gray-200 p-3 text-sm"
          />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>🔤</span> Translation ({targetLang}){" "}
            <span className="text-xs font-normal text-gray-500">(editable)</span>
          </h3>
          <textarea
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="Translation will appear here..."
            className="h-64 w-full resize-y rounded-lg border border-gray-200 p-3 text-sm"
          />
          <div className="mt-2 flex justify-center">
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
