"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventShowcase } from "@/app/types/type";
import bgImage from "../../../public/bgElements/Element2.png";

const EVENTS_PER_PAGE = 9;

export default function EventsPage() {
  const [events, setEvents] = useState<EventShowcase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch showcase events from API
    fetch("/api/showcase-events")
      .then((res) => res.json())
      .then((data) => {
        const apiEvents = data.events || [];
        // Combine API events with static events, sort by newest first
        const allEvents = [...apiEvents];
        // Sort by createdAt if available (newest first)
        const sortedEvents = allEvents.sort(
          (
            a: EventShowcase & { createdAt?: string },
            b: EventShowcase & { createdAt?: string }
          ) => {
            if (a.createdAt && b.createdAt) {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
            return 0;
          }
        );
        setEvents(sortedEvents);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching showcase events:", err);
        // Fallback to static events
        setEvents([]);
        setIsLoading(false);
      });
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIndex, endIndex);

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
      } else {
        // window?.location?.href = event.redirectUrl;
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
        <div className="text-[#681155] text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6D2EF] to-[#F9E5F5]">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur border-b border-[#E2A9F1]/30">
        <div className="mx-auto max-w-6xl px-6 py-6 lg:px-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1A032D]">
                ყველა ღონისძიება
              </h1>
              <p className="text-[#681155] mt-2">
                გაეცანით ჩვენი ბოლო პროექტებს
              </p>
            </div>
            <Link
              href="/"
              className="px-6 py-2 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors"
            >
              ← უკან
            </Link>
          </div>
        </div>
      </header>

      {/* Events Grid */}
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 relative">
          <Image
            src={bgImage}
            alt="Events"
            className="absolute top-0 left-0 w-full -z-10 scale-125 h-full object-cover opacity-50"
          />

          {currentEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#681155] text-xl">No events found</p>
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
                      className={`event-card flex flex-col overflow-hidden rounded-3xl bg-white/80 shadow-lg shadow-[#CB6CE6]/15 backdrop-blur transition-all hover:shadow-xl hover:-translate-y-1 ${
                        event.redirectUrl ? "cursor-pointer" : ""
                      }`}
                    >
                      {event?.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.imageAlt || event.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex flex-col p-8">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold text-[#1A032D]">
                            {event.name}
                          </h3>
                          <p className="text-sm font-medium uppercase tracking-widest text-[#D26E9C]">
                            {event.location}
                          </p>
                        </div>
                        <p className="mt-4 flex-1 text-[#681155]">
                          {event.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {event.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-[#F6D2EF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#681155]"
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
                    className="px-4 py-2 rounded-full bg-white/80 text-[#681155] font-semibold hover:bg-[#F6D2EF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                                  : "bg-white/80 text-[#681155] hover:bg-[#F6D2EF]"
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
                            <span key={page} className="px-2 text-[#681155]">
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
                    className="px-4 py-2 rounded-full bg-white/80 text-[#681155] font-semibold hover:bg-[#F6D2EF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      <footer className="border-t border-white/30 font-sans bg-[#681155] py-10 text-center text-sm text-white mt-12">
        <p>
          © {new Date().getFullYear()} PhotoFest — გაიღიმე · გადაიღე · გააზიარე
        </p>
      </footer>
    </div>
  );
}
