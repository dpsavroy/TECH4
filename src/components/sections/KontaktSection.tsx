"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useTranslations } from "@/contexts/LocaleContext";
import {
  buttons,
  colors,
  darkColors,
  layout,
  radius,
  shadows,
  darkShadows,
  transitions,
  typography,
} from "@/styles/design-tokens";

// ─── Inline SVG icons ────────────────────────────────────────────────────────

function MapPinIcon({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
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

function PhoneIcon({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
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

function MailIcon({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
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

// ─── Component ───────────────────────────────────────────────────────────────

export function KontaktSection() {
  const { theme } = useTheme();
  const t = useTranslations();
  const isDark = theme === "dark";
  const themeColors = isDark ? darkColors : colors;
  const themeShadows = isDark ? darkShadows : shadows;

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

  const inputBase = {
    width: "100%",
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.scale.base.fontSize,
    lineHeight: typography.scale.base.lineHeight,
    color: themeColors.primary.ink,
    backgroundColor: isDark
      ? darkColors.background.elevated
      : colors.background.surface,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark
      ? "rgb(55 72 90 / 0.80)"
      : "rgb(221 227 234 / 0.80)",
    borderRadius: radius.md,
    padding: "0.625rem 0.875rem",
    outline: "none",
    transition: `border-color ${transitions.duration.fast} ${transitions.easing.standard}, box-shadow ${transitions.duration.fast} ${transitions.easing.standard}`,
  } as const;

  const contactRows = [
    {
      icon: <MapPinIcon color={themeColors.primary.signal} />,
      label: t.kontakt.details.addressLabel,
      value: t.kontakt.details.addressValue,
      href: undefined,
    },
    {
      icon: <PhoneIcon color={themeColors.primary.signal} />,
      label: t.kontakt.details.phoneLabel,
      value: t.kontakt.details.phoneValue,
      href: `tel:${t.kontakt.details.phoneValue.replace(/\s/g, "")}`,
    },
    {
      icon: <MailIcon color={themeColors.primary.signal} />,
      label: t.kontakt.details.emailLabel,
      value: t.kontakt.details.emailValue,
      href: `mailto:${t.kontakt.details.emailValue}`,
    },
  ];

  const departmentCards = t.kontakt.departments.items;

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      style={{
        backgroundColor: themeColors.background.page,
        paddingTop: layout.sectionSpacing.lg,
        paddingBottom: layout.sectionSpacing.xl,
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
        [data-kontakt-input]:focus {
          border-color: ${colors.primary.signal} !important;
          box-shadow: ${themeShadows.focus} !important;
        }
      `}</style>

      <div
        className="mx-auto px-6 md:px-8 lg:px-10"
        style={{ maxWidth: layout.container.xl }}
      >
        {/* ── Two-column layout ────────────────────────────────────────── */}
        <div className="mt-0 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* ── Left column (3/5): heading + form ───────────────────────── */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Eyebrow */}
            <div
              className="self-start inline-flex items-center px-3.5 py-1.5 rounded-full mb-5"
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
                {t.kontakt.eyebrow}
              </span>
            </div>

            {/* Heading */}
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

            {/* Subheading */}
            <p
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.scale.lg.fontSize,
                lineHeight: typography.scale.lg.lineHeight,
                color: isDark ? darkColors.neutral[300] : colors.neutral[500],
              }}
              className="mt-5"
            >
              {t.kontakt.subheading}
            </p>

            {/* Form card */}
            <div
              data-kontakt-panel
              className="mt-10 rounded-xl border p-8 flex flex-col"
            style={{
              backgroundColor: isDark
                ? "rgb(18 27 39 / 0.60)"
                : "rgb(255 255 255 / 0.80)",
              borderColor: isDark
                ? "rgb(37 51 66 / 0.80)"
                : "rgb(221 227 234 / 0.60)",
              borderRadius: radius.xl,
              boxShadow: themeShadows.md,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 400ms ${transitions.easing.entrance}, transform 400ms ${transitions.easing.standard}`,
            }}
          >
            <form action="#" method="post" noValidate className="flex-1 flex flex-col">
              <div className="flex flex-col gap-5 flex-1">
                {/* Name */}
                <div>
                  <label
                    htmlFor="kontakt-name"
                    className="sr-only"
                    style={{ fontFamily: typography.fontFamily.sans }}
                  >
                    {t.kontakt.form.namePlaceholder}
                  </label>
                  <input
                    id="kontakt-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={t.kontakt.form.namePlaceholder}
                    data-kontakt-input
                    style={inputBase}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="kontakt-email"
                    className="sr-only"
                    style={{ fontFamily: typography.fontFamily.sans }}
                  >
                    {t.kontakt.form.emailPlaceholder}
                  </label>
                  <input
                    id="kontakt-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t.kontakt.form.emailPlaceholder}
                    data-kontakt-input
                    style={inputBase}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="kontakt-message"
                    className="sr-only"
                    style={{ fontFamily: typography.fontFamily.sans }}
                  >
                    {t.kontakt.form.messagePlaceholder}
                  </label>
                  <textarea
                    id="kontakt-message"
                    name="message"
                    rows={5}
                    placeholder={t.kontakt.form.messagePlaceholder}
                    data-kontakt-input
                    style={{
                      ...inputBase,
                      resize: "vertical",
                      minHeight: "8rem",
                      flex: 1,
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border"
                  style={{
                    minHeight: buttons.size.lg.height,
                    paddingInline: buttons.size.lg.paddingInline,
                    backgroundColor: colors.primary.signal,
                    borderColor: colors.primary.signal,
                    color: colors.neutral[0],
                    fontSize: buttons.size.lg.fontSize,
                    fontWeight: typography.weight.medium,
                    fontFamily: typography.fontFamily.sans,
                    lineHeight: typography.scale.base.lineHeight,
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    transition: `background-color ${transitions.duration.fast} ${transitions.easing.standard}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.primary.signalHover;
                    e.currentTarget.style.borderColor =
                      colors.primary.signalHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.primary.signal;
                    e.currentTarget.style.borderColor = colors.primary.signal;
                  }}
                >
                  {t.kontakt.form.submit}
                </button>
              </div>
            </form>
          </div>
          </div>

          {/* ── Right column (2/5): contacts + departments + map ── */}
          <div
            data-kontakt-panel
            className="lg:col-span-2 flex flex-col gap-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 400ms ${transitions.easing.entrance} 100ms, transform 400ms ${transitions.easing.standard} 100ms`,
            }}
          >
            {/* ── Company name ──────────────────────────────────────────── */}
            <div>
              <span
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.lg.fontSize,
                  lineHeight: typography.scale.lg.lineHeight,
                  color: themeColors.primary.ink,
                  fontWeight: typography.weight.semibold,
                }}
              >
                {t.kontakt.details.companyName}
              </span>
            </div>

            {/* ── Contact rows (address, phone, email) ──────────────────── */}
            {contactRows.map((row, i) => (
              <div key={i} className="flex items-start gap-4">
                {/* Icon badge */}
                <div
                  className="inline-flex items-center justify-center shrink-0"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: radius.md,
                    backgroundColor: isDark
                      ? darkColors.primary.mist
                      : colors.primary.mist,
                  }}
                >
                  {row.icon}
                </div>

                <div>
                  <span
                    className="block"
                    style={{
                      fontFamily: typography.fontFamily.mono,
                      fontSize: "0.7rem",
                      fontWeight: typography.weight.semibold,
                      letterSpacing: "0.06em",
                      color: isDark ? darkColors.neutral[500] : colors.neutral[400],
                      textTransform: "uppercase",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {row.label}
                  </span>

                  {row.href ? (
                    <a
                      href={row.href}
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.scale.base.fontSize,
                        lineHeight: typography.scale.base.lineHeight,
                        color: themeColors.primary.ink,
                        fontWeight: typography.weight.medium,
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
                      {row.value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.scale.base.fontSize,
                        lineHeight: typography.scale.base.lineHeight,
                        color: themeColors.primary.ink,
                        fontWeight: typography.weight.medium,
                      }}
                    >
                      {row.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* ── Department quick contacts ────────────────────────────── */}
            <div className="mt-1">
              <h3
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.sm.fontSize,
                  lineHeight: typography.scale.sm.lineHeight,
                  color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                  fontWeight: typography.weight.semibold,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                {t.kontakt.departments.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {departmentCards.map((dept, i) => (
                  <div
                    key={i}
                    className="rounded-lg border px-3 py-2"
                    style={{
                      backgroundColor: isDark
                        ? "rgb(18 27 39 / 0.60)"
                        : "rgb(255 255 255 / 0.80)",
                      borderColor: isDark
                        ? "rgb(37 51 66 / 0.80)"
                        : "rgb(221 227 234 / 0.60)",
                      borderRadius: radius.lg,
                    }}
                  >
                    <span
                      className="block"
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.scale.sm.fontSize,
                        lineHeight: typography.scale.sm.lineHeight,
                        color: themeColors.primary.ink,
                        fontWeight: typography.weight.semibold,
                        marginBottom: "0.125rem",
                      }}
                    >
                      {dept.label}
                    </span>
                    <a
                      href={`mailto:${dept.email}`}
                      style={{
                        fontFamily: typography.fontFamily.sans,
                        fontSize: typography.scale.xs.fontSize,
                        lineHeight: typography.scale.xs.lineHeight,
                        color: themeColors.primary.signal,
                        textDecoration: "none",
                        display: "block",
                        marginBottom: "0.125rem",
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
                        lineHeight: typography.scale.xs.lineHeight,
                        color: isDark ? darkColors.neutral[300] : colors.neutral[600],
                        textDecoration: "none",
                        display: "block",
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
                ))}
              </div>
            </div>

            {/* ── Google Maps embed ────────────────────────────────────── */}
            <div className="mt-1">
              <h3
                style={{
                  fontFamily: typography.fontFamily.sans,
                  fontSize: typography.scale.sm.fontSize,
                  lineHeight: typography.scale.sm.lineHeight,
                  color: isDark ? darkColors.neutral[400] : colors.neutral[500],
                  fontWeight: typography.weight.semibold,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                {t.kontakt.map.title}
              </h3>

              <div
                className="overflow-hidden rounded-lg border"
                style={{
                  borderColor: isDark
                    ? "rgb(37 51 66 / 0.80)"
                    : "rgb(221 227 234 / 0.60)",
                  borderRadius: radius.lg,
                }}
              >
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="170"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t.kontakt.map.title}
                />
              </div>

              <div className="mt-2">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.scale.xs.fontSize,
                    lineHeight: typography.scale.xs.lineHeight,
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
        </div>

        {/* ── Full-width legal / trust footer row ──────────────────────── */}
        <div
          className="mt-10 pt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
          style={{
            borderTopWidth: "1px",
            borderTopStyle: "solid",
            borderTopColor: isDark
              ? "rgb(37 51 66 / 0.50)"
              : "rgb(221 227 234 / 0.70)",
          }}
        >
          {/* Legal numbers */}
          <div
            className="flex flex-wrap gap-x-5 gap-y-1"
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.scale.sm.fontSize,
              lineHeight: typography.scale.sm.lineHeight,
              color: isDark ? darkColors.neutral[500] : colors.neutral[400],
            }}
          >
            <span>{t.kontakt.legal.nip}: {NIP}</span>
            <span>{t.kontakt.legal.krs}: {KRS}</span>
            <span>{t.kontakt.legal.regon}: {REGON}</span>
          </div>

          {/* Separator dot — hidden on mobile */}
          <span
            aria-hidden="true"
            className="hidden sm:inline"
            style={{
              color: isDark ? darkColors.neutral[600] : colors.neutral[300],
              fontSize: "0.6rem",
            }}
          >
            ·
          </span>

          {/* Trust badge — Rzetelna Firma */}
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.scale.sm.fontSize,
              lineHeight: typography.scale.sm.lineHeight,
              color: isDark ? darkColors.neutral[500] : colors.neutral[400],
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
              {" · "}
              {t.kontakt.trustBadge.checkText}{" "}
              <a
                href={RZETELNA_FIRMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: themeColors.primary.signal,
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