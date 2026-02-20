'use client'

import { useCallback } from 'react'

const GitHubIcon = () => (
  <svg width='13' height='13' viewBox='0 0 16 16' fill='currentColor' style={{ flexShrink: 0 }}>
    <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
  </svg>
)

const NpmIcon = () => (
  <svg width='15' height='15' viewBox='0 0 18 7' fill='currentColor' style={{ flexShrink: 0 }}>
    <path d='M0 0h18v6H9V7H5V6H0V0zm1 5h2V2h1v3h1V1H1v4zm5-4v5h2V5h2V1H6zm2 1h1v2H8V2zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6z' />
  </svg>
)

const resourceLinks = [
  { label: 'GitHub', href: 'https://github.com/Hadi87s/shortcut-next', external: true, Icon: GitHubIcon },
  { label: 'npm', href: 'https://www.npmjs.com/package/shortcut-next', external: true, Icon: NpmIcon },
  { label: 'Issues', href: 'https://github.com/Hadi87s/shortcut-next/issues', external: true, Icon: GitHubIcon },
  { label: 'Changelog', href: 'https://github.com/Hadi87s/shortcut-next/releases', external: true, Icon: GitHubIcon }
]

const templateLinks = [
  { label: 'Features', href: '#features', external: false },
  { label: 'Tech Stack', href: '#tech-stack', external: false },
  { label: 'How It Works', href: '#how-it-works', external: false },
  { label: 'FAQ', href: '#faq', external: false }
]

const techBadges = [
  'Next.js 15',
  'MUI v7',
  'CASL',
  'TanStack Query',
  'TypeScript',
  'i18next'
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
    fontSize: '0.78rem',
    color: 'var(--muted)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    position: 'relative',
    display: 'inline-block',
    lineHeight: 1
  }

  const underlineStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '100%',
    height: '1px',
    background: 'var(--primary)',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 0.3s ease',
    pointerEvents: 'none'
  }

  const colHeadingStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontWeight: 600,
    fontSize: '0.65rem',
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '16px'
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '64px 24px 32px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* Main footer grid */}
        <div
          className='footer-grid'
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            paddingBottom: '48px',
            borderBottom: '1px solid var(--border)'
          }}
        >
          {/* Brand column */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: 'var(--text)',
                margin: '0 0 8px'
              }}
            >
              <span style={{ color: 'var(--primary)' }}>.</span>shortcut
            </p>
            <p
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 400,
                fontSize: '0.82rem',
                color: 'var(--muted)',
                lineHeight: 1.7,
                margin: '0 0 20px',
                maxWidth: '280px'
              }}
            >
              A CLI tool that scaffolds production-ready Next.js 15 apps with MUI, auth, CASL RBAC, i18n, and a full data layer — wired in under 30 seconds.
            </p>

            {/* Tech badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {techBadges.map(badge => (
                <span
                  key={badge}
                  style={{
                    fontFamily: 'var(--font)',
                    fontSize: '0.62rem',
                    fontWeight: 500,
                    color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    borderRadius: '100px',
                    padding: '3px 9px',
                    letterSpacing: '0.03em',
                    transition: 'color 0.2s ease, border-color 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.color = 'var(--primary)'
                    el.style.borderColor = 'rgba(91,116,255,0.4)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.color = 'var(--muted)'
                    el.style.borderColor = 'var(--border)'
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Template links */}
          <div>
            <p style={colHeadingStyle}>Template</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {templateLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
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

          {/* Resources */}
          <div>
            <p style={colHeadingStyle}>Resources</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {resourceLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <link.Icon />
                  <span>{link.label}</span>
                  <span data-underline style={underlineStyle} />
                </a>
              ))}
            </div>
          </div>

          {/* Get started */}
          <div>
            <p style={colHeadingStyle}>Get Started</p>
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '16px'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.72rem',
                  color: 'var(--muted)',
                  margin: '0 0 10px',
                  lineHeight: 1.5
                }}
              >
                Run this in your terminal:
              </p>
              <code
                style={{
                  display: 'block',
                  fontFamily: 'var(--font)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--primary)',
                  letterSpacing: '0.02em',
                  userSelect: 'all'
                }}
              >
                <span style={{ color: 'var(--muted)' }}>$ </span>
                npx shortcut-next@latest
              </code>
              <p
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.65rem',
                  color: 'var(--muted)',
                  margin: '10px 0 0',
                  lineHeight: 1.5
                }}
              >
                No global install required.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 400,
              fontSize: '0.65rem',
              color: 'var(--muted)',
              margin: 0
            }}
          >
            &copy; {new Date().getFullYear()} shortcut-next &middot; MIT License
          </p>
          <p
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 400,
              fontSize: '0.65rem',
              color: 'var(--muted)',
              margin: 0
            }}
          >
            Built with Next.js &middot; Deployed on Vercel
          </p>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 639px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
