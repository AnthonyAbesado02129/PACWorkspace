"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAdmin } from "@/lib/auth";

const MODULES = [
  { href: "/compose", label: "Compose", icon: "✏️" },
  { href: "/entities", label: "Entities", icon: "🛡️" },
  { href: "/intents", label: "Intents", icon: "💬" },
  { href: "/summarize", label: "Summarize", icon: "📄" },
  { href: "/translate", label: "Translate", icon: "🔤" },
];

const ANALYTICS = [{ href: "/reports", label: "Reports", icon: "📊" }];

const ADMIN = [{ href: "/admin", label: "Admin Studio", icon: "⚙️" }];

const COMING_SOON = [
  { label: "Knowledge Base", icon: "📖" },
  { label: "Next Best Action", icon: "💡" },
  { label: "Templates", icon: "📋" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 flex-col bg-[#4a148c] text-white">
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
            FA
          </div>
          <div>
            <div className="font-semibold">PAC Workspace</div>
            <div className="text-xs text-white/80">Persona Agent Copilot</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="mb-4">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/60">
            Modules
          </div>
          <ul className="space-y-0.5">
            {MODULES.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[#7b1fa2] text-white"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mb-4">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/60">
            Analytics
          </div>
          <ul className="space-y-0.5">
            {ANALYTICS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[#7b1fa2] text-white"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {isAdmin() && (
          <div className="mb-4">
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/60">
              Administration
            </div>
            <ul className="space-y-0.5">
              {ADMIN.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-[#7b1fa2] text-white"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div>
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/60">
            Coming Soon
          </div>
          <ul className="space-y-0.5">
            {COMING_SOON.map((item) => (
              <li key={item.label}>
                <span className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </span>
                  <span className="rounded bg-white/20 px-1.5 py-0.5 text-xs">
                    SOON
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
