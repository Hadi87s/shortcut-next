import i18n from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

if (!i18n.isInitialized) {
  if (typeof window !== 'undefined') i18n.use(LanguageDetector)

  i18n
    .use(initReactI18next)
    .use(resourcesToBackend((lng: string) => import(`@/public/locale/${lng}.json`)))
    .init({
      fallbackLng: 'en',
      load: 'languageOnly',
      nonExplicitSupportedLngs: true,
      detection: {
        order: ['localStorage'],
        caches: ['localStorage']
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false }
    })
}
export default i18n

export type Locale = 'ar' | 'en'
