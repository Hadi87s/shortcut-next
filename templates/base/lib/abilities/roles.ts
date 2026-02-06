import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { AppAbility, UserRole, Actions, Subjects } from './types'

/**
 * Define CASL abilities for each role
 *
 * Role hierarchy: admin > manager > agent > viewer
 *
 * @param role - The user's role
 * @returns CASL Ability instance with permissions for that role
 */
export function defineAbilitiesFor(role: UserRole): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  switch (role) {
    case 'admin':
      // Admin has full access to everything
      can('manage', 'all')
      break

    case 'manager':
      // Manager can read everything
      can('read', 'all')
      // Manager can manage Users, Tickets, and Reports
      can('manage', 'Users')
      can('manage', 'Tickets')
      can('manage', 'Reports')
      // Manager cannot access Settings
      cannot('manage', 'Settings')
      break

    case 'agent':
      // Agent can read Home, Dashboard, Tickets, and Reports
      can('read', 'Home')
      can('read', 'Dashboard')
      can('read', 'Tickets')
      can('read', 'Reports')
      // Agent can manage (CRUD) Tickets
      can('manage', 'Tickets')
      // Agent cannot access Users or Settings
      cannot('read', 'Users')
      cannot('read', 'Settings')
      break

    case 'viewer':
      // Viewer can read Home, Dashboard and Reports
      can('read', 'Home')
      can('read', 'Dashboard')
      can('read', 'Reports')
      // Viewer cannot access anything else
      cannot('read', 'Users')
      cannot('read', 'Tickets')
      cannot('read', 'Settings')
      break

    default:
      // Unknown roles get no permissions
      break
  }

  return build()
}

/**
 * Quick check if a role can access a subject with given action
 *
 * @param role - User's role
 * @param action - The action to check
 * @param subject - The subject to check against
 * @returns true if the role has permission
 */
export function canAccess(role: UserRole, action: Actions, subject: Subjects): boolean {
  const ability = defineAbilitiesFor(role)
  return ability.can(action, subject)
}
