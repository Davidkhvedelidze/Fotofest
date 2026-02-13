"use client";

import { navLinks } from "@/lib/constants/marketingData";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

const SCROLL_DOWN_THRESHOLD = 60;
const SCROLL_UP_THRESHOLD = 10;
const MOBILE_BREAKPOINT = 768;

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const [navVisible, setNavVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
      isMobileRef.current = mobile;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop;
      const diff = y - lastScrollY.current;
      lastScrollY.current = y;

      if (!isMobileRef.current) return;
      if (diff > SCROLL_DOWN_THRESHOLD) {
        setNavVisible(false);
      } else if (diff < -SCROLL_UP_THRESHOLD || y < SCROLL_UP_THRESHOLD) {
        setNavVisible(true);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-[99] bg-[#681155]/60 backdrop-blur-lg transition-transform duration-300 ease-out md:!translate-y-0"
      style={
        isMobile
          ? { transform: navVisible ? "translateY(0)" : "translateY(-100%)" }
          : undefined
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#welcome" className="text-xl font-semibold text-white">
          <Image
            src="/images/photoLogo.png"
            alt="PhotoFest"
            width={120}
            height={120}
          />
        </a>
        <nav className="hidden items-center justify-evenly w-full text-sm font-medium h-full text-white md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-all hover:text-[#FF5EC3]
              hover:font-bold w-full h-full flex items-center justify-center hover:scale-105  duration-500
              "
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2A9F1] bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            disabled={!mounted}
          >
            {mounted ? (
              theme === "light" ? (
                // Moon icon for dark mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                // Sun icon for light mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )
            ) : (
              // Placeholder while loading
              <div className="h-5 w-5" />
            )}
          </motion.button>
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2A9F1] text-[#1A032D] md:hidden"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      {isOpen ? (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden"
        >
          <ul className="space-y-4 px-6 pb-6 text-base font-semibold text-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-2xl bg-white/60 px-4 py-3 shadow-sm transition hover:bg-white/90"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      ) : null}
    </header>
  );
}
