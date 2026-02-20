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
      // Apply will-change for performance
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current]
      cols.forEach(col => {
        if (col) col.style.willChange = 'transform, opacity'
      })

      // Enhanced parallax offset for columns with rotation
      const colAnimations = [
        { ref: col1Ref.current, y: -15, rotation: -1 },
        { ref: col2Ref.current, y: -25, rotation: 0 },
        { ref: col3Ref.current, y: -15, rotation: 1 }
      ]

      colAnimations.forEach(({ ref, y, rotation }) => {
        if (!ref) return

        // Entrance animation
        gsap.from(ref, {
          y: 40,
          scale: 0.9,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        })

        // Parallax scroll effect
        gsap.to(ref, {
          y,
          rotation,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onComplete: () => {
              if (ref instanceof HTMLElement) ref.style.willChange = 'auto'
            }
          }
        })
      })

      // Enhanced counter animations with particle effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const counter1 = { val: 0 }
          const counter2 = { val: 0 }

          // Animate "30+" with enhanced glow and scale pulse
          if (num1Ref.current) {
            num1Ref.current.style.textShadow = '0 0 30px rgba(91,116,255,0.6)'

            // Scale pulse effect
            gsap.from(num1Ref.current, {
              scale: 0.5,
              duration: 0.6,
              ease: 'back.out(2)'
            })
          }

          gsap.to(counter1, {
            val: 9,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              if (num1Ref.current) {
                const current = Math.round(counter1.val)
                num1Ref.current.textContent = current + '+'
              }
            },
            onComplete: () => {
              if (num1Ref.current) {
                gsap.to(num1Ref.current, {
                  textShadow: '0 0 20px rgba(91,116,255,0)',
                  duration: 0.8
                })
              }
            }
          })

          // Animate "4" with enhanced glow and scale
          if (num2Ref.current) {
            num2Ref.current.style.textShadow = '0 0 30px rgba(91,116,255,0.6)'

            gsap.from(num2Ref.current, {
              scale: 0.5,
              rotation: 360,
              duration: 0.8,
              ease: 'back.out(2)',
              delay: 0.2
            })
          }

          gsap.to(counter2, {
            val: 4,
            duration: 2.2,
            ease: 'power2.out',
            delay: 0.2,
            onUpdate: () => {
              if (num2Ref.current) {
                const current = Math.round(counter2.val)
                num2Ref.current.textContent = String(current)
              }
            },
            onComplete: () => {
              if (num2Ref.current) {
                gsap.to(num2Ref.current, {
                  textShadow: '0 0 20px rgba(91,116,255,0)',
                  duration: 0.8
                })
              }
            }
          })

          // Fade in "<30s" with enhanced glow and bounce
          if (num3Ref.current) {
            num3Ref.current.style.textShadow = '0 0 30px rgba(91,116,255,0.6)'
          }

          gsap.fromTo(
            num3Ref.current,
            { autoAlpha: 0, y: 20, scale: 0.5 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'back.out(2)',
              delay: 0.4,
              onComplete: () => {
                if (num3Ref.current) {
                  gsap.to(num3Ref.current, {
                    textShadow: '0 0 20px rgba(91,116,255,0)',
                    duration: 0.8
                  })
                }
              }
            }
          )

          // Animate labels with stagger
          const labels = sectionRef.current?.querySelectorAll('p')
          if (labels) {
            gsap.from(labels, {
              y: 10,
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
              delay: 0.6
            })
          }
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
          <p style={labelStyle}>INTEGRATED PACKAGES</p>
        </div>
        <div ref={col2Ref}>
          <span ref={num2Ref} style={numberStyle}>
            0
          </span>
          <p style={labelStyle}>BUILT-IN RBAC ROLES</p>
        </div>
        <div ref={col3Ref}>
          <span ref={num3Ref} style={{ ...numberStyle, visibility: 'hidden' }}>
            &lt;30s
          </span>
          <p style={labelStyle}>TO RUNNING DEV SERVER</p>
        </div>
      </div>
    </section>
  )
}
