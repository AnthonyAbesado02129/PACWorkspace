"use client";

import { useEffect } from "react";
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

const SAMPLE_POLICIES = [
  { key: "ai_transparency", name: "AI Transparency", severity: "warning" },
  { key: "gdpr_privacy", name: "GDPR/Privacy Path", severity: "critical" },
  { key: "hallucination_guard", name: "Hallucination Guard", severity: "critical" },
  { key: "pci_dss", name: "PCI-DSS Compliance", severity: "critical" },
];

const SAMPLE_INTENTS = [
  { key: "escalation", name: "Escalation", category: "Retention", priority: 96 },
  { key: "refund_request", name: "Refund Request", category: "Billing", priority: 95 },
  { key: "cancel_service", name: "Cancel Service", category: "Retention", priority: 94 },
  { key: "billing_inquiry", name: "Billing Inquiry", category: "Billing", priority: 90 },
  { key: "report_issue", name: "Report Issue", category: "Support", priority: 82 },
];

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/compose");
    }
  }, [router]);

  if (!isAdmin()) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

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
        <div className="overflow-x-auto">
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
              {SAMPLE_POLICIES.map((p) => (
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
              ))}
            </tbody>
          </table>
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
    </div>
  );
}