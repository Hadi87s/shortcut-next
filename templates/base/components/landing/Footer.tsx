'use client'

import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { landingContent as lc } from '@/components/landing/landingContent'

const ExternalLinkIcon = () => (
  <svg
    width='11'
    height='11'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    style={{ flexShrink: 0 }}
  >
    <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6' />
    <polyline points='15 3 21 3 21 9' />
    <line x1='10' y1='14' x2='21' y2='3' />
  </svg>
)

export default function Footer() {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider
  const bgPaper = theme.palette.background.paper

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontWeight: 500,
    fontSize: '0.78rem',
    color: textSecondary,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    lineHeight: 1
  }

  const colHeadingStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontWeight: 600,
    fontSize: '0.65rem',
    color: textPrimary,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '16px'
  }

  return (
    <footer
      style={{
        borderTop: `1px solid ${divider}`,
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
            borderBottom: `1px solid ${divider}`
          }}
        >
          {/* Brand column */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: textPrimary,
                margin: '0 0 8px'
              }}
            >
              <span style={{ color: primaryMain }}>.</span>{lc.footer.brand.name.slice(1)}
            </p>
            <p
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 400,
                fontSize: '0.82rem',
                color: textSecondary,
                lineHeight: 1.7,
                margin: '0 0 20px',
                maxWidth: '280px'
              }}
            >
              {lc.footer.brand.desc}
            </p>

            {/* Tech badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {lc.footer.techBadges.map(badge => (
                <span
                  key={badge}
                  style={{
                    fontFamily: 'var(--font)',
                    fontSize: '0.62rem',
                    fontWeight: 500,
                    color: textSecondary,
                    border: `1px solid ${divider}`,
                    borderRadius: '100px',
                    padding: '3px 9px',
                    letterSpacing: '0.03em',
                    transition: 'color 0.2s ease, border-color 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.color = primaryMain
                    el.style.borderColor = alpha(primaryMain, 0.4)
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.color = textSecondary
                    el.style.borderColor = divider
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
              {lc.footer.templateLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={e => { e.currentTarget.style.color = primaryMain }}
                  onMouseLeave={e => { e.currentTarget.style.color = textSecondary }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Resources / Docs */}
          <div>
            <p style={colHeadingStyle}>Docs</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lc.footer.resourceLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={linkStyle}
                  onMouseEnter={e => { e.currentTarget.style.color = primaryMain }}
                  onMouseLeave={e => { e.currentTarget.style.color = textSecondary }}
                >
                  <ExternalLinkIcon />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Get started */}
          <div>
            <p style={colHeadingStyle}>Get Started</p>
            <div
              style={{
                background: bgPaper,
                border: `1px solid ${divider}`,
                borderRadius: 'var(--radius)',
                padding: '16px'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.72rem',
                  color: textSecondary,
                  margin: '0 0 10px',
                  lineHeight: 1.5
                }}
              >
                {lc.footer.getStarted.heading}
              </p>
              <code
                style={{
                  display: 'block',
                  fontFamily: 'var(--font)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: primaryMain,
                  letterSpacing: '0.02em',
                  userSelect: 'all'
                }}
              >
                <span style={{ color: textSecondary }}>$ </span>
                {lc.footer.getStarted.command}
              </code>
              <p
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.65rem',
                  color: textSecondary,
                  margin: '10px 0 0',
                  lineHeight: 1.5
                }}
              >
                {lc.footer.getStarted.note}
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
              color: textSecondary,
              margin: 0
            }}
          >
            &copy; {new Date().getFullYear()} {lc.footer.copyright}
          </p>
          <p
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 400,
              fontSize: '0.65rem',
              color: textSecondary,
              margin: 0
            }}
          >
            {lc.footer.builtWith}
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
