'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

const features = [
  {
    num: '01',
    name: 'MUI v7 Themed',
    desc: '30+ components with dark mode, RTL support, and a fully customizable design system.'
  },
  {
    num: '02',
    name: 'Role-Based Auth',
    desc: 'CASL-powered authorization with admin, manager, agent, and viewer roles built in.'
  },
  {
    num: '03',
    name: 'Type-Safe Forms',
    desc: 'React Hook Form with Yup validation, pre-wired with MUI inputs and error handling.'
  },
  {
    num: '04',
    name: 'i18n Ready',
    desc: 'English and Arabic out of the box with auto-detection, RTL layout, and font switching.'
  },
  {
    num: '05',
    name: 'TanStack Query',
    desc: 'Data fetching, caching, and synchronization configured with sensible defaults.'
  },
  {
    num: '06',
    name: 'One Command Setup',
    desc: 'Choose your preset, pick a package manager, and start building in under 30 seconds.'
  }
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.feature-card')
      if (!cards || cards.length === 0) return

      /* Stagger from alternating sides */
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? 30 : -30
        gsap.from(card, {
          x: fromX,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true
          },
          delay: i * 0.08
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    const rotateX = Math.max(-5, Math.min(5, -(mouseY / rect.height) * 10))
    const rotateY = Math.max(-5, Math.min(5, (mouseX / rect.width) * 10))
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    card.style.borderColor = 'var(--border)'
    const overlay = card.querySelector('.card-overlay') as HTMLElement
    if (overlay) overlay.style.opacity = '0'
  }, [])

  const handleMouseEnter = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (!card) return
    card.style.borderColor = 'rgba(91,116,255,0.35)'
    const overlay = card.querySelector('.card-overlay') as HTMLElement
    if (overlay) overlay.style.opacity = '1'
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SectionLabel>FEATURES</SectionLabel>
        <h2
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginTop: '8px'
          }}
        >
          Everything you need, nothing you don&apos;t.
        </h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}
      >
        {features.map((f, i) => (
          <div
            key={f.num}
            ref={(el) => { cardRefs.current[i] = el }}
            className="feature-card"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease, transform 0.3s ease',
              cursor: 'default',
              willChange: 'transform'
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            {/* Hover gradient overlay */}
            <div
              className="card-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(91,116,255,0.04), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }}
            />

            <span
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 400,
                letterSpacing: '0.06em',
                fontSize: '0.7rem',
                color: 'var(--primary)',
                display: 'block',
                marginBottom: '16px',
                position: 'relative',
                zIndex: 1
              }}
            >
              {f.num}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: 'var(--text)',
                marginBottom: '12px',
                position: 'relative',
                zIndex: 1
              }}
            >
              {f.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font)',
                color: 'var(--muted)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 1023px) {
          [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
