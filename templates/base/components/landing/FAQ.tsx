'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'

const faqs = lc.faq.items

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const questionRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !containerRef.current) return

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('[data-faq-item]')

      // Apply will-change before animation
      items?.forEach(item => {
        if (item instanceof HTMLElement) {
          item.style.willChange = 'transform, opacity'
        }
      })

      // Enhanced entrance with 3D perspective
      gsap.from('[data-faq-item]', {
        y: 30,
        rotationX: -5,
        scale: 0.95,
        autoAlpha: 0,
        stagger: {
          amount: 0.5,
          from: 'start',
          ease: 'power2.out'
        },
        duration: 0.7,
        ease: 'power3.out',
        onComplete: () => {
          items?.forEach(item => {
            if (item instanceof HTMLElement) {
              item.style.willChange = 'auto'
            }
          })
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true
        }
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

      // Parallax effect on FAQ items
      items?.forEach((item, i) => {
        gsap.to(item, {
          y: (i - items.length / 2) * -5,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggle = useCallback(
    (index: number) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Close current
      if (openIndex !== null) {
        const currentAnswer = answerRefs.current[openIndex]
        const currentIcon = iconRefs.current[openIndex]
        const currentItem = itemRefs.current[openIndex]
        const currentQuestion = questionRefs.current[openIndex]

        if (currentAnswer) {
          if (prefersReduced) {
            currentAnswer.style.height = '0px'
          } else {
            gsap.to(currentAnswer, { height: 0, duration: 0.35, ease: 'power2.inOut' })
          }
        }
        if (currentIcon) {
          if (prefersReduced) {
            currentIcon.style.transform = 'rotate(0deg)'
          } else {
            gsap.to(currentIcon, { rotation: 0, duration: 0.3, ease: 'power2.inOut' })
          }
        }
        // Remove active highlight
        if (currentItem) {
          if (prefersReduced) {
            currentItem.style.borderLeft = '3px solid transparent'
          } else {
            gsap.to(currentItem, {
              borderLeftColor: 'transparent',
              borderLeftWidth: '3px',
              duration: 0.3,
              ease: 'power2.inOut'
            })
          }
        }
        if (currentQuestion) {
          if (prefersReduced) {
            currentQuestion.style.color = 'var(--text)'
          } else {
            gsap.to(currentQuestion, { color: 'var(--text)', duration: 0.3, ease: 'power2.inOut' })
          }
        }
      }

      // Open new (if different)
      if (openIndex === index) {
        setOpenIndex(null)
        return
      }

      const answer = answerRefs.current[index]
      const icon = iconRefs.current[index]
      const item = itemRefs.current[index]
      const question = questionRefs.current[index]

      if (answer) {
        if (prefersReduced) {
          answer.style.height = 'auto'
        } else {
          answer.style.height = 'auto'
          const measured = answer.offsetHeight
          answer.style.height = '0px'
          gsap.to(answer, { height: measured, duration: 0.35, ease: 'power2.inOut' })
        }
      }
      if (icon) {
        if (prefersReduced) {
          icon.style.transform = 'rotate(45deg)'
        } else {
          gsap.to(icon, { rotation: 45, duration: 0.3, ease: 'power2.inOut' })
        }
      }
      // Add active highlight
      if (item) {
        if (prefersReduced) {
          item.style.borderLeft = '3px solid var(--primary)'
        } else {
          gsap.to(item, {
            borderLeftColor: 'var(--primary)',
            borderLeftWidth: '3px',
            duration: 0.3,
            ease: 'power2.inOut'
          })
        }
      }
      if (question) {
        if (prefersReduced) {
          question.style.color = 'var(--primary)'
        } else {
          gsap.to(question, { color: 'var(--primary)', duration: 0.3, ease: 'power2.inOut' })
        }
      }

      setOpenIndex(index)
    },
    [openIndex]
  )

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
          <SectionLabel>{lc.faq.label}</SectionLabel>
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
          {lc.faq.heading}
        </h2>
      </div>

      <div>
        {faqs.map((faq, i) => (
          <div
            key={i}
            data-faq-item
            ref={el => {
              itemRefs.current[i] = el
            }}
            style={{
              borderBottom: '1px solid var(--border)',
              borderLeft: '3px solid transparent',
              padding: '20px 0 20px 16px',
              transition: 'none'
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span
                ref={el => {
                  questionRefs.current[i] = el
                }}
                style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  fontFamily: 'var(--font)'
                }}
              >
                {faq.question}
              </span>
              <span
                ref={el => {
                  iconRefs.current[i] = el
                }}
                style={{
                  fontSize: '1.4rem',
                  color: 'var(--muted)',
                  lineHeight: 1,
                  flexShrink: 0,
                  marginLeft: '16px',
                  display: 'inline-block',
                  fontFamily: 'var(--font)'
                }}
              >
                +
              </span>
            </button>
            <div
              ref={el => {
                answerRefs.current[i] = el
              }}
              style={{
                height: 0,
                overflow: 'hidden'
              }}
            >
              <p
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--font)',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  paddingTop: '12px',
                  margin: 0
                }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
