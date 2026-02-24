'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useAbility } from '@/core/hooks/useAbility'
import type {
  SidebarNavItems,
  SidebarNavGroup,
  SidebarNavLink,
  SidebarSection,
  SidebarNavMore,
  NavItem
} from '@/core/layouts/types'
import SidebarNavLinkItem from './SidebarNavLink'
import SidebarNavGroupItem from './SidebarNavGroup'
import SidebarSectionItem from './SidebarSection'
import SidebarNavMoreItem from './SidebarNavMore'
import { SidebarUtils } from '../utils/SidebarUtils'

// Variants consumed by staggerChildren on the parent container
export const navItemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' as const } },
  closed: { opacity: 0, y: -4, transition: { duration: 0.1 } }
}

function renderNavItem(item: NavItem, depth: number) {
  switch (SidebarUtils.getItemKind(item)) {
    case 'section':
      return <SidebarSectionItem item={item as SidebarSection} />
    case 'more':
      return <SidebarNavMoreItem item={item as SidebarNavMore} />
    case 'group':
      return <SidebarNavGroupItem item={item as SidebarNavGroup} depth={depth} />
    default:
      return <SidebarNavLinkItem item={item as SidebarNavLink} depth={depth} />
  }
}

interface NavItemsProps {
  items: SidebarNavItems
  depth?: number
  stagger?: boolean
}

export default function NavItems({ items, depth = 0, stagger = false }: NavItemsProps) {
  const ability = useAbility()
  const permitted = items.filter(item => SidebarUtils.itemIsPermitted(item, ability))

  return (
    <>
      {permitted.map((item, index) => {
        const kind = SidebarUtils.getItemKind(item)
        const key = `${kind}-${index}`
        const node = renderNavItem(item, depth)

        return stagger ? (
          <motion.div key={key} variants={navItemVariants}>
            {node}
          </motion.div>
        ) : (
          <Fragment key={key}>{node}</Fragment>
        )
      })}
    </>
  )
}
