import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/contexts/LocaleContext";
import type { Locale } from "@/contexts/LocaleContext";
import pl from "@/locales/pl.json";
import en from "@/locales/en.json";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  pl: pl.meta,
  en: en.meta,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = locale === "en" ? "en" : "pl";
  const meta = metaByLocale[validLocale];
  return {
    title: meta.title,
    description: meta.description,
    other: {
      "theme-color": "#F7F8FA",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }];
}

// ─── Theme script (no-FOUC) ───────────────────────────────────────────────────

const themeInitializationScript = `
  try {
    var saved = localStorage.getItem("tech4-theme");
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var resolved;
    if (saved === "light" || saved === "dark") {
      resolved = saved;
    } else {
      resolved = systemDark ? "dark" : "light";
    }
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.style.colorScheme = resolved;
  } catch {
    // Falls back to light theme when localStorage is unavailable.
  }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = locale === "en" ? "en" : "pl";

  return (
    <html
      lang={validLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <LocaleProvider locale={validLocale}>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
