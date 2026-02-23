import { useAbility } from '@/core/hooks/useAbility'
import { ItemKind, NavItem, SidebarNavGroup, SidebarNavItems, SidebarNavLink, SidebarSection } from '../../types'
import { Actions, Subjects } from '@/lib/abilities'

export class SidebarUtils {
  static isSection = (item: NavItem): item is SidebarSection => 'sectionTitle' in item
  static isNavMore = (item: NavItem): item is Extract<NavItem, { isMore: boolean }> => 'isMore' in item
  static isNavGroup = (item: NavItem): item is SidebarNavGroup =>
    'children' in item && !('sectionTitle' in item) && !('isMore' in item)

  static getItemKind(item: NavItem): ItemKind {
    if (this.isSection(item)) return 'section'
    if (this.isNavMore(item)) return 'more'
    if (this.isNavGroup(item)) return 'group'
    return 'link'
  }

  static flattenPaths(items: SidebarNavItems): string[] {
    const paths: string[] = []
    for (const item of items) {
      if ('path' in item && item.path) paths.push(item.path)
      if ('children' in item && item.children) paths.push(...this.flattenPaths(item.children as SidebarNavItems))
      if ('items' in item && item.items) paths.push(...this.flattenPaths(item.items as SidebarNavItems))
    }
    return paths
  }

  static findActivePath(items: SidebarNavItems, pathname: string): string | null {
    const matches = this.flattenPaths(items).filter(p => pathname === p || pathname.startsWith(p + '/'))
    return matches.sort((a, b) => b.length - a.length)[0] ?? null
  }

  static itemIsPermitted(
    item: NavItem | SidebarNavGroup | SidebarNavLink,
    ability: ReturnType<typeof useAbility>
  ): boolean {
    if (!item.action || !item.subject) return true

    const allowed = ability.can(item.action as Actions, item.subject as Subjects)
    if (!allowed) return false

    if ('children' in item && (item as SidebarNavGroup).children?.length) {
      return (item as SidebarNavGroup).children!.some(child => this.itemIsPermitted(child as NavItem, ability))
    }
    if ('items' in item && (item as SidebarSection).items?.length) {
      return (item as SidebarSection).items.some(child => this.itemIsPermitted(child as NavItem, ability))
    }

    return true
  }
}
