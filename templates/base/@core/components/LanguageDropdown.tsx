'use client'

import { useTranslation } from 'react-i18next'
import { Select, MenuItem, FormControl, Box, Stack } from '@mui/material'
import { Languages } from 'lucide-react'
import { Locale } from '../configs/i18n'
import useLanguage from '../hooks/useLanguage'

export default function LanguageDropdown() {
  const { t } = useTranslation()
  const { language, handleLanguageChange } = useLanguage()

  return (
    <FormControl size='medium'>
      <Select
        value={language}
        size='medium'
        variant='filled'
        onChange={e => handleLanguageChange(e.target.value as Locale)}
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
