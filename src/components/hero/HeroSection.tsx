"use client";

import { layout, colors } from "@/styles/design-tokens";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center py-20 lg:py-32 xl:py-40 bg-zinc-50 dark:bg-neutral-950 transition-colors duration-300"
      style={{
        minHeight: "calc(100vh - 88px)", // Subtract Header height to prevent double scrollbar or bad heights
      }}
    >
      {/* Structural background details */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015]">
        {/* Subtle grid lines matching engineering motif */}
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div
        className="mx-auto w-full px-7 md:px-12 xl:px-14 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-10 xl:gap-24 relative z-10"
        style={{ maxWidth: layout.container["2xl"] }}
      >
        {/* Left Column - Copy & CTA */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex justify-start items-center">
          <HeroContent />
        </div>

        {/* Right Column - Interactive Visual */}
        <div className="w-full lg:w-[55%] xl:w-[60%] flex justify-center items-center">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
