// proxy.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

// Supported locales
const SUPPORTED_LOCALES = ["nl", "en", "ar"];
const DEFAULT_LOCALE = "nl"; // Set Dutch as the default

export function proxy(request: NextRequest, _event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // Extract first segment: /nl/home → "nl"
  const locale = pathname.split("/")[1];

  // If locale is missing OR invalid → redirect to default locale
  if (!SUPPORTED_LOCALES.includes(locale)) {
    const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Add locale header for server-side usage
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

// Middleware matcher
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
