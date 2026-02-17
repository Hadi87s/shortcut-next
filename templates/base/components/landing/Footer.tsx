'use client'

import { useCallback } from 'react'

const links = [
  { label: 'GitHub', href: 'https://github.com', external: true },
  { label: 'npm', href: 'https://www.npmjs.com', external: true },
  { label: 'Docs', href: '#', external: false }
]

export default function Footer() {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.color = 'var(--primary)'
    const underline = el.querySelector('span[data-underline]') as HTMLSpanElement | null
    if (underline) {
      underline.style.transform = 'scaleX(1)'
    }
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.color = 'var(--muted)'
    const underline = el.querySelector('span[data-underline]') as HTMLSpanElement | null
    if (underline) {
      underline.style.transform = 'scaleX(0)'
    }
  }, [])

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontWeight: 500,
    fontSize: '0.75rem',
    color: 'var(--muted)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    position: 'relative',
    display: 'inline-block'
  }

  const underlineStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '100%',
    height: '2px',
    background: 'var(--primary)',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 0.3s ease',
    pointerEvents: 'none'
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '40px 24px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {/* Left */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'var(--text)',
                margin: 0
              }}
            >
              <span style={{ color: 'var(--primary)' }}>.</span>shortcut
            </p>
            <p
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 400,
                fontSize: '0.7rem',
                color: 'var(--muted)',
                margin: '4px 0 0'
              }}
            >
              Scaffold modern Next.js apps
            </p>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>{link.label}</span>
                <span data-underline style={underlineStyle} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '32px',
            fontFamily: 'var(--font)',
            fontWeight: 400,
            fontSize: '0.65rem',
            color: 'var(--muted)',
            marginBottom: 0
          }}
        >
          &copy; 2025 shortcut-next &middot; MIT License
        </p>
      </div>
    </footer>
  )
}
