'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Select, MenuItem, FormControl, SelectChangeEvent, Box } from '@mui/material'
import { Languages } from 'lucide-react'
import type { Locale } from '@/lib/i18n/locales'
import { Settings } from '../context/SettingsContext'

export default function LanguageDropdown({
  settings,
  saveSettings
}: {
  settings: Settings
  saveSettings: (settings: Settings) => void
}) {
  const { i18n, t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const search = useSearchParams()

  const [language, setLanguage] = useState<Locale>((i18n.language as Locale) || 'en')

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as Locale
    setLanguage(lang)
    i18n.changeLanguage(lang)

    const parts = pathname.split('/')
    parts[1] = lang
    const nextPath = parts.join('/')
    const q = search.toString()
    router.replace(q ? `${nextPath}?${q}` : nextPath)
    saveSettings({ ...settings, direction: lang === 'ar' ? 'rtl' : 'ltr' })
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
  }, [language])

  return (
    <FormControl size='medium' sx={{ minWidth: 150 }}>
      <Select
        value={language}
        size='medium'
        onChange={handleLanguageChange}
        displayEmpty
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Languages size={20} />
            {language === 'en' ? t('common.english') : t('common.arabic')}
          </Box>
        )}
        sx={{
          height: 57,
          padding: '8px 14px'
        }}
      >
        <MenuItem value='en'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
            <Box component='span' sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'primary.main' }}>
              EN
            </Box>
            {t('common.english')}
          </Box>
        </MenuItem>
        <MenuItem value='ar'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
            <Box component='span' sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'primary.main' }}>
              AR
            </Box>
            {t('common.arabic')}
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
