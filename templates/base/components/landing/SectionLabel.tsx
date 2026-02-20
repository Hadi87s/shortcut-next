'use client'

export default function SectionLabel({ children }: { children: string }) {
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
      color: 'var(--primary)',
      marginBottom: '16px'
    }}>
      <span style={{ display: 'block', width: '28px', height: '1px', background: 'var(--primary)' }} />
      {children}
    </p>
  )
}
