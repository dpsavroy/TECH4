"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import {
  buttons,
  colors,
  darkColors,
  darkShadows,
  shadows,
  transitions,
  typography,
} from "@/styles/design-tokens";
import { TypedDescription } from "./TypedDescription";

export function HeroContent({
  onDescriptionDone,
}: {
  onDescriptionDone?: () => void;
}) {
  const { theme } = useTheme();
  const themeColors = theme === "dark" ? darkColors : colors;
  const themeShadows = theme === "dark" ? darkShadows : shadows;

  // Description text — revealed character-by-character on first session
  // load. No accent segments: the whole paragraph shares one colour.
  const descriptionText =
    "TECH4 integruje systemy techniczne budynków w jedno niezawodne i łatwe w zarządzaniu rozwiązanie.";

  return (
    <div className="flex flex-col text-left max-w-xl lg:max-w-2xl">
      {/* Brand Badge */}
      <div className="inline-flex items-center gap-2 self-start mb-6 px-3.5 py-1.5 border rounded-full bg-[#E8F5E2]/50 border-[#C7E5BC] dark:bg-[#23870B]/10 dark:border-[#23870B]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#23870B] animate-pulse" />
        <span
          style={{
            fontFamily: typography.fontFamily.mono,
            color: themeColors.primary.signal,
            fontSize: "0.7rem",
            fontWeight: typography.weight.semibold,
            letterSpacing: "0.08em",
          }}
          className="uppercase"
        >
          Integrator Systemów Budynkowych
        </span>
      </div>

      {/* Main Tagline */}
      <h1
        style={{
          fontFamily: typography.fontFamily.sans,
          fontWeight: typography.weight.semibold,
          letterSpacing: typography.tracking.tight,
          color: themeColors.primary.ink,
        }}
        className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-semibold lg:font-bold"
      >
        Budynki
        <br />
        stają się
        <br />
        <span style={{ color: themeColors.primary.signal }}>inteligentne</span>.
      </h1>

      {/* Supporting Description — typed character-by-character on first session load */}
      <TypedDescription
        text={descriptionText}
        textColor={theme === "dark" ? darkColors.neutral[300] : colors.neutral[500]}
        className="mt-6 max-w-lg"
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.scale.lg.fontSize,
          lineHeight: typography.scale.lg.lineHeight,
        }}
        onDone={onDescriptionDone}
      />

      {/* Call to Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center rounded-full outline-none transition-all focus-visible:ring-3 text-center shadow-[0_0_0_rgba(18,217,67,0)] hover:bg-[#12D943] hover:dark:bg-[#12D943] hover:shadow-[0_0_28px_rgba(18,217,67,0.35)] active:scale-[0.98]"
          style={{
            minHeight: buttons.size.lg.height,
            paddingInline: "2.25rem",
            backgroundColor: colors.primary.signal,
            color: colors.neutral[0],
            fontSize: buttons.size.lg.fontSize,
            fontWeight: typography.weight.medium,
            transitionDuration: "300ms",
            transitionTimingFunction: "ease",
            ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
          }}
        >
          Skontaktuj się
        </a>
        <a
          href="#uslugi"
          className="inline-flex items-center justify-center rounded-full border outline-none transition-all focus-visible:ring-3 text-center hover:bg-neutral-100 hover:dark:bg-neutral-900 dark:border-neutral-800 active:scale-[0.98]"
          style={{
            minHeight: buttons.size.lg.height,
            paddingInline: "2.25rem",
            borderColor:
              theme === "dark" ? darkColors.neutral[800] : colors.neutral[200],
            color: theme === "dark" ? darkColors.neutral[300] : "#34433A",
            fontSize: buttons.size.lg.fontSize,
            fontWeight: typography.weight.medium,
            transitionDuration: transitions.duration.fast,
            transitionTimingFunction: transitions.easing.standard,
            ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
          }}
        >
          Nasze usługi
        </a>
      </div>
    </div>
  );
}
