'use client'

import * as React from 'react'
import Link from 'next/link'
import { Grid, Link as MuiLink, useTheme } from '@mui/material'
import { Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Tooltip, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Github, Package, FormInput, Sun, Moon } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useToggleMode } from '@/@core/hooks/useToggleMode'
import { useTranslation } from 'react-i18next'
import LanguageDropdown from '@/@core/components/LanguageDropdown'
import GradientText from '@/components/ui/GradientText'

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

  return (
    <Stack spacing={4} alignItems='center' textAlign='center' mb={{ xs: 6, md: 10 }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <GradientText textKey='HomePage.heroTitle' variant='h1' />
      </Stack>
      <Typography variant='h4' lineHeight={1.25} sx={{ maxWidth: 860, opacity: 0.9 }}>
        {t('HomePage.heroDescription')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap flexWrap='wrap' justifyContent='center'>
        {[
          {
            icon: 'simple-icons:mui',
            translationKey: 'HomePage.chips.mui',
            variant: 'filled',
            iconStyle: { borderRadius: 4 }
          },
          {
            icon: null,
            lucideIcon: <FormInput size={18} />,
            translationKey: 'HomePage.chips.reactHookForm',
            variant: 'outlined'
          },
          {
            icon: 'devicon:tailwindcss',
            translationKey: 'HomePage.chips.tailwind',
            variant: 'filled'
          },
          {
            icon: 'devicon:typescript',
            translationKey: 'HomePage.chips.typescript',
            variant: 'outlined',
            iconStyle: { borderRadius: 4 }
          },
          {
            icon: 'devicon:nextjs',
            translationKey: 'HomePage.chips.appRouter',
            variant: 'outlined'
          }
        ].map((chip, index) => (
          <Chip
            key={index}
            icon={
              chip.lucideIcon ||
              (chip.icon ? <Icon icon={chip.icon} width={18} height={18} style={chip.iconStyle || {}} /> : undefined)
            }
            label={t(chip.translationKey)}
            color='primary'
            variant={chip.variant as 'filled' | 'outlined'}
          />
        ))}
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
          <LanguageDropdown />
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
              rel='noopener noreferrer'
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
              rel='noopener noreferrer'
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
          href='https://github.com/hadi87s/shortcut-next'
          underline='none'
          color='primary'
          sx={{ fontWeight: 600 }}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('HomePage.footer', { name: 'Hadi & Imad' })}
        </MuiLink>
      </Typography>
    </Stack>
  )
}
export default function Page() {
  const [copied, setCopied] = React.useState(false)
  const theme = useTheme()

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
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      {theme.palette.mode === 'dark' ? (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            bgcolor: '#020617',
            backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
          `,
            backgroundSize: '32px 32px, 32px 32px, 100% 100%'
          }}
        />
      ) : (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
            backgroundSize: '32px 32px',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)',
            maskImage: 'radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)'
          }}
        />
      )}

      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        <Stack spacing={4}>
          <HeroSection copied={copied} handleCopy={handleCopy} />

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <WhatsIncludedCard copied={copied} handleCopy={handleCopy} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TechLogosCard />
            </Grid>
          </Grid>

          <Footer />
        </Stack>
      </Container>
    </Box>
  )
}
