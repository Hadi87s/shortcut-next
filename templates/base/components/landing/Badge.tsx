'use client'

type BadgeVariant = 'primary' | 'purple' | 'red' | 'yellow'

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  primary: {
    background: 'rgba(91,116,255,0.12)',
    color: '#7C8FFF',
    borderColor: 'rgba(91,116,255,0.25)'
  },
  purple: {
    background: 'rgba(123,97,255,0.12)',
    color: '#7b61ff',
    borderColor: 'rgba(123,97,255,0.25)'
  },
  red: {
    background: 'rgba(255,77,79,0.12)',
    color: '#FF4D4F',
    borderColor: 'rgba(255,77,79,0.25)'
  },
  yellow: {
    background: 'rgba(255,183,3,0.12)',
    color: '#FFB703',
    borderColor: 'rgba(255,183,3,0.25)'
  }
}

export default function Badge({ label, variant = 'primary' }: { label: string; variant?: BadgeVariant }) {
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
