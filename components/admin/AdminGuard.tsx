"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "authorized" | "redirecting">("checking");

  useEffect(() => {
    if (!isAuthenticated()) {
      setStatus("redirecting");
      router.replace("/admin/login");
    } else {
      setStatus("authorized");
    }
  }, [router]);

  if (status === "authorized") return <>{children}</>;

  // Show spinner while checking auth or redirecting to login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
        <p className="text-sm text-gray-500">
          {status === "redirecting" ? "Đang chuyển hướng..." : "Đang kiểm tra..."}
        </p>
      </div>
    </div>
  );
}
