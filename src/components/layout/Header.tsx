"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

import {
  buttons,
  colors,
  layout,
  radius,
  transitions,
  typography,
} from "@/styles/design-tokens";

const navigationItems = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Proces", href: "#proces" },
  { label: "Systemy", href: "#systemy" },
  { label: "HelpDesk", href: "#helpdesk" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        minHeight: "88px",
        backgroundColor: "rgb(255 255 255 / 0.82)",
        borderColor: colors.neutral[200],
        boxShadow: "none",
      }}
    >
      <div
        className="mx-auto flex h-[72px] w-full items-center justify-between px-7 md:h-[88px] md:px-12 xl:px-14"
        style={{ maxWidth: layout.container["2xl"] }}
      >
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-sm outline-none transition-opacity focus-visible:ring-3"
          style={{
            transitionDuration: transitions.duration.fast,
            transitionTimingFunction: transitions.easing.standard,
            ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
          }}
          aria-label="TECH4 strona główna"
        >
          <span
            className="block select-none"
            style={{
              color: colors.primary.ink,
              fontSize: typography.scale.xl.fontSize,
              fontWeight: typography.weight.semibold,
              letterSpacing: "0.08em",
              lineHeight: "1",
            }}
          >
            TECH4
          </span>
        </Link>

        <nav aria-label="Główna nawigacja" className="hidden items-center gap-11 xl:gap-12 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-sm outline-none transition-colors focus-visible:ring-3"
              style={{
                color: colors.neutral[600],
                fontSize: typography.scale.sm.fontSize,
                fontWeight: typography.weight.medium,
                lineHeight: typography.scale.sm.lineHeight,
                transitionDuration: transitions.duration.fast,
                transitionTimingFunction: transitions.easing.standard,
                ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
              }}
            >
              <span className="transition-colors group-hover:text-[#0A1220]">{item.label}</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform group-hover:scale-x-100 motion-reduce:transition-none"
                style={{
                  backgroundColor: colors.primary.steel,
                  transitionDuration: transitions.duration.fast,
                  transitionTimingFunction: transitions.easing.standard,
                }}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-full border outline-none transition-colors hover:bg-[#1E3A5F] focus-visible:ring-3"
            style={{
              minHeight: buttons.size.lg.height,
              paddingInline: "1.625rem",
              backgroundColor: colors.primary.ink,
              borderColor: colors.primary.ink,
              color: colors.neutral[0],
              fontSize: buttons.size.lg.fontSize,
              fontWeight: typography.weight.medium,
              lineHeight: typography.scale.base.lineHeight,
              transitionDuration: transitions.duration.fast,
              transitionTimingFunction: transitions.easing.standard,
              ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
            }}
          >
            Skontaktuj się
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3 lg:hidden"
          style={{
            borderColor: colors.neutral[200],
            color: colors.primary.ink,
            transitionDuration: transitions.duration.fast,
            transitionTimingFunction: transitions.easing.standard,
            ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
          }}
          aria-label="Otwórz menu"
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="sr-only">Otwórz menu</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
      <div className="fixed inset-0 z-50 lg:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-[#0A1220]/24 transition-opacity motion-reduce:transition-none"
          aria-label="Zamknij menu"
          onClick={closeMenu}
          style={{
            transitionDuration: transitions.duration.base,
            transitionTimingFunction: transitions.easing.standard,
          }}
        />

        <nav
          id={menuId}
          aria-label="Menu mobilne"
          className="absolute right-0 top-0 flex h-dvh w-[min(26rem,calc(100vw-2rem))] flex-col border-l bg-white p-6 transition-transform motion-reduce:transition-none"
          style={{
            borderColor: colors.neutral[200],
            transitionDuration: transitions.duration.base,
            transitionTimingFunction: transitions.easing.entrance,
          }}
        >
          <div className="flex h-12 items-center justify-between">
            <span
              className="block select-none"
              style={{
                color: colors.primary.ink,
                fontSize: typography.scale.xl.fontSize,
                fontWeight: typography.weight.semibold,
                letterSpacing: "0.08em",
                lineHeight: "1",
              }}
            >
              TECH4
            </span>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-3"
              style={{
                borderColor: colors.neutral[200],
                color: colors.primary.ink,
                transitionDuration: transitions.duration.fast,
                transitionTimingFunction: transitions.easing.standard,
                ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
              }}
              aria-label="Zamknij menu"
              onClick={closeMenu}
            >
              <span aria-hidden="true" className="relative h-5 w-5">
                <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-1">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-3 outline-none transition-colors hover:bg-[#F7F8FA] focus-visible:ring-3"
                style={{
                  color: colors.primary.ink,
                  fontSize: typography.scale.lg.fontSize,
                  fontWeight: typography.weight.medium,
                  lineHeight: typography.scale.lg.lineHeight,
                  transitionDuration: transitions.duration.fast,
                  transitionTimingFunction: transitions.easing.standard,
                  ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
                }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#kontakt"
            className="mt-8 inline-flex items-center justify-center rounded-full border outline-none transition-colors hover:bg-[#1E3A5F] focus-visible:ring-3"
            style={{
              minHeight: buttons.size.lg.height,
              paddingInline: buttons.size.lg.paddingInline,
              backgroundColor: colors.primary.ink,
              borderColor: colors.primary.ink,
              borderRadius: radius.full,
              color: colors.neutral[0],
              fontSize: buttons.size.lg.fontSize,
              fontWeight: typography.weight.medium,
              lineHeight: typography.scale.base.lineHeight,
              transitionDuration: transitions.duration.fast,
              transitionTimingFunction: transitions.easing.standard,
              ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
            }}
            onClick={closeMenu}
          >
            Skontaktuj się
          </a>
        </nav>
      </div>
      ) : null}
    </header>
  );
}
