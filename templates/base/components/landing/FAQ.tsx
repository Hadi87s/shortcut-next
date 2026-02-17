'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

const faqs = [
  {
    question: 'Do I need to install anything globally?',
    answer:
      'No. Just run npx shortcut-next@latest and the CLI handles everything — project scaffolding, git init, and dependency installation.'
  },
  {
    question: 'Can I use this without Tailwind?',
    answer:
      'Absolutely. The base preset gives you a full MUI stack without Tailwind. Choose the tailwind preset only if you want utility classes.'
  },
  {
    question: 'How does the authorization system work?',
    answer:
      'It uses CASL for role-based access control. Define permissions in a single file, and the middleware enforces them automatically on every route.'
  },
  {
    question: 'Is this production-ready?',
    answer:
      'Yes. The template includes token refresh, error boundaries, proper TypeScript types, and security best practices out of the box.'
  },
  {
    question: 'Can I customize the MUI theme?',
    answer:
      'Every component has its own override file. Change colors, spacing, border-radius, and component styles without touching MUI internals.'
  }
]

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
      gsap.from('[data-faq-item]', {
        y: 25,
        scale: 0.97,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true
        }
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
            gsap.to(currentItem, { borderLeftColor: 'transparent', borderLeftWidth: '3px', duration: 0.3, ease: 'power2.inOut' })
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
          gsap.set(answer, { height: 'auto' })
          const measured = answer.offsetHeight
          gsap.fromTo(answer, { height: 0 }, { height: measured, duration: 0.35, ease: 'power2.inOut' })
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
          gsap.to(item, { borderLeftColor: 'var(--primary)', borderLeftWidth: '3px', duration: 0.3, ease: 'power2.inOut' })
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
          <SectionLabel>FAQ</SectionLabel>
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
          Common questions
        </h2>
      </div>

      <div>
        {faqs.map((faq, i) => (
          <div
            key={i}
            data-faq-item
            ref={(el) => { itemRefs.current[i] = el }}
            style={{
              borderBottom: '1px solid var(--border)',
              borderLeft: '3px solid transparent',
              padding: '20px 0 20px 16px',
              visibility: 'hidden',
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
                ref={(el) => { questionRefs.current[i] = el }}
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
                ref={(el) => { iconRefs.current[i] = el }}
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
              ref={(el) => { answerRefs.current[i] = el }}
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
