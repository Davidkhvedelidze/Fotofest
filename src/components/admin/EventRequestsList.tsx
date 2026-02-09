"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getEventRequestsApi } from "@/features/events/api/eventsClient";
import {
  EventRequestRecord,
  isEventListResponse,
  isEventRequestRecord,
} from "@/features/events/types/eventRequests";

export function EventRequestsList() {
  const [events, setEvents] = useState<EventRequestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async () => {
    try {
      const data = await getEventRequestsApi();

      const normalizedEvents = isEventListResponse(data)
        ? data.events
        : Array.isArray(data)
        ? (data as EventRequestRecord[]).filter(isEventRequestRecord)
        : [];

      setEvents(normalizedEvents);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Error loading event requests";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [events]
  );

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ka-GE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

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
        {sortedEvents.map((eventRecord) => {
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
