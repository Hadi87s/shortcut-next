'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function InstallBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const commandRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const [copied, setCopied] = useState(false)
  const [hasTyped, setHasTyped] = useState(false)

  const command = 'npx shortcut-next@latest'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setHasTyped(true)
      return
    }

    const ctx = gsap.context(() => {
      /* Fade in the container */
      gsap.from(contentRef.current, {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            /* Typing effect after container fades in */
            if (!commandRef.current) return

            const chars = command.split('')
            commandRef.current.textContent = ''
            setHasTyped(false)

            const tl = gsap.timeline({ delay: 0.4 })

            chars.forEach((char, i) => {
              tl.call(() => {
                if (commandRef.current) {
                  commandRef.current.textContent += char
                }
              }, [], i * 0.03)
            })

            tl.call(() => {
              setHasTyped(true)
            })
          }
        }
      })

      /* Blinking cursor animation */
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)'
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '48px 0'
      }}
    >
      <div
        ref={contentRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            fontSize: '1rem',
            color: 'var(--muted)'
          }}
        >
          $
        </span>
        <span
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            fontSize: '1rem',
            color: 'var(--primary)',
            userSelect: 'all',
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <span ref={commandRef}>{command}</span>
          <span
            ref={cursorRef}
            style={{
              display: 'inline-block',
              width: '1px',
              height: '1.1em',
              background: 'var(--primary)',
              marginLeft: '2px',
              verticalAlign: 'middle'
            }}
          />
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 10px',
            cursor: 'pointer',
            color: copied ? 'var(--primary)' : 'var(--muted)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
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
    </div>
  )
}
