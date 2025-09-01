'use client'

import * as React from 'react'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'
import { Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Tooltip, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Github, Package, LayoutDashboard, FormInput, Sun, Moon } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useToggleMode } from '@/@core/hooks/useToggleMode'
import { useTranslation } from 'react-i18next'
import '../../lib/i18n/client'
import LanguageDropdown from '@/@core/components/LanguageDropdown'
import { useSettings } from '@/@core/hooks/useSettings'

const Code = ({ children }: { children: React.ReactNode }) => (
  <Box
    component='code'
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      px: 1.25,
      py: 0.75,
      borderRadius: 1,
      bgcolor: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.12)',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      fontSize: 14
    }}
  >
    {children}
  </Box>
)

function HeroSection({}: { copied: boolean; handleCopy: (text: string) => void }) {
  const { mode, toggleMode } = useToggleMode()
  const { t } = useTranslation()
  const { settings, saveSettings } = useSettings()

  return (
    <Stack spacing={4} alignItems='center' textAlign='center' mb={{ xs: 6, md: 10 }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <LayoutDashboard size={28} />
        <Typography variant='h4' fontWeight={800} letterSpacing={0.2}>
          {t('HomePage.heroTitle')}
        </Typography>
      </Stack>
      <Typography variant='h6' sx={{ maxWidth: 860, opacity: 0.9 }}>
        {t('HomePage.heroDescription')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap flexWrap='wrap' justifyContent='center'>
        <Chip
          icon={<Icon icon='simple-icons:mui' width={18} height={18} style={{ borderRadius: 4 }} />}
          label={t('HomePage.chips.mui')}
          color='primary'
          variant='filled'
        />
        <Chip icon={<FormInput size={18} />} label={t('HomePage.chips.reactHookForm')} variant='outlined' />
        <Chip
          icon={<Icon icon='devicon:tailwindcss' width={18} height={18} />}
          label={t('HomePage.chips.tailwind')}
          variant='outlined'
        />
        <Chip
          icon={<Icon icon='devicon:typescript' width={18} height={18} style={{ borderRadius: 4 }} />}
          label={t('HomePage.chips.typescript')}
          variant='outlined'
        />
        <Chip
          icon={<Icon icon='devicon:nextjs' width={18} height={18} />}
          label={t('HomePage.chips.appRouter')}
          variant='outlined'
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={1}>
        <Button
          size='large'
          variant='contained'
          onClick={toggleMode}
          startIcon={mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        >
          {t('HomePage.toggleTheme')} ({mode === 'dark' ? t('common.dark') : t('common.light')})
        </Button>
        <Box>
          <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        </Box>
      </Stack>
    </Stack>
  )
}

function WhatsIncludedCard({ copied, handleCopy }: { copied: boolean; handleCopy: (text: string) => void }) {
  const { t } = useTranslation()

  return (
    <Card
      sx={{
        backdropFilter: 'saturate(120%) blur(6px)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.08)',
        height: '100%'
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant='h6' fontWeight={700}>
            {t('HomePage.features.title')}
          </Typography>

          <Stack spacing={1.25} sx={{ opacity: 0.9 }}>
            {/* Use static list since type mapping is causing issues */}
            <Typography>• {t('HomePage.features.list.0')}</Typography>
            <Typography>• {t('HomePage.features.list.1')}</Typography>
            <Typography>• {t('HomePage.features.list.2')}</Typography>
            <Typography>• {t('HomePage.features.list.3')}</Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Typography variant='subtitle2'>{t('HomePage.scaffold.title')}</Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems='center'>
            <Code>npx shortcut-next@latest</Code>
            <Tooltip title={copied ? t('HomePage.scaffold.copied') : t('HomePage.scaffold.copy')}>
              <Button
                variant='outlined'
                size='small'
                startIcon={<ContentCopyIcon fontSize='small' />}
                onClick={() => handleCopy('npx shortcut-next@latest')}
              >
                {copied ? t('HomePage.scaffold.copied') : t('HomePage.scaffold.copy')}
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

function TechLogosCard() {
  const { t } = useTranslation()

  return (
    <Card
      sx={{
        height: '100%',
        backdropFilter: 'saturate(120%) blur(6px)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.08)'
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant='h6' fontWeight={700}>
            {t('HomePage.techStack.title')}
          </Typography>

          <Stack direction='row' spacing={2} alignItems='center' flexWrap='wrap' useFlexGap>
            {/* Static tech stack icons */}
            <Tooltip title='MUI' arrow placement='top'>
              <span>
                <Icon icon='simple-icons:mui' width={28} height={28} style={{ borderRadius: 4 }} />
              </span>
            </Tooltip>
            <Tooltip title='Tailwind CSS' arrow placement='top'>
              <span>
                <Icon icon='devicon:tailwindcss' width={28} height={28} />
              </span>
            </Tooltip>
            <Tooltip title='React' arrow placement='top'>
              <span>
                <Icon icon='devicon:react' width={28} height={28} />
              </span>
            </Tooltip>
            <Tooltip title='Next.js' arrow placement='top'>
              <span>
                <Icon icon='devicon:nextjs' width={28} height={28} />
              </span>
            </Tooltip>
            <Tooltip title='React Hook Form' arrow placement='top'>
              <span>
                <Icon icon='simple-icons:reacthookform' width={28} height={28} />
              </span>
            </Tooltip>
            <Tooltip title='TypeScript' arrow placement='top'>
              <span>
                <Icon icon='devicon:typescript' width={28} height={28} style={{ borderRadius: 4 }} />
              </span>
            </Tooltip>
          </Stack>

          <Typography variant='body2' sx={{ opacity: 0.85 }}>
            {t('HomePage.techStack.description')}
          </Typography>

          <Divider />

          <Stack direction='row' spacing={2}>
            <Button
              variant='outlined'
              size='small'
              startIcon={<Github size={18} />}
              endIcon={<OpenInNewIcon />}
              component={Link}
              href='https://github.com/Hadi87s/shortcut-next'
              target='_blank'
              rel='noopener'
            >
              GitHub
            </Button>
            <Button
              variant='outlined'
              size='small'
              startIcon={<Package size={18} />}
              endIcon={<OpenInNewIcon />}
              component={Link}
              href='https://www.npmjs.com/package/shortcut-next'
              target='_blank'
              rel='noopener'
            >
              npm
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

function Footer() {
  const { t } = useTranslation()

  return (
    <Stack alignItems='center' mt={8} sx={{ opacity: 0.65 }}>
      <Typography variant='body2'>
        <MuiLink
          href='https://github.com/hadi87s/quickstart-next'
          underline='none'
          color='primary'
          sx={{ fontWeight: 600 }}
          target='_blank'
          rel='noopener'
        >
          {t('HomePage.footer', { name: 'Hadi & Imad' })}
        </MuiLink>
      </Typography>
    </Stack>
  )
}
export default function Page() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // noop
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      {/* Gradient background */}
      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          '&::before, &::after': {
            content: "''",
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.22,
            transform: 'translate(-30%, -20%)',
            background: 'radial-gradient(closest-side, #7C4DFF, transparent 70%)',
            animation: 'float1 16s ease-in-out infinite'
          },
          '&::after': {
            right: -120,
            bottom: -120,
            left: 'auto',
            top: 'auto',
            width: 620,
            height: 620,
            opacity: 0.18,
            transform: 'translate(20%, 10%)',
            background: 'radial-gradient(closest-side, #00E5FF, transparent 70%)',
            animation: 'float2 18s ease-in-out infinite'
          },
          '@keyframes float1': {
            '0%, 100%': { transform: 'translate(-30%, -20%) scale(1)' },
            '50%': { transform: 'translate(-10%, -10%) scale(1.08)' }
          },
          '@keyframes float2': {
            '0%, 100%': { transform: 'translate(20%, 10%) scale(1)' },
            '50%': { transform: 'translate(10%, 20%) scale(0.95)' }
          }
        }}
      />

      {/* Main content */}
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        <Stack spacing={4}>
          <HeroSection copied={copied} handleCopy={handleCopy} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3 }}>
            <Box>
              <WhatsIncludedCard copied={copied} handleCopy={handleCopy} />
            </Box>
            <Box>
              <TechLogosCard />
            </Box>
          </Box>

          <Footer />
        </Stack>
      </Container>
    </Box>
  )
}
