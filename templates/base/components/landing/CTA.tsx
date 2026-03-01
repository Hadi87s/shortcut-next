'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import MagneticButton from '@/components/landing/MagneticButton'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import themeConfig from '@/core/configs/themeConfig'

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const primaryBtnWrapperRef = useRef<HTMLDivElement>(null)
  const ghostBtnWrapperRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider
  const primaryGlow10 = alpha(primaryMain, 0.1)
  const primaryGlow40 = alpha(primaryMain, 0.4)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(lc.cta.primaryBtn.command)
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
      if (contentRef.current) {
        contentRef.current.style.willChange = 'transform, opacity'
      }

      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scale: 0.85,
          rotationX: 10,
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'power3.out',
          onComplete: () => {
            if (contentRef.current) contentRef.current.style.willChange = 'auto'
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        })
      }

      const title = contentRef.current?.querySelector('h2')
      if (title) {
        const words = title.textContent?.split(' ') || []
        title.innerHTML = words
          .map(word => `<span style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`)
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

      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0.08, scale: 1 },
          { opacity: 0.18, scale: 1.1, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 }
        )
      }

      const primaryBtn = primaryBtnWrapperRef.current?.querySelector('button')
      if (primaryBtn) {
        gsap.to(primaryBtn, {
          boxShadow: `0 0 30px ${primaryGlow40}`,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [primaryGlow40])

  return (
    <section
      ref={sectionRef}
      style={{ padding: '120px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
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
          background: `radial-gradient(ellipse at center top, ${primaryGlow10}, transparent 70%)`,
          pointerEvents: 'none',
          opacity: 0.07
        }}
      />

      <div ref={contentRef} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SectionLabel>{lc.cta.label}</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: textPrimary,
            margin: '16px 0 24px'
          }}
        >
          {lc.cta.heading}
        </h2>

        <p style={{ fontFamily: 'var(--font)', color: textSecondary, lineHeight: 1.7, margin: 0 }}>
          {lc.cta.body}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
          <div ref={primaryBtnWrapperRef} style={{ display: 'inline-flex' }}>
            <MagneticButton
              onClick={handleCopy}
              style={{
                background: primaryMain,
                color: '#fff',
                padding: '14px 32px',
                borderRadius: themeConfig.borderRadius,
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
                  {lc.cta.primaryBtn.copiedLabel}
                </>
              ) : (
                <>
                  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
                    <path d='M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' />
                  </svg>
                  {lc.cta.primaryBtn.label}
                </>
              )}
            </MagneticButton>
          </div>

          <div ref={ghostBtnWrapperRef} style={{ display: 'inline-flex' }}>
            <MagneticButton
              as='a'
              href={lc.cta.secondaryBtn.href}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                background: 'transparent',
                color: textPrimary,
                padding: '14px 32px',
                borderRadius: themeConfig.borderRadius,
                fontFamily: 'var(--font)',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                border: `1px solid ${divider}`,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6' />
                <polyline points='15 3 21 3 21 9' />
                <line x1='10' y1='14' x2='21' y2='3' />
              </svg>
              {lc.cta.secondaryBtn.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
