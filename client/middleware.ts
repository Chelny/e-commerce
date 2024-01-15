import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { cookieName, defaultLocale, supportedLocales } from '@/app/i18n/settings'
// import { isAuthenticated } from '@lib/authentication'

acceptLanguage.languages(supportedLocales)

export function middleware(request: NextRequest) {
  let locale
  if (request.cookies.has(cookieName)) locale = acceptLanguage.get(request.cookies.get(cookieName)?.value)
  if (!locale) locale = acceptLanguage.get(request.headers.get('Accept-Language'))
  if (!locale) locale = defaultLocale

  // Redirect if locale in path is not supported
  if (
    !supportedLocales.some((locale: string) => request.nextUrl.pathname.startsWith(`/${locale}`)) &&
    !request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${locale}${request.nextUrl.pathname}`, request.url))
  }

  if (request.headers.has('referer')) {
    const referer = request.headers.get('referer')
    let localeInReferer

    if (referer) {
      const refererUrl = new URL(referer)
      localeInReferer = supportedLocales.find((locale: string) => refererUrl.pathname.startsWith(`/${locale}`))
    }

    const response = NextResponse.next()
    if (localeInReferer) response.cookies.set(cookieName, localeInReferer)
    return response
  }

  // Call the authentication function to check the request
  // if (!isAuthenticated(request)) {
  //   // Respond with JSON indicating an error message
  //   return NextResponse.json(
  //     { success: false, message: 'Authentication failed' },
  //     { status: 401 }
  //   )
  // }

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
    '/((?!api|_next/static|_next/image|assets|favicon.ico|manifest.webmanifest).*)',
    { source: '/' },
  ],
}