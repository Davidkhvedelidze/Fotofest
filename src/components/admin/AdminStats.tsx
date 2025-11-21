"use client";

import { RequestEventFormData } from "@/app/types/type";
import { useEffect, useState } from "react";

interface Stats {
  totalEvents: number;
  totalContacts: number;
  recentEvents: number;
  pendingEvents: number;
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    totalContacts: 0,
    recentEvents: 0,
    pendingEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [eventsRes, contactsRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/contact"),
      ]);

      const eventsData = await eventsRes.json();
      const contactsData = await contactsRes.json();

      // Handle both array and object responses
      const events = Array.isArray(eventsData.events)
        ? eventsData.events
        : Array.isArray(eventsData)
        ? eventsData
        : [];

      const contacts = Array.isArray(contactsData.messages)
        ? contactsData.messages
        : Array.isArray(contactsData)
        ? contactsData
        : [];

      // Calculate recent events (last 7 days) based on createdAt
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentEvents = events.filter(
        (
          eventRecord:
            | { createdAt: string; data?: RequestEventFormData }
            | RequestEventFormData
        ) => {
          const createdAt =
            "createdAt" in eventRecord
              ? eventRecord.createdAt
              : "data" in eventRecord && eventRecord.data
              ? (eventRecord.data as { createdAt?: string }).createdAt
              : undefined;
          if (!createdAt) return false;
          const createdDate = new Date(createdAt);
          return createdDate >= sevenDaysAgo;
        }
      );

      setStats({
        totalEvents: events.length,
        totalContacts: contacts.length,
        recentEvents: recentEvents.length,
        pendingEvents: events.length, // You can add status field later
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white/80 rounded-3xl p-6 shadow-lg animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Event Requests",
      value: stats.totalEvents,
      color: "bg-[#E2A9F1]",
      textColor: "text-[#681155]",
    },
    {
      title: "Total Contact Messages",
      value: stats.totalContacts,
      color: "bg-[#CB6CE6]",
      textColor: "text-[#681155]",
    },
    {
      title: "Recent Requests (7 days)",
      value: stats.recentEvents,
      color: "bg-[#FF5EC3]",
      textColor: "text-white",
    },
    {
      title: "Pending Events",
      value: stats.pendingEvents,
      color: "bg-[#681155]",
      textColor: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} rounded-3xl p-6 shadow-lg ${stat.textColor}`}
        >
          <h3 className="text-sm font-semibold opacity-80 mb-2">
            {stat.title}
          </h3>
          <p className="text-4xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
