'use client'

import type { ReactNode } from 'react'
import { Typography, type TypographyProps } from '@mui/material'
import { motion } from 'framer-motion'
import useLanguage from '@/core/hooks/useLanguage'

interface SidebarAnimatedLabelProps {
  children: ReactNode
  variant?: TypographyProps['variant']
  fontWeight?: number
  noWrap?: boolean
  sx?: TypographyProps['sx']
  grow?: boolean
}

export default function SidebarAnimatedLabel({
  children,
  variant = 'body2',
  fontWeight,
  noWrap = true,
  sx,
  grow = false
}: SidebarAnimatedLabelProps) {
  const { language } = useLanguage()
  const xDir = language === 'ar' ? 8 : -8

  return (
    <motion.div
      initial={{ opacity: 0, x: xDir }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
      exit={{ opacity: 0, x: xDir, transition: { duration: 0.15, ease: 'easeIn' } }}
      style={grow ? { flex: 1, minWidth: 0, overflow: 'hidden' } : { flexShrink: 0, overflow: 'hidden' }}
    >
      <Typography variant={variant} fontWeight={fontWeight} noWrap={noWrap} sx={sx}>
        {children}
      </Typography>
    </motion.div>
  )
}
