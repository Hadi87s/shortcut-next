import i18n from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './locales'
import LanguageDetector from 'i18next-browser-languagedetector'

const isServer = typeof window === 'undefined'

const initialLng =
  typeof document !== 'undefined' ? document.documentElement.getAttribute('lang') || DEFAULT_LOCALE : DEFAULT_LOCALE

if (!i18n.isInitialized) {
  if (typeof window !== 'undefined') i18n.use(LanguageDetector)
  i18n
    .use(initReactI18next)
    .use(resourcesToBackend((lng: string) => import(`../../messages/${lng}.json`)))
    .init({
      lng: initialLng,
      nonExplicitSupportedLngs: true,
      load: 'languageOnly',
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'localStorage', 'navigator'],
        caches: ['localStorage', 'cookie']
      },
      supportedLngs: SUPPORTED_LOCALES as unknown as string[],
      fallbackLng: DEFAULT_LOCALE,
      preload: isServer ? (SUPPORTED_LOCALES as unknown as string[]) : [],
      interpolation: { escapeValue: false },
      react: { useSuspense: false }
    })
}

export default i18n
