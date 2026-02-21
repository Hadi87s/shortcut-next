import type { SidebarNavItems } from '@/core/layouts/types'

/**
 * fetchDynamicRoutes
 * Called server-side in app/(dashboard)/layout.tsx.
 * Dynamic items are appended after the static routes from sidebarRoutes.ts.
 */
export async function fetchDynamicRoutes(): Promise<SidebarNavItems> {
  // Step 1: Replace with your actual API call.
  // const res = await fetch('https://your-api.com/navigation', { cache: 'no-store' })
  // const data = await res.json()

  // Step 2: Map the response to SidebarNavItems format.
  // Each item must match one of: SidebarNavLink | SidebarNavGroup | SidebarSection | SidebarNavMore
  // return data.map(item => ({
  //   title: item.label,
  //   path: item.href,
  //   icon: item.iconKey,   // Iconify string, e.g. 'lucide:home'
  // }))

  // Step 3: Add auth/permission fields if needed (items without these are always visible).
  // return data.map(item => ({
  //   title: item.label,
  //   path: item.href, //? or /something/item.id [dynamic routing]
  //   action: 'read',
  //   subject: item.permissionSubject,
  //   icon: 'lucide:iconName',
  // }))

  // Default: return an empty array until you wire up a real data source.
  return []
}
