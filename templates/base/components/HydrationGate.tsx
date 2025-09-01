'use client'
import { useEffect, useState } from 'react'

export default function HydrationGate({
  children,
  fallback
}: {
  children: React.ReactNode
  fallback: React.ReactNode
}) {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  return ready ? <>{children}</> : <>{fallback}</>
}
