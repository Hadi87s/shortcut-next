'use client'

import { useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

type MagneticButtonProps = {
  as?: 'button' | 'a'
  children: React.ReactNode
  href?: string
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler
  style?: React.CSSProperties
  className?: string
  'aria-label'?: string
}

export default function MagneticButton({
  as = 'button',
  children,
  style,
  onClick,
  href,
  target,
  rel,
  className,
  'aria-label': ariaLabel
}: MagneticButtonProps) {
  const elRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !elRef.current) return

    elRef.current.style.willChange = 'transform'

    const rect = elRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY

    gsap.to(elRef.current, {
      x: dx * 0.28,
      y: dy * 0.28,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!elRef.current) return
    gsap.to(elRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      onComplete: () => {
        if (elRef.current) elRef.current.style.willChange = 'auto'
      }
    })
  }, [])

  if (as === 'a') {
    return (
      <a
        ref={elRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        style={style}
        className={className}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={elRef as React.Ref<HTMLButtonElement>}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      style={style}
      className={className}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  )
}
