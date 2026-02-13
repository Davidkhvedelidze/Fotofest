"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { EventShowcase } from "@/features/events/types/events";
import bgImage from "../../../public/bgElements/Element2.png";
import { getShowcaseEventsApi } from "@/features/events/api/eventsClient";
import { logError } from "@/lib/services/logger";

const EVENTS_PER_PAGE = 9;

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventShowcase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getShowcaseEventsApi();
        const apiEvents = data.events || [];
        const sortedEvents = [...apiEvents].sort(
          (
            a: EventShowcase & { createdAt?: string; date?: string },
            b: EventShowcase & { createdAt?: string; date?: string }
          ) => {
            const aDate = a.date || a.createdAt;
            const bDate = b.date || b.createdAt;

            if (aDate && bDate) {
              return new Date(bDate).getTime() - new Date(aDate).getTime();
            }
            if (aDate) return -1;
            if (bDate) return 1;
            return 0;
          }
        );
        setEvents(sortedEvents);
      } catch (err) {
        logError({ message: "Error fetching showcase events", error: err });
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const query = searchQuery.toLowerCase();
    return events.filter((event) => {
      return (
        event.name.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [events, searchQuery]);

  // Calculate pagination based on filtered events
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  // Handle search query change and reset page
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEventClick = (event: EventShowcase) => {
    if (event.redirectUrl) {
      if (
        event.redirectUrl.startsWith("http://") ||
        event.redirectUrl.startsWith("https://")
      ) {
        window.open(event.redirectUrl, "_blank", "noopener,noreferrer");
      } else if (event.redirectUrl.startsWith("/")) {
        // Internal route - use Next.js router for client-side navigation
        router.push(event.redirectUrl);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
        <div className="text-primary text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur border-b border-[#E2A9F1]/30">
        <div className="mx-auto max-w-6xl px-6 py-6 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                ყველა ღონისძიება
              </h1>
              <p className="text-primary mt-2">გაეცანით ჩვენი ბოლო პროექტებს</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="flex-1 md:flex-initial md:w-64">
                <Input
                  placeholder="ძიება..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  prefix={<SearchOutlined className="text-muted" />}
                  allowClear
                  size="large"
                  className="events-search-input"
                />
              </div>
              <Link
                href="/"
                className="px-6 py-2.5 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors whitespace-nowrap"
              >
                ← უკან
              </Link>
            </div>
          </div>
          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-4 text-sm text-muted">
              {filteredEvents.length === 0 ? (
                <span>შედეგები არ მოიძებნა</span>
              ) : (
                <span>
                  ნაპოვნია {filteredEvents.length}{" "}
                  {filteredEvents.length === 1 ? "ღონისძიება" : "ღონისძიება"}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Events Grid */}
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 relative overflow-x-hidden">
          <Image
            src={bgImage}
            alt="Events"
            className="absolute top-0 left-0 w-full -z-10 scale-125 h-full object-cover opacity-50"
          />

          {currentEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-primary text-xl">
                {searchQuery ? "შედეგები არ მოიძებნა" : "ღონისძიებები არ არის"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="mt-4 text-primary hover:text-brand-pink underline transition-colors"
                >
                  წაშალე ძიება
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentEvents.map((event, index) => {
                  const eventWithId = event as EventShowcase & { id?: string };
                  return (
                    <article
                      key={eventWithId.id || `${event.name}-${index}`}
                      onClick={() => handleEventClick(event)}
                      className={`event-card flex flex-col overflow-hidden duration-1000 rounded-3xl bg-card shadow-lg shadow-[#CB6CE6]/15 backdrop-blur transition-transform hover:shadow-xl group hover:-translate-y-1 ${
                        event.redirectUrl ? "cursor-pointer" : ""
                      }`}
                    >
                      {event?.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.imageAlt || event.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex flex-col p-8">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold  text-foreground">
                            {event.name}
                          </h3>
                          <p className="text-sm font-medium uppercase tracking-widest text-brand-pink">
                            {event.location}
                          </p>
                          {event.date && (
                            <p className="text-xs font-medium text-brand-purple mt-1">
                              {new Date(event.date).toLocaleDateString(
                                "ka-GE",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </p>
                          )}
                        </div>
                        <p className="mt-4 flex-1 text-primary">
                          {event.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {event.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-[#F6D2EF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full bg-white/80 text-primary font-semibold hover:bg-[#F6D2EF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← წინა
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                                currentPage === page
                                  ? "bg-[#681155] text-white"
                                  : "bg-white/80 text-primary hover:bg-[#F6D2EF]"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span key={page} className="px-2 text-primary">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full bg-white/80 text-primary font-semibold hover:bg-[#F6D2EF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    შემდეგი →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
