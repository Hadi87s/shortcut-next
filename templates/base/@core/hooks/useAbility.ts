'use client'

import { useMemo } from 'react'
import { useAuth } from '@/@core/context/AuthContext'
import { defineAbilitiesFor } from '@/lib/abilities'
import type { Actions, AppAbility, Subjects, UserRole } from '@/lib/abilities'


/**
 * Hook to get CASL ability instance for the current user
 *
 * Usage:
 * ```tsx
 * const ability = useAbility()
 *
 * if (ability.can('read', 'Users')) {
 *   // Show users link
 * }
 *
 * if (ability.can('manage', 'Settings')) {
 *   // Show settings link
 * }
 * ```
 *
 * @returns CASL AppAbility instance
 */
export function useAbility(): AppAbility {
  const { user } = useAuth()

  const ability = useMemo(() => {
    const role = (user?.role as UserRole) || 'viewer'
    return defineAbilitiesFor(role)
  }, [user?.role])

  return ability
}

/**
 * Hook to check if current user can perform an action
 *
 * Convenience wrapper around useAbility for simple permission checks.
 *
 * Usage:
 * ```tsx
 * const canReadUsers = useCan('read', 'Users')
 * const canManageSettings = useCan('manage', 'Settings')
 * ```
 *
 * @param action - The action to check
 * @param subject - The subject to check against
 * @returns boolean indicating if the user can perform the action
 */
export function useCan(
  action: Actions,
  subject: Subjects
): boolean {
  const ability = useAbility()
  return ability.can(action, subject)
}
