'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import BrandLogo from '@/components/landing/BrandLogo'
import MagneticButton from '@/components/landing/MagneticButton'
import { landingContent as lc } from '@/components/landing/landingContent'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      /* Border glow on scroll */
      const handleScroll = () => {
        if (!borderRef.current || !navRef.current) return
        const scrollY = window.scrollY

        if (scrollY > 80) {
          gsap.to(borderRef.current, {
            borderColor: 'rgba(91,116,255,0.25)',
            duration: 0.3,
            overwrite: true
          })
        } else {
          gsap.to(borderRef.current, {
            borderColor: 'var(--border)',
            duration: 0.3,
            overwrite: true
          })
        }

        /* Micro-bounce parallax — nav translates down 2px on scroll */
        const offset = Math.min(scrollY / 200, 1) * 2
        gsap.to(navRef.current, {
          y: offset,
          duration: 0.2,
          overwrite: true,
          ease: 'power1.out'
        })
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      /* Scroll progress bar */
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`
          }
        }
      })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, navRef)

    const handleScroll = () => {
      if (!borderRef.current || !navRef.current) return
      const scrollY = window.scrollY

      if (scrollY > 80) {
        gsap.to(borderRef.current, {
          borderColor: 'rgba(91,116,255,0.25)',
          duration: 0.3,
          overwrite: true
        })
      } else {
        gsap.to(borderRef.current, {
          borderColor: 'var(--border)',
          duration: 0.3,
          overwrite: true
        })
      }

      const offset = Math.min(scrollY / 200, 1) * 2
      gsap.to(navRef.current, {
        y: offset,
        duration: 0.2,
        overwrite: true,
        ease: 'power1.out'
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: -2,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '64px',
        background: 'rgba(11,16,32,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        ref={borderRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          borderBottom: '1px solid var(--border)',
          transition: 'border-color 0.3s ease'
        }}
      >
        {/* Logo */}
        <BrandLogo size='md' />

        {/* CTA Button */}
        <MagneticButton
          as='a'
          href={lc.nav.cta.href}
          style={{
            fontFamily: 'var(--font)',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 20px',
            cursor: 'pointer',
            textDecoration: 'none',
            letterSpacing: '0.02em'
          }}
        >
          {lc.nav.cta.label}
        </MagneticButton>
      </div>

      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: '0%',
          background: 'var(--primary)',
          transition: 'none',
          zIndex: 1001
        }}
      />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .nav-links {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  )
}
