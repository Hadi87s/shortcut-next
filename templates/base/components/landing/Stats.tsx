'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const num1Ref = useRef<HTMLSpanElement>(null)
  const num2Ref = useRef<HTMLSpanElement>(null)
  const num3Ref = useRef<HTMLSpanElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Parallax offset for columns
      const cols = [
        { ref: col1Ref.current, y: -10 },
        { ref: col2Ref.current, y: -20 },
        { ref: col3Ref.current, y: -10 }
      ]

      cols.forEach(({ ref, y }) => {
        if (!ref) return
        gsap.to(ref, {
          y,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      // Counter animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const counter1 = { val: 0 }
          const counter2 = { val: 0 }

          // Animate "30+" with glow
          if (num1Ref.current) {
            num1Ref.current.style.textShadow = '0 0 20px rgba(91,116,255,0.4)'
          }
          gsap.to(counter1, {
            val: 30,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (num1Ref.current) {
                num1Ref.current.textContent = Math.round(counter1.val) + '+'
              }
            },
            onComplete: () => {
              if (num1Ref.current) {
                gsap.to(num1Ref.current, { textShadow: '0 0 20px rgba(91,116,255,0)', duration: 0.6 })
              }
            }
          })

          // Animate "4" with glow
          if (num2Ref.current) {
            num2Ref.current.style.textShadow = '0 0 20px rgba(91,116,255,0.4)'
          }
          gsap.to(counter2, {
            val: 4,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (num2Ref.current) {
                num2Ref.current.textContent = String(Math.round(counter2.val))
              }
            },
            onComplete: () => {
              if (num2Ref.current) {
                gsap.to(num2Ref.current, { textShadow: '0 0 20px rgba(91,116,255,0)', duration: 0.6 })
              }
            }
          })

          // Fade in "<30s" with glow
          if (num3Ref.current) {
            num3Ref.current.style.textShadow = '0 0 20px rgba(91,116,255,0.4)'
          }
          gsap.fromTo(
            num3Ref.current,
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              onComplete: () => {
                if (num3Ref.current) {
                  gsap.to(num3Ref.current, { textShadow: '0 0 20px rgba(91,116,255,0)', duration: 0.6 })
                }
              }
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const numberStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontWeight: 800,
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: 'var(--text)',
    lineHeight: 1
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font)',
    fontSize: '0.65rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'var(--muted)',
    marginTop: '8px'
  }

  return (
    <section
      ref={sectionRef}
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '80px 24px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '80px',
          flexWrap: 'wrap',
          textAlign: 'center'
        }}
      >
        <div ref={col1Ref}>
          <span ref={num1Ref} style={numberStyle}>
            0+
          </span>
          <p style={labelStyle}>MUI COMPONENTS</p>
        </div>
        <div ref={col2Ref}>
          <span ref={num2Ref} style={numberStyle}>
            0
          </span>
          <p style={labelStyle}>AUTH ROLES</p>
        </div>
        <div ref={col3Ref}>
          <span ref={num3Ref} style={{ ...numberStyle, visibility: 'hidden' }}>
            &lt;30s
          </span>
          <p style={labelStyle}>SETUP TIME</p>
        </div>
      </div>
    </section>
  )
}
