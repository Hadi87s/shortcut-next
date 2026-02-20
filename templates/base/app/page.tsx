'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
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
  )
}

function ParallaxSection({ children, speed = 0 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ref.current || speed === 0) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })
    }, ref)

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {children}
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

    // Apply will-change before animation
    heroWrapperRef.current.style.willChange = 'transform, opacity'

    const ctx = gsap.context(() => {
      // Hero fade and scale away effect
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
            // Remove will-change when animation completes
            if (heroWrapperRef.current) {
              heroWrapperRef.current.style.willChange = 'auto'
            }
          }
        }
      })

      // Content entrance - fade in and slide up
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
      <Nav />

      {/* Hero - Fixed position, fades away on scroll */}
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

      {/* Main content - higher z-index to cover hero */}
      <main
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '100vh',
          background: 'var(--bg)'
        }}
      >
        <ParallaxDivider direction='left' />

        <ParallaxSection speed={-30}>
          <InstallBanner />
        </ParallaxSection>

        <ParallaxDivider direction='right' />

        <ParallaxSection speed={-20}>
          <Features />
        </ParallaxSection>

        <ParallaxDivider direction='left' />

        <ParallaxSection speed={-35}>
          <CodeDemo />
        </ParallaxSection>

        <ParallaxDivider direction='right' />

        <ParallaxSection speed={-25}>
          <TechStack />
        </ParallaxSection>

        <ParallaxDivider direction='left' />

        <ParallaxSection speed={-20}>
          <WhatYouGet />
        </ParallaxSection>

        <ParallaxDivider direction='right' />

        <ParallaxSection speed={-15}>
          <HowItWorks />
        </ParallaxSection>

        <ParallaxDivider direction='left' />

        <ParallaxSection speed={-25}>
          <Stats />
        </ParallaxSection>

        <ParallaxDivider direction='right' />

        <ParallaxSection speed={-20}>
          <FAQ />
        </ParallaxSection>

        <ParallaxDivider direction='left' />

        <ParallaxSection speed={-10}>
          <CTA />
        </ParallaxSection>

        <Footer />
      </main>
    </>
  )
}
