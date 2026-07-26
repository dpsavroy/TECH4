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

// ─── Inline SVG icons ────────────────────────────────────────────────────────

function PhoneIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MapPinIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ShieldIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function ExternalLinkIcon({ color }: { color: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAP_LAT = "52.28335881425612";
const MAP_LNG = "20.82599052997835";
const GOOGLE_MAPS_EMBED_URL =
  `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`;
const GOOGLE_MAPS_URL =
  `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}`;

const NIP = "5242750233";
const KRS = "0000414891";
const REGON = "146057573";
const RZETELNA_FIRMA_URL = "https://www.rzetelnafirma.pl/3XWO5AAW";

// ─── Shared mono typography ───────────────────────────────────────────────────

const monoLabel = {
  fontFamily: typography.fontFamily.mono,
  fontSize: "0.6875rem",
  fontWeight: typography.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function KontaktSection() {
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
      { threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const phone = t.kontakt.details.phoneValue;
  const email = t.kontakt.details.emailValue;
  const departmentCards = t.kontakt.departments.items;

  const cardBorder = isDark ? "rgb(37 51 66 / 0.80)" : "rgb(221 227 234 / 0.70)";
  const cardBg = isDark ? "rgb(18 27 39 / 0.60)" : colors.background.surface;

  const iconBadgeStyle = {
    width: "2.25rem",
    height: "2.25rem",
    borderRadius: radius.md,
    backgroundColor: isDark ? darkColors.primary.mist : colors.primary.mist,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as const;

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      style={{
        backgroundColor: themeColors.background.page,
        paddingTop: "7rem",
        paddingBottom: "8rem",
        transition: `background-color ${transitions.duration.base} ${transitions.easing.standard}`,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-kontakt-panel] {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="mx-auto px-6 md:px-8 lg:px-12"
        style={{ maxWidth: layout.container.xl }}
      >
        {/* ── 2-Column Symmetrical Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* ══ LEFT COLUMN: Contacts & Quick Directory ════════════════════ */}
          <div
            data-kontakt-panel
            className="flex flex-col justify-between gap-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 420ms ${transitions.easing.entrance}, transform 420ms ${transitions.easing.standard}`,
            }}
          >
            {/* 1. Header & Subheading */}
            <div>
              <div
                className="inline-flex items-center px-3.5 py-1.5 rounded-full mb-4"
                style={{
                  backgroundColor: isDark ? darkColors.primary.mist : colors.primary.mist,
                  width: "fit-content",
                }}
              >
                <span style={{ ...monoLabel, color: themeColors.primary.signal }}>
                  {t.kontakt.eyebrow}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontWeight: typography.weight.semibold,
                  color: themeColors.primary.ink,
                  fontSize: typography.scale["4xl"].fontSize,
                  lineHeight: typography.scale["4xl"].lineHeight,
                  letterSpacing: typography.tracking.tight,
                }}
              >
                {t.kontakt.heading}
              </h2>

              <p
                className="mt-3"
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.lg.fontSize,
                  lineHeight: typography.scale.lg.lineHeight,
                  color: isDark ? darkColors.neutral[300] : colors.neutral[500],
                }}
              >
                {t.kontakt.subheading}
              </p>
            </div>

            {/* 2. Main Office Card (Główne biuro) */}
            <div
              className="rounded-2xl border p-6 flex flex-col gap-5 shadow-sm"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderRadius: radius.xl,
              }}
            >
              <h3
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.sm.fontSize,
                  lineHeight: typography.scale.sm.lineHeight,
                  color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                  fontWeight: typography.weight.semibold,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {t.kontakt.details.officeTitle} &mdash; {t.kontakt.details.companyName}
              </h3>

              <div className="flex flex-col gap-4">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div style={iconBadgeStyle}>
                    <MapPinIcon color={themeColors.primary.signal} />
                  </div>
                  <div>
                    <span
                      className="block"
                      style={{
                        ...monoLabel,
                        color: isDark ? darkColors.neutral[500] : colors.neutral[400],
                        marginBottom: "0.2rem",
                      }}
                    >
                      {t.kontakt.details.addressLabel}
                    </span>
                    <span
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.scale.base.fontSize,
                        color: themeColors.primary.ink,
                        fontWeight: typography.weight.medium,
                      }}
                    >
                      {t.kontakt.details.addressValue}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div style={iconBadgeStyle}>
                    <PhoneIcon color={themeColors.primary.signal} size={18} />
                  </div>
                  <div>
                    <span
                      className="block"
                      style={{
                        ...monoLabel,
                        color: isDark ? darkColors.neutral[500] : colors.neutral[400],
                        marginBottom: "0.2rem",
                      }}
                    >
                      {t.kontakt.details.phoneLabel}
                    </span>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.scale.base.fontSize,
                        color: themeColors.primary.ink,
                        fontWeight: typography.weight.semibold,
                        textDecoration: "none",
                        transition: `color ${transitions.duration.fast} ${transitions.easing.standard}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          themeColors.primary.signal;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          themeColors.primary.ink;
                      }}
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div style={iconBadgeStyle}>
                    <MailIcon color={themeColors.primary.signal} size={18} />
                  </div>
                  <div>
                    <span
                      className="block"
                      style={{
                        ...monoLabel,
                        color: isDark ? darkColors.neutral[500] : colors.neutral[400],
                        marginBottom: "0.2rem",
                      }}
                    >
                      {t.kontakt.details.emailLabel}
                    </span>
                    <a
                      href={`mailto:${email}`}
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.scale.base.fontSize,
                        color: themeColors.primary.ink,
                        fontWeight: typography.weight.semibold,
                        textDecoration: "none",
                        transition: `color ${transitions.duration.fast} ${transitions.easing.standard}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          themeColors.primary.signal;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          themeColors.primary.ink;
                      }}
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Quick Contacts (2x2 grid) */}
            <div>
              <h3
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.sm.fontSize,
                  color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                  fontWeight: typography.weight.semibold,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {t.kontakt.departments.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {departmentCards.map((dept, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-4 flex flex-col justify-between"
                    style={{
                      backgroundColor: cardBg,
                      borderColor: cardBorder,
                      borderRadius: radius.lg,
                    }}
                  >
                    <div>
                      <span
                        className="block font-semibold"
                        style={{
                          fontFamily: typography.fontFamily.sans,
                          fontSize: typography.scale.sm.fontSize,
                          color: themeColors.primary.ink,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {dept.label}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-col gap-1">
                      <a
                        href={`mailto:${dept.email}`}
                        style={{
                          fontFamily: typography.fontFamily.sans,
                          fontSize: typography.scale.xs.fontSize,
                          color: themeColors.primary.signal,
                          fontWeight: typography.weight.medium,
                          textDecoration: "none",
                          transition: `color ${transitions.duration.fast} ${transitions.easing.standard}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            themeColors.primary.signalHover;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            themeColors.primary.signal;
                        }}
                      >
                        {dept.email}
                      </a>
                      <a
                        href={`tel:${dept.phone.replace(/\s/g, "")}`}
                        style={{
                          fontFamily: typography.fontFamily.sans,
                          fontSize: typography.scale.xs.fontSize,
                          color: isDark ? darkColors.neutral[300] : colors.neutral[600],
                          textDecoration: "none",
                          transition: `color ${transitions.duration.fast} ${transitions.easing.standard}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            themeColors.primary.signal;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            isDark ? darkColors.neutral[300] : colors.neutral[600];
                        }}
                      >
                        {dept.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN: Interactive Map (Symmetrical Block) ══════════ */}
          <div
            data-kontakt-panel
            className="flex flex-col h-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 420ms ${transitions.easing.entrance} 120ms, transform 420ms ${transitions.easing.standard} 120ms`,
            }}
          >
            {/* Block Title */}
            <h3
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.scale.sm.fontSize,
                color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                fontWeight: typography.weight.semibold,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {t.kontakt.map.title}
            </h3>

            {/* Rounded Map Container - fills remaining height down to left column bottom */}
            <div
              className="flex-1 w-full min-h-[420px] relative overflow-hidden rounded-2xl border shadow-sm"
              style={{
                borderColor: cardBorder,
                borderRadius: radius.xl,
              }}
            >
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, display: "block" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.kontakt.map.title}
              />
            </div>

            {/* External Google Maps link */}
            <div className="mt-3 flex justify-end">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium"
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.sm.fontSize,
                  color: themeColors.primary.signal,
                  textDecoration: "none",
                  transition: `color ${transitions.duration.fast} ${transitions.easing.standard}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    themeColors.primary.signalHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    themeColors.primary.signal;
                }}
              >
                <ExternalLinkIcon color="currentColor" />
                {t.kontakt.map.openInGoogleMaps}
              </a>
            </div>
          </div>

        </div>

        {/* ── LEGAL & TRUST FOOTER BAR ─────────────────────────────────── */}
        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-6 border-t"
          style={{
            borderColor: isDark
              ? "rgb(37 51 66 / 0.60)"
              : "rgb(221 227 234 / 0.80)",
          }}
        >
          {/* Legal details (NIP / KRS / REGON) */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.scale.sm.fontSize,
              lineHeight: "1.5",
              color: isDark ? darkColors.neutral[300] : colors.neutral[600],
            }}
          >
            <span>{t.kontakt.legal.nip}: {NIP}</span>
            <span aria-hidden="true" className="hidden sm:inline text-neutral-400">&bull;</span>
            <span>{t.kontakt.legal.krs}: {KRS}</span>
            <span aria-hidden="true" className="hidden sm:inline text-neutral-400">&bull;</span>
            <span>{t.kontakt.legal.regon}: {REGON}</span>
          </div>

          {/* Trust badge (Rzetelna Firma) */}
          <div
            className="flex items-center gap-2.5"
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.scale.sm.fontSize,
              lineHeight: "1.5",
              color: isDark ? darkColors.neutral[300] : colors.neutral[600],
            }}
          >
            <ShieldIcon
              color={isDark ? darkColors.primary.steel : colors.primary.signal}
            />
            <span>
              {t.kontakt.trustBadge.programText}{" "}
              <span
                style={{
                  fontWeight: typography.weight.semibold,
                  color: isDark
                    ? darkColors.primary.steel
                    : colors.primary.signal,
                }}
              >
                {t.kontakt.trustBadge.badgeName}
              </span>
              {t.kontakt.trustBadge.badgeNameSuffix}
              {" \u2014 "}
              {t.kontakt.trustBadge.checkText}{" "}
              <a
                href={RZETELNA_FIRMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: themeColors.primary.signal,
                  fontWeight: typography.weight.medium,
                  textDecoration: "underline",
                  textDecorationColor: "transparent",
                  transition: `text-decoration-color ${transitions.duration.fast} ${transitions.easing.standard}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textDecorationColor =
                    themeColors.primary.signal;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textDecorationColor =
                    "transparent";
                }}
              >
                rzetelnafirma.pl
              </a>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
