import "./globals.css";

/**
 * Root layout — minimal passthrough.
 *
 * The full html/body/lang structure is provided by app/[locale]/layout.tsx
 * so that the `lang` attribute is set correctly per locale.
 * This is the standard pattern for Next.js App Router i18n.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // [locale]/layout.tsx renders the actual <html> and <body> tags.
  return children as React.ReactElement;
}
