"use client";

const KPI_CARDS = [
  { label: "Total Logs", value: "—", change: "from prev. period", icon: "📄", color: "bg-purple-100" },
  { label: "QC Pass Rate", value: "—%", change: "from prev. period", icon: "✓", color: "bg-green-100" },
  { label: "Policy-Safe Usage", value: "—%", change: "from prev. period", icon: "🛡️", color: "bg-blue-100" },
  { label: "AI Adoption", value: "—%", sub: "% of interactions with AI output.", icon: "⚡", color: "bg-purple-100" },
];

const INTENT_SAMPLES = [
  { name: "General Inquiry", count: 0 },
  { name: "Refund Request", count: 0 },
  { name: "Report Issue", count: 0 },
  { name: "Billing Query", count: 0 },
];

const VERTICAL_SAMPLES = [
  { name: "BFSI", pct: 0, status: "good" },
  { name: "Travel", pct: 0, status: "good" },
  { name: "Healthcare", pct: 0, status: "fair" },
  { name: "Telco", pct: 0, status: "fair" },
  { name: "Retail", pct: 0, status: "work" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">
            Analytics and compliance metrics for supervisors.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
            <option>All Teams</option>
          </select>
          <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
            <option>Quick select</option>
          </select>
          <input
            type="text"
            readOnly
            value="Jan 13, 2026 – Feb 12, 2026"
            className="w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI_CARDS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-400">{kpi.change}</p>
                {kpi.sub && (
                  <p className="mt-1 text-xs text-gray-500">{kpi.sub}</p>
                )}
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.color}`}
              >
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>📊</span> Intent Distribution
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Top detected customer intents across interactions.
          </p>
          <div className="space-y-2">
            {INTENT_SAMPLES.map((i) => (
              <div key={i.name} className="flex items-center gap-2">
                <span className="w-32 text-sm">{i.name}</span>
                <div className="h-6 flex-1 rounded bg-gray-100" style={{ width: "80px" }} />
                <span className="text-sm text-gray-500">{i.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
            <span>📊</span> Vertical Performance
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            QC pass rate comparison across industry verticals.
          </p>
          <div className="mb-2 flex gap-2 text-xs">
            <span className="rounded bg-green-100 px-2 py-0.5 text-green-800">
              ≥85% (Good)
            </span>
            <span className="rounded bg-orange-100 px-2 py-0.5 text-orange-800">
              70–84% (Fair)
            </span>
            <span className="rounded bg-red-100 px-2 py-0.5 text-red-800">
              &lt;70% (Needs Work)
            </span>
          </div>
          <div className="space-y-2">
            {VERTICAL_SAMPLES.map((v) => (
              <div key={v.name} className="flex items-center gap-2">
                <span className="w-24 text-sm">{v.name}</span>
                <div
                  className={`h-6 flex-1 rounded ${
                    v.status === "good"
                      ? "bg-green-200"
                      : v.status === "fair"
                        ? "bg-orange-200"
                        : "bg-red-200"
                  }`}
                  style={{ width: "60px" }}
                />
                <span className="text-sm text-gray-500">{v.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
          <span>📈</span> Compliance Trend
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          Quality check pass rate over time.
        </p>
        <div className="h-40 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
          Chart area — connect InstantDB or your analytics API
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
          <span>💬</span> Mood Distribution
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          Customer mood breakdown for the selected period.
        </p>
        <div className="h-32 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
          Chart area — connect your data source
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Compose Audit Log</h3>
            <p className="text-sm text-gray-500">
              Detailed log of AI response drafts with full context data
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Search transcripts..."
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            />
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Export CSV
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">0 logs</p>
        <div className="mt-2 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Timestamp</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Vertical</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Persona</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Mood</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">QC</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No logs yet. Use Compose to generate drafts and they will appear here when connected to InstantDB.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
