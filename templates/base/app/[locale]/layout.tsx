import type { Metadata } from 'next'
import { Poppins, Cairo } from 'next/font/google'
import '../globals.css'
import AppProviders from '@/providers/AppProviders'
import { isRTL, Locale, SUPPORTED_LOCALES } from '@/lib/i18n/locales'
import { notFound } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700']
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700']
})
export const metadata: Metadata = {
  title: 'Shortcut Nextjs Template',
  description: 'Stop starting projects from scratch, start in the middle and save time!'
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params
  if (!(SUPPORTED_LOCALES as unknown as string[]).includes(locale)) notFound()

  const dir = isRTL(locale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <body className={`${poppins.variable} ${cairo.variable} antialiased`}>
        <AppProviders locale={locale}>{children}</AppProviders>
      </body>
    </html>
  )
}
