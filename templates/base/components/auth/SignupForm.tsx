'use client'

import { Stack, Typography, TextField, Button, InputAdornment, IconButton, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useAuth } from '@/core/context/AuthContext'
import type { UserRole } from '@/lib/abilities'

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  role: UserRole
  [key: string]: unknown
}

interface SignupFormProps {
  onSwitchToLogin: () => void
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
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const }
  }
}

const ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Admin', description: 'Full access to everything' },
  { value: 'manager', label: 'Manager', description: 'Manage users, tickets, and reports' },
  { value: 'agent', label: 'Agent', description: 'Handle tickets and view reports' },
  { value: 'viewer', label: 'Viewer', description: 'View-only access' }
]

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const { t } = useTranslation()
  const { signup, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const signupSchema = yup.object().shape({
    firstName: yup.string().required(t('validation.firstNameRequired', 'First name is required')),
    lastName: yup.string().required(t('validation.lastNameRequired', 'Last name is required')),
    email: yup
      .string()
      .email(t('validation.invalidEmail', 'Invalid email address'))
      .required(t('validation.emailRequired', 'Email is required')),
    phone: yup.string().required(t('validation.phoneRequired', 'Phone is required')),
    role: yup
      .string()
      .oneOf(['admin', 'manager', 'agent', 'viewer'])
      .required(t('validation.roleRequired', 'Role is required')),
    password: yup
      .string()
      .min(8, t('validation.passwordMin8', 'Password must be at least 8 characters'))
      .required(t('validation.passwordRequired', 'Password is required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.passwordsDoNotMatch', 'Passwords do not match'))
      .required(t('validation.confirmPasswordRequired', 'Please confirm your password'))
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'viewer'
    },
    resolver: yupResolver(signupSchema)
  })

  const onSubmit = async (data: SignupFormData) => {
    setErrorMessage('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, firstName, lastName, ...rest } = data

    await signup(
      {
        ...rest,
        name: `${firstName} ${lastName}`
      },
      error => {
        setErrorMessage(typeof error === 'string' ? error : 'Signup failed')
      }
    )
  }

  return (
    <MotionStack spacing={3} variants={staggerContainer} initial='hidden' animate='show' exit='hidden'>
      <motion.div variants={fadeInUp}>
        <Typography variant='h4' textAlign='center' mb={1}>
          {t('signup.title', 'Create Account')}
        </Typography>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Typography variant='body2' textAlign='center' color='text.secondary' mb={1}>
          {t('signup.subtitle', 'Sign up to get started')}
        </Typography>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MotionStack spacing={3} variants={staggerContainer} initial='hidden' animate='show' exit='hidden'>
            <ErrorMessage message={errorMessage} />

            <MotionStack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              variants={staggerContainer}
              initial='hidden'
              animate='show'
              exit='hidden'
            >
              <motion.div variants={fadeInUp} style={{ width: '100%' }}>
                <FormFieldWrapper title={t('signup.firstName', 'First Name')}>
                  <Controller
                    name='firstName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        placeholder={t('signup.firstNamePlaceholder', 'John')}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ width: '100%' }}>
                <FormFieldWrapper title={t('signup.lastName', 'Last Name')}>
                  <Controller
                    name='lastName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size='small'
                        placeholder={t('signup.lastNamePlaceholder', 'Doe')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </motion.div>
            </MotionStack>

            <motion.div variants={fadeInUp}>
              <FormFieldWrapper title={t('signup.email', 'Email')}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size='small'
                      placeholder={t('signup.emailPlaceholder', 'your@email.com')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </FormFieldWrapper>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <FormFieldWrapper title={t('signup.phone', 'Phone')}>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size='small'
                      placeholder={t('signup.phonePlaceholder', '+1 234 567 8900')}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </FormFieldWrapper>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <FormFieldWrapper title={t('signup.password', 'Password')}>
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
              <FormFieldWrapper title={t('signup.confirmPassword', 'Confirm Password')}>
                <Controller
                  name='confirmPassword'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size='small'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
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
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {!isLoading && t('signup.create', 'Create Account')}
              </LoadingButton>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant='body2' textAlign='center' color='text.secondary' sx={{ mt: 3 }}>
                {t('signup.alreadyHaveAccount', 'Already have an account?')}{' '}
                <Button variant='text' onClick={onSwitchToLogin} color='primary'>
                  {t('signup.signIn', 'Sign In')}
                </Button>
              </Typography>
            </motion.div>
          </MotionStack>
        </form>
      </motion.div>
    </MotionStack>
  )
}

export default SignupForm
