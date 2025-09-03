'use client'
import './spinner.css'

export default function Spinner() {
  return (
    <div className='container'>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: `radial-gradient(circle at center,
            rgba(59,130,246,.12) 0%,
            rgba(59,130,246,.06) 20%,
            rgba(0,0,0,0) 60%)`
        }}
      />
      <div className='spinner'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>
      <div className='loading-text'>
        <span>Loading</span>
        <span className='animated-dots' />
      </div>
    </div>
  )
}
