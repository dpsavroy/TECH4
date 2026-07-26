"use client";

import { useTheme, type ThemeMode } from "@/components/theme/ThemeProvider";
import {
  colors,
  darkColors,
  darkShadows,
  shadows,
  transitions,
  typography,
} from "@/styles/design-tokens";

const MODE_LABELS: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
};

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="#E8922D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="3.5" />
      <path d="M9 1v1.5" />
      <path d="M9 15.5V17" />
      <path d="M3.34 3.34l1.06 1.06" />
      <path d="M13.6 13.6l1.06 1.06" />
      <path d="M1 9h1.5" />
      <path d="M15.5 9H17" />
      <path d="M3.34 14.66l1.06-1.06" />
      <path d="M13.6 4.4l1.06-1.06" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const MODE_ICONS: Record<ThemeMode, () => React.ReactNode> = {
  light: MoonIcon,
  dark: SunIcon,
};

/**
 * Theme toggle button that switches between light and dark modes.
 *
 * Styled as a header pill matching the LanguageSwitcher — rounded-full,
 * bordered, with a subtle background that inverts between themes.
 */
export function ThemeToggle() {
  const { mode, cycleMode, theme } = useTheme();
  const Icon = MODE_ICONS[mode];
  const isDark = theme === "dark";
  const themeShadows = isDark ? darkShadows : shadows;

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3 motion-reduce:transition-none"
      style={{
        width: "2.25rem",
        height: "2.25rem",
        borderColor: isDark ? darkColors.neutral[700] : colors.neutral[200],
        backgroundColor: isDark
          ? darkColors.background.elevated
          : colors.background.surface,
        color: isDark ? darkColors.neutral[300] : colors.neutral[600],
        fontSize: typography.scale.sm.fontSize,
        fontWeight: typography.weight.semibold,
        fontFamily: typography.fontFamily.mono,
        transitionDuration: transitions.duration.fast,
        transitionTimingFunction: transitions.easing.standard,
        ["--tw-ring-color" as string]: themeShadows.focus.replace(
          "0 0 0 3px ",
          "",
        ),
      }}
      aria-label={`Motyw: ${MODE_LABELS[mode]}. Kliknij, aby zmienić.`}
      onClick={cycleMode}
    >
      <Icon />
    </button>
  );
}