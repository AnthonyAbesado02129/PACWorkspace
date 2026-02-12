"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { clearUser, getCurrentUser, getInitials } from "@/lib/auth";

export function Header({ compact }: { compact?: boolean } = {}) {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleSignOut = async () => {
    try {
      await db.auth.signOut();
    } catch {
      // ignore
    }
    clearUser();
    router.push("/login");
  };

  const displayName = user?.displayName ?? "Guest";
  const roleLabel = user?.scope ?? user?.role ?? "—";

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-right">
          <div className="text-xs font-medium">{displayName}</div>
          <div className="text-[10px] text-white/80">{roleLabel}</div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
          {getInitials(displayName)}
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="Sign out"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-[#4a148c] px-4 text-white">
      <div className="flex items-center gap-4">
        <span className="font-semibold">FA PAC Workspace</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium">{displayName}</div>
          <div className="text-xs text-white/80">{roleLabel}</div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
          {getInitials(displayName)}
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="Sign out"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
