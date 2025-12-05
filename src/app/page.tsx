"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { useApi } from "@/hooks/useApi";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { RequestEventSection } from "@/components/sections/RequestEventSection";
import { logError } from "@/lib/services/logger";

export default function HomePage() {
  const api = useApi();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".floating-blob", {
        y: "+=24",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });
    });

    return () => ctx.revert();
  }, []);

  // Optional: Check API health on page load
  useEffect(() => {
    api.checkHealth().catch((err) => {
      logError({ message: "API health check failed", error: err });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      <MainNavigation />
      <main>
        <HeroSection onCtaClick={() => undefined} />
        <ExperiencesSection />
        <AboutSection />
        <EventsSection />
        <ContactSection />
        <RequestEventSection />
      </main>
    </div>
  );
}
