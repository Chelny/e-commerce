import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import acceptLanguage from "accept-language"
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PROTECTED_ROUTES, ROUTE_LOGIN } from "@/app/[locale]/_core"
import authConfig from "@/app/[locale]/_lib/authentication.config"
import { cookieName, defaultLocale, supportedLocales } from "@/app/i18n/settings"

acceptLanguage.languages(supportedLocales)

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  let locale
  if (request.cookies.has(cookieName)) locale = acceptLanguage.get(request.cookies.get(cookieName)?.value)
  if (!locale) locale = acceptLanguage.get(request.headers.get("Accept-Language"))
  if (!locale) locale = defaultLocale

  if (request.nextUrl.pathname.startsWith(API_AUTH_PREFIX)) {
    return NextResponse.next()
  }

  // Redirect if locale in path is not supported
  if (
    !supportedLocales.some((locale: TLocale) => request.nextUrl.pathname.startsWith(`/${locale}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))
  }

  if (request.headers.has("referer")) {
    const referer = request.headers.get("referer")
    let localeInReferer

    if (referer) {
      const refererUrl = new URL(referer)
      localeInReferer = supportedLocales.find((locale: TLocale) => refererUrl.pathname.startsWith(`/${locale}`))
    }

    const response = checkAuthentication(request)
    if (localeInReferer) response.cookies.set(cookieName, localeInReferer)
    return response
  }

  return checkAuthentication(request)
})

const checkAuthentication = (request: any) => {
  const { nextUrl } = request

  const isLoggedIn = !!request.auth
  const isAuthRoute = AUTH_ROUTES.some((path: string) => nextUrl.pathname.includes(path))
  const isProtectedRoute = PROTECTED_ROUTES.some((path: string) => nextUrl.pathname.includes(path))

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTE_LOGIN.PATH, nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets
     * - favicon.ico (favicon file)
     * - manifest.webmanifest (manifest file)
     */
    // "/((?!api|_next/static|_next/image|assets|favicon.ico|manifest.webmanifest).*)",
    "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)",
    { source: "/" },
  ],
}