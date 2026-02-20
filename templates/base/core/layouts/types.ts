import { PaletteMode } from '@mui/material'

export type Mode = PaletteMode | 'semi-dark'
export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

type BadgeColor = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'

export type SidebarSection = {
  sectionTitle: string
  items: (SidebarNavLink | SidebarNavGroup | SidebarNavMore)[]
  auth?: boolean
  action?: string
  subject?: string
  icon?: string
  tooltip?: string
  path?: string
  defaultCollapsed?: boolean
}

export type SidebarNavGroup = {
  title: string
  icon?: string
  auth?: boolean
  action?: string
  subject?: string
  badgeContent?: string
  badgeColor?: BadgeColor
  children?: (SidebarNavGroup | SidebarNavLink)[]
}

export type SidebarNavLink = {
  title: string
  path?: string
  icon?: string
  auth?: boolean
  action?: string
  subject?: string
  disabled?: boolean
  badgeContent?: string
  badgeColor?: BadgeColor
  externalLink?: boolean
  openInNewTab?: boolean
}

export type SidebarNavMore = {
  title: string
  isMore: boolean
  auth?: boolean
  action?: string
  subject?: string
  path?: string
  icon?: string
  tooltip?: string
}

export type SidebarNavItems = (SidebarNavLink | SidebarNavGroup | SidebarSection | SidebarNavMore)[]
