'use client'

import { motion } from 'framer-motion'
import { useAbility } from '@/core/hooks/useAbility'
import type { Actions, Subjects } from '@/lib/abilities'
import type { SidebarNavItems, SidebarNavGroup, SidebarNavLink, SidebarSection } from '@/core/layouts/types'
import SidebarNavLinkItem from './SidebarNavLink'
import SidebarNavGroupItem from './SidebarNavGroup'
import SidebarSectionItem from './SidebarSection'
import SidebarNavMoreItem from './SidebarNavMore'

type NavItem = SidebarNavItems[number]

export const isSection = (item: NavItem): item is SidebarSection =>
  'sectionTitle' in item

export const isNavMore = (item: NavItem): item is Extract<NavItem, { isMore: boolean }> =>
  'isMore' in item

export const isNavGroup = (item: NavItem): item is SidebarNavGroup =>
  'children' in item && !('sectionTitle' in item) && !('isMore' in item)

function itemIsPermitted(
  item: NavItem | SidebarNavGroup | SidebarNavLink,
  ability: ReturnType<typeof useAbility>
): boolean {
  if (!(item as any).action || !(item as any).subject) return true

  const allowed = ability.can(
    (item as any).action as Actions,
    (item as any).subject as Subjects
  )
  if (!allowed) return false

  // For groups: need ≥1 permitted child
  if ('children' in item && (item as SidebarNavGroup).children?.length) {
    return (item as SidebarNavGroup).children!.some(child =>
      itemIsPermitted(child as NavItem, ability)
    )
  }

  // For sections: need ≥1 permitted item
  if ('items' in item && (item as SidebarSection).items?.length) {
    return (item as SidebarSection).items.some(child =>
      itemIsPermitted(child as NavItem, ability)
    )
  }

  return true
}

// Variants consumed by staggerChildren on the parent container
export const navItemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' as const } },
  closed: { opacity: 0, y: -4, transition: { duration: 0.1 } }
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
        if (isSection(item)) {
          return stagger
            ? <motion.div key={`section-${index}`} variants={navItemVariants}><SidebarSectionItem item={item} /></motion.div>
            : <SidebarSectionItem key={`section-${index}`} item={item} />
        }
        if (isNavMore(item)) {
          return stagger
            ? <motion.div key={`more-${index}`} variants={navItemVariants}><SidebarNavMoreItem item={item} /></motion.div>
            : <SidebarNavMoreItem key={`more-${index}`} item={item} />
        }
        if (isNavGroup(item)) {
          return stagger
            ? <motion.div key={`group-${index}`} variants={navItemVariants}><SidebarNavGroupItem item={item} depth={depth} /></motion.div>
            : <SidebarNavGroupItem key={`group-${index}`} item={item} depth={depth} />
        }
        return stagger
          ? <motion.div key={`link-${index}`} variants={navItemVariants}><SidebarNavLinkItem item={item as SidebarNavLink} depth={depth} /></motion.div>
          : <SidebarNavLinkItem key={`link-${index}`} item={item as SidebarNavLink} depth={depth} />
      })}
    </>
  )
}
