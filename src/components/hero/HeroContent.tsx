"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useTranslations } from "@/contexts/LocaleContext";
import {
  colors,
  darkColors,
  typography,
} from "@/styles/design-tokens";
import TraceButton from "@/components/ui/TraceButton";
import { TypedDescription } from "./TypedDescription";

export function HeroContent({
  onDescriptionDone,
}: {
  onDescriptionDone?: () => void;
}) {
  const { theme } = useTheme();
  const t = useTranslations();
  const themeColors = theme === "dark" ? darkColors : colors;

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
          {t.hero.badge}
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
        {t.hero.h1_line1}
        <br />
        {t.hero.h1_line2}
        <br />
        <span style={{ color: themeColors.primary.signal }}>
          {t.hero.h1_accent}
        </span>
        .
      </h1>

      {/* Supporting Description — terminal-style typed description */}
      <TypedDescription
        text={t.hero.description}
        textColor={
          theme === "dark" ? darkColors.neutral[100] : colors.neutral[600]
        }
        className="mt-6 max-w-xl"
        onDone={onDescriptionDone}
      />

      {/* Call to Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <TraceButton href="#kontakt" variant="solid">
          {t.hero.ctaPrimary}
        </TraceButton>
        <TraceButton href="#uslugi" variant="outline">
          {t.hero.ctaSecondary}
        </TraceButton>
      </div>
    </div>
  );
}
