import 'server-only'

import { createInstance } from 'i18next'
import { DEFAULT_LOCALE, type Locale } from './locales'

// Load from /messages (preferred)
async function loadMessages(locale: Locale) {
  return (await import(`../../messages/${locale}.json`)).default
}

export async function getServerT(locale: Locale) {
  const resources = await loadMessages(locale)
  const i18n = createInstance()
  await i18n.init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    resources: { [locale]: { translation: resources } },
    interpolation: { escapeValue: false }
  })
  return i18n.getFixedT(locale, 'translation')
}
