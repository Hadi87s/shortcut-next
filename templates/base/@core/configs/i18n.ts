import i18next from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'

export const locales = ['en', 'ar'] as const
export const defaultLocale = 'en'
export const headerName = 'x-current-locale'

const runsOnServer = typeof window === 'undefined'

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    // one-file-per-language (namespace = "translation")
    .use(resourcesToBackend((lng: string) => import(`../../public/locale/${lng}.json`)))
    .init({
      supportedLngs: locales as unknown as string[],
      fallbackLng: defaultLocale,
      ns: ['translation'],
      defaultNS: 'translation',
      interpolation: { escapeValue: false },
      preload: runsOnServer ? (locales as unknown as string[]) : []
    })
}

export async function getT(lng?: string, ns = 'translation') {
  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng)
  }
  if (!i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns)
  }

  return i18next.getFixedT(lng ?? (i18next.resolvedLanguage as string), ns)
}

export default i18next
