'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

const steps = lc.howItWorks.steps

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !containerRef.current) return

    const ctx = gsap.context(() => {
      const stepsEls = gsap.utils.toArray<HTMLElement>('[data-step]', containerRef.current)
      const dotsEls  = gsap.utils.toArray<HTMLElement>('[data-step-dot]', containerRef.current)
      const numsEls  = gsap.utils.toArray<HTMLElement>('[data-step-number]', containerRef.current)
      const title    = containerRef.current?.querySelector('h2')

      // Set initial states
      gsap.set(stepsEls, { autoAlpha: 0, y: 24 })
      gsap.set(dotsEls,  { scale: 0 })
      gsap.set(numsEls,  { autoAlpha: 0 })
      if (title) gsap.set(title, { autoAlpha: 0, y: 20 })

      // Single ScrollTrigger drives a timeline — everything fires once, in order
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline()

          // Title
          if (title) {
            tl.to(title, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          }

          // Steps fade up with stagger
          tl.to(stepsEls, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.12
          }, title ? '-=0.2' : 0)

          // Dots scale in, timed with their step
          tl.to(dotsEls, {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            stagger: 0.12
          }, '<')

          // Step numbers fade in
          tl.to(numsEls, {
            autoAlpha: 1,
            duration: 0.3,
            ease: 'power1.out',
            stagger: 0.12
          }, '<0.1')

          // Start dot pulse only after entrance finishes
          tl.call(() => {
            dotsEls.forEach((dot, i) => {
              gsap.to(dot, {
                scale: 1.35,
                opacity: 0.6,
                duration: 1.6,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: i * 0.4
              })
            })
          })
        }
      })

      // Timeline fill line — scrub on scroll
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
              scrub: 1
            }
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [primaryMain])

  return (
    <section ref={containerRef} style={{ padding: '100px 24px', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SectionLabel>{lc.howItWorks.label}</SectionLabel>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: textPrimary,
            margin: 0
          }}
        >
          {lc.howItWorks.heading}
        </h2>
      </div>

      <div style={{ paddingLeft: '40px', position: 'relative' }}>
        {/* Timeline background line */}
        <div style={{ position: 'absolute', left: '3px', top: '8px', bottom: '8px', width: '1px', background: divider }} />

        {/* Timeline fill line */}
        <div
          ref={lineRef}
          style={{ position: 'absolute', left: '3px', top: '8px', bottom: '8px', width: '1px', background: primaryMain, transformOrigin: 'top' }}
        />

        {steps.map((step, i) => (
          <div key={i} data-step style={{ position: 'relative', marginBottom: i < steps.length - 1 ? '48px' : 0, visibility: 'hidden' }}>
            <div
              data-step-dot
              style={{
                position: 'absolute',
                left: '-40px',
                top: '4px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: primaryMain,
                boxShadow: `0 0 10px ${alpha(primaryMain, 0.6)}`
              }}
            />
            <p
              data-step-number
              style={{ fontFamily: 'var(--font)', fontSize: '0.65rem', fontWeight: 600, color: primaryMain, letterSpacing: '0.15em', margin: 0 }}
            >
              {step.number}
            </p>
            <h3 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.2rem', color: textPrimary, margin: '8px 0 0' }}>
              {step.title}
            </h3>
            <p style={{ fontFamily: 'var(--font)', color: textSecondary, fontSize: '0.9rem', lineHeight: 1.6, margin: '4px 0 0' }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
