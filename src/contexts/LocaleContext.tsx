"use client";

import { createContext, useContext } from "react";
import pl from "@/locales/pl.json";
import en from "@/locales/en.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Locale = "pl" | "en";
export type Translations = typeof pl;

// ─── Translation map ──────────────────────────────────────────────────────────

const translations: Record<Locale, Translations> = { pl, en };

// ─── Context ──────────────────────────────────────────────────────────────────

const LocaleContext = createContext<Locale>("pl");

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Returns the current locale string ("pl" | "en"). */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Returns the full translation object for the current locale. */
export function useTranslations(): Translations {
  const locale = useLocale();
  return translations[locale];
}
