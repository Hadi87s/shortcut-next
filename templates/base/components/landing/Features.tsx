'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

const features = lc.features.cards

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider
  const bgPaper = theme.palette.background.paper
  const primaryAlpha04 = alpha(primaryMain, 0.04)
  const primaryAlpha50 = alpha(primaryMain, 0.5)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.feature-card')
      if (!cards || cards.length === 0) return

      cards.forEach(card => {
        if (card instanceof HTMLElement) card.style.willChange = 'transform, opacity'
      })

      const title = sectionRef.current?.querySelector('h2')
      if (title) {
        gsap.from(title, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        })
      }

      gsap.from(cards, {
        y: 60,
        autoAlpha: 0,
        duration: 0.8,
        stagger: { amount: 0.4, from: 'start', ease: 'power2.out' },
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true },
        onComplete: () => {
          cards.forEach(card => {
            if (card instanceof HTMLElement) card.style.willChange = 'auto'
          })
        }
      })

      gsap.to(gridRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const card = cardRefs.current[index]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -8
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8
    gsap.to(card, { rotateX, rotateY, transformPerspective: 1000, duration: 0.5, ease: 'power2.out' })
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
    gsap.to(card, { borderColor: divider, duration: 0.3 })
    const overlay = card.querySelector('.card-overlay') as HTMLElement
    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
  }, [divider])

  const handleMouseEnter = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    gsap.to(card, { borderColor: primaryAlpha50, duration: 0.3 })
    const overlay = card.querySelector('.card-overlay') as HTMLElement
    if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 })
  }, [primaryAlpha50])

  return (
    <section ref={sectionRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SectionLabel>{lc.features.label}</SectionLabel>
        <h2
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: textPrimary,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginTop: '8px'
          }}
        >
          {lc.features.heading}
        </h2>
      </div>

      <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {features.map((f, i) => (
          <div
            key={f.num}
            ref={el => { cardRefs.current[i] = el }}
            className='feature-card'
            style={{
              background: bgPaper,
              border: `1px solid ${divider}`,
              borderRadius: 'var(--radius)',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseMove={e => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div
              className='card-overlay'
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${primaryAlpha04}, transparent)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }}
            />
            <span style={{ fontFamily: 'var(--font)', fontWeight: 400, letterSpacing: '0.06em', fontSize: '0.7rem', color: primaryMain, display: 'block', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              {f.num}
            </span>
            <h3 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.2rem', color: textPrimary, marginBottom: '12px', position: 'relative', zIndex: 1 }}>
              {f.name}
            </h3>
            <p style={{ fontFamily: 'var(--font)', color: textSecondary, fontSize: '0.9rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
