"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useTranslations, useLocale } from "@/contexts/LocaleContext";

import {
  buttons,
  colors,
  darkColors,
  darkShadows,
  layout,
  radius,
  shadows,
  transitions,
  typography,
} from "@/styles/design-tokens";

// ─── Language Switcher ────────────────────────────────────────────────────────

function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const targetLocale = locale === "pl" ? "en" : "pl";

  return (
    <Link
      href={`/${targetLocale}`}
      className={`inline-flex items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3 ${className ?? ""}`}
      style={{
        height: "2.25rem",
        paddingInline: "0.875rem",
        borderColor: isDark ? darkColors.neutral[700] : colors.neutral[200],
        color: isDark ? darkColors.neutral[300] : colors.neutral[600],
        fontSize: typography.scale.sm.fontSize,
        fontWeight: typography.weight.semibold,
        fontFamily: typography.fontFamily.mono,
        letterSpacing: "0.04em",
        transitionDuration: transitions.duration.fast,
        transitionTimingFunction: transitions.easing.standard,
      }}
      aria-label={`Switch to ${targetLocale.toUpperCase()}`}
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const { theme } = useTheme();
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuId = useId();
  const isDark = theme === "dark";
  const themeColors = isDark ? darkColors : colors;
  const themeShadows = isDark ? darkShadows : shadows;
  const navigationColor = isDark ? darkColors.neutral[300] : colors.neutral[600];
  const headerBackground = isDark
    ? "rgb(18 27 39 / 0.88)"
    : "rgb(255 255 255 / 0.82)";
  const headerBorderColor = isDark
    ? darkColors.neutral[800]
    : colors.neutral[200];

  const navigationItems = [
    { label: t.nav.services, href: "#uslugi" },
    { label: t.nav.process, href: "#proces" },
    { label: t.nav.systems, href: "#systemy" },
    { label: t.nav.helpdesk, href: "#helpdesk" },
    { label: t.nav.contact, href: "#kontakt" },
  ];

  // Animate menu open: mount first, then trigger visible state for CSS transition
  const openMenu = () => {
    setIsMenuOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsMenuVisible(true));
    });
  };

  // Animate menu close: hide first (CSS transition), then unmount
  const closeMenu = () => {
    setIsMenuVisible(false);
    setTimeout(() => setIsMenuOpen(false), 320);
  };

  // Keyboard: Escape closes menu
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300"
      style={{
        minHeight: "88px",
        backgroundColor: headerBackground,
        borderColor: headerBorderColor,
        boxShadow: "none",
      }}
    >
      <div
        className="mx-auto grid h-[72px] w-full items-center px-7 md:h-[88px] md:px-12 xl:px-14"
        style={{
          maxWidth: layout.container["2xl"],
          gridTemplateColumns: "auto 1fr auto",
        }}
      >
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-sm outline-none transition-opacity focus-visible:ring-3"
          style={{
            transitionDuration: transitions.duration.fast,
            transitionTimingFunction: transitions.easing.standard,
            ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
          }}
          aria-label="TECH4 strona główna"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
            <div
              id="site-logo"
              className="block select-none"
              style={{
                width: "172px",
                height: "36px",
                backgroundImage: "url('/logo/tech4-logo.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "202.35px 73.41px",
                backgroundPosition: "-18.47px -10.24px",
              }}
            />
            <div
              id="site-tagline"
              style={{
                width: 210,
                height: Math.round(210 * (31 / 686)),
                backgroundImage: "url('/logo/tech4-logo.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: `${210 / 686 * 860}px ${210 / 686 * 312}px`,
                backgroundPosition: `${-110 * (210 / 686)}px ${-246 * (210 / 686)}px`,
                marginTop: 6,
                marginLeft: 14,
              }}
            />
          </div>
        </Link>

        {/* ── Desktop navigation — column 2 (1fr, centered) ───────────── */}
        <nav aria-label="Główna nawigacja" className="hidden items-center justify-center gap-11 xl:gap-12 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-sm outline-none transition-colors focus-visible:ring-3"
              style={{
                color: navigationColor,
                fontSize: typography.scale.sm.fontSize,
                fontWeight: typography.weight.medium,
                lineHeight: typography.scale.sm.lineHeight,
                transitionDuration: transitions.duration.fast,
                transitionTimingFunction: transitions.easing.standard,
                ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
              }}
            >
              <span className="transition-colors group-hover:text-[#0A1220] dark:group-hover:text-neutral-50">
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform group-hover:scale-x-100 motion-reduce:transition-none"
                style={{
                  backgroundColor: themeColors.primary.steel,
                  transitionDuration: transitions.duration.fast,
                  transitionTimingFunction: transitions.easing.standard,
                }}
              />
            </a>
          ))}
        </nav>

        {/* ── Column 3: actions (desktop) + hamburger (mobile) ─────────── */}
        <div className="flex items-center justify-end gap-3">
          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full border outline-none transition-colors hover:bg-[#1B5E0B] focus-visible:ring-3"
              style={{
                minHeight: buttons.size.lg.height,
                // Fixed width locked to the longest translation ("Skontaktuj się").
                // Without this, switching PL→EN shrinks the button and shifts the header.
                minWidth: "11.5rem",
                paddingInline: "1.625rem",
                backgroundColor: colors.primary.signal,
                borderColor: colors.primary.signal,
                color: colors.neutral[0],
                fontSize: buttons.size.lg.fontSize,
                fontWeight: typography.weight.medium,
                lineHeight: typography.scale.base.lineHeight,
                transitionDuration: transitions.duration.fast,
                transitionTimingFunction: transitions.easing.standard,
                ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
              }}
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3 lg:hidden"
            style={{
              borderColor: headerBorderColor,
              color: themeColors.primary.ink,
              transitionDuration: transitions.duration.fast,
              transitionTimingFunction: transitions.easing.standard,
              ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
            }}
            aria-label={t.nav.openMenu}
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <span className="sr-only">{t.nav.openMenu}</span>
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile menu overlay ──────────────────────────────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 motion-reduce:transition-none"
            aria-label={t.nav.closeMenu}
            onClick={closeMenu}
            style={{
              backgroundColor: isMenuVisible
                ? "rgb(10 18 32 / 0.24)"
                : "rgb(10 18 32 / 0)",
              transition: `background-color ${transitions.duration.base} ${transitions.easing.standard}`,
            }}
          />

          {/* Slide-in panel */}
          <nav
            id={menuId}
            aria-label="Menu mobilne"
            className="absolute right-0 top-0 flex h-dvh w-[min(26rem,calc(100vw-2rem))] flex-col border-l p-6 motion-reduce:transition-none"
            style={{
              backgroundColor: themeColors.background.surface,
              borderColor: headerBorderColor,
              transform: isMenuVisible ? "translateX(0)" : "translateX(100%)",
              transition: `transform 300ms ${transitions.easing.entrance}`,
            }}
          >
            {/* Panel header */}
            <div className="flex h-12 items-center justify-between">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                <div
                  className="block select-none"
                  style={{
                    width: "172px",
                    height: "36px",
                    backgroundImage: "url('/logo/tech4-logo.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "202.35px 73.41px",
                    backgroundPosition: "-18.47px -10.24px",
                  }}
                />
                <div
                  style={{
                    width: 210,
                    height: Math.round(210 * (31 / 686)),
                    backgroundImage: "url('/logo/tech4-logo.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${210 / 686 * 860}px ${210 / 686 * 312}px`,
                    backgroundPosition: `${-110 * (210 / 686)}px ${-246 * (210 / 686)}px`,
                    marginTop: 6,
                    marginLeft: 14,
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3"
                  style={{
                    borderColor: headerBorderColor,
                    color: themeColors.primary.ink,
                    transitionDuration: transitions.duration.fast,
                    transitionTimingFunction: transitions.easing.standard,
                    ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
                  }}
                  aria-label={t.nav.closeMenu}
                  onClick={closeMenu}
                >
                  <span aria-hidden="true" className="relative h-5 w-5">
                    <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>
            </div>

            {/* Staggered nav links */}
            <div className="mt-10 flex flex-col gap-1">
              {navigationItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-3 outline-none hover:bg-[#F7F8FA] dark:hover:bg-[#182333] focus-visible:ring-3"
                  style={{
                    color: themeColors.primary.ink,
                    fontSize: typography.scale.lg.fontSize,
                    fontWeight: typography.weight.medium,
                    lineHeight: typography.scale.lg.lineHeight,
                    ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
                    opacity: isMenuVisible ? 1 : 0,
                    transform: isMenuVisible ? "translateX(0)" : "translateX(1.5rem)",
                    transition: `opacity 280ms ${transitions.easing.entrance} ${80 + i * 45}ms, transform 280ms ${transitions.easing.entrance} ${80 + i * 45}ms, background-color ${transitions.duration.fast} ${transitions.easing.standard}`,
                  }}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA button */}
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center justify-center rounded-full border outline-none hover:bg-[#1B5E0B] focus-visible:ring-3"
              style={{
                minHeight: buttons.size.lg.height,
                paddingInline: buttons.size.lg.paddingInline,
                backgroundColor: colors.primary.signal,
                borderColor: colors.primary.signal,
                borderRadius: radius.full,
                color: colors.neutral[0],
                fontSize: buttons.size.lg.fontSize,
                fontWeight: typography.weight.medium,
                lineHeight: typography.scale.base.lineHeight,
                ["--tw-ring-color" as string]: themeShadows.focus.replace("0 0 0 3px ", ""),
                opacity: isMenuVisible ? 1 : 0,
                transform: isMenuVisible ? "translateY(0)" : "translateY(0.75rem)",
                transition: `opacity 280ms ${transitions.easing.entrance} ${80 + navigationItems.length * 45}ms, transform 280ms ${transitions.easing.entrance} ${80 + navigationItems.length * 45}ms, background-color ${transitions.duration.fast} ${transitions.easing.standard}`,
              }}
              onClick={closeMenu}
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
