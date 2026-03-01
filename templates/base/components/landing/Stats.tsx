'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const num1Ref = useRef<HTMLSpanElement>(null)
  const num2Ref = useRef<HTMLSpanElement>(null)
  const num3Ref = useRef<HTMLSpanElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider
  const primaryGlow60 = alpha(primaryMain, 0.6)
  const primaryGlow0 = alpha(primaryMain, 0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current]
      cols.forEach(col => { if (col) col.style.willChange = 'transform, opacity' })

      const colAnimations = [
        { ref: col1Ref.current, y: -15, rotation: -1 },
        { ref: col2Ref.current, y: -25, rotation: 0 },
        { ref: col3Ref.current, y: -15, rotation: 1 }
      ]

      colAnimations.forEach(({ ref, y, rotation }) => {
        if (!ref) return
        gsap.from(ref, {
          y: 40, scale: 0.9, autoAlpha: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        })
        gsap.to(ref, {
          y, rotation, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        })
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const counter1 = { val: 0 }
          const counter2 = { val: 0 }

          if (num1Ref.current) {
            num1Ref.current.style.textShadow = `0 0 30px ${primaryGlow60}`
            gsap.from(num1Ref.current, { scale: 0.5, duration: 0.6, ease: 'back.out(2)' })
          }

          const stat0 = lc.stats.items[0]
          gsap.to(counter1, {
            val: stat0.animateTo ?? 0, duration: 2.2, ease: 'power2.out',
            onUpdate: () => {
              if (num1Ref.current) num1Ref.current.textContent = Math.round(counter1.val) + stat0.suffix
            },
            onComplete: () => {
              if (num1Ref.current) gsap.to(num1Ref.current, { textShadow: `0 0 20px ${primaryGlow0}`, duration: 0.8 })
            }
          })

          if (num2Ref.current) {
            num2Ref.current.style.textShadow = `0 0 30px ${primaryGlow60}`
            gsap.from(num2Ref.current, { scale: 0.5, rotation: 360, duration: 0.8, ease: 'back.out(2)', delay: 0.2 })
          }

          const stat1 = lc.stats.items[1]
          gsap.to(counter2, {
            val: stat1.animateTo ?? 0, duration: 2.2, ease: 'power2.out', delay: 0.2,
            onUpdate: () => {
              if (num2Ref.current) num2Ref.current.textContent = Math.round(counter2.val) + stat1.suffix
            },
            onComplete: () => {
              if (num2Ref.current) gsap.to(num2Ref.current, { textShadow: `0 0 20px ${primaryGlow0}`, duration: 0.8 })
            }
          })

          if (num3Ref.current) {
            num3Ref.current.style.textShadow = `0 0 30px ${primaryGlow60}`
          }

          gsap.fromTo(
            num3Ref.current,
            { autoAlpha: 0, y: 20, scale: 0.5 },
            {
              autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(2)', delay: 0.4,
              onComplete: () => {
                if (num3Ref.current) gsap.to(num3Ref.current, { textShadow: `0 0 20px ${primaryGlow0}`, duration: 0.8 })
              }
            }
          )

          const labels = sectionRef.current?.querySelectorAll('p')
          if (labels) {
            gsap.from(labels, { y: 10, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.6 })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [primaryGlow60, primaryGlow0])

  const numberStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontWeight: 800,
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: textPrimary,
    lineHeight: 1
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontSize: '0.65rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: textSecondary,
    marginTop: '8px'
  }

  return (
    <section
      ref={sectionRef}
      style={{ borderTop: `1px solid ${divider}`, borderBottom: `1px solid ${divider}`, padding: '80px 24px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', flexWrap: 'wrap', textAlign: 'center' }}>
        <div ref={col1Ref}>
          <span ref={num1Ref} style={numberStyle}>{lc.stats.items[0].display}</span>
          <p style={labelStyle}>{lc.stats.items[0].label}</p>
        </div>
        <div ref={col2Ref}>
          <span ref={num2Ref} style={numberStyle}>{lc.stats.items[1].display}</span>
          <p style={labelStyle}>{lc.stats.items[1].label}</p>
        </div>
        <div ref={col3Ref}>
          <span ref={num3Ref} style={{ ...numberStyle, visibility: 'hidden' }}>{lc.stats.items[2].display}</span>
          <p style={labelStyle}>{lc.stats.items[2].label}</p>
        </div>
      </div>
    </section>
  )
}
