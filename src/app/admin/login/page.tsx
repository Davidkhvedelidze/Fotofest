"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  useEffect(() => {
    // If already authenticated, redirect immediately
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push(redirectUrl);
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl shadow-[#CB6CE6]/20 backdrop-blur">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1A032D] mb-2">
              PhotoFest Admin
            </h1>
            <p className="text-[#681155]">Sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-[#681155] mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#681155] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-800 border border-red-200 rounded-2xl p-4">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#681155] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#681155]/30 hover:bg-[#FF5EC3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#681155] opacity-70">
            <p>Default credentials: admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
          <div className="text-[#681155] text-xl">Loading...</div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
