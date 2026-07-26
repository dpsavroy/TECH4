"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { colors, darkColors, layout } from "@/styles/design-tokens";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";
import { SystemCards } from "./SystemCards";
import { useHeroOrchestration } from "./useHeroOrchestration";

/**
 * Hero section — full-viewport composition.
 *
 * Responsive grid:
 *  - xl (≥1280px): 3-column — [Copy & CTA | Building | System Cards]
 *  - lg (1024–1279px): 2-column flex — [Copy & CTA | Building + Cards below]
 *  - md and below: single-column stack
 *
 * State is managed by useHeroOrchestration and shared across HeroVisual
 * and SystemCards so both respond to the same active system and intro sequence.
 */
export function HeroSection() {
  const { theme } = useTheme();

  // Description → card cascade sequencing (Variant B).
  // The typed description gates the card cascade on every page load; the
  // cascade starts once the description finishes typing (or immediately
  // when reduced-motion skips the effect).
  const [descriptionReady, setDescriptionReady] = useState<boolean>(false);

  const {
    activeSystem,
    visibleSystems,
    setIsHovered,
    handleSelect,
  } = useHeroOrchestration({ introStarted: descriptionReady });

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center transition-colors duration-300"
      style={{
        minHeight: "calc(100vh - 88px)",
        backgroundColor:
          theme === "dark" ? darkColors.background.page : colors.background.page,
      }}
    >
      {/* Structural background grid — engineering motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Radial mask — keeps the grid pronounced behind the building, fades it softly toward the edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 75% 65% at 50% 45%, transparent 30%, ${theme === "dark" ? darkColors.background.page : colors.background.page} 100%)`,
        }}
      />

      {/*
        Layout container.

        xl: CSS grid — 3 columns with pixel-accurate proportions.
              Left  28% — copy is content-light; a narrower column keeps the
                          building dominant and avoids overly long text lines.
              Center 1fr — building fills all remaining space.
              Right 25%  — cards panel; enough width for label + description.

        lg: flex-row — left takes 40%, right (building + cards below) takes 60%.
        md and below: flex-col (natural stack order: copy → building → cards).
      */}
      <div
        className={[
          "mx-auto w-full px-7 md:px-12 xl:px-10 relative z-10 py-12 lg:py-16 xl:py-10",
          // Mobile / tablet: vertical stack
          "flex flex-col items-center gap-14",
          // lg two-column
          "lg:flex-row lg:items-center lg:gap-10",
          // xl three-column grid
          "xl:grid xl:items-center xl:gap-8",
        ].join(" ")}
        style={{
          maxWidth: layout.container["2xl"],
          // Grid template only applies at xl (Tailwind xl:grid activates display:grid)
          gridTemplateColumns: "28% 1fr 25%",
        }}
      >
        {/* ── Left column: copy & CTA ──────────────────────────────────────── */}
        <div className="w-full lg:w-[40%] xl:w-auto flex justify-start items-center">
          <HeroContent onDescriptionDone={() => setDescriptionReady(true)} />
        </div>

        {/* ── Center column: interactive building ─────────────────────────── */}
        {/*
          The div wraps both the building and the compact card grid.
          At xl, the compact card grid is hidden (xl:hidden) because cards
          live in the right column. At lg and below, the compact grid is shown.
        */}
        <div className="w-full lg:w-[60%] xl:w-auto flex flex-col items-center">
          <HeroVisual
            activeSystem={activeSystem}
            onHoverChange={setIsHovered}
          />

          {/* Compact card grid — visible on lg and below, hidden at xl */}
          <div className="mt-8 w-full xl:hidden">
            <SystemCards
              activeSystem={activeSystem}
              visibleSystems={visibleSystems}
              onSelect={handleSelect}
              onHoverChange={setIsHovered}
              compact
            />
          </div>
        </div>

        {/* ── Right column: vertical card panel — xl only ──────────────────── */}
        <div className="hidden xl:flex xl:flex-col xl:justify-center xl:h-full w-full">
          <SystemCards
            activeSystem={activeSystem}
            visibleSystems={visibleSystems}
            onSelect={handleSelect}
            onHoverChange={setIsHovered}
          />
        </div>
      </div>
    </section>
  );
}
