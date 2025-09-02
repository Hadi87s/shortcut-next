'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, MenuItem, FormControl, SelectChangeEvent, Box, Stack } from '@mui/material'
import { Languages } from 'lucide-react'
import { Settings } from '../context/SettingsContext'
import { Locale } from '../configs/i18n'

export default function LanguageDropdown({
  settings,
  saveSettings
}: {
  settings: Settings
  saveSettings: (settings: Settings) => void
}) {
  const { i18n, t } = useTranslation()

  const [language, setLanguage] = useState<Locale>((i18n.language as Locale) || 'en')

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as Locale
    setLanguage(lang)
    i18n.changeLanguage(lang)

    saveSettings({ ...settings, direction: lang === 'ar' ? 'rtl' : 'ltr', language: lang })
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
  }, [language])

  return (
    <FormControl size='medium'>
      <Select
        value={language}
        size='medium'
        variant='filled'
        onChange={handleLanguageChange}
        displayEmpty
        renderValue={() => (
          <Stack flexDirection='row' alignItems='center' gap={1}>
            <Languages size={20} />
            {language === 'en' ? t('common.english') : t('common.arabic')}
          </Stack>
        )}
      >
        <MenuItem value='en'>
          <Stack flexDirection='row' alignItems='center' gap={1.5}>
            <Box component='span' sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'primary.main' }}>
              EN
            </Box>
            {t('common.english')}
          </Stack>
        </MenuItem>
        <MenuItem value='ar'>
          <Stack flexDirection='row' alignItems='center' gap={1.5}>
            <Box component='span' sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'primary.main' }}>
              AR
            </Box>
            {t('common.arabic')}
          </Stack>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
