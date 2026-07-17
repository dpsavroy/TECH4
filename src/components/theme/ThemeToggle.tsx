"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { shadows, transitions } from "@/styles/design-tokens";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#0A1220] outline-none transition-colors dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 focus-visible:ring-3 motion-reduce:transition-none"
      style={{
        transitionDuration: transitions.duration.fast,
        transitionTimingFunction: transitions.easing.standard,
        ["--tw-ring-color" as string]: shadows.focus.replace("0 0 0 3px ", ""),
      }}
      aria-label={isDark ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
      onClick={toggleTheme}
    >
      <span className="sr-only">
        {isDark ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
      </span>
      <span
        aria-hidden="true"
        className="relative h-5 w-5 overflow-hidden rounded-full border border-current/20 bg-[#F7F8FA]"
      >
        <span
          className="absolute -left-0.5 -top-0.5 h-5 w-5 rounded-full bg-[#111C28] transition-transform motion-reduce:transition-none"
          style={{
            transform: isDark
              ? "translate(8%, 8%)"
              : "translate(-68%, -68%)",
            transitionDuration: transitions.duration.slow,
            transitionTimingFunction: transitions.easing.entrance,
          }}
        />
      </span>
    </button>
  );
}
