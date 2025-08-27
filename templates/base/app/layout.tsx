import type { Metadata } from 'next'
import { Poppins, Cairo } from 'next/font/google'
import './globals.css'
import BaseProviders from '@/providers/BaseProvider'

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} ${cairo.variable} antialiased`}>
        <BaseProviders>{children}</BaseProviders>
      </body>
    </html>
  )
}
