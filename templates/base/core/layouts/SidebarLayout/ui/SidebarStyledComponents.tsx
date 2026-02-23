'use client'

import { Box, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from '@/core/configs/themeConfig'

// ─── Tooltip anchor ───────────────────────────────────────────────────────────
// Block-level span for MUI Tooltip ref attachment.
// Styled as a native span so no component prop is needed at the call site.
export const NavTooltipAnchor = styled('span')({
  display: 'block'
})

// ─── Clickable nav item row ───────────────────────────────────────────────────
// Shared interactive row for NavLink, NavGroup, and NavMore.
// Pass direction / alignItems / gap as Stack props.
// isActive   → active background highlight
// isDisabled → disabled cursor, reduced opacity, suppressed hover styles
export const NavItemRow = styled(Stack, {
  shouldForwardProp: prop => prop !== 'isActive' && prop !== 'isDisabled'
})<{ isActive?: boolean; isDisabled?: boolean }>(({ theme, isActive, isDisabled }) => ({
  paddingBlock: theme.spacing(0.875),
  marginInline: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  borderRadius: `${themeConfig.common.sidebarRadius / 2}rem`,
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  opacity: isDisabled ? 0.5 : 1,
  backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
  transition: 'background-color 0.15s ease, color 0.15s ease, padding 0.3s ease',
  '&:hover': {
    backgroundColor: isDisabled ? 'transparent' : theme.palette.action.hover,
    color: isDisabled ? 'inherit' : theme.palette.text.primary
  }
}))

// ─── Icon wrapper ─────────────────────────────────────────────────────────────
// Centers a single icon inside a nav row and prevents it from shrinking.
export const NavIconWrapper = styled(Box)({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center'
})

// ─── Smooth collapse/expand grid ─────────────────────────────────────────────
// Animates child height using grid-template-rows 0fr↔1fr without JS measurement.
// Shared by NavGroup and SidebarSection collapse containers.
// isHidden: true  → collapsed (0fr, opacity 0)
// isHidden: false → expanded  (1fr, opacity 1)
export const NavCollapseGrid = styled(Box, {
  shouldForwardProp: prop => prop !== 'isHidden'
})<{ isHidden: boolean }>(({ isHidden }) => ({
  display: 'grid',
  gridTemplateRows: isHidden ? '0fr' : '1fr',
  opacity: isHidden ? 0 : 1,
  transition: 'grid-template-rows 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease'
}))

// ─── Section title header row ─────────────────────────────────────────────────
// Clickable row used exclusively for SidebarSection collapsible headers.
// Pass direction="row" alignItems="center" gap={0.75} as Stack props.
export const SectionHeaderRow = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(0.5),
  cursor: 'pointer',
  userSelect: 'none' as const
}))

// ─── Sidebar scroll area ──────────────────────────────────────────────────────
// Flex-grow scrollable container between the sidebar logo and footer.
export const SidebarScrollArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBlock: theme.spacing(1),
  '&::-webkit-scrollbar': { width: 4 },
  '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 2,
    backgroundColor: theme.palette.action.disabled
  }
}))
