"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading, user } = db.useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
