"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EventRequestsList } from "@/components/admin/EventRequestsList";
import { ContactMessagesList } from "@/components/admin/ContactMessagesList";
import { AdminStats } from "@/components/admin/AdminStats";
import { AddEventForm } from "@/components/admin/AddEventForm";
import { ShowcaseEventsList } from "@/components/admin/ShowcaseEventsList";

type TabType = "events" | "contact" | "showcase";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("events");
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check authentication via JWT cookie
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/me");
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
          } else {
            router.push("/admin/login");
          }
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
        <div className="text-[#681155] text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#1A032D]">
              PhotoFest Admin Dashboard
            </h1>
            <p className="text-[#681155] mt-2">
              Manage event requests and contact messages
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-[#FF5EC3] text-white rounded-full font-semibold hover:bg-[#681155] transition-colors"
          >
            Logout
          </button>
        </div>
        {/* Stats */}
        <AdminStats />

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex gap-4 border-b border-[#E2A9F1] mb-6">
            <button
              onClick={() => setActiveTab("events")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "events"
                  ? "text-[#681155] border-b-2 border-[#681155]"
                  : "text-[#681155] opacity-60 hover:opacity-100"
              }`}
            >
              Event Requests
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "contact"
                  ? "text-[#681155] border-b-2 border-[#681155]"
                  : "text-[#681155] opacity-60 hover:opacity-100"
              }`}
            >
              Contact Messages
            </button>
            <button
              onClick={() => setActiveTab("showcase")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "showcase"
                  ? "text-[#681155] border-b-2 border-[#681155]"
                  : "text-[#681155] opacity-60 hover:opacity-100"
              }`}
            >
              Showcase Events
            </button>
          </div>

          {activeTab === "events" && <EventRequestsList />}
          {activeTab === "contact" && <ContactMessagesList />}
          {activeTab === "showcase" && (
            <div className="space-y-8">
              <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-[#1A032D] mb-6">
                  Add New Showcase Event
                </h2>
                <AddEventForm
                  onSuccess={() => {
                    setRefreshKey((prev) => prev + 1);
                  }}
                />
              </div>
              <ShowcaseEventsList key={refreshKey} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
