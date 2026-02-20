'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import MagneticButton from '@/components/landing/MagneticButton'

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const primaryBtnWrapperRef = useRef<HTMLDivElement>(null)
  const ghostBtnWrapperRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('npx shortcut-next@latest')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Apply will-change before animations
      if (contentRef.current) {
        contentRef.current.style.willChange = 'transform, opacity'
      }

      // Enhanced entrance: content block with 3D perspective
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scale: 0.85,
          rotationX: 10,
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            onComplete: () => {
              if (contentRef.current) {
                contentRef.current.style.willChange = 'auto'
              }
            }
          }
        })
      }

      // Animate title with text reveal effect
      const title = contentRef.current?.querySelector('h2')
      if (title) {
        const words = title.textContent?.split(' ') || []
        title.innerHTML = words
          .map(
            word =>
              `<span style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`
          )
          .join(' ')

        const wordSpans = title.querySelectorAll('span > span')
        gsap.from(wordSpans, {
          y: '100%',
          rotationX: -90,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        })
      }

      // Button wrappers entrance with bounce
      const wrappers = [primaryBtnWrapperRef.current, ghostBtnWrapperRef.current]
      wrappers.forEach((wrapper, i) => {
        if (wrapper) {
          gsap.from(wrapper, {
            y: 30,
            scale: 0.8,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true
            },
            delay: i * 0.15 + 0.6
          })
        }
      })

      // Enhanced background glow pulse with color shift
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          {
            opacity: 0.08,
            scale: 1
          },
          {
            opacity: 0.18,
            scale: 1.1,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          }
        )
      }

      // Primary button continuous pulse glow
      const primaryBtn = primaryBtnWrapperRef.current?.querySelector('button')
      if (primaryBtn) {
        gsap.to(primaryBtn, {
          boxShadow: '0 0 30px rgba(91,116,255,0.4)',
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center top, rgba(91,116,255,0.1), transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.07
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          maxWidth: '600px',
          margin: '0 auto',
          visibility: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SectionLabel>GET STARTED</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text)',
            margin: '16px 0 24px'
          }}
        >
          Your next project starts here
        </h2>

        <p
          style={{
            fontFamily: 'var(--font)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            margin: 0
          }}
        >
          Auth, roles, theming, i18n, and data fetching — scaffolded in under 30 seconds. Open your editor to a working dashboard, not an empty folder.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px',
            flexWrap: 'wrap'
          }}
        >
          <div ref={primaryBtnWrapperRef} style={{ display: 'inline-flex' }}>
            <MagneticButton
              onClick={handleCopy}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font)',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {copied ? (
                <>
                  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <polyline points='20 6 9 17 4 12' />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
                    <path d='M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' />
                  </svg>
                  Copy Install Command
                </>
              )}
            </MagneticButton>
          </div>

          <div ref={ghostBtnWrapperRef} style={{ display: 'inline-flex' }}>
            <MagneticButton
              as='a'
              href='https://github.com/Hadi87s/shortcut-next'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                background: 'transparent',
                color: 'var(--text)',
                padding: '14px 32px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font)',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width='15' height='15' viewBox='0 0 16 16' fill='currentColor'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
              </svg>
              View on GitHub
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
