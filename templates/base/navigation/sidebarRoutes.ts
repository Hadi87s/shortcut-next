import type { SidebarNavItems } from '@/core/layouts/types'

const navigation = (): SidebarNavItems => [
  {
    title: 'Home',
    path: '/home',
    icon: 'lucide:home',
    subject: 'Home',
    action: 'read'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'lucide:layout-dashboard',
    subject: 'Dashboard',
    action: 'read'
  },
  {
    title: 'Tickets',
    icon: 'lucide:ticket',
    subject: 'Tickets',
    action: 'read',
    children: [
      { title: 'All Tickets', path: '/dashboard/tickets', icon: 'lucide:list' },
      { title: 'My Tickets', path: '/dashboard/tickets/mine', icon: 'lucide:user-check' }
    ]
  },
  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: 'lucide:bar-chart-3',
    subject: 'Reports',
    action: 'read'
  },
  {
    sectionTitle: 'Administration',
    subject: 'Users',
    action: 'read',
    icon: 'lucide:user-plus',
    tooltip: 'Invite a new user',
    path: '/dashboard/users/invite',
    items: [
      {
        title: 'Users',
        path: '/dashboard/users',
        icon: 'lucide:users',
        subject: 'Users',
        action: 'read'
      },
      {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: 'lucide:settings',
        subject: 'Users',
        action: 'manage'
      }
    ]
  }
]

export default navigation
