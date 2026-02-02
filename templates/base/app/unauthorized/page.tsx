'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Box, Button, Container, Typography, Stack, Paper } from '@mui/material'
import { ShieldX, ArrowLeft, Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'

function UnauthorizedContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t } = useTranslation()

  const resource = searchParams.get('resource')
  const action = searchParams.get('action')

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'error.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <ShieldX size={40} color='var(--mui-palette-error-main)' />
          </Box>

          <Typography variant='h4' fontWeight={700} gutterBottom>
            {t('errors.unauthorized.title', 'Access Denied')}
          </Typography>

          <Typography variant='body1' color='text.secondary' sx={{ mb: 1 }}>
            {t('errors.unauthorized.message', "You don't have permission to access this page.")}
          </Typography>

          {(resource || action) && (
            <Typography variant='body2' color='text.disabled' sx={{ mb: 4 }}>
              {resource && action
                ? t('errors.unauthorized.resourceAction', {
                    resource,
                    action,
                    defaultValue: `Required: ${action} access to ${resource}`
                  })
                : resource
                  ? t('errors.unauthorized.resource', {
                      resource,
                      defaultValue: `Required access to: ${resource}`
                    })
                  : null}
            </Typography>
          )}

          <Stack direction='row' spacing={2} justifyContent='center' sx={{ mt: 4 }}>
            <Button variant='outlined' startIcon={<ArrowLeft size={18} />} onClick={() => router.back()}>
              {t('common.goBack', 'Go Back')}
            </Button>
            <Button variant='contained' startIcon={<Home size={18} />} onClick={() => router.push('/dashboard')}>
              {t('common.goHome', 'Go to Dashboard')}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}

/**
 * Unauthorized Page
 *
 * Displayed when a user tries to access a route they don't have permission for.
 * Shows the required resource/action and provides navigation options.
 */
export default function UnauthorizedPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth='sm'>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography>Loading...</Typography>
          </Box>
        </Container>
      }
    >
      <UnauthorizedContent />
    </Suspense>
  )
}
