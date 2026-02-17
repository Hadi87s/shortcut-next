'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

const steps = [
  {
    number: 'STEP 01',
    title: 'Run the CLI',
    description:
      'Execute npx shortcut-next@latest and follow the interactive prompts. Choose your preset and package manager.'
  },
  {
    number: 'STEP 02',
    title: 'Customize your stack',
    description:
      'Pick between the base MUI stack or add Tailwind v4. Configure roles, themes, and i18n to match your project.'
  },
  {
    number: 'STEP 03',
    title: 'Start building',
    description:
      'Your project is scaffolded with auth, theming, forms, and data fetching — all production-ready.'
  }
]

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Cards slide + scale entrance
      gsap.from('[data-step]', {
        x: -30,
        scale: 0.95,
        autoAlpha: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true
        }
      })

      // Progressive line fill on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: true
            }
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        padding: '100px 24px',
        maxWidth: '700px',
        margin: '0 auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SectionLabel>HOW IT WORKS</SectionLabel>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: 'var(--text)',
            margin: 0
          }}
        >
          Three steps to launch
        </h2>
      </div>

      <div
        style={{
          paddingLeft: '40px',
          position: 'relative'
        }}
      >
        {/* Vertical timeline line (background) */}
        <div
          style={{
            position: 'absolute',
            left: '3px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'var(--border)'
          }}
        />

        {/* Vertical timeline line (fill overlay) */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '3px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'var(--primary)',
            transformOrigin: 'top',
            scaleY: 0
          }}
        />

        {steps.map((step, i) => (
          <div
            key={i}
            data-step
            style={{
              position: 'relative',
              marginBottom: i < steps.length - 1 ? '48px' : 0,
              visibility: 'hidden'
            }}
          >
            {/* Glowing dot with pulse animation */}
            <div
              style={{
                position: 'absolute',
                left: '-40px',
                top: '4px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--primary)',
                boxShadow: '0 0 12px var(--primary)',
                animation: 'glowPulse 2s ease-in-out infinite',
                animationDelay: `${i * 0.5}s`
              }}
            />

            <p
              style={{
                fontFamily: 'var(--font)',
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'var(--primary)',
                letterSpacing: '0.15em',
                margin: 0
              }}
            >
              {step.number}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: 'var(--text)',
                margin: '8px 0 0'
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font)',
                color: 'var(--muted)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                margin: '4px 0 0'
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
