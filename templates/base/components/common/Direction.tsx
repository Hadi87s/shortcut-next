'use client'

// ** React Imports
import { useEffect, ReactNode, useMemo } from 'react'

// ** MUI Imports
import { Direction as MuiDirection } from '@mui/material'

// ** Emotion Imports
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

// ** RTL Plugin
import stylisRTLPlugin from 'stylis-plugin-rtl'

interface DirectionProps {
  children: ReactNode
  direction: MuiDirection
}

const createRtlCache = () =>
  createCache({
    key: 'rtl',
    prepend: true,
    stylisPlugins: [stylisRTLPlugin]
  })

const Direction = (props: DirectionProps) => {
  const { children, direction } = props

  useEffect(() => {
    document.dir = direction
  }, [direction])

  const cache = useMemo(() => createRtlCache(), [])

  if (direction === 'rtl') {
    return <CacheProvider value={cache}>{children}</CacheProvider>
  }

  return <>{children}</>
}

export default Direction
