import { createContext, createElement, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "rb-dark";

type ThemeContextValue = {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "1") {
        setDark(true);
      } else if (stored === "0") {
        setDark(false);
      } else {
        setDark(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false);
      }
    } catch {
      setDark(false);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "1" : "0");
    } catch {
      // ignore storage failures
    }
  }, [dark]);

  const toggleTheme = useCallback(() => {
    setDark((value) => !value);
  }, []);

  return createElement(ThemeContext.Provider, { value: { dark, toggleTheme } }, children);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
