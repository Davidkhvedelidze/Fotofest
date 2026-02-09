"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  fetchShowcaseEvents,
  sortShowcaseEventsByCreatedAt,
  type ShowcaseEventRecord,
} from "@/features/events/services/eventsService";
import { logError } from "@/lib/services/logger";
import bgImage from "../../../public/bgElements/Element2.png";

gsap.registerPlugin(ScrollTrigger);

export function EventsSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<ShowcaseEventRecord[]>([]);
  const eventListenersRef = useRef<
    Array<{ element: HTMLElement; type: string; handler: EventListener }>
  >([]);

  useEffect(() => {
    const loadShowcaseEvents = async () => {
      try {
        const apiEvents = await fetchShowcaseEvents();
        const sortedEvents = sortShowcaseEventsByCreatedAt(apiEvents);
        setEvents(sortedEvents.slice(0, 6));
      } catch (error) {
        logError({ message: "Error fetching showcase events", error });
        setEvents([]);
      }
    };

    void loadShowcaseEvents();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Section scale animation on scroll - unified single animation
      gsap.fromTo(
        sectionRef.current,
        {
          scale: 0.95,
          opacity: 0.7,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );

      // Section heading animation
      gsap.fromTo(
        ".events-heading",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".event-card");

      cards.forEach((card, index) => {
        // Set initial state
        gsap.set(card, {
          opacity: 0,
          y: 40,
          scale: 0.95,
        });

        const image = card.querySelector(".event-image") as HTMLElement;
        const tags = card.querySelectorAll<HTMLElement>(".event-tag");

        // Card entrance animation on scroll
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        // Hover handlers
        const handleMouseEnter = () => {
          if (image) {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          gsap.to(card, {
            y: -8,
            duration: 0.4,
            ease: "power2.out",
          });

          tags.forEach((tag, tagIndex) => {
            gsap.to(tag, {
              scale: 1.05,
              opacity: 1,
              duration: 0.3,
              delay: tagIndex * 0.03,
              ease: "back.out(1.5)",
            });
          });
        };

        const handleMouseLeave = () => {
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          tags.forEach((tag) => {
            gsap.to(tag, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        // Store listeners for cleanup
        eventListenersRef.current.push(
          { element: card, type: "mouseenter", handler: handleMouseEnter },
          { element: card, type: "mouseleave", handler: handleMouseLeave }
        );
      });

      // Refresh ScrollTrigger on window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
      eventListenersRef.current.push({
        element: window as unknown as HTMLElement,
        type: "resize",
        handler: handleResize,
      });
    }, sectionRef);

    return () => {
      // Clean up event listeners
      eventListenersRef.current.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
      eventListenersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-24 relative">
      <Image
        src={bgImage}
        alt="Events"
        className="absolute top-0 left-0  -z-10  w-full scale-105 "
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-10 ">
        <div className="events-heading">
          <SectionHeading eyebrow="ღონისძიებები" align="left">
            ინსპირაცია ჩვენი ბოლო ივენთებიდან
          </SectionHeading>
        </div>
        <div
          ref={cardsRef}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {events.map((event, index) => {
            const eventWithId = event as EventShowcase & { id?: string };
            const handleClick = () => {
              if (event.redirectUrl) {
                // Check if it's an external URL or internal route
                if (
                  event.redirectUrl.startsWith("http://") ||
                  event.redirectUrl.startsWith("https://")
                ) {
                  window.open(
                    event.redirectUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                } else if (event.redirectUrl.startsWith("/")) {
                  // Internal route - use Next.js router for client-side navigation
                  router.push(event.redirectUrl);
                }
                // If redirectUrl doesn't match expected patterns, do nothing (safety)
              }
            };
            return (
              <article
                key={eventWithId.id || `${event.name}-${index}`}
                onClick={handleClick}
                className={`event-card flex flex-col overflow-hidden rounded-3xl bg-white/80 shadow-lg shadow-[#CB6CE6]/15 backdrop-blur ${
                  event.redirectUrl ? "cursor-pointer" : ""
                }`}
              >
                {event?.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.imageAlt || event.name}
                      fill
                      className="event-image object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex flex-col p-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground">
                      {event.name}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-widest text-brand-pink">
                      {event.location}
                    </p>
                    {event.date && (
                      <p className="text-xs font-medium text-brand-purple mt-1">
                        {new Date(event.date).toLocaleDateString("ka-GE", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
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
                        className="event-tag inline-flex items-center rounded-full bg-[#F6D2EF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
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
        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-full bg-[#681155] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#681155]/30 hover:bg-[#FF5EC3] transition-colors"
          >
            იხილე მეტი ღონისძიება →
          </Link>
        </div>
      </div>
    </section>
  );
}
