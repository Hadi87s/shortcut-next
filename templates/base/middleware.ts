import { NextResponse } from 'next/server'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './lib/i18n/locales'
import Negotiator from 'negotiator'

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
}

export function middleware(req: Request) {
  const url = new URL(req.url)
  const { pathname } = url

  // If already prefixed with a supported locale, continue.
  const hasLocale = SUPPORTED_LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return NextResponse.next()

  // Negotiate from Accept-Language for the first visit.
  const lang =
    new Negotiator({
      headers: { 'accept-language': req.headers.get('accept-language') ?? '' }
    }).language(SUPPORTED_LOCALES as unknown as string[]) || DEFAULT_LOCALE

  return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url))
}
