'use client'

import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarUtils } from './utils/SidebarUtils'
import type { SidebarNavItems } from '@/core/layouts/types'

const NavActiveContext = createContext<string | null>(null)

interface NavActiveProviderProps {
  children: ReactNode
  navItems: SidebarNavItems
}

export function NavActiveProvider({ children, navItems }: NavActiveProviderProps) {
  const pathname = usePathname()
  const activePath = useMemo(() => SidebarUtils.findActivePath(navItems, pathname), [navItems, pathname])

  return <NavActiveContext.Provider value={activePath}>{children}</NavActiveContext.Provider>
}

export const useNavActivePath = () => useContext(NavActiveContext)

export default NavActiveContext
