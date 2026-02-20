'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

const bullets = [
  'JWT auth context with token refresh built in',
  'CASL middleware guards routes before they render',
  'Arabic + English i18n with automatic RTL layout'
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
      // Apply will-change before animations
      if (leftRef.current) leftRef.current.style.willChange = 'transform, opacity'
      if (rightRef.current) rightRef.current.style.willChange = 'transform, opacity'

      /* Entrance animations with depth */
      gsap.from(leftRef.current, {
        x: -60,
        autoAlpha: 0,
        rotationY: -5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onComplete: () => {
            if (leftRef.current) leftRef.current.style.willChange = 'auto'
          }
        }
      })

      gsap.from(rightRef.current, {
        x: 60,
        autoAlpha: 0,
        rotationY: 5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onComplete: () => {
            if (rightRef.current) rightRef.current.style.willChange = 'auto'
          }
        }
      })

      /* Code line-by-line reveal with cursor effect */
      const codeLines = codeLinesRef.current?.querySelectorAll('.code-line')
      if (codeLines && codeLines.length > 0) {
        gsap.set(codeLines, { autoAlpha: 0, x: -10 })

        // Typing effect simulation
        codeLines.forEach((line, i) => {
          gsap.to(line, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: codeLinesRef.current,
              start: 'top 75%',
              once: true
            },
            delay: i * 0.15,
            onStart: () => {
              // Add typing sound effect feel with scale pulse
              gsap.from(line, {
                scale: 0.98,
                duration: 0.1,
                ease: 'power1.out'
              })
            }
          })
        })

        // Cursor blink effect on last line
        const lastLine = codeLines[codeLines.length - 1]
        if (lastLine) {
          ScrollTrigger.create({
            trigger: lastLine,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              const cursor = document.createElement('span')
              cursor.textContent = '▊'
              cursor.style.color = 'var(--primary)'
              cursor.style.marginLeft = '4px'
              lastLine.appendChild(cursor)

              gsap.to(cursor, {
                opacity: 0,
                duration: 0.5,
                repeat: 3,
                yoyo: true,
                ease: 'steps(1)',
                delay: (codeLines.length - 1) * 0.15 + 0.5
              })
            }
          })
        }
      }

      /* Enhanced parallax split — opposite directions with rotation */
      if (leftRef.current) {
        gsap.to(leftRef.current, {
          y: -40,
          rotationY: -2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      }

      if (rightRef.current) {
        gsap.to(rightRef.current, {
          y: 40,
          rotationY: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      }

      // Bullet points stagger animation
      const bullets = leftRef.current?.querySelectorAll('li')
      if (bullets) {
        gsap.from(bullets, {
          x: -20,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 70%',
            once: true
          }
        })
      }

      // Terminal window glow effect
      const terminal = rightRef.current?.querySelector('[style*="background: var(--surface)"]')
      if (terminal instanceof HTMLElement) {
        ScrollTrigger.create({
          trigger: terminal,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.from(terminal, {
              boxShadow: '0 0 0 rgba(91,116,255,0)',
              duration: 1,
              ease: 'power2.out'
            })
            gsap.to(terminal, {
              boxShadow: '0 20px 60px rgba(91,116,255,0.15)',
              duration: 1,
              ease: 'power2.out'
            })
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
        className='code-demo-layout'
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
            From zero to dashboard in under 30 seconds
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
            The CLI asks three questions: project name, template preset, and package manager. Auth middleware, theme, providers, forms, and i18n — all configured and wired before you open your editor.
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
            {bullets.map(item => (
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
              <div className='code-line' style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}># Install and scaffold</span>
              </div>
              <div className='code-line' style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}>$ </span>
                <span style={{ color: 'var(--primary)' }}>npx</span>{' '}
                <span style={{ color: 'var(--text)' }}>shortcut-next@latest</span>{' '}
                <span style={{ color: 'var(--secondary)' }}>my-app</span>
              </div>
              <div className='code-line' style={{ visibility: 'hidden', height: '1.8em' }} />
              <div className='code-line' style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}># Start developing</span>
              </div>
              <div className='code-line' style={{ visibility: 'hidden' }}>
                <span style={{ color: 'var(--muted)' }}>$ </span>
                <span style={{ color: 'var(--primary)' }}>cd</span>{' '}
                <span style={{ color: 'var(--secondary)' }}>my-app</span>{' '}
                <span style={{ color: 'var(--muted)' }}>&amp;&amp;</span>{' '}
                <span style={{ color: 'var(--primary)' }}>npm</span>{' '}
                <span style={{ color: 'var(--text)' }}>run dev</span>
              </div>
              <div className='code-line' style={{ visibility: 'hidden', height: '1.8em' }} />
              <div className='code-line' style={{ visibility: 'hidden' }}>
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
