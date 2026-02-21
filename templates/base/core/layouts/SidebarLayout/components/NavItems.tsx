'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useAbility } from '@/core/hooks/useAbility'
import type { Actions, Subjects } from '@/lib/abilities'
import type { SidebarNavItems, SidebarNavGroup, SidebarNavLink, SidebarSection, SidebarNavMore } from '@/core/layouts/types'
import SidebarNavLinkItem from './SidebarNavLink'
import SidebarNavGroupItem from './SidebarNavGroup'
import SidebarSectionItem from './SidebarSection'
import SidebarNavMoreItem from './SidebarNavMore'

type NavItem = SidebarNavItems[number]
type ItemKind = 'section' | 'more' | 'group' | 'link'

export const isSection = (item: NavItem): item is SidebarSection => 'sectionTitle' in item
export const isNavMore = (item: NavItem): item is Extract<NavItem, { isMore: boolean }> => 'isMore' in item
export const isNavGroup = (item: NavItem): item is SidebarNavGroup =>
  'children' in item && !('sectionTitle' in item) && !('isMore' in item)

function getItemKind(item: NavItem): ItemKind {
  if (isSection(item)) return 'section'
  if (isNavMore(item)) return 'more'
  if (isNavGroup(item)) return 'group'
  return 'link'
}

function itemIsPermitted(
  item: NavItem | SidebarNavGroup | SidebarNavLink,
  ability: ReturnType<typeof useAbility>
): boolean {
  if (!item.action || !item.subject) return true

  const allowed = ability.can(item.action as Actions, item.subject as Subjects)
  if (!allowed) return false

  if ('children' in item && (item as SidebarNavGroup).children?.length) {
    return (item as SidebarNavGroup).children!.some(child => itemIsPermitted(child as NavItem, ability))
  }
  if ('items' in item && (item as SidebarSection).items?.length) {
    return (item as SidebarSection).items.some(child => itemIsPermitted(child as NavItem, ability))
  }

  return true
}

// Variants consumed by staggerChildren on the parent container
export const navItemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' as const } },
  closed: { opacity: 0, y: -4, transition: { duration: 0.1 } }
}

function renderNavItem(item: NavItem, depth: number) {
  switch (getItemKind(item)) {
    case 'section': return <SidebarSectionItem item={item as SidebarSection} />
    case 'more':    return <SidebarNavMoreItem item={item as SidebarNavMore} />
    case 'group':   return <SidebarNavGroupItem item={item as SidebarNavGroup} depth={depth} />
    default:        return <SidebarNavLinkItem item={item as SidebarNavLink} depth={depth} />
  }
}

interface NavItemsProps {
  items: SidebarNavItems
  depth?: number
  stagger?: boolean
}

export default function NavItems({ items, depth = 0, stagger = false }: NavItemsProps) {
  const ability = useAbility()
  const permitted = items.filter(item => itemIsPermitted(item, ability))

  return (
    <>
      {permitted.map((item, index) => {
        const kind = getItemKind(item)
        const key = `${kind}-${index}`
        const node = renderNavItem(item, depth)

        return stagger
          ? <motion.div key={key} variants={navItemVariants}>{node}</motion.div>
          : <Fragment key={key}>{node}</Fragment>
      })}
    </>
  )
}
