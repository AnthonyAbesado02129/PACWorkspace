export const TEST_PASSWORD = "demo123";

export type Role = "Admin" | "Supervisor" | "Agent";

export interface TestAccount {
  email: string;
  displayName: string;
  role: Role;
  scope?: string;
}

export const TEST_ACCOUNTS: { admin: TestAccount[]; supervisors: TestAccount[]; agents: TestAccount[] } = {
  admin: [
    { email: "admin@pac.demo", displayName: "Admin", role: "Admin", scope: "Global" },
  ],
  supervisors: [
    { email: "david.supervisor@alphabank.demo", displayName: "David Supervisor", role: "Supervisor", scope: "Alpha Banking" },
    { email: "maria.supervisor@retailrapid.demo", displayName: "Maria Supervisor", role: "Supervisor", scope: "Retail Rapid" },
    { email: "anna.supervisor@carecentral.demo", displayName: "Anna Supervisor", role: "Supervisor", scope: "Care Central" },
  ],
  agents: [
    { email: "john.agent@alphabank.demo", displayName: "John Agent", role: "Agent", scope: "Alpha Banking" },
    { email: "emma.agent@retailrapid.demo", displayName: "Emma Agent", role: "Agent", scope: "Retail Rapid" },
    { email: "sarah.agent@carecentral.demo", displayName: "Sarah Agent", role: "Agent", scope: "Care Central" },
  ],
};

export interface CurrentUser {
  email: string;
  displayName: string;
  role: Role;
  scope?: string;
}

const STORAGE_KEY = "pac_current_user";

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CurrentUser;
  } catch {
    return null;
  }
}

export function setUser(user: CurrentUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getInitials(displayName: string): string {
  return displayName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** For test: all OTPs are sent to this email. */
export const OTP_TEST_EMAIL = "anthonyabesado02129@gmail.com";

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === "Admin";
}

/** Pending login: selected account before OTP (stored when navigating from /login to /login/otp). */
const PENDING_ACCOUNT_KEY = "pac_pending_login_account";

export function setPendingLoginAccount(account: TestAccount): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_ACCOUNT_KEY, JSON.stringify(account));
}

export function getPendingLoginAccount(): TestAccount | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_ACCOUNT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TestAccount;
  } catch {
    return null;
  }
}

export function clearPendingLoginAccount(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_ACCOUNT_KEY);
}

export function getAllTestAccounts(): TestAccount[] {
  return [
    ...TEST_ACCOUNTS.admin,
    ...TEST_ACCOUNTS.supervisors,
    ...TEST_ACCOUNTS.agents,
  ];
}
