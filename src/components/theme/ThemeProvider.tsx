"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";
type ResolvedTheme = ThemeMode;

type ThemeContextValue = {
  /** The user-selected mode (light | dark). */
  mode: ThemeMode;
  /** The resolved visual theme actually applied to the page. */
  theme: ResolvedTheme;
  /** Set a specific mode. */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark. */
  cycleMode: () => void;
};

const THEME_STORAGE_KEY = "tech4-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "light";

  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    // localStorage unavailable – fall through.
  }

  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  const resolved: ResolvedTheme = useMemo(() => mode, [mode]);

  // Apply the resolved theme to <html>.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.style.colorScheme = resolved;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // The selected mode still applies for the current visit.
    }
  }, [resolved, mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
  }, []);

  const cycleMode = useCallback(() => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, theme: resolved, setMode, cycleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}