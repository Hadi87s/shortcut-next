'use client'

import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { landingContent as lc } from '@/components/landing/landingContent'

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider

  // Triple-duplicate so there's always content filling the viewport at any screen size
  const tripled = [...items, ...items, ...items]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className={reverse ? 'marquee-track marquee-reverse' : 'marquee-track'}
        style={{ display: 'flex', willChange: 'transform' }}
      >
        {tripled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              marginRight: '12px',   /* spacing is per-item so the loop wraps evenly */
              border: `1px solid ${divider}`,
              borderRadius: '100px',
              fontFamily: 'var(--font)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: textSecondary,
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
              flexShrink: 0
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: alpha(primaryMain, 0.7),
                flexShrink: 0
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function InstallBanner() {
  const theme = useTheme()
  const divider = theme.palette.divider

  return (
    <div
      style={{
        width: '100%',
        borderTop: `1px solid ${divider}`,
        borderBottom: `1px solid ${divider}`,
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflow: 'hidden',
        /* fade out left + right edges */
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
      }}
    >
      <MarqueeRow items={lc.installBanner.row1} />
      <MarqueeRow items={lc.installBanner.row2} reverse />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
        }
        .marquee-reverse {
          animation: marquee-reverse 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .marquee-reverse {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
