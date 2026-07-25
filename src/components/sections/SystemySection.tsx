"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useTranslations } from "@/contexts/LocaleContext";
import { BuildingSchematic, SYSTEM_COLORS } from "@/components/hero/BuildingSchematic";
import {
  colors,
  darkColors,
  layout,
  radius,
  transitions,
  typography,
} from "@/styles/design-tokens";

// ─── System item type ─────────────────────────────────────────────────────────

type SystemId = "bms" | "bas" | "cctv" | "sap" | "kd" | "hvac";

interface SystemItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SystemySection() {
  const { theme } = useTheme();
  const t = useTranslations();
  const isDark = theme === "dark";
  const themeColors = isDark ? darkColors : colors;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const items: SystemItem[] = t.systemy.items;

  return (
    <section
      ref={sectionRef}
      id="systemy"
      style={{
        backgroundColor: themeColors.background.page,
        paddingTop: layout.sectionSpacing.md,
        paddingBottom: layout.sectionSpacing.md,
        transition: `background-color ${transitions.duration.base} ${transitions.easing.standard}`,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-systemy-card] {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="mx-auto px-6 md:px-8 lg:px-10"
        style={{ maxWidth: layout.container.xl }}
      >
        {/* ── Eyebrow ─────────────────────────────────────────────────── */}
        <div
          className="inline-flex items-center px-3.5 py-1.5 rounded-full mb-5"
          style={{
            backgroundColor: isDark
              ? darkColors.primary.mist
              : colors.primary.mist,
          }}
        >
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
            {t.systemy.eyebrow}
          </span>
        </div>

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <h2
          style={{
            fontFamily: typography.fontFamily.sans,
            fontWeight: typography.weight.semibold,
            color: themeColors.primary.ink,
            fontSize: typography.scale["4xl"].fontSize,
            lineHeight: typography.scale["4xl"].lineHeight,
            letterSpacing: typography.tracking.tight,
          }}
          className="max-w-2xl"
        >
          {t.systemy.heading}
        </h2>

        {/* ── Subheading ──────────────────────────────────────────────── */}
        <p
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.scale.lg.fontSize,
            lineHeight: typography.scale.lg.lineHeight,
            color: isDark ? darkColors.neutral[300] : colors.neutral[500],
          }}
          className="mt-5 max-w-2xl"
        >
          {t.systemy.subheading}
        </p>

        {/* ── Two-column layout ────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Building schematic — static, decorative */}
          <div
            className="relative w-full max-w-lg mx-auto lg:mx-0"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 480ms ${transitions.easing.entrance}, transform 480ms ${transitions.easing.standard}`,
            }}
            aria-hidden="true"
          >
            {/* Engineering corner marks */}
            <div
              className="pointer-events-none absolute top-0 left-0 z-10 w-4 h-4 border-t border-l"
              style={{ borderColor: isDark ? darkColors.neutral[700] : colors.neutral[300] }}
            />
            <div
              className="pointer-events-none absolute top-0 right-0 z-10 w-4 h-4 border-t border-r"
              style={{ borderColor: isDark ? darkColors.neutral[700] : colors.neutral[300] }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-10 w-4 h-4 border-b border-l"
              style={{ borderColor: isDark ? darkColors.neutral[700] : colors.neutral[300] }}
            />
            <div
              className="pointer-events-none absolute bottom-0 right-0 z-10 w-4 h-4 border-b border-r"
              style={{ borderColor: isDark ? darkColors.neutral[700] : colors.neutral[300] }}
            />
            {/*
             * TODO (v2 — Systemy interactivity):
             * This is a v1 static placeholder. In a future iteration this should
             * gain full interactivity matching the Hero section:
             *   - Hovering a system card (right column) sets `activeSystem` state
             *   - BuildingSchematic highlights the corresponding engineering layer
             *   - A story-card preview (image + tag + title) appears overlaid on
             *     the schematic, transitioning between systems
             *
             * Implementation guide:
             *   1. Extract useState<SystemId | null>(null) for activeSystem here
             *   2. Pass `activeSystem` to BuildingSchematic (already accepts the prop)
             *   3. Add onMouseEnter/onMouseLeave handlers to each system card
             *   4. Optionally re-use SystemStory from HeroVisual or extract it to
             *      a shared component under src/components/ui/
             *
             * Do not implement until UX / content is finalised for this section.
             */}
            <BuildingSchematic activeSystem={null} />
          </div>

          {/* Right: 6-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => {
              const systemId = item.id as SystemId;
              const accentColor =
                systemId in SYSTEM_COLORS
                  ? SYSTEM_COLORS[systemId]
                  : colors.primary.signal;

              return (
                <div
                  key={item.id}
                  data-systemy-card
                  className="group rounded-lg p-5 border"
                  style={{
                    backgroundColor: isDark
                      ? "rgb(18 27 39 / 0.58)"
                      : "rgb(255 255 255 / 0.70)",
                    borderColor: isDark
                      ? "rgb(37 51 66 / 0.80)"
                      : "rgb(221 227 234 / 0.60)",
                    borderRadius: radius.lg,
                    borderLeftWidth: "3px",
                    borderLeftColor: accentColor,
                    boxShadow: "0 2px 12px rgb(35 135 11 / 0.04)",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity ${transitions.duration.base} ${transitions.easing.entrance}, transform 280ms ${transitions.easing.standard}, box-shadow 280ms ${transitions.easing.standard}`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 28px ${accentColor}22`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 12px rgb(35 135 11 / 0.04)";
                    e.currentTarget.style.transform = isVisible
                      ? "translateY(0)"
                      : "translateY(20px)";
                  }}
                >
                  {/* System label pill */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-block rounded-sm"
                      style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        borderRadius: "2px",
                        backgroundColor: accentColor,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontFamily: typography.fontFamily.mono,
                        color: accentColor,
                        fontSize: "0.7rem",
                        fontWeight: typography.weight.semibold,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontWeight: typography.weight.semibold,
                      color: themeColors.primary.ink,
                      fontSize: typography.scale.base.fontSize,
                      lineHeight: typography.scale.base.lineHeight,
                    }}
                    className="mb-1.5"
                  >
                    {item.subtitle}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.scale.sm.fontSize,
                      lineHeight: typography.scale.sm.lineHeight,
                      color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
