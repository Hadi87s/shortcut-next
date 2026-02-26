import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import AppProviders from '@/providers/AppProviders'

const montserratArabic = localFont({
  src: [
    { path: '../public/fonts/Montserrat-Arabic-Thin.ttf', weight: '100' },
    { path: '../public/fonts/Montserrat-Arabic-ExtraLight.ttf', weight: '200' },
    { path: '../public/fonts/Montserrat-Arabic-Light.ttf', weight: '300' },
    { path: '../public/fonts/Montserrat-Arabic-Regular.ttf', weight: '400' },
    { path: '../public/fonts/Montserrat-Arabic-Medium.ttf', weight: '500' },
    { path: '../public/fonts/Montserrat-Arabic-SemiBold.ttf', weight: '600' },
    { path: '../public/fonts/Montserrat-Arabic-Bold.ttf', weight: '700' },
    { path: '../public/fonts/Montserrat-Arabic-ExtraBold.ttf', weight: '800' },
    { path: '../public/fonts/Montserrat-Arabic-Black.ttf', weight: '900' }
  ],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Shortcut Next',
  description: 'Stop starting projects from scratch, start in the middle and save time!'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' dir='ltr'>
      <body className={`${montserratArabic.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
