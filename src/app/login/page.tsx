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

function TestAccountRadio({
  account,
  label,
  checked,
  onSelect,
}: {
  account: TestAccount;
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label className="flex w-full cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 has-[:checked]:border-[#6a1b9a] has-[:checked]:bg-[#f5f3ff]">
      <input
        type="radio"
        name="testAccount"
        value={account.email}
        checked={checked}
        onChange={onSelect}
        className="mt-1 h-4 w-4 border-gray-300 text-[#6a1b9a] focus:ring-[#6a1b9a]"
      />
      <span className="flex-1">{label}</span>
    </label>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user: instantUser } = db.useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<TestAccount | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (instantUser && getCurrentUser()) {
      router.replace("/compose");
    }
  }, [instantUser, router]);

  const fillFromAccount = (account: TestAccount) => {
    setSelectedAccount(account);
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSelectedAccount(null);
                }}
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
          <p className="mb-4 text-xs text-gray-500">Select an account to auto-fill credentials</p>

          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                Admin (Global)
              </p>
              {TEST_ACCOUNTS.admin.map((account) => (
                <div key={account.email} className="mb-2">
                  <TestAccountRadio
                    account={account}
                    label={account.email}
                    checked={selectedAccount?.email === account.email}
                    onSelect={() => fillFromAccount(account)}
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                Supervisors
              </p>
              <div className="space-y-2">
                {TEST_ACCOUNTS.supervisors.map((account) => (
                  <TestAccountRadio
                    key={account.email}
                    account={account}
                    label={`${account.email} (${account.scope})`}
                    checked={selectedAccount?.email === account.email}
                    onSelect={() => fillFromAccount(account)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                Agents
              </p>
              <div className="space-y-2">
                {TEST_ACCOUNTS.agents.map((account) => (
                  <TestAccountRadio
                    key={account.email}
                    account={account}
                    label={`${account.email} (${account.scope})`}
                    checked={selectedAccount?.email === account.email}
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
