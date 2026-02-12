"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useExtensionMode } from "@/hooks/use-extension-mode";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const isExtension = useExtensionMode();
  const [navOpen, setNavOpen] = useState(false);

  if (isExtension) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f0f2f5]">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-200 bg-[#4a148c] px-3 text-white">
          <button
            type="button"
            onClick={() => setNavOpen((o) => !o)}
            className="rounded p-2 text-white/90 hover:bg-white/10"
            aria-label={navOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {navOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <span className="truncate text-sm font-semibold">PAC Workspace</span>
          <div className="flex-1" />
          <Header compact />
        </header>

        {navOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              aria-hidden
              onClick={() => setNavOpen(false)}
            />
            <aside className="fixed left-0 top-0 z-50 h-full w-56 bg-[#4a148c] shadow-xl">
              <Sidebar onNavigate={() => setNavOpen(false)} />
            </aside>
          </>
        )}

        <main className="min-h-0 flex-1 overflow-auto p-3">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f0f2f5]">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
