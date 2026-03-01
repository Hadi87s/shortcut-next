'use client'

import { useTheme } from '@mui/material'

export default function SectionLabel({ children }: { children: string }) {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main

  return (
    <p style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'var(--font)',
      fontSize: '0.65rem',
      fontWeight: 500,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: primaryMain,
      marginBottom: '16px'
    }}>
      <span style={{ display: 'block', width: '28px', height: '1px', background: primaryMain }} />
      {children}
    </p>
  )
}
