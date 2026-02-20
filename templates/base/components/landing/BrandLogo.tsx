'use client'

import { Box, Typography } from '@mui/material'

type Props = { size?: 'sm' | 'md' | 'lg' }

const fontSizes = { sm: '1.1rem', md: '1.4rem', lg: '1.7rem' }

export default function BrandLogo({ size = 'md' }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        component='span'
        sx={{ fontWeight: 800, fontSize: fontSizes[size], color: 'text.primary', lineHeight: 1 }}
      >
        <Box component='span' sx={{ color: 'primary.main' }}>.</Box>shortcut
      </Typography>
    </Box>
  )
}
