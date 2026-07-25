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

export function WhatWeDo() {
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

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      style={{
        backgroundColor: themeColors.background.page,
        paddingTop: layout.sectionSpacing.md,
        paddingBottom: layout.sectionSpacing.md,
        transition: `background-color ${transitions.duration.base} ${transitions.easing.standard}`,
      }}
    >
      {/*
        Reduced-motion override: entrance animation is entirely disabled
        when the user prefers reduced motion. Cards render in their final
        visible state with no opacity/transform transitions.
      */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-what-we-do-card] {
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
            {t.whatWeDo.eyebrow}
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
          className="max-w-3xl"
        >
          {t.whatWeDo.heading1}{" "}
          <span style={{ color: themeColors.primary.signal }}>
            {t.whatWeDo.headingAccent}
          </span>{" "}
          {t.whatWeDo.heading2}
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
          {t.whatWeDo.subheading}
        </p>

        {/* ── Cards grid ──────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          style={{ maxWidth: layout.container.lg }}
        >
          {t.whatWeDo.cards.map((card, i) => (
            <div
              key={i}
              data-what-we-do-card
              className="group rounded-lg p-6 border"
              style={{
                backgroundColor: isDark
                  ? "rgb(18 27 39 / 0.58)"
                  : "rgb(255 255 255 / 0.40)",
                borderColor: isDark
                  ? "rgb(37 51 66 / 0.80)"
                  : "rgb(221 227 234 / 0.60)",
                borderRadius: radius.lg,
                boxShadow: "0 2px 12px rgb(35 135 11 / 0.05)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity ${transitions.duration.base} ${transitions.easing.entrance}, transform 280ms ${transitions.easing.standard}, box-shadow 280ms ${transitions.easing.standard}`,
                transitionDelay: `${i * 100}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 8px 28px rgb(35 135 11 / 0.14)"
                  : "0 8px 28px rgb(35 135 11 / 0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = isVisible
                  ? "translateY(0)"
                  : "translateY(24px)";
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgb(35 135 11 / 0.05)";
              }}
            >
              {/* Number badge */}
              <div
                className="inline-flex items-center justify-center mb-4"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: radius.md,
                  backgroundColor: isDark
                    ? darkColors.primary.mist
                    : colors.primary.mist,
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
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Card title */}
              <h3
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontWeight: typography.weight.semibold,
                  color: themeColors.primary.ink,
                  fontSize: typography.scale.xl.fontSize,
                  lineHeight: typography.scale.xl.lineHeight,
                }}
                className="mb-2"
              >
                {card.title}
              </h3>

              {/* Card description */}
              <p
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.base.fontSize,
                  lineHeight: typography.scale.base.lineHeight,
                  color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}