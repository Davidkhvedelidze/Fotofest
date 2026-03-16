"use client";

import { useState } from "react";

export function TestModeBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-[9999] flex items-center justify-center gap-3 bg-amber-400 px-4 py-2 text-center text-sm  ">
      <span className="inline-flex items-center gap-1">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-700 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-800" />
        </span>
        საიტი მუშაობს სატესტო რეჟიმში
      </span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-amber-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
