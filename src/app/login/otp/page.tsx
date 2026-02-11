"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import {
  OTP_TEST_EMAIL,
  getCurrentUser,
  getPendingLoginAccount,
  clearPendingLoginAccount,
  setUser,
} from "@/lib/auth";

export default function LoginOTPPage() {
  const router = useRouter();
  const { user: instantUser } = db.useAuth();
  const [pendingAccount, setPendingAccount] = useState<ReturnType<typeof getPendingLoginAccount>>(undefined);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    if (instantUser && getCurrentUser()) {
      clearPendingLoginAccount();
      router.replace("/compose");
      return;
    }
    const account = getPendingLoginAccount();
    if (!account) {
      router.replace("/login");
    } else {
      setPendingAccount(account);
    }
  }, [instantUser, router]);

  const handleSendOTP = async () => {
    setError("");
    setSending(true);
    try {
      await db.auth.sendMagicCode({ email: OTP_TEST_EMAIL });
      setCodeSent(true);
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "body" in err &&
        typeof (err as { body?: { message?: string } }).body?.message === "string"
          ? (err as { body: { message: string } }).body.message
          : "Failed to send code. Check your InstantDB auth setup.";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!pendingAccount || !code.trim()) {
      setError("Please enter the code from your email.");
      return;
    }
    setVerifying(true);
    try {
      await db.auth.signInWithMagicCode({ email: OTP_TEST_EMAIL, code: code.trim() });
      setUser({
        email: pendingAccount.email,
        displayName: pendingAccount.displayName,
        role: pendingAccount.role,
        scope: pendingAccount.scope,
      });
      clearPendingLoginAccount();
      router.push("/compose");
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "body" in err &&
        typeof (err as { body?: { message?: string } }).body?.message === "string"
          ? (err as { body: { message: string } }).body.message
          : "Invalid or expired code. Try again or request a new code.";
      setError(message);
    } finally {
      setVerifying(false);
    }
  };

  if (pendingAccount === undefined || pendingAccount === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#6a1b9a] text-lg font-bold text-white">
              FA
            </div>
            <h1 className="text-xl font-bold text-gray-900">Verify your sign in</h1>
            <p className="mt-1 text-sm text-gray-500">PAC Workspace</p>
          </div>

          <p className="mb-4 text-sm text-gray-600">
            Signing in as <strong className="text-gray-800">{pendingAccount.displayName}</strong> (
            {pendingAccount.role}
            {pendingAccount.scope ? ` · ${pendingAccount.scope}` : ""}).
          </p>
          <p className="mb-6 text-sm text-gray-600">
            We’ll send a one-time code to <strong className="text-gray-800">{OTP_TEST_EMAIL}</strong>.
            Enter it below to complete sign in.
          </p>

          {!codeSent ? (
            <>
              {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={sending}
                className="w-full rounded-lg bg-[#6a1b9a] py-2.5 font-medium text-white hover:bg-[#7b1fa2] focus:outline-none focus:ring-2 focus:ring-[#6a1b9a] focus:ring-offset-2 disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send verification code"}
              </button>
            </>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <p className="text-sm text-gray-600">
                Check <strong className="text-gray-800">{OTP_TEST_EMAIL}</strong> for the code.
              </p>
              <div>
                <label htmlFor="code" className="mb-1 block text-sm font-medium text-gray-700">
                  Verification code
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter code"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-[#6a1b9a] focus:outline-none focus:ring-1 focus:ring-[#6a1b9a]"
                  autoComplete="one-time-code"
                  autoFocus
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={verifying}
                className="w-full rounded-lg bg-[#6a1b9a] py-2.5 font-medium text-white hover:bg-[#7b1fa2] focus:outline-none focus:ring-2 focus:ring-[#6a1b9a] focus:ring-offset-2 disabled:opacity-50"
              >
                {verifying ? "Verifying…" : "Verify and sign in"}
              </button>
              <button
                type="button"
                onClick={() => setCodeSent(false)}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                Send a new code
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-gray-200 pt-4">
            <Link
              href="/login"
              className="block text-center text-sm text-gray-500 hover:text-gray-700"
            >
              ← Choose a different account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
