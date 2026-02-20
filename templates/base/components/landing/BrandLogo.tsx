import { Typography } from '@mui/material'
import { Box } from 'lucide-react'
import React from 'react'

const BrandLogo = () => {
  return (
    <Box
      style={{
        fontFamily: 'var(--font)',
        fontWeight: 800,
        fontSize: '1.1rem',
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        gap: '0px'
      }}
    >
      <Typography
        component='span'
        style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          fontSize: '1.7rem',
          color: 'var(--text)',
          margin: '0 0 8px'
        }}
      >
        <span style={{ color: 'var(--primary)' }}>.</span>shortcut
      </Typography>
    </Box>
  )
}

export default BrandLogo
