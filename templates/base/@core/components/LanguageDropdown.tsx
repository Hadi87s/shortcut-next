'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { locales } from '@/@core/configs/i18n'
import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { Languages } from 'lucide-react'

const languageIcons: Record<string, React.ReactNode> = {
  en: (
    <Box
      component='span'
      sx={{
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: '1rem',
        lineHeight: 1
      }}
    >
      EN
    </Box>
  ),
  ar: (
    <Box
      component='span'
      sx={{
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: '1rem',
        lineHeight: 1
      }}
    >
      AR
    </Box>
  )
}

const languageNames: Record<string, string> = {
  en: 'English',
  ar: 'Arabic (العربية)'
}

const LanguageDropdown = () => {
  const { i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = async (lang: string) => {
    await i18n.changeLanguage(lang)
    // Update document direction for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    // Close menu
    handleClose()
  }

  return (
    <Box>
      <Tooltip title='Change Language'>
        <IconButton
          onClick={handleClick}
          size='medium'
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          color='inherit'
        >
          {i18n.language && languageIcons[i18n.language] ? languageIcons[i18n.language] : <Languages size={22} />}
        </IconButton>
      </Tooltip>
      <Menu
        id='language-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button'
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {locales.map(lang => (
          <MenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            selected={i18n.language === lang}
            sx={{ minWidth: 160 }}
          >
            <ListItemIcon>{languageIcons[lang] || <Languages size={18} />}</ListItemIcon>
            <ListItemText>{languageNames[lang]}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default LanguageDropdown
