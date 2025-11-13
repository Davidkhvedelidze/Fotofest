'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export interface NavLink {
  label: string;
  href: string;
}

interface MainNavigationProps {
  links: NavLink[];
}

export function MainNavigation({ links }: MainNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F6D2EF]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#welcome" className="text-xl font-semibold text-[#1A032D]">
          FotoFest
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-[#1A032D] md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#FF5EC3]"
            >
              {link.label}
            </a>
          ))}
        </nav>
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>
      {isOpen ? (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden"
        >
          <ul className="space-y-4 px-6 pb-6 text-base font-semibold text-[#1A032D]">
            {links.map((link) => (
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
