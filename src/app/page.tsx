"use client";

import { useCallback, useEffect } from "react";
import gsap from "gsap";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { RequestEventSection } from "@/components/sections/RequestEventSection";

export default function Home() {
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

  return (
    <div className="min-h-screen text-[#1A032D]">
      <MainNavigation />
      <main>
        <HeroSection onCtaClick={() => undefined} />
        <ExperiencesSection />
        <AboutSection />
        <EventsSection />
        <ContactSection />
        <RequestEventSection />
      </main>
      <footer className="border-t border-white/30 font-sans bg-[#681155] py-10 text-center text-sm text-white">
        <p>
          © {new Date().getFullYear()} PhotoFest — გაიღიმე · გადაიღე · გააზიარე
        </p>
      </footer>
    </div>
  );
}
