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

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      style={{
        backgroundColor: themeColors.background.page,
        paddingTop: layout.sectionSpacing.md,
        paddingBottom: layout.sectionSpacing.lg,
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
            {t.kontakt.eyebrow}
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
          {t.kontakt.heading}
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
          {t.kontakt.subheading}
        </p>

        {/* ── Two-column layout ────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* ── Form (3/5) ──────────────────────────────────────────────── */}
          <div
            data-kontakt-panel
            className="lg:col-span-3 rounded-xl border p-8"
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
            <form action="#" method="post" noValidate>
              <div className="flex flex-col gap-5">
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

          {/* ── Contact details (2/5) ───────────────────────────────────── */}
          <div
            data-kontakt-panel
            className="lg:col-span-2 flex flex-col gap-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 400ms ${transitions.easing.entrance} 100ms, transform 400ms ${transitions.easing.standard} 100ms`,
            }}
          >
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
          </div>
        </div>
      </div>
    </section>
  );
}
