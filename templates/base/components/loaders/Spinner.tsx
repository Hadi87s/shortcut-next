'use client'

import React from 'react'
import './spinner.css'
import { usePathname } from 'next/navigation'
import { Box } from '@mui/material'

const Spinner = () => {
  const pathname = usePathname()
  const isArabic = pathname?.startsWith('/ar')
  const loadingText = isArabic ? 'جاري التحميل' : 'Loading'
  const direction = isArabic ? 'rtl' : 'ltr'

  return (
    <div className='container' dir={direction}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: `
        radial-gradient(
          circle at center,
          rgba(59, 130, 246, 0.12) 0%,
          rgba(59, 130, 246, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )`
        }}
      />

      <div className='spinner'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} />
        ))}
      </div>
      <div className='loading-text'>
        <span>{loadingText}</span>
        <span className='animated-dots'></span>
      </div>
    </div>
  )
}

export default Spinner
