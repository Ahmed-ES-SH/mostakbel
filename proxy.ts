// proxy.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

// ✅ export function proxy (named)
export function proxy(request: NextRequest, _event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // Extract locale from the first segment (e.g. /ar/home → "ar")
  const locale = pathname.split("/")[1];

  // If locale is invalid or missing, redirect to default
  if (!["en", "ar"].includes(locale)) {
    const newUrl = new URL(`/en${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Add locale header for server components
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

// ✅ required config
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
