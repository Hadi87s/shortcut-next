'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

const bullets = [
  'Pre-configured MUI theme system',
  'Authentication & authorization ready',
  'i18n with RTL support included'
]

export default function CodeDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const codeLinesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      /* Entrance animations */
      gsap.from(leftRef.current, {
        x: -40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      })

      gsap.from(rightRef.current, {
        x: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      })

      /* Code line-by-line reveal */
      const codeLines = codeLinesRef.current?.querySelectorAll('.code-line')
      if (codeLines && codeLines.length > 0) {
        gsap.set(codeLines, { autoAlpha: 0, y: 10 })
        gsap.to(codeLines, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: codeLinesRef.current,
            start: 'top 80%',
            once: true
          }
        })
      }

      /* Parallax split — left at 0.8x, right at 1.2x */
      if (leftRef.current) {
        gsap.to(leftRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }

      if (rightRef.current) {
        gsap.to(rightRef.current, {
          y: 30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px'
      }}
    >
      <SectionLabel>QUICK START</SectionLabel>

      <div
        style={{
          display: 'flex',
          gap: '64px',
          alignItems: 'flex-start',
          marginTop: '32px'
        }}
        className="code-demo-layout"
      >
        {/* Left panel */}
        <div
          ref={leftRef}
          style={{
            flex: 1,
            maxWidth: '480px'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}
          >
            Up and running in three lines
          </h2>
          <p
            style={{
              fontFamily: 'var(--font)',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginTop: '16px',
              fontSize: '1rem'
            }}
          >
            No boilerplate. No configuration hell. Just run the command, pick your options, and start building with a production-grade stack.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {bullets.map((item) => (
              <li
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'var(--font)',
                  color: 'var(--text)',
                  fontSize: '0.95rem'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    flexShrink: 0
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right panel */}
        <div
          ref={rightRef}
          style={{
            flex: 1,
            minWidth: 0
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden'
            }}
          >
            {/* Terminal top bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border)'
              }}
            >
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--error)' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning)' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)' }} />
            </div>

            {/* Code content — line-by-line reveal */}
            <div
              ref={codeLinesRef}
              style={{
                padding: '24px 28px',
                fontFamily: 'var(--font)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                color: 'var(--text)',
                overflowX: 'auto'
              }}
            >
              <div className="code-line" style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}># Install and scaffold</span>
              </div>
              <div className="code-line" style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}>$ </span>
                <span style={{ color: 'var(--primary)' }}>npx</span>
                {' '}
                <span style={{ color: 'var(--text)' }}>shortcut-next@latest</span>
                {' '}
                <span style={{ color: 'var(--secondary)' }}>my-app</span>
              </div>
              <div className="code-line" style={{ visibility: 'hidden', height: '1.8em' }} />
              <div className="code-line" style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}># Start developing</span>
              </div>
              <div className="code-line" style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}>$ </span>
                <span style={{ color: 'var(--primary)' }}>cd</span>
                {' '}
                <span style={{ color: 'var(--secondary)' }}>my-app</span>
                {' '}
                <span style={{ color: 'var(--muted)' }}>&amp;&amp;</span>
                {' '}
                <span style={{ color: 'var(--primary)' }}>npm</span>
                {' '}
                <span style={{ color: 'var(--text)' }}>run dev</span>
              </div>
              <div className="code-line" style={{ visibility: 'hidden', height: '1.8em' }} />
              <div className="code-line" style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}># Your app is ready at </span>
                <span style={{ color: 'var(--secondary)' }}>localhost:3000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .code-demo-layout {
            flex-direction: column !important;
          }
          .code-demo-layout > div {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
