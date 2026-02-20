'use client'

import { useEffect, useRef, useState } from 'react'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc, type TreeNode } from '@/components/landing/landingContent'

const included = lc.whatYouGet.includedItems

function collectDirIds(nodes: TreeNode[]): string[] {
  return nodes.flatMap(n =>
    n.type === 'dir' ? [n.id, ...collectDirIds(n.children ?? [])] : []
  )
}

function renderTree(nodes: TreeNode[]): React.ReactNode {
  return nodes.map((node, i) => (
    <TreeItem
      key={node.id}
      itemId={node.id}
      label={<FileLabel name={node.name} type={node.type} comment={node.comment} />}
      sx={i > 0 ? { marginTop: '6px' } : undefined}
    >
      {node.children && renderTree(node.children)}
    </TreeItem>
  ))
}

function FileLabel({
  name,
  comment,
  type
}: {
  name: string
  comment?: string
  type: 'dir' | 'file'
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '1px 0' }}>
      <span
        style={{
          color: type === 'dir' ? 'var(--text)' : 'var(--muted)',
          fontWeight: type === 'dir' ? 600 : 400,
          fontFamily: 'var(--font)',
          fontSize: '0.82rem',
          letterSpacing: '0.02em'
        }}
      >
        {name}
      </span>
      {comment && (
        <span
          style={{
            color: 'var(--primary)',
            fontSize: '0.72rem',
            opacity: 0.75,
            fontFamily: 'var(--font)',
            letterSpacing: '0.01em'
          }}
        >
          {comment}
        </span>
      )}
    </span>
  )
}

const treeSx = {
  color: 'var(--text)',
  '& .MuiTreeItem-content': {
    padding: '3px 8px',
    borderRadius: '6px',
    '&:hover': { background: 'rgba(91,116,255,0.06)' },
    '&.Mui-selected': { background: 'rgba(91,116,255,0.1)' },
    '&.Mui-selected:hover': { background: 'rgba(91,116,255,0.14)' },
    '&.Mui-focused': { background: 'transparent' },
    '&.Mui-selected.Mui-focused': { background: 'rgba(91,116,255,0.1)' }
  },
  '& .MuiTreeItem-iconContainer svg': {
    color: 'var(--primary)',
    opacity: 0.7,
    fontSize: '16px'
  },
  '& .MuiTreeItem-label': {
    fontFamily: 'var(--font)',
    fontSize: '0.82rem'
  },
  '& .MuiCollapse-root': {
    marginLeft: '16px'
  }
}

export default function WhatYouGet() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [expandedItems, setExpandedItems] = useState<string[]>(() =>
    collectDirIds(lc.whatYouGet.fileTree)
  )

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      if (leftRef.current) leftRef.current.style.willChange = 'transform, opacity'
      if (rightRef.current) rightRef.current.style.willChange = 'transform, opacity'

      gsap.from(leftRef.current, {
        x: -60,
        autoAlpha: 0,
        rotationY: -5,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          if (leftRef.current) leftRef.current.style.willChange = 'auto'
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      })

      gsap.from(rightRef.current, {
        x: 60,
        autoAlpha: 0,
        rotationY: 5,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          if (rightRef.current) rightRef.current.style.willChange = 'auto'
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      })

      const includedItems = rightRef.current?.querySelectorAll('.included-item')
      if (includedItems && includedItems.length > 0) {
        gsap.from(includedItems, {
          x: 20,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 70%',
            once: true
          }
        })
      }

      if (leftRef.current) {
        gsap.to(leftRef.current, {
          y: -40,
          rotationY: -2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      }

      if (rightRef.current) {
        gsap.to(rightRef.current, {
          y: 40,
          rotationY: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      }

      const terminal = terminalRef.current
      if (terminal) {
        ScrollTrigger.create({
          trigger: terminal,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(terminal, {
              boxShadow: '0 20px 60px rgba(91,116,255,0.15)',
              duration: 1,
              ease: 'power2.out'
            })
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
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
      <SectionLabel>{lc.whatYouGet.label}</SectionLabel>

      <div
        className='what-you-get-layout'
        style={{
          display: 'flex',
          gap: '64px',
          alignItems: 'flex-start',
          marginTop: '32px'
        }}
      >
        {/* Left — file tree */}
        <div ref={leftRef} style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '16px'
            }}
          >
            {lc.whatYouGet.heading}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font)',
              color: 'var(--muted)',
              lineHeight: 1.7,
              fontSize: '1rem',
              marginBottom: '28px'
            }}
          >
            {lc.whatYouGet.body}
          </p>

          <div
            ref={terminalRef}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden'
            }}
          >
            {/* Terminal chrome */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border)'
              }}
            >
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--error)' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning)' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)' }} />
              <span
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.72rem',
                  color: 'var(--muted)',
                  marginLeft: '8px',
                  letterSpacing: '0.04em'
                }}
              >
                {lc.whatYouGet.terminalLabel}
              </span>
            </div>

            {/* Tree view */}
            <div style={{ padding: '16px 12px 20px' }}>
              <SimpleTreeView
                expandedItems={expandedItems}
                onExpandedItemsChange={(_, items) => setExpandedItems(items)}
                sx={treeSx}
              >
                {renderTree(lc.whatYouGet.fileTree)}
              </SimpleTreeView>
            </div>
          </div>
        </div>

        {/* Right — included features */}
        <div
          ref={rightRef}
          style={{
            flex: 1,
            maxWidth: '420px',
            paddingTop: '120px'
          }}
        >
          {included.map((item, i) => (
            <div
              key={i}
              className='included-item'
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px 0',
                borderBottom: i < included.length - 1 ? '1px solid var(--border)' : 'none'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  flexShrink: 0,
                  marginTop: '6px'
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--text)',
                    margin: 0,
                    marginBottom: '4px'
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font)',
                    fontSize: '0.85rem',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .what-you-get-layout {
            flex-direction: column !important;
          }
          .what-you-get-layout > div {
            max-width: 100% !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
