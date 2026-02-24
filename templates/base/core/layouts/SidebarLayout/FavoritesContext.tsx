'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const STORAGE_KEY = 'sidebar-favorites'

export interface FavoriteItem {
  path: string
  title: string
  icon?: string
}

interface FavoritesContextValue {
  pinnedItems: FavoriteItem[]
  pinItem: (item: FavoriteItem) => void
  unpinItem: (path: string) => void
  isPinned: (path: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue>({
  pinnedItems: [],
  pinItem: () => {},
  unpinItem: () => {},
  isPinned: () => false,
})

function loadFavorites(): FavoriteItem[] {
  try {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [pinnedItems, setPinnedItems] = useState<FavoriteItem[]>(loadFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pinnedItems))
  }, [pinnedItems])

  const pinItem = useCallback((item: FavoriteItem) => {
    setPinnedItems(prev => prev.some(p => p.path === item.path) ? prev : [...prev, item])
  }, [])

  const unpinItem = useCallback((path: string) => {
    setPinnedItems(prev => prev.filter(p => p.path !== path))
  }, [])

  const isPinned = useCallback((path: string) => pinnedItems.some(p => p.path === path), [pinnedItems])

  return (
    <FavoritesContext.Provider value={{ pinnedItems, pinItem, unpinItem, isPinned }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
export default FavoritesContext
