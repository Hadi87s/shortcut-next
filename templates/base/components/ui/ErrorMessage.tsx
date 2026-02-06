'use client'

import { Alert } from '@mui/material'

interface ErrorMessageProps {
  message?: string | null
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null

  return (
    <Alert severity='error' sx={{ mb: 2 }}>
      {message}
    </Alert>
  )
}
