"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useTranslations } from "@/contexts/LocaleContext";
import {
  colors,
  darkColors,
  layout,
  radius,
  transitions,
  typography,
} from "@/styles/design-tokens";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  number: string;
  title: string;
  description: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ProcesSection() {
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
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const steps: Step[] = t.proces.steps;

  return (
    <section
      ref={sectionRef}
      id="proces"
      style={{
        backgroundColor: isDark
          ? darkColors.background.muted
          : colors.background.muted,
        paddingTop: layout.sectionSpacing.md,
        paddingBottom: layout.sectionSpacing.md,
        transition: `background-color ${transitions.duration.base} ${transitions.easing.standard}`,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proces-step] {
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
        {/* ── Eyebrow ────────────────────────────────────────────────────── */}
        <div
          className="inline-flex items-center self-start px-3.5 py-1.5 rounded-full mb-5"
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
            {t.proces.eyebrow}
          </span>
        </div>

        {/* ── Heading ──────────────────────────────────────────────────────── */}
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
          {t.proces.heading}
        </h2>

        {/* ── Subheading ───────────────────────────────────────────────────── */}
        <p
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.scale.lg.fontSize,
            lineHeight: typography.scale.lg.lineHeight,
            color: isDark ? darkColors.neutral[300] : colors.neutral[500],
          }}
          className="mt-5 max-w-2xl"
        >
          {t.proces.subheading}
        </p>

        {/* ── Stepper ──────────────────────────────────────────────────────── */}
        <div className="mt-14 relative">
          {/* Horizontal connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[2.75rem] left-0 right-0"
            style={{
              height: "1px",
              /* start after the first number badge centre (~2.5rem) and end before the last */
              marginLeft: "calc(2.75rem / 2)",
              marginRight: "calc(2.75rem / 2)",
              background: isDark
                ? `linear-gradient(to right, ${darkColors.primary.signal}44, ${darkColors.primary.signal}22)`
                : `linear-gradient(to right, ${colors.primary.signal}33, ${colors.primary.signal}11)`,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                data-proces-step
                className="relative flex flex-col"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity ${transitions.duration.base} ${transitions.easing.entrance}, transform 280ms ${transitions.easing.standard}`,
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                {/* Vertical connector — mobile only */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="lg:hidden absolute left-[1.3125rem] top-[3rem] bottom-[-1.5rem]"
                    style={{
                      width: "1px",
                      backgroundColor: isDark
                        ? `${darkColors.primary.signal}33`
                        : `${colors.primary.signal}22`,
                    }}
                  />
                )}

                {/* Number badge */}
                <div
                  className="inline-flex items-center justify-center mb-5 shrink-0 z-10"
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: radius.full,
                    backgroundColor: isDark
                      ? darkColors.primary.mist
                      : colors.primary.mist,
                    border: `1.5px solid ${isDark ? darkColors.primary.signal + "66" : colors.primary.signal + "44"}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: typography.fontFamily.mono,
                      color: themeColors.primary.signal,
                      fontSize: typography.scale.sm.fontSize,
                      fontWeight: typography.weight.semibold,
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Card body */}
                <div
                  className="flex-1 rounded-lg p-5 border"
                  style={{
                    backgroundColor: isDark
                      ? "rgb(18 27 39 / 0.58)"
                      : "rgb(255 255 255 / 0.70)",
                    borderColor: isDark
                      ? "rgb(37 51 66 / 0.80)"
                      : "rgb(221 227 234 / 0.60)",
                    borderRadius: radius.lg,
                    boxShadow: "0 2px 12px rgb(35 135 11 / 0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontWeight: typography.weight.semibold,
                      color: themeColors.primary.ink,
                      fontSize: typography.scale.lg.fontSize,
                      lineHeight: typography.scale.lg.lineHeight,
                    }}
                    className="mb-2"
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.sans,
                      fontSize: typography.scale.base.fontSize,
                      lineHeight: typography.scale.base.lineHeight,
                      color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
