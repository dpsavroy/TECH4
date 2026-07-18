import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TECH4 | Budynki stają się inteligentne",
  description: "TECH4 integruje systemy techniczne budynków w jedno niezawodne i łatwe w zarządzaniu rozwiązanie. Projektujemy, integrujemy i serwisujemy inteligentne systemy automatyki budynkowej, bezpieczeństwa i HVAC w całej Europie.",
  other: {
    "theme-color": "#23870b",
  },
};

const themeInitializationScript = `
  try {
    const savedTheme = localStorage.getItem("tech4-theme");
    const theme = savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {
    // Strona pozostaje w domyślnym jasnym motywie, gdy localStorage jest niedostępny.
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
