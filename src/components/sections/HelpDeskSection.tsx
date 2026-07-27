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
import ScanButton from "@/components/ui/ScanButton";

// ─── Inline SVG icons ────────────────────────────────────────────────────────

function ClockIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14.5" />
    </svg>
  );
}

function BoltIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function HeadsetIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

const ICONS: Record<string, (color: string) => React.ReactNode> = {
  clock: (c) => <ClockIcon color={c} />,
  bolt: (c) => <BoltIcon color={c} />,
  headset: (c) => <HeadsetIcon color={c} />,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function HelpDeskSection() {
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
      id="helpdesk"
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
          [data-helpdesk-card] {
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
            {t.helpdesk.eyebrow}
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
          {t.helpdesk.heading}
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
          {t.helpdesk.subheading}
        </p>

        {/* ── Feature cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {t.helpdesk.features.map((feature, i) => (
            <div
              key={i}
              data-helpdesk-card
              className="group rounded-lg p-6 border"
              style={{
                backgroundColor: isDark
                  ? "rgb(18 27 39 / 0.58)"
                  : "rgb(255 255 255 / 0.70)",
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
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center mb-5"
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: radius.md,
                  backgroundColor: isDark
                    ? darkColors.primary.mist
                    : colors.primary.mist,
                }}
              >
                {ICONS[feature.icon]?.(themeColors.primary.signal)}
              </div>

              {/* Title */}
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
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.base.fontSize,
                  lineHeight: typography.scale.base.lineHeight,
                  color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Placeholder form area ────────────────────────────────────── */}
        <div
          data-helpdesk-card
          className="mt-8 rounded-xl border p-8 flex flex-col items-center justify-center text-center gap-5"
          style={{
            backgroundColor: isDark
              ? "rgb(18 27 39 / 0.40)"
              : "rgb(255 255 255 / 0.60)",
            borderColor: isDark
              ? "rgb(37 51 66 / 0.80)"
              : "rgb(221 227 234 / 0.60)",
            borderRadius: radius.xl,
            borderStyle: "dashed",
            minHeight: "9rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity ${transitions.duration.base} ${transitions.easing.entrance}, transform 280ms ${transitions.easing.standard}`,
            transitionDelay: "360ms",
          }}
        >
          <p
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.scale.base.fontSize,
              lineHeight: typography.scale.base.lineHeight,
              color: isDark ? darkColors.neutral[400] : colors.neutral[500],
            }}
          >
            {t.helpdesk.formPlaceholder}
          </p>
          <ScanButton
            href={`mailto:${t.helpdesk.formCta.split(" ").at(-1)}`}
            variant="solid"
          >
            {t.helpdesk.formCta}
          </ScanButton>
        </div>
      </div>
    </section>
  );
}
