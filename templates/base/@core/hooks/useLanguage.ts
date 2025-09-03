'use client'

import { useState } from 'react'
import { useSettings } from './useSettings'
import { useTranslation } from 'react-i18next'
import { Locale } from '../configs/i18n'

const useLanguage = () => {
  const { settings, saveSettings } = useSettings()
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<Locale>((i18n.language as Locale) || 'en')

  const handleLanguageChange = (lang: Locale) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)

    saveSettings({ ...settings, direction: lang === 'ar' ? 'rtl' : 'ltr', language: lang })
  }

  return { language, handleLanguageChange }
}

export default useLanguage
