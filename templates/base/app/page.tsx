'use client'

import * as React from 'react'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Github, Package, LayoutDashboard, FormInput, Sun, Moon } from 'lucide-react'
import { Icon } from '@iconify/react'
import { ColorModeContext } from '@/@core/theme/ThemeComponent'

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
  const colorMode = React.useContext(ColorModeContext)
  const { mode, toggle } = colorMode || { mode: 'light', toggle: () => {} }

  return (
    <Stack spacing={3} alignItems='center' textAlign='center' sx={{ mb: { xs: 6, md: 10 } }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <LayoutDashboard size={28} style={{ verticalAlign: 'middle' }} />
        <Typography variant='h4' fontWeight={800} letterSpacing={0.2} sx={{ ml: 1 }}>
          Shortcut Next
        </Typography>
      </Stack>
      <Typography variant='h6' sx={{ maxWidth: 860, opacity: 0.9 }}>
        A modern Next.js boilerplate powered by <b>MUI</b> with room for <b>React Query</b>, <b>React Hook Form</b>, and
        optional <b>Tailwind&nbsp;v4</b>.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap flexWrap='wrap'>
        <Chip
          icon={<Icon icon='simple-icons:mui' width={18} height={18} style={{ borderRadius: 4 }} />}
          label='MUI'
          color='primary'
          variant='filled'
        />
        <Chip icon={<FormInput size={18} />} label='React Hook Form' variant='outlined' />
        <Chip
          icon={<Icon icon='devicon:tailwindcss' width={18} height={18} />}
          label='Tailwind v4 (optional)'
          variant='outlined'
        />
        <Chip
          icon={<Icon icon='devicon:typescript' width={18} height={18} style={{ borderRadius: 4 }} />}
          label='TypeScript'
          variant='outlined'
        />
        <Chip icon={<Icon icon='devicon:nextjs' width={18} height={18} />} label='App Router' variant='outlined' />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
        <Button
          size='large'
          variant='contained'
          onClick={toggle}
          startIcon={mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        >
          Toggle Theme ({mode === 'dark' ? 'Dark' : 'Light'})
        </Button>
        <Button
          size='large'
          variant='outlined'
          endIcon={<OpenInNewIcon />}
          component={Link}
          href='#'
          target='_blank'
          rel='noopener'
        >
          View Docs
        </Button>
      </Stack>
    </Stack>
  )
}

function WhatsIncludedCard({ copied, handleCopy }: { copied: boolean; handleCopy: (text: string) => void }) {
  return (
    <Card
      sx={{
        backdropFilter: 'saturate(120%) blur(6px)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.08)'
      }}
    >
      <CardContent>
        <Typography variant='h6' fontWeight={700} gutterBottom>
          What’s included
        </Typography>
        <Stack spacing={1.25} sx={{ opacity: 0.9 }}>
          <Typography>• Next.js 15 (App Router) + TypeScript</Typography>
          <Typography>• MUI ThemeProvider + dark-ready UI</Typography>
          <Typography>
            • RHF starter form at <code>/sample-form</code>
          </Typography>
          <Typography>• Easy opt-in Tailwind v4 (via CLI preset)</Typography>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Typography variant='subtitle2' gutterBottom>
          Scaffold via npx
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems='center'>
          <Code>npx shortcut-next@latest</Code>
          <Tooltip title={copied ? 'Copied!' : 'Copy'}>
            <Button
              variant='outlined'
              size='small'
              startIcon={<ContentCopyIcon fontSize='small' />}
              onClick={() => handleCopy('npx shortcut-next@latest')}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  )
}

function TechLogosCard() {
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
        <Typography variant='h6' fontWeight={700} gutterBottom>
          Current Tech
        </Typography>
        <Stack direction='row' spacing={2} alignItems='center' sx={{ pb: 1.5 }}>
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
          These are the core technologies powering this template. Hover over each logo to see its name.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction='row' spacing={1.5}>
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
      </CardContent>
    </Card>
  )
}

function Footer() {
  return (
    <Stack alignItems='center' sx={{ mt: 8, opacity: 0.65 }}>
      <Typography variant='body2'>
        Built with ❤️ by{' '}
        <MuiLink
          href='https://github.com/hadi87s/quickstart-next'
          underline='none'
          color='primary'
          sx={{ fontWeight: 600 }}
          target='_blank'
          rel='noopener'
        >
          Hadi
        </MuiLink>{' '}
        using MUI. Ready for Tailwind v4, React Query, and more.
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
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        <HeroSection copied={copied} handleCopy={handleCopy} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <WhatsIncludedCard copied={copied} handleCopy={handleCopy} />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <TechLogosCard />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </Box>
  )
}
