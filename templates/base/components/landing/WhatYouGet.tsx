'use client'

import { useEffect, useRef, useState } from 'react'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'

const included = [
  {
    title: 'Login page',
    desc: 'React Hook Form with validation. JWT stored in localStorage and mirrored to cookies for SSR.'
  },
  {
    title: 'Protected dashboard layout',
    desc: 'Collapsible sidebar with nested routes and responsive design. Only accessible to authenticated users.'
  },
  {
    title: 'CASL authorization',
    desc: 'Route map + middleware check on every request. Add a protected route by editing one file.'
  },
  {
    title: 'Auth context',
    desc: 'login(), logout() with token storage, user state, and auto-redirect on session expiry.'
  },
  {
    title: 'Settings context',
    desc: 'Theme mode (dark/light), UI direction (LTR/RTL), and language — persisted to localStorage.'
  },
  {
    title: 'MUI theme system',
    desc: 'core/theme/overrides/ with one file per MUI component. Change global tokens without touching internals.'
  },
  {
    title: 'Axios API client',
    desc: 'Request interceptor injects the access token. Response interceptor handles 401 refresh and cascade logout.'
  },
  {
    title: 'MSW mock layer',
    desc: 'Mock Service Worker pre-configured for local development. Swap real endpoints in when ready.'
  }
]

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
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'app',
    'dashboard-group',
    'lib-abilities',
    'core',
    'core-context',
    'providers'
  ])

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
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onComplete: () => {
            if (leftRef.current) leftRef.current.style.willChange = 'auto'
          }
        }
      })

      gsap.from(rightRef.current, {
        x: 60,
        autoAlpha: 0,
        rotationY: 5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onComplete: () => {
            if (rightRef.current) rightRef.current.style.willChange = 'auto'
          }
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
      <SectionLabel>WHAT YOU GET</SectionLabel>

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
            A working app, not a starting point.
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
            Open your editor to a project that already does something. Every file below is scaffolded and wired on the first run.
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
                project structure
              </span>
            </div>

            {/* Tree view */}
            <div style={{ padding: '16px 12px 20px' }}>
              <SimpleTreeView
                expandedItems={expandedItems}
                onExpandedItemsChange={(_, items) => setExpandedItems(items)}
                sx={treeSx}
              >
                {/* app/ */}
                <TreeItem itemId='app' label={<FileLabel name='app/' type='dir' comment='Next.js App Router root' />}>
                  <TreeItem itemId='dashboard-group' label={<FileLabel name='(dashboard)/' type='dir' comment='protected route group' />}>
                    <TreeItem itemId='dashboard-dir' label={<FileLabel name='dashboard/' type='dir' />}>
                      <TreeItem itemId='dashboard-page' label={<FileLabel name='page.tsx' type='file' comment='→ Dashboard home' />} />
                    </TreeItem>
                    <TreeItem itemId='dashboard-layout' label={<FileLabel name='layout.tsx' type='file' comment='→ Protected sidebar layout' />} />
                  </TreeItem>
                  <TreeItem itemId='home-dir' label={<FileLabel name='home/' type='dir' />}>
                    <TreeItem itemId='home-page' label={<FileLabel name='page.tsx' type='file' comment='→ Home / landing page' />} />
                  </TreeItem>
                  <TreeItem itemId='login-dir' label={<FileLabel name='login/' type='dir' />}>
                    <TreeItem itemId='login-page' label={<FileLabel name='page.tsx' type='file' comment='→ Login with React Hook Form' />} />
                  </TreeItem>
                  <TreeItem itemId='unauthorized-dir' label={<FileLabel name='unauthorized/' type='dir' />}>
                    <TreeItem itemId='unauthorized-page' label={<FileLabel name='page.tsx' type='file' comment='→ CASL redirect target' />} />
                  </TreeItem>
                  <TreeItem itemId='root-layout' label={<FileLabel name='layout.tsx' type='file' comment='→ Root layout + all providers' />} />
                </TreeItem>

                {/* lib/abilities/ */}
                <TreeItem itemId='lib-abilities' label={<FileLabel name='lib/abilities/' type='dir' comment='CASL authorization' />} sx={{ marginTop: '6px' }}>
                  <TreeItem itemId='roles' label={<FileLabel name='roles.ts' type='file' comment='→ Role → ability definitions' />} />
                  <TreeItem itemId='routeMap' label={<FileLabel name='routeMap.ts' type='file' comment='→ Route → permission mapping' />} />
                  <TreeItem itemId='routeMatcher' label={<FileLabel name='routeMatcher.ts' type='file' comment='→ Pattern matching logic' />} />
                  <TreeItem itemId='checkAuth' label={<FileLabel name='checkAuthorization.ts' type='file' comment='→ Auth orchestration' />} />
                </TreeItem>

                {/* core/ */}
                <TreeItem itemId='core' label={<FileLabel name='core/' type='dir' comment='infrastructure layer' />} sx={{ marginTop: '6px' }}>
                  <TreeItem itemId='core-clients' label={<FileLabel name='clients/' type='dir' />}>
                    <TreeItem itemId='apiClient' label={<FileLabel name='apiClient.ts' type='file' comment='→ Axios with token refresh' />} />
                  </TreeItem>
                  <TreeItem itemId='core-context' label={<FileLabel name='context/' type='dir' />}>
                    <TreeItem itemId='authContext' label={<FileLabel name='AuthContext.tsx' type='file' comment='→ login / logout / token state' />} />
                    <TreeItem itemId='settingsContext' label={<FileLabel name='SettingsContext.tsx' type='file' comment='→ theme, language, direction' />} />
                  </TreeItem>
                  <TreeItem itemId='core-theme' label={<FileLabel name='theme/overrides/' type='dir' comment='→ per-component MUI overrides' />} />
                </TreeItem>

                {/* providers/ */}
                <TreeItem itemId='providers' label={<FileLabel name='providers/' type='dir' comment='React context composition' />} sx={{ marginTop: '6px' }}>
                  <TreeItem itemId='appProviders' label={<FileLabel name='AppProviders.tsx' type='file' comment='→ Auth → Settings → Theme → Query' />} />
                  <TreeItem itemId='i18nProvider' label={<FileLabel name='I18nProvider.tsx' type='file' comment='→ i18next initialization' />} />
                </TreeItem>
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
