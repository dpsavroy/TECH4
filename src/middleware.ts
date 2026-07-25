import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["pl", "en"] as const;
const DEFAULT_LOCALE = "pl";

/**
 * Middleware for locale-based routing.
 *
 * Rules:
 * - /          → redirect to /pl  (default locale)
 * - /pl/...    → serve Polish
 * - /en/...    → serve English
 * - other      → redirect to /pl/...
 *
 * Static assets (_next, api, files with extensions) are skipped.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.[a-zA-Z0-9]+$/) // files with extensions (.png, .svg, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale prefix
  const hasLocale = LOCALES.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale) {
    // Redirect to default locale, preserving the rest of the path
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except static files and Next.js internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
