import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, locales } from "@/i18n/routing";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always"
});

const protectedMatchers = [
  "/cart",
  "/orders",
  "/profile",
  "/seller",
  "/admin"
];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const [, locale = defaultLocale, ...segments] = pathname.split("/");
  const normalizedPath = `/${segments.join("/")}`.replace(/\/+$/, "") || "/";

  const isProtected = protectedMatchers.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ??
    request.cookies.get("__Secure-authjs.session-token")?.value ??
    request.cookies.get("next-auth.session-token")?.value ??
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  if (isProtected && !sessionToken) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
