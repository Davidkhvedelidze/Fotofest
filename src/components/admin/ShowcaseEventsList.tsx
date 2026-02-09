"use client";

import { useEffect, useState } from "react";
import { EventShowcase } from "@/features/events/types";
import { EditEventForm } from "./EditEventForm";
import Image from "next/image";

interface ShowcaseEvent extends EventShowcase {
  id?: string;
  createdAt?: string;
}

export function ShowcaseEventsList() {
  const [events, setEvents] = useState<ShowcaseEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEvent, setEditingEvent] = useState<ShowcaseEvent | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/showcase-events");
      const data = await response.json();

      if (response.ok) {
        const eventsList = Array.isArray(data.events) ? data.events : [];
        // Sort events by createdAt (newest first)
        const sortedEvents = eventsList.sort(
          (a: ShowcaseEvent, b: ShowcaseEvent) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA; // Descending order (newest first)
          }
        );
        setEvents(sortedEvents);
      } else {
        setError("Failed to load showcase events");
      }
    } catch (err) {
      setError("Error loading showcase events");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/showcase-events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchEvents();
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      alert("Error deleting event");
      console.error(err);
    }
  };

  const handleEdit = (event: ShowcaseEvent) => {
    setEditingEvent(event);
  };

  const handleEditSuccess = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  const handleEditCancel = () => {
    setEditingEvent(null);
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

  return (
    <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A032D]">
          Showcase Events ({events.length})
        </h2>
        <button
          onClick={fetchEvents}
          type="button"
          className="px-4 py-2 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors"
        >
          Refresh
        </button>
      </div>

      {editingEvent && editingEvent.id ? (
        <div className="bg-white/90 rounded-3xl p-8 shadow-lg border-2 border-[#FF5EC3]">
          <h3 className="text-2xl font-bold text-[#1A032D] mb-6">
            Edit Event: {editingEvent.name}
          </h3>
          <EditEventForm
            event={editingEvent as EventShowcase & { id: string }}
            onSuccess={handleEditSuccess}
            onCancel={handleEditCancel}
          />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#681155] text-lg">No showcase events yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id || event.name}
              className="border border-[#E2A9F1] rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#1A032D]">
                    {event.name}
                  </h3>
                  <p className="text-sm text-[#681155] mt-1">
                    {event.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(event)}
                    className="px-4 py-2 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => event.id && handleDelete(event.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-[#1A032D] mb-4">{event.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#F6D2EF] text-[#681155] rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {event.image && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#681155] mb-2">
                    Image:
                  </p>
                  <div className="relative h-48 w-[20%] overflow-hidden rounded-2xl">
                    <Image src={event.image} alt={event.name} fill />
                  </div>
                </div>
              )}

              {event.redirectUrl && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#681155] mb-2">
                    Redirect URL:
                  </p>
                  <a
                    href={event.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#FF5EC3] break-all hover:underline"
                  >
                    {event.redirectUrl}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
