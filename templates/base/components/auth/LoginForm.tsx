'use client'

import { Stack, Typography, TextField, Button, Divider, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react'
import { Icon } from '@iconify/react'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useAuth } from '@/@core/context/AuthContext'
import useLanguage from '@/@core/hooks/useLanguage'

interface LoginFormData {
  email: string
  password: string
  [key: string]: unknown
}

interface LoginFormProps {
  showEmailForm: boolean
  setShowEmailForm: (show: boolean) => void
  onSwitchToSignup: () => void
  onSocialLogin: (provider: 'google' | 'microsoft') => void
}

const MotionStack = motion.create(Stack)

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const }
  }
}

const LoginForm: React.FC<LoginFormProps> = ({ showEmailForm, setShowEmailForm, onSwitchToSignup, onSocialLogin }) => {
  const { t } = useTranslation()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { language } = useLanguage()

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('validation.invalidEmail', 'Invalid email address'))
      .required(t('validation.emailRequired', 'Email is required')),
    password: yup
      .string()
      .min(6, t('validation.passwordMin6', 'Password must be at least 6 characters'))
      .required(t('validation.passwordRequired', 'Password is required'))
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('')
    await login(data, error => {
      setErrorMessage(typeof error === 'string' ? error : 'Login failed')
    })
  }

  return (
    <MotionStack
      spacing={showEmailForm ? 3 : 4}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      exit='hidden'
    >
      <motion.div variants={fadeInUp}>
        <Typography variant='h4' textAlign='center' mb={1}>
          {t('login.brand', 'Welcome Back')}
        </Typography>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Typography variant='body2' textAlign='center' color='text.secondary' mb={showEmailForm ? 1 : 0}>
          {t('login.subtitle', 'Sign in to continue to your account')}
        </Typography>
      </motion.div>

      <motion.div variants={fadeInUp}>
        {!showEmailForm ? (
          <MotionStack spacing={3} variants={staggerContainer} initial='hidden' animate='show' exit='hidden'>
            <motion.div variants={fadeInUp}>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                startIcon={<Icon icon='mdi:google' />}
                onClick={() => onSocialLogin('google')}
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                {t('login.signInWithGoogle', 'Sign in with Google')}
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                startIcon={<Icon icon='mdi:microsoft' />}
                onClick={() => onSocialLogin('microsoft')}
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                {t('login.signInWithMicrosoft', 'Sign in with Microsoft')}
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Divider sx={{ my: 3 }}>
                <Typography variant='body2' textAlign='center' color='text.secondary'>
                  {t('login.or', 'or')}
                </Typography>
              </Divider>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                variant='contained'
                size='large'
                fullWidth
                startIcon={<Mail size={18} />}
                onClick={() => setShowEmailForm(true)}
              >
                {t('login.signInWithEmail', 'Sign in with Email')}
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant='body2' textAlign='center' color='text.secondary' sx={{ mt: 3 }}>
                {t('login.dontHaveAccount', "Don't have an account?")}{' '}
                <Button
                  variant='text'
                  color='primary'
                  onClick={() => {
                    setShowEmailForm(false)
                    onSwitchToSignup()
                  }}
                >
                  {t('login.signUp', 'Sign Up')}
                </Button>
              </Typography>
            </motion.div>
          </MotionStack>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <MotionStack spacing={3} variants={staggerContainer} initial='hidden' animate='show' exit='hidden'>
              <ErrorMessage message={errorMessage} />

              <motion.div variants={fadeInUp}>
                <FormFieldWrapper title={t('login.email', 'Email')}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        placeholder={t('login.emailPlaceholder', 'your@email.com')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <FormFieldWrapper title={t('login.password', 'Password')}>
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='••••••••'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleTogglePasswordVisibility}
                                  onMouseDown={e => e.preventDefault()}
                                  size='small'
                                >
                                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <LoadingButton
                  loading={isLoading}
                  type='submit'
                  variant='contained'
                  size='large'
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {!isLoading && t('login.signIn', 'Sign In')}
                </LoadingButton>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button
                  variant='text'
                  onClick={() => setShowEmailForm(false)}
                  sx={{ color: 'text.secondary' }}
                  startIcon={
                    <ArrowLeft size={16} style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }} />
                  }
                >
                  {t('login.backToSocial', 'Back to social login')}
                </Button>
              </motion.div>
            </MotionStack>
          </form>
        )}
      </motion.div>
    </MotionStack>
  )
}

export default LoginForm
