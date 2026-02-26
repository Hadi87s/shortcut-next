'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { landingContent as lc } from '@/components/landing/landingContent'

export default function InstallBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const commandRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const [copied, setCopied] = useState(false)
  const [hasTyped, setHasTyped] = useState(false)

  const command = lc.installBanner.command
  const displayText = lc.installBanner.displayText

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
      // Apply will-change before animation
      if (contentRef.current) {
        contentRef.current.style.willChange = 'transform, opacity'
      }

      /* Enhanced fade in with scale and glow effect */
      gsap.from(contentRef.current, {
        y: 30,
        scale: 0.95,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            /* Pulsing glow effect on container */
            if (contentRef.current) {
              gsap.to(contentRef.current, {
                filter: 'drop-shadow(0 0 20px rgba(91,116,255,0.2))',
                duration: 1.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: 2,
                onComplete: () => {
                  if (contentRef.current) {
                    contentRef.current.style.willChange = 'auto'
                    gsap.set(contentRef.current, { filter: 'none' })
                  }
                }
              })
            }

            /* Typing effect after container fades in */
            if (!commandRef.current) return

            const chars = displayText.split('')
            commandRef.current.textContent = ''
            setHasTyped(false)

            const tl = gsap.timeline({ delay: 0.4 })

            // Type each character with individual scale pulse
            chars.forEach((char, i) => {
              tl.call(
                () => {
                  if (commandRef.current) {
                    const charSpan = document.createElement('span')
                    charSpan.textContent = char
                    charSpan.style.display = 'inline-block'
                    commandRef.current.appendChild(charSpan)

                    // Pulse animation on each character
                    gsap.from(charSpan, {
                      scale: 1.3,
                      opacity: 0.5,
                      duration: 0.2,
                      ease: 'power2.out'
                    })
                  }
                },
                [],
                i * 0.04
              )
            })

            tl.call(() => {
              setHasTyped(true)
              // Highlight effect after typing completes
              if (commandRef.current) {
                gsap.fromTo(
                  commandRef.current,
                  { color: 'var(--primary)' },
                  {
                    color: '#ffffff',
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut',
                    onComplete: () => {
                      if (commandRef.current) {
                        gsap.set(commandRef.current, { color: 'var(--primary)' })
                      }
                    }
                  }
                )
              }
            })
          }
        }
      })

      /* Enhanced blinking cursor animation with color pulse */
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
            color: 'var(--primary)',
            userSelect: 'all',
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <span ref={commandRef}>{displayText}</span>
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
          onMouseEnter={e => {
            if (!copied) e.currentTarget.style.color = 'var(--text)'
          }}
          onMouseLeave={e => {
            if (!copied) e.currentTarget.style.color = 'var(--muted)'
          }}
        >
          {copied ? (
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='20 6 9 17 4 12' />
            </svg>
          ) : (
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
              <path d='M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
