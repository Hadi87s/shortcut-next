'use client'

import type { ReactNode } from 'react'
import { Typography, type TypographyProps } from '@mui/material'
import { motion } from 'framer-motion'

interface SidebarAnimatedLabelProps {
  children: ReactNode
  variant?: TypographyProps['variant']
  fontWeight?: number
  noWrap?: boolean
  sx?: TypographyProps['sx']
  /**
   * true  → flex:1, minWidth:0  (use in NavGroup / Section — label grows to push chevron right)
   * false → flexShrink:0        (use in NavLink / NavMore  — label holds natural width so
   *                               sidebar overflow:hidden clips cleanly from the right)
   */
  grow?: boolean
}

export default function SidebarAnimatedLabel({
  children,
  variant = 'body2',
  fontWeight,
  noWrap = true,
  sx,
  grow = false,
}: SidebarAnimatedLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
      exit={{ opacity: 0, x: -8, transition: { duration: 0.15, ease: 'easeIn' } }}
      style={grow ? { flex: 1, minWidth: 0, overflow: 'hidden' } : { flexShrink: 0, overflow: 'hidden' }}
    >
      <Typography variant={variant} fontWeight={fontWeight} noWrap={noWrap} sx={sx}>
        {children}
      </Typography>
    </motion.div>
  )
}
