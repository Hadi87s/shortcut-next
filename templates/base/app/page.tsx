'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import InstallBanner from '@/components/landing/InstallBanner'
import Features from '@/components/landing/Features'
import CodeDemo from '@/components/landing/CodeDemo'
import TechStack from '@/components/landing/TechStack'
import WhatYouGet from '@/components/landing/WhatYouGet'
import HowItWorks from '@/components/landing/HowItWorks'
import Stats from '@/components/landing/Stats'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'
import { landingContent as lc } from '@/components/landing/landingContent'

// Decorative "+" marker rendered at the left and right ends of each divider line.
// Hidden below 1024 px via the .section-marker class.
function SectionMarker({ side }: { side: 'left' | 'right' }) {
  const offset = 'calc(50% - 600px)'
  // Left-anchored: translate(-50%) centers the marker over the left guide line.
  // Right-anchored: translate(+50%) centers the marker over the right guide line.
  const translateX = side === 'left' ? '-50%' : '50%'
  return (
    <span
      className='section-marker'
      style={{
        position: 'absolute',
        top: '50%',
        [side]: offset,
        transform: `translate(${translateX}, -50%)`,
        fontSize: '1.1rem',
        lineHeight: 1,
        color: `rgba(var(--primary-rgb), 0.55)`,
        fontWeight: 300,
        letterSpacing: 0,
        userSelect: 'none',
        pointerEvents: 'none'
      }}
    >
      +
    </span>
  )
}

function ParallaxDivider({ direction = 'left' }: { direction?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.3,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            once: true
          }
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <SectionMarker side='left' />
      <SectionMarker side='right' />
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          height: '1px',
          background: `linear-gradient(${direction === 'left' ? 'to right' : 'to left'}, var(--primary), transparent)`,
          opacity: 0,
          transformOrigin: direction === 'left' ? 'left center' : 'right center',
          boxShadow: `0 0 20px ${direction === 'left' ? 'var(--primary)' : 'transparent'}`
        }}
      />
    </div>
  )
}


export default function Page() {
  const heroWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    if (!heroWrapperRef.current || !contentRef.current) return

    heroWrapperRef.current.style.willChange = 'transform, opacity'

    const ctx = gsap.context(() => {
      gsap.to(heroWrapperRef.current, {
        scale: 0.85,
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom',
          end: 'top 30%',
          scrub: 1.5,
          onLeave: () => {
            if (heroWrapperRef.current) {
              heroWrapperRef.current.style.willChange = 'auto'
            }
          }
        }
      })

      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          once: true
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {lc.nav.visible && <Nav />}

      {/* Hero - Fixed position, fades away on scroll */}
      {lc.hero.visible && (
        <div
          ref={heroWrapperRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1
          }}
        >
          <Hero />
        </div>
      )}

      {/* Main content - higher z-index to cover hero */}
      <main
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '100vh',
          background: 'var(--bg)',
          overflowX: 'hidden'
        }}
      >
        {/* Vertical guide lines — visible only on lg+ screens */}
        <div
          className='guide-line guide-line--left'
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 'calc(50% - 600px)',
            width: '1px',
            background: `linear-gradient(to bottom, transparent, rgba(var(--primary-rgb), 0.12) 10%, rgba(var(--primary-rgb), 0.12) 90%, transparent)`,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        <div
          className='guide-line guide-line--right'
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 'calc(50% - 600px)',
            width: '1px',
            background: `linear-gradient(to bottom, transparent, rgba(var(--primary-rgb), 0.12) 10%, rgba(var(--primary-rgb), 0.12) 90%, transparent)`,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <ParallaxDivider direction='left' />

        {lc.installBanner.visible && <InstallBanner />}

        <ParallaxDivider direction='right' />

        {lc.features.visible && <Features />}

        <ParallaxDivider direction='left' />

        {lc.codeDemo.visible && <CodeDemo />}

        <ParallaxDivider direction='right' />

        {lc.techStack.visible && <TechStack />}

        <ParallaxDivider direction='left' />

        {lc.whatYouGet.visible && <WhatYouGet />}

        <ParallaxDivider direction='right' />

        {lc.howItWorks.visible && <HowItWorks />}

        <ParallaxDivider direction='left' />

        {lc.stats.visible && <Stats />}

        <ParallaxDivider direction='right' />

        {lc.faq.visible && <FAQ />}

        <ParallaxDivider direction='left' />

        {lc.cta.visible && <CTA />}

        {lc.footer.visible && <Footer />}
      </main>

      <style>{`
        .guide-line,
        .section-marker {
          display: none;
        }
        @media (min-width: 1024px) {
          .guide-line,
          .section-marker {
            display: block;
          }
        }
      `}</style>
    </>
  )
}
