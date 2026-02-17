'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonWrapperRef = useRef<HTMLDivElement>(null)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)
  const ghostBtnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Entrance: content block scales from 0.9 to 1 while fading in
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scale: 0.9,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        })
      }

      // Background glow pulse
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0.07 },
          {
            opacity: 0.15,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic buttons
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const buttons = [primaryBtnRef.current, ghostBtnRef.current]
    buttons.forEach((btn) => {
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 150
      if (dist < maxDist) {
        const strength = (1 - dist / maxDist) * 4
        gsap.to(btn, {
          x: dx * strength / maxDist * 4,
          y: dy * strength / maxDist * 4,
          duration: 0.3,
          ease: 'power2.out'
        })
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const buttons = [primaryBtnRef.current, ghostBtnRef.current]
    buttons.forEach((btn) => {
      if (!btn) return
      gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
    })
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
          <SectionLabel>READY?</SectionLabel>
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
          Start building in seconds
        </h2>

        <p
          style={{
            fontFamily: 'var(--font)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            margin: 0
          }}
        >
          One command. Zero config. Everything you need for your next project.
        </p>

        <div
          ref={buttonWrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px',
            flexWrap: 'wrap'
          }}
        >
          <a
            ref={primaryBtnRef}
            href="#"
            style={{
              background: 'var(--primary)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font)',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              display: 'inline-block',
              willChange: 'transform'
            }}
          >
            npx shortcut-next@latest
          </a>
          <a
            ref={ghostBtnRef}
            href="#"
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
              display: 'inline-block',
              willChange: 'transform'
            }}
          >
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  )
}
