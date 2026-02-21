import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import '@copilotkit/react-ui/styles.css'
import AppProviders from '@/providers/AppProviders'
import { CopilotKit } from '@copilotkit/react-core'
import CopilotWidget from '@/components/copilotkit/CopilotWidget'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700']
})

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
  variable: '--font-montserrat-arabic'
})
export const metadata: Metadata = {
  title: 'Shortcut Nextjs Template',
  description: 'Stop starting projects from scratch, start in the middle and save time!'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' dir='ltr'>
      <body className={`${poppins.variable} ${montserratArabic.variable} antialiased`}>
        <CopilotKit runtimeUrl='/api/copilotkit'>
          <AppProviders>{children}</AppProviders>
          <CopilotWidget />
        </CopilotKit>
      </body>
    </html>
  )
}
