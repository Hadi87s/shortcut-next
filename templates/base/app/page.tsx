'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import InstallBanner from '@/components/landing/InstallBanner'
import Features from '@/components/landing/Features'
import CodeDemo from '@/components/landing/CodeDemo'
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
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
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
        opacity: 0.2,
        transformOrigin: direction === 'left' ? 'left center' : 'right center'
      }}
    />
  )
}

function ParallaxSection({
  children,
  speed = 0
}: {
  children: React.ReactNode
  speed?: number
}) {
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
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <ParallaxDivider direction="left" />

        <ParallaxSection speed={-20}>
          <InstallBanner />
        </ParallaxSection>

        <ParallaxDivider direction="right" />

        <ParallaxSection speed={-15}>
          <Features />
        </ParallaxSection>

        <ParallaxDivider direction="left" />

        <ParallaxSection speed={-25}>
          <CodeDemo />
        </ParallaxSection>

        <ParallaxDivider direction="right" />

        <ParallaxSection speed={-10}>
          <HowItWorks />
        </ParallaxSection>

        <ParallaxDivider direction="left" />

        <Stats />

        <ParallaxDivider direction="right" />

        <ParallaxSection speed={-15}>
          <FAQ />
        </ParallaxSection>

        <ParallaxDivider direction="left" />

        <CTA />
      </main>
      <Footer />
    </>
  )
}
