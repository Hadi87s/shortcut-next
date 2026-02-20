'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

const steps = [
  {
    number: 'STEP 01',
    title: 'Run the CLI',
    description:
      'Launch the interactive prompt. Answer three questions: project name, template preset, and package manager. The CLI handles the rest — git init, dependency install, project structure.'
  },
  {
    number: 'STEP 02',
    title: 'Choose your preset',
    description:
      'Pick the base MUI stack or add Tailwind v4. Dependencies install automatically with a clean initial commit ready to push.'
  },
  {
    number: 'STEP 03',
    title: 'Open your editor and ship',
    description:
      'Your project has a working login page, a protected dashboard, JWT handling, CASL middleware, and MUI theming — ready for your first feature commit.'
  }
]

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !containerRef.current) return

    const ctx = gsap.context(() => {
      const steps = containerRef.current?.querySelectorAll('[data-step]')

      // Apply will-change before animations
      steps?.forEach(step => {
        if (step instanceof HTMLElement) {
          step.style.willChange = 'transform, opacity'
        }
      })

      // Enhanced cards entrance with 3D depth
      gsap.from('[data-step]', {
        x: -50,
        y: 30,
        rotationY: -10,
        scale: 0.9,
        autoAlpha: 0,
        stagger: {
          amount: 0.6,
          ease: 'power2.inOut'
        },
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
          onComplete: () => {
            steps?.forEach(step => {
              if (step instanceof HTMLElement) {
                step.style.willChange = 'auto'
              }
            })
          }
        }
      })

      // Animate step numbers with bounce
      const stepNumbers = containerRef.current?.querySelectorAll('[data-step-number]')
      stepNumbers?.forEach((num, i) => {
        gsap.from(num, {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true
          },
          delay: i * 0.2 + 0.3
        })
      })

      // Progressive line fill with glow effect
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, filter: 'drop-shadow(0 0 4px rgba(91,116,255,0.8))' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: 1,
              onUpdate: self => {
                // Fade out glow as scroll progresses
                if (lineRef.current) {
                  const glowIntensity = 0.8 * (1 - self.progress)
                  lineRef.current.style.filter = `drop-shadow(0 0 4px rgba(91,116,255,${glowIntensity}))`
                }
              }
            }
          }
        )
      }

      // Animate dots with pulse
      const dots = containerRef.current?.querySelectorAll('[data-step-dot]')
      dots?.forEach((dot, i) => {
        // Entrance animation
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(3)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true
          },
          delay: i * 0.2 + 0.5
        })

        // Continuous subtle pulse
        gsap.to(dot, {
          scale: 1.3,
          opacity: 0.7,
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.3
        })
      })

      // Parallax on steps
      steps?.forEach((step, i) => {
        gsap.to(step, {
          y: (i - 1) * -10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })

      // Animate title
      const title = containerRef.current?.querySelector('h2')
      if (title) {
        gsap.from(title, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true
          }
        })
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
          Interactive setup. Instant structure.
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
              data-step-dot
              style={{
                position: 'absolute',
                left: '-40px',
                top: '4px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--primary)',
                boxShadow: '0 0 12px var(--primary)'
              }}
            />

            <p
              data-step-number
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
