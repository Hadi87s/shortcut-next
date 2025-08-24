'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, Typography, Button, Stack } from '@mui/material'
import Link from 'next/link'

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/vercel/next.js')
      return res.json()
    }
  })

  return (
    <main className='p-6'>
      <Stack gap={2}>
        <Typography variant='h4' fontWeight={700}>
          Custom Next.js Template ⚡️
        </Typography>
        <Typography variant='body1'>App Router + Tailwind + MUI + React Query + React Hook Form.</Typography>

        <Card>
          <CardContent>
            <Typography variant='h6'>Sample Fetch (React Query)</Typography>
            {isLoading ? (
              <Typography>Loading…</Typography>
            ) : (
              <Typography>Next.js ⭐ stars: {data?.stargazers_count ?? '—'}</Typography>
            )}
          </CardContent>
        </Card>

        <Stack direction='row' gap={2}>
          <Button variant='contained' component={Link} href='/sample-form'>
            Sample Form
          </Button>
        </Stack>
      </Stack>
    </main>
  )
}
