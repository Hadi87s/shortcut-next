// ** Type Imports
import { PaletteMode } from '@mui/material'

export type Mode = PaletteMode | 'semi-dark'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type NavSectionTitle = {
  auth?: boolean
  action?: string
  subject?: string
  sectionTitle: string
}

export type NavGroup = {
  icon?: string
  title: string
  auth?: boolean
  action?: string
  subject?: string
  badgeContent?: string
  children?: (NavGroup | NavLink)[]
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavLink = {
  icon?: string
  path?: string
  title: string
  auth?: boolean
  action?: string
  subject?: string
  disabled?: boolean
  badgeContent?: string
  externalLink?: boolean
  openInNewTab?: boolean
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[]
export type HorizontalNavItemsType = (NavLink | NavGroup)[]
