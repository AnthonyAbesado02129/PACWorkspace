"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth";

const ADMIN_TABS = [
  { id: "policies", label: "Policies", icon: "📄" },
  { id: "users", label: "Users", icon: "👥" },
  { id: "templates", label: "Templates", icon: "📄" },
  { id: "costs", label: "Costs", icon: "💰" },
  { id: "feedback", label: "Feedback", icon: "💬" },
  { id: "activity", label: "Activity", icon: "📈" },
  { id: "audit", label: "Audit", icon: "⚙️" },
];

const MASTER_PROMPT_MODULES = [
  { id: "compose", label: "Compose (v1.0.0)" },
  { id: "entities", label: "Entities (v1.0.0)" },
  { id: "intent", label: "Intents (v1.0.0)" },
  { id: "summarize", label: "Summarize (v1.0.0)" },
  { id: "translate", label: "Translate (v1.0.0)" },
];

const DEFAULT_MASTER_PROMPT =
  "You are a {{persona}} in the {{vertical}} industry. Use the following rules: {{rules}}. Context: {{transcript}}";

/** Layer 1: Global rules */
const LAYER1_RULES = [
  { key: "three_bullet_rule", name: "3-Bullet Summary Rule", severity: "warning" as const },
  { key: "escalation_logic", name: "Escalation Trigger", severity: "critical" as const },
  { key: "forbidden_phrases", name: "Forbidden Phrases", severity: "warning" as const },
];

/** Layer 2: Industry (e.g. BFSI) rules */
const LAYER2_INDUSTRIES = ["BFSI (Banking/Finance)", "Travel", "Retail", "Telco", "Healthcare"];
const LAYER2_RULES = [
  { key: "reg_e_glba", name: "Reg E/GLBA Masking", severity: "critical" as const },
  { key: "kyc_aml", name: "KYC/AML Red Flags", severity: "critical" as const },
  { key: "fee_waiver_limits", name: "12-Month Fee Waiver Limit", severity: "warning" as const },
  { key: "truth_in_lending", name: "Truth in Lending Disclaimer", severity: "critical" as const },
];

/** Layer 3: Brand rules */
const LAYER3_BRANDS = ["Default Brand", "Brand A", "Brand B"];
const LAYER3_RULES: { key: string; name: string; severity: "critical" | "warning" }[] = [];

const SAMPLE_INTENTS = [
  { key: "escalation", name: "Escalation", category: "Retention", priority: 96 },
  { key: "refund_request", name: "Refund Request", category: "Billing", priority: 95 },
  { key: "cancel_service", name: "Cancel Service", category: "Retention", priority: 94 },
  { key: "billing_inquiry", name: "Billing Inquiry", category: "Billing", priority: 90 },
  { key: "report_issue", name: "Report Issue", category: "Support", priority: 82 },
];

export default function AdminPage() {
  const router = useRouter();
  const [masterPromptModule, setMasterPromptModule] = useState("compose");
  const [masterPromptText, setMasterPromptText] = useState(DEFAULT_MASTER_PROMPT);
  const [masterPromptSaving, setMasterPromptSaving] = useState(false);
  const [masterPromptSaved, setMasterPromptSaved] = useState(false);
  const [policyLayer, setPolicyLayer] = useState<"layer1" | "layer2" | "layer3">("layer1");
  const [layer2Industry, setLayer2Industry] = useState(LAYER2_INDUSTRIES[0]);
  const [layer3Brand, setLayer3Brand] = useState(LAYER3_BRANDS[0]);

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/compose");
    }
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/master-prompt?module=${encodeURIComponent(masterPromptModule)}`);
        if (!cancelled && res.ok) {
          const data = await res.json();
          setMasterPromptText(data.prompt ?? DEFAULT_MASTER_PROMPT);
        }
      } catch {
        if (!cancelled) setMasterPromptText(DEFAULT_MASTER_PROMPT);
      }
    })();
    return () => { cancelled = true; };
  }, [masterPromptModule]);

  const saveMasterPrompt = async () => {
    setMasterPromptSaving(true);
    setMasterPromptSaved(false);
    try {
      const res = await fetch("/api/admin/master-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: masterPromptModule, prompt: masterPromptText }),
      });
      if (res.ok) {
        setMasterPromptSaved(true);
        setTimeout(() => setMasterPromptSaved(false), 3000);
      }
    } finally {
      setMasterPromptSaving(false);
    }
  };

  if (!isAdmin()) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const renderRulesTable = (
    rules: { key: string; name: string; severity: "critical" | "warning" }[]
  ) => (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-500">
          <th className="pb-2 pr-4 font-medium">Rule Key</th>
          <th className="pb-2 pr-4 font-medium">Name</th>
          <th className="pb-2 pr-4 font-medium">Severity</th>
          <th className="pb-2 pr-4 font-medium">Active</th>
          <th className="pb-2 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rules.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-6 text-center text-gray-500">
              No rules yet. Add a rule to get started.
            </td>
          </tr>
        ) : (
          rules.map((p) => (
            <tr key={p.key} className="border-b border-gray-100">
              <td className="py-3 pr-4 font-mono text-gray-700">{p.key}</td>
              <td className="py-3 pr-4">{p.name}</td>
              <td className="py-3 pr-4">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    p.severity === "critical"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {p.severity}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className="inline-block h-5 w-9 rounded-full bg-[#6a1b9a] relative">
                  <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                </span>
              </td>
              <td className="py-3">
                <button type="button" className="text-gray-500 hover:text-gray-700 mr-2">✏️</button>
                <button type="button" className="text-gray-500 hover:text-red-600">🗑️</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Studio</h1>
        <p className="text-gray-600">
          Manage users, teams, rules, and system configuration.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-center gap-2">
        <span className="text-lg">🔒</span>
        <p className="text-sm text-gray-700">
          You have admin privileges. Changes made here will affect all users in your organization.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
              tab.id === "policies"
                ? "bg-[#6a1b9a] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3-Layer Policy Manager */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">3-Layer Policy Manager</h3>
            <p className="text-sm text-gray-500">
              Manage compliance rules for the Quality Check engine.
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg bg-[#6a1b9a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7b1fa2]"
          >
            + Add Rule
          </button>
        </div>
        <div className="mb-4 flex gap-1 border-b border-gray-200">
          {[
            { id: "layer1" as const, label: "Layer 1: Global" },
            { id: "layer2" as const, label: "Layer 2: Industry" },
            { id: "layer3" as const, label: "Layer 3: Brand" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPolicyLayer(tab.id)}
              className={`border-b-2 px-4 py-2 text-sm font-medium ${
                policyLayer === tab.id
                  ? "border-[#6a1b9a] text-[#6a1b9a]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {policyLayer === "layer2" && (
          <div className="mb-4 flex items-center gap-2">
            <label className="text-sm text-gray-600">Industry</label>
            <select
              value={layer2Industry}
              onChange={(e) => setLayer2Industry(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {LAYER2_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <span className="text-sm text-gray-500">{LAYER2_RULES.length} rules</span>
          </div>
        )}
        {policyLayer === "layer3" && (
          <div className="mb-4 flex items-center gap-2">
            <label className="text-sm text-gray-600">Brand</label>
            <select
              value={layer3Brand}
              onChange={(e) => setLayer3Brand(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {LAYER3_BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <span className="text-sm text-gray-500">{LAYER3_RULES.length} rules</span>
          </div>
        )}
        <div className="overflow-x-auto">
          {policyLayer === "layer1" && renderRulesTable(LAYER1_RULES)}
          {policyLayer === "layer2" && renderRulesTable(LAYER2_RULES)}
          {policyLayer === "layer3" && renderRulesTable(LAYER3_RULES)}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Intent Taxonomy Editor</h3>
            <p className="text-sm text-gray-500">
              Manage customer intent categories for the detection engine.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Search intents..."
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            />
            <button
              type="button"
              className="rounded-lg bg-[#6a1b9a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7b1fa2]"
            >
              + Add Intent
            </button>
            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
              <option>All Categories</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-2 pr-4 font-medium">Intent Key</th>
                <th className="pb-2 pr-4 font-medium">Name</th>
                <th className="pb-2 pr-4 font-medium">Category</th>
                <th className="pb-2 pr-4 font-medium">Priority</th>
                <th className="pb-2 pr-4 font-medium">Active</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_INTENTS.map((i) => (
                <tr key={i.key} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-mono text-gray-700">{i.key}</td>
                  <td className="py-3 pr-4">{i.name}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700">
                      {i.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{i.priority}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-block h-5 w-9 rounded-full bg-[#6a1b9a] relative">
                      <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                    </span>
                  </td>
                  <td className="py-3">
                    <button type="button" className="text-gray-500 hover:text-gray-700 mr-2">✏️</button>
                    <button type="button" className="text-gray-500 hover:text-red-600">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 font-semibold text-gray-900">Entity Pattern Manager</h3>
        <p className="mb-4 text-sm text-gray-500">
          Hybrid extraction: AI for names, orgs, addresses, IDs • Regex for contacts, dates, monetary values.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Test Extraction
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#6a1b9a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7b1fa2]"
          >
            + Add Pattern
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Filter by Industry: Universal (All Industries). Connect InstantDB to manage patterns.
        </p>
      </div>

      {/* Level 1: Master System Prompt Editor — connected to OpenAI API */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-gray-500">📄</span>
          <h3 className="font-semibold text-gray-900">Master System Prompt Editor</h3>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          Level 1 (Global). This prompt is sent as the system message to the OpenAI API for AI-powered modules. Placeholders: <code className="rounded bg-gray-100 px-1">{`{{persona}}`}</code>, <code className="rounded bg-gray-100 px-1">{`{{vertical}}`}</code>, <code className="rounded bg-gray-100 px-1">{`{{rules}}`}</code>, <code className="rounded bg-gray-100 px-1">{`{{transcript}}`}</code>.
        </p>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Select Module</label>
            <select
              value={masterPromptModule}
              onChange={(e) => setMasterPromptModule(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {MASTER_PROMPT_MODULES.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Status: Active
            </span>
            {masterPromptSaved && (
              <span className="text-xs text-green-600">Saved</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium text-gray-500">System Prompt</label>
          <textarea
            value={masterPromptText}
            onChange={(e) => setMasterPromptText(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm"
            placeholder={DEFAULT_MASTER_PROMPT}
          />
        </div>
        <button
          type="button"
          onClick={saveMasterPrompt}
          disabled={masterPromptSaving}
          className="rounded-lg bg-[#6a1b9a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7b1fa2] disabled:opacity-60"
        >
          {masterPromptSaving ? "Saving…" : "💾 Save Prompt"}
        </button>
      </div>
    </div>
  );
}