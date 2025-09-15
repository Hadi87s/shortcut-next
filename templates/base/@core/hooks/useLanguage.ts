'use client'

import { useState, useEffect } from 'react'
import { useSettings } from './useSettings'
import { useTranslation } from 'react-i18next'
import { Locale } from '../configs/i18n'

type Language = 'en' | 'ar'

const normalizeLang = (lng: string): Language => (lng.startsWith('ar') ? 'ar' : 'en')

const useLanguage = () => {
  const { settings, saveSettings } = useSettings()
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<Locale>(normalizeLang(i18n.language) || 'en')

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLanguage(normalizeLang(lng))
    }

    i18n.on('languageChanged', handleLanguageChanged)

    setLanguage(normalizeLang(i18n.language))

    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [i18n])

  const handleLanguageChange = (lng: Locale) => {
    setLanguage(normalizeLang(lng))
    i18n.changeLanguage(normalizeLang(lng))

    saveSettings({ ...settings, direction: lng === 'ar' ? 'rtl' : 'ltr', language: lng })
  }

  return { language, handleLanguageChange }
}

export default useLanguage
