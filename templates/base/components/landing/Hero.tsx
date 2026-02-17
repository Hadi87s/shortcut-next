'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<(HTMLDivElement | null)[]>([])
  const [copied, setCopied] = useState(false)

  const titleText = 'Stop Starting From Scratch'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('npx shortcut-next@latest')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const chars = sectionRef.current?.querySelectorAll('.hero-char')

      gsap.set([eyebrowRef.current, subRef.current, ctaRef.current, codeRef.current, scrollRef.current], {
        autoAlpha: 0,
        y: 20
      })

      if (chars) {
        gsap.set(chars, { autoAlpha: 0, y: 60 })
      }

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(eyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })

      if (chars && chars.length > 0) {
        tl.to(chars, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out'
        }, '-=0.2')
      }

      tl.to(subRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.2')

      tl.to(ctaRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3')

      tl.to(codeRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3')

      tl.to(scrollRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3')

      /* Title shimmer after entrance completes */
      if (titleRef.current) {
        tl.set(titleRef.current, {
          backgroundImage: 'linear-gradient(90deg, var(--text) 0%, var(--primary-light) 50%, var(--text) 100%)',
          backgroundSize: '200% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundPosition: '100% 0'
        })
        tl.to(titleRef.current, {
          backgroundPosition: '0% 0',
          duration: 1.2,
          ease: 'power2.inOut'
        })
        /* Reset to solid color after shimmer */
        tl.set(titleRef.current, {
          backgroundImage: 'none',
          WebkitTextFillColor: 'var(--text)'
        })
      }

      /* Parallax on background rings */
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return
        gsap.to(ring, {
          y: (i + 1) * -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderTitle = () => {
    const words = titleText.split(' ')
    return words.map((word, wi) => (
      <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char, ci) => (
          <span
            key={`${wi}-${ci}`}
            className="hero-char"
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ))}
        {wi < words.length - 1 && (
          <span className="hero-char" style={{ display: 'inline-block' }}>&nbsp;</span>
        )}
      </span>
    ))
  }

  const ringSizes = [500, 750, 1000]

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        paddingBottom: '80px'
      }}
    >
      {/* Floating orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,116,255,0.15), transparent 70%)',
          pointerEvents: 'none',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '3%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,208,255,0.1), transparent 70%)',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite 1s'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,116,255,0.08), transparent 70%)',
          pointerEvents: 'none',
          animation: 'floatSlow 10s ease-in-out infinite'
        }}
      />

      {/* Background rings */}
      {ringSizes.map((size, i) => (
        <div
          key={size}
          ref={(el) => { ringsRef.current[i] = el }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            opacity: 1 - i * 0.25,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Eyebrow */}
      <p
        ref={eyebrowRef}
        style={{
          fontFamily: 'var(--font)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--primary)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          position: 'relative',
          zIndex: 1,
          visibility: 'hidden'
        }}
      >
        DEVELOPER TOOLKIT
      </p>

      {/* Title */}
      <h1
        ref={titleRef}
        style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          fontSize: 'clamp(3rem, 7vw, 7rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: 'var(--text)',
          maxWidth: '900px',
          padding: '0 24px',
          marginBottom: '28px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {renderTitle()}
      </h1>

      {/* Subheadline */}
      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--font)',
          color: 'var(--muted)',
          maxWidth: '520px',
          lineHeight: 1.7,
          fontSize: '1.1rem',
          padding: '0 24px',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
          visibility: 'hidden'
        }}
      >
        Scaffold production-ready Next.js projects with MUI, auth, i18n, and dark mode — all wired up in seconds.
      </p>

      {/* CTA Row */}
      <div
        ref={ctaRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '48px',
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '0 24px',
          visibility: 'hidden'
        }}
      >
        <a
          href="#get-started"
          style={{
            fontFamily: 'var(--font)',
            fontSize: '0.85rem',
            fontWeight: 600,
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 28px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
        >
          Get Started <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font)',
            fontSize: '0.85rem',
            fontWeight: 500,
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 28px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'border-color 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          View on GitHub
        </a>
      </div>

      {/* Code Snippet */}
      <div
        ref={codeRef}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '520px',
          width: 'calc(100% - 48px)',
          marginBottom: '64px',
          visibility: 'hidden'
        }}
      >
        <code
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            fontSize: '0.95rem',
            color: 'var(--text)',
            flex: 1,
            userSelect: 'all'
          }}
        >
          <span style={{ color: 'var(--muted)' }}>$ </span>
          npx shortcut-next@latest
        </code>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 10px',
            cursor: 'pointer',
            color: copied ? 'var(--primary)' : 'var(--muted)',
            fontFamily: 'var(--font)',
            fontSize: '0.7rem',
            transition: 'color 0.2s ease, border-color 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = 'var(--text)' }}
          onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = 'var(--muted)' }}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
          visibility: 'hidden'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            fontSize: '0.6rem',
            color: 'var(--muted)',
            textTransform: 'uppercase'
          }}
        >
          SCROLL
        </span>
        <div
          className="scroll-line"
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, var(--primary), transparent)'
          }}
        />
      </div>

      {/* Keyframe animations for floating orbs */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-15px); }
        }
      `}</style>
    </section>
  )
}
