"use client";

import { useEffect, useState } from "react";
import { RequestEventFormData } from "@/app/types/type";

type EventRecord = {
  id: string;
  data: RequestEventFormData;
  createdAt: string;
};

export function EventRequestsList() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();

      if (response.ok) {
        // Handle both array and object responses
        const eventsList = Array.isArray(data.events)
          ? data.events
          : Array.isArray(data)
          ? data
          : [];

        // Sort by createdAt (newest first) and ensure proper typing
        const sortedEvents = eventsList
          .map((item: unknown) => {
            // Handle both old format (just data) and new format (with id/data/createdAt)
            if (
              item &&
              typeof item === "object" &&
              "id" in item &&
              "data" in item &&
              "createdAt" in item
            ) {
              return item as EventRecord;
            }
            // Legacy format - wrap in record structure
            return {
              id: `legacy-${Date.now()}-${Math.random()}`,
              data: item as RequestEventFormData,
              createdAt: new Date().toISOString(),
            } as EventRecord;
          })
          .sort(
            (a: EventRecord, b: EventRecord) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setEvents(sortedEvents);
      } else {
        setError("Failed to load event requests");
      }
    } catch {
      setError("Error loading event requests");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ka-GE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
        <div className="text-center text-[#681155]">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white/80 rounded-3xl p-8 shadow-lg text-center">
        <p className="text-[#681155] text-lg">No event requests yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A032D]">
          Event Requests ({events.length})
        </h2>
        <button
          onClick={fetchEvents}
          type="button"
          className="px-4 py-2 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {events.map((eventRecord) => {
          const event = eventRecord.data;
          const id = eventRecord.id;
          const createdAt = eventRecord.createdAt;

          return (
            <div
              key={id}
              className="border border-[#E2A9F1] rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#1A032D]">
                    {event.name || "Unknown"}
                  </h3>
                  {createdAt && (
                    <p className="text-sm text-[#681155] mt-1">
                      Submitted: {formatDate(createdAt)}
                    </p>
                  )}
                </div>
                <span className="px-3 py-1 bg-[#F6D2EF] text-[#681155] rounded-full text-xs font-semibold">
                  {event.eventType || "N/A"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-[#681155] mb-1">
                    Email
                  </p>
                  <p className="text-[#1A032D]">{event.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#681155] mb-1">
                    Mobile
                  </p>
                  <p className="text-[#1A032D]">{event.mobile || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#681155] mb-1">
                    Event Date
                  </p>
                  <p className="text-[#1A032D]">
                    {event.date
                      ? new Date(event.date).toLocaleDateString("ka-GE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              {event.message && (
                <div className="mt-4 pt-4 border-t border-[#E2A9F1]">
                  <p className="text-sm font-semibold text-[#681155] mb-2">
                    Additional Information
                  </p>
                  <p className="text-[#1A032D]">{event.message}</p>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${event.email || ""}`}
                  className="px-4 py-2 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors"
                >
                  Reply via Email
                </a>
                <a
                  href={`tel:${event.mobile || ""}`}
                  className="px-4 py-2 bg-[#E2A9F1] text-[#681155] rounded-full text-sm font-semibold hover:bg-[#CB6CE6] transition-colors"
                >
                  Call
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
