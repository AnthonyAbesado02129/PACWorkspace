"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import {
  TEST_ACCOUNTS,
  TEST_PASSWORD,
  getCurrentUser,
  setPendingLoginAccount,
  getAllTestAccounts,
  type TestAccount,
} from "@/lib/auth";

function TestAccountItem({
  account,
  label,
  icon,
  onSelect,
}: {
  account: TestAccount;
  label: string;
  icon: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6a1b9a] focus:ring-offset-2"
    >
      <span className="text-base">{icon}</span>
      <span className="flex-1">{label}</span>
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user: instantUser } = db.useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (instantUser && getCurrentUser()) {
      router.replace("/compose");
    }
  }, [instantUser, router]);

  const fillFromAccount = (account: TestAccount) => {
    setEmail(account.email);
    setPassword(TEST_PASSWORD);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const match = getAllTestAccounts().find((a) => a.email.toLowerCase() === trimmedEmail);
    if (!match) {
      setError("No test account found for this email. Use a test account below.");
      return;
    }
    if (password !== TEST_PASSWORD) {
      setError("Invalid password. Use demo123 for test accounts.");
      return;
    }

    setPendingLoginAccount(match);
    router.push("/login/otp");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#6a1b9a] text-xl font-bold text-white">
            FA
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PAC Workspace</h1>
          <p className="text-sm text-gray-500">Persona Agent Copilot</p>
        </div>

        {/* Sign In card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">Sign In</h2>
          <p className="mb-6 text-sm text-gray-600">
            Enter your credentials to access the workspace
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-[#6a1b9a] focus:outline-none focus:ring-1 focus:ring-[#6a1b9a]"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-[#6a1b9a] focus:outline-none focus:ring-1 focus:ring-[#6a1b9a]"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#6a1b9a] py-2.5 font-medium text-white hover:bg-[#7b1fa2] focus:outline-none focus:ring-2 focus:ring-[#6a1b9a] focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Test Accounts card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-1 text-sm font-semibold text-gray-900">Test Accounts</h3>
          <p className="mb-4 text-xs text-gray-500">Click to auto-fill credentials</p>

          <div className="space-y-3">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                <span>🔒</span> Admin (Global)
              </p>
              {TEST_ACCOUNTS.admin.map((account) => (
                <div key={account.email} className="mb-2">
                  <TestAccountItem
                    account={account}
                    label={account.email}
                    icon="🔒"
                    onSelect={() => fillFromAccount(account)}
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                <span>👥</span> Supervisors
              </p>
              <div className="space-y-2">
                {TEST_ACCOUNTS.supervisors.map((account) => (
                  <TestAccountItem
                    key={account.email}
                    account={account}
                    label={`${account.email} (${account.scope})`}
                    icon="👥"
                    onSelect={() => fillFromAccount(account)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                <span>👥</span> Agents
              </p>
              <div className="space-y-2">
                {TEST_ACCOUNTS.agents.map((account) => (
                  <TestAccountItem
                    key={account.email}
                    account={account}
                    label={`${account.email} (${account.scope})`}
                    icon="👥"
                    onSelect={() => fillFromAccount(account)}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500">
            Password for all test accounts: <strong>demo123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
