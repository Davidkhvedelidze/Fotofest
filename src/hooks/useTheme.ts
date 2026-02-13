"use client";

import { useLayoutEffect, useState, useCallback, useRef } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return stored || (systemPrefersDark ? "dark" : "light");
}

export function useTheme() {
  // Always start with "light" to match server render (prevents hydration mismatch)
  // The script in layout.tsx will set the correct theme before React hydrates
  const [theme, setTheme] = useState<Theme>("light");
  // mounted starts as false, set to true after client-side mount (prevents hydration mismatch)
  const [mounted, setMounted] = useState(false);
  const initializedRef = useRef(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }, []);

  // Initialize theme from localStorage/system preference on client mount
  useLayoutEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Read the actual theme (script in layout already set data-theme attribute)
    const actualTheme = getInitialTheme();
    // Only update if different from initial "light" to avoid unnecessary render
    if (actualTheme !== theme) {
      setTheme(actualTheme);
    }
    setMounted(true);
    // Ensure theme is applied (should already be applied by script, but ensure consistency)
    applyTheme(actualTheme);
  }, [applyTheme, theme]);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme, mounted };
}
