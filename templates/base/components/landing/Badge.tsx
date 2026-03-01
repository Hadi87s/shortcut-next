'use client'

import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

type BadgeVariant = 'primary' | 'purple' | 'red' | 'yellow'

export default function Badge({ label, variant = 'primary' }: { label: string; variant?: BadgeVariant }) {
  const theme = useTheme()

  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    primary: {
      background: alpha(theme.palette.primary.main, 0.12),
      color: theme.palette.primary.main,
      borderColor: alpha(theme.palette.primary.main, 0.25)
    },
    purple: {
      background: alpha(theme.palette.secondary.main, 0.12),
      color: theme.palette.secondary.main,
      borderColor: alpha(theme.palette.secondary.main, 0.25)
    },
    red: {
      background: alpha(theme.palette.error.main, 0.12),
      color: theme.palette.error.main,
      borderColor: alpha(theme.palette.error.main, 0.25)
    },
    yellow: {
      background: alpha(theme.palette.warning.main, 0.12),
      color: theme.palette.warning.main,
      borderColor: alpha(theme.palette.warning.main, 0.25)
    }
  }

  return (
    <span
      style={{
        fontFamily: 'var(--font)',
        fontSize: '0.6rem',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '4px 12px',
        borderRadius: '9999px',
        border: '1px solid',
        display: 'inline-block',
        ...variantStyles[variant]
      }}
    >
      {label}
    </span>
  )
}
