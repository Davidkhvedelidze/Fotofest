"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { recentEvents } from "@/app/data/data";
import bgImage from "../../../public/bgElements/Element2.png";

gsap.registerPlugin(ScrollTrigger);

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const eventListenersRef = useRef<
    Array<{ element: HTMLElement; type: string; handler: EventListener }>
  >([]);

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
    <section ref={sectionRef} id="events" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 relative">
        <Image
          src={bgImage}
          alt="Events"
          className="absolute top-0 left-0 w-full -z-10 scale-125 h-full  object-cover"
        />
        <div className="events-heading">
          <SectionHeading eyebrow="ღონისძიებები" align="left">
            ინსპირაცია ჩვენი ბოლო ივენთებიდან
          </SectionHeading>
        </div>
        <div
          ref={cardsRef}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {recentEvents.map((event) => (
            <article
              key={event.name}
              className="event-card flex flex-col overflow-hidden rounded-3xl bg-white/80 shadow-lg shadow-[#CB6CE6]/15 backdrop-blur cursor-pointer"
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
                      className="event-tag inline-flex items-center rounded-full bg-[#F6D2EF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#681155]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
