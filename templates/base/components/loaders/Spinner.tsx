'use client'

import { CircularProgress, Stack } from '@mui/material'

export default function Spinner() {
  return (
    <Stack height='100vh' alignItems='center' justifyContent='center'>
      <CircularProgress disableShrink size={16} />
    </Stack>
  )
}
