"use client";

import { buttons, colors, radius, transitions, typography } from "@/styles/design-tokens";

export function HeroContent() {
  return (
    <div className="flex flex-col text-left max-w-xl lg:max-w-2xl">
      {/* Brand Badge */}
      <div className="inline-flex items-center gap-2 self-start mb-6 px-3.5 py-1.5 border rounded-full bg-blue-50/50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/40">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
        <span
          style={{
            fontFamily: typography.fontFamily.mono,
            color: colors.primary.signal,
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
          color: colors.primary.ink,
        }}
        className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-semibold lg:font-bold dark:text-neutral-50"
      >
        Where Buildings
        <br />
        Become <span style={{ color: colors.primary.signal }}>Intelligent</span>.
      </h1>

      {/* Supporting Description */}
      <p
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.scale.lg.fontSize,
          lineHeight: typography.scale.lg.lineHeight,
          color: colors.neutral[500],
        }}
        className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-lg"
      >
        TECH4 integrates building engineering systems into one reliable and manageable solution.
      </p>

      {/* Call to Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center rounded-full outline-none transition-all focus-visible:ring-3 text-center hover:bg-sky-950 hover:dark:bg-neutral-800 active:scale-[0.98]"
          style={{
            minHeight: buttons.size.lg.height,
            paddingInline: "2.25rem",
            backgroundColor: colors.primary.ink,
            color: colors.neutral[0],
            fontSize: buttons.size.lg.fontSize,
            fontWeight: typography.weight.medium,
            transitionDuration: transitions.duration.fast,
            transitionTimingFunction: transitions.easing.standard,
            ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
          }}
        >
          Skontaktuj się
        </a>
        <a
          href="#uslugi"
          className="inline-flex items-center justify-center rounded-full border outline-none transition-all focus-visible:ring-3 text-center hover:bg-neutral-100 hover:dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800 active:scale-[0.98]"
          style={{
            minHeight: buttons.size.lg.height,
            paddingInline: "2.25rem",
            borderColor: colors.neutral[200],
            color: colors.primary.ink,
            fontSize: buttons.size.lg.fontSize,
            fontWeight: typography.weight.medium,
            transitionDuration: transitions.duration.fast,
            transitionTimingFunction: transitions.easing.standard,
            ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
          }}
        >
          Nasze usługi
        </a>
      </div>
    </div>
  );
}
