'use client'

import React from 'react'
import { Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import type { TypographyProps } from '@mui/material'

interface GradientTextProps {
  textKey: string
  variant: TypographyProps['variant']
}
const GradientText = ({ textKey, variant }: GradientTextProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const gradientColor = theme.palette.mode === 'dark' ? '#5c6068ff' : '#4b4e57ff'

  return (
    <Typography
      variant={variant}
      fontWeight={800}
      sx={{
        background: `linear-gradient(to top, ${gradientColor}, ${theme.palette.text.primary})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        p: 1
      }}
    >
      {t(textKey)}
    </Typography>
  )
}

export default GradientText
