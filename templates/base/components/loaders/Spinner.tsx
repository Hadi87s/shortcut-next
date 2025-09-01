'use client'

import React from 'react'
import './spinner.css'
import { usePathname } from 'next/navigation'

const Spinner = () => {
  const pathname = usePathname()
  const isArabic = pathname?.startsWith('/ar')
  const loadingText = isArabic ? 'جاري التحميل' : 'Loading'
  const direction = isArabic ? 'rtl' : 'ltr'

  return (
    <div className='container' dir={direction}>
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
