'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import LanguageDropdown from '@/components/common/LanguageDropdown'
import useLanguage from '@/core/hooks/useLanguage'

const MotionBox = motion.create(Box)

const HeroCard = ({ icon, title, desc, delay = 0 }: { icon: string; title: string; desc: string; delay?: number }) => (
  <MotionBox
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    sx={{
      p: 4,
      borderRadius: 5,
      bgcolor: theme => (theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)'),
      border: theme => `1px solid ${theme.palette.divider}`,
      backdropFilter: 'blur(20px)',
      width: '100%',
      maxWidth: 380,
      display: 'flex',
      gap: 3,
      alignItems: 'flex-start',
      boxShadow: theme => theme.shadows[theme.palette.mode === 'light' ? 2 : 10],
      '&:hover': {
        borderColor: 'primary.main',
        bgcolor: theme => (theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255, 255, 255, 0.05)'),
        transform: 'translateY(-5px)',
        transition: 'all 0.3s ease'
      }
    }}
  >
    <Box
      sx={{
        p: 2,
        borderRadius: 5,
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: theme => `0 8px 16px ${theme.palette.primary.main}40`
      }}
    >
      <Icon icon={icon} color='white' fontSize={24} />
    </Box>
    <Box>
      <Typography variant='h6' fontWeight={800} color='text.primary' gutterBottom>
        {title}
      </Typography>
      <Typography variant='body2' sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
        {desc}
      </Typography>
    </Box>
  </MotionBox>
)

const HeroBefore = () => {
  const { t } = useTranslation()

  return (
    <Stack
      spacing={8}
      sx={{ p: { xs: 6, md: 12 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <Box>
        <Typography
          variant='overline'
          sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 2, mb: 1, display: 'block' }}
        >
          {t('login.heroBefore.overline', 'Welcome Back')}
        </Typography>
        <Typography
          variant='h2'
          sx={{ fontWeight: 900, mb: 2, letterSpacing: -1.5, fontSize: { md: '3rem', lg: '3.75rem' } }}
        >
          {t('login.heroBefore.title', 'Sign in to your account')}
        </Typography>
        <Typography variant='h6' sx={{ color: 'text.secondary', maxWidth: 450, fontWeight: 400 }}>
          {t('login.heroBefore.subtitle', 'Access your dashboard and manage your business')}
        </Typography>
      </Box>

      <Stack spacing={3}>
        <HeroCard
          icon='lucide:trending-up'
          title={t('login.heroBefore.card1.title', 'Analytics Dashboard')}
          desc={t('login.heroBefore.card1.desc', 'Track your performance with real-time insights')}
          delay={0.2}
        />
        <HeroCard
          icon='lucide:shield-check'
          title={t('login.heroBefore.card2.title', 'Secure Access')}
          desc={t('login.heroBefore.card2.desc', 'Your data is protected with enterprise-grade security')}
          delay={0.3}
        />
      </Stack>
    </Stack>
  )
}

const HeroAfter = () => {
  const { t } = useTranslation()

  return (
    <Stack
      spacing={8}
      sx={{ p: { xs: 6, md: 12 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <Box>
        <Typography
          variant='overline'
          sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 2, mb: 1, display: 'block' }}
        >
          {t('login.heroAfter.overline', 'Get Started')}
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontWeight: 900,
            color: 'text.primary',
            mb: 2,
            letterSpacing: -1.5,
            fontSize: { md: '3rem', lg: '3.75rem' }
          }}
        >
          {t('login.heroAfter.title', 'Create your account')}
        </Typography>
        <Typography variant='h6' sx={{ color: 'text.secondary', maxWidth: 450, fontWeight: 400 }}>
          {t('login.heroAfter.subtitle', 'Join thousands of businesses already using our platform')}
        </Typography>
      </Box>

      <Stack spacing={3}>
        <HeroCard
          icon='lucide:zap'
          title={t('login.heroAfter.card1.title', 'Quick Setup')}
          desc={t('login.heroAfter.card1.desc', 'Get started in minutes with our simple onboarding')}
          delay={0.2}
        />
        <HeroCard
          icon='lucide:users'
          title={t('login.heroAfter.card2.title', 'Team Collaboration')}
          desc={t('login.heroAfter.card2.desc', 'Invite your team and work together seamlessly')}
          delay={0.3}
        />
      </Stack>
    </Stack>
  )
}

export default function LoginPage() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const { language } = useLanguage()
  const isRTL = language === 'ar'

  const handleSocialLogin = (provider: 'google' | 'microsoft') => {
    console.log(`Login with ${provider}`)
    // TODO: Implement social login
  }

  const handleSwitchToSignup = () => {
    setShowEmailForm(false)
    setCurrentView('signup')
  }

  const handleSwitchToLogin = () => {
    setShowEmailForm(false)
    setCurrentView('login')
  }

  const sliderLeft = currentView === 'login' ? '47%' : '0%'

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden'
      }}
    >
      {/* Hero Areas (Background Layer) - Hidden on mobile */}
      <Box sx={{ position: 'relative', width: '100%', height: '100%', display: { xs: 'none', md: 'flex' }, zIndex: 1 }}>
        <MotionBox
          initial={false}
          animate={{
            opacity: currentView === 'login' ? 1 : 0,
            x: currentView === 'login' ? 0 : -80,
            scale: currentView === 'login' ? 1 : 0.95
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          sx={{ position: 'absolute', top: 0, left: 0, width: '47%', height: '100%' }}
        >
          <HeroBefore />
        </MotionBox>

        <MotionBox
          initial={false}
          animate={{
            opacity: currentView === 'signup' ? 1 : 0,
            x: currentView === 'signup' ? 0 : 80,
            scale: currentView === 'signup' ? 1 : 0.95
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          sx={{ position: 'absolute', top: 0, right: 0, width: '47%', height: '100%' }}
        >
          <HeroAfter />
        </MotionBox>
      </Box>

      {/* Main Slider Panel */}
      <MotionBox
        initial={false}
        animate={{
          [isRTL ? 'right' : 'left']: sliderLeft
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        sx={{
          position: 'absolute',
          top: 0,
          width: { xs: '100%', md: '53%' },
          height: '100%',
          bgcolor: theme => (theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 11, 12, 0.75)'),
          backdropFilter: 'blur(40px) saturate(180%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, md: 12 },
          zIndex: 10,
          borderLeft: theme => (currentView === 'login' ? `1px solid ${theme.palette.divider}` : 'none'),
          borderRight: theme => (currentView === 'signup' ? `1px solid ${theme.palette.divider}` : 'none'),
          boxShadow: theme => theme.shadows[20],
          overflowY: 'auto'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 480, py: 12 }}>
          {/* Header */}
          <Box
            sx={{
              position: 'absolute',
              top: theme => theme.spacing(4),
              left: theme => theme.spacing(4),
              right: theme => theme.spacing(4),
              zIndex: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h5' fontWeight={800} color='primary.main'>
              Logo
            </Typography>
            <LanguageDropdown />
          </Box>

          <AnimatePresence mode='wait'>
            {currentView === 'login' ? (
              <MotionBox
                key='login-panel'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <LoginForm
                  showEmailForm={showEmailForm}
                  setShowEmailForm={setShowEmailForm}
                  onSwitchToSignup={handleSwitchToSignup}
                  onSocialLogin={handleSocialLogin}
                />
              </MotionBox>
            ) : (
              <MotionBox
                key='signup-panel'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <SignupForm onSwitchToLogin={handleSwitchToLogin} />
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </MotionBox>
    </Box>
  )
}
