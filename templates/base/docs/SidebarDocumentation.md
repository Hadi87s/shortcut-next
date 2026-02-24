# Sidebar Documentation

This guide covers everything you need to customize the sidebar: swapping the logo, adding all kinds of navigation items, restricting items by role, and loading routes dynamically from an API.

---

## SidebarLayout Props

| Prop              | Type              | Required | Default           | Description |
|-------------------|-------------------|----------|-------------------|-------------|
| `children`        | `ReactNode`       | Yes      | —                 | Page content rendered in the main area |
| `navItems`        | `SidebarNavItems` | Yes      | —                 | Static navigation items (from `sidebarRoutes.ts`) |
| `dynamicNavItems` | `SidebarNavItems` | No       | `[]`              | Fetched at runtime; appended after static items |
| `logo`            | `ReactNode`       | No       | `'SN'` badge      | Custom logo element in the sidebar header |
| `appName`         | `string`          | No       | `'Shortcut Next'` | App name shown next to the logo when expanded |
| `footer`          | `ReactNode`       | No       | Promo card        | Custom footer replacing the default card |

Usage in `app/(dashboard)/layout.tsx`:

```tsx
<SidebarLayout navItems={navigation()} dynamicNavItems={dynamicNavItems} appName='My App'>
  {children}
</SidebarLayout>
```

---

## Customizing the Logo

Pass any `ReactNode` to the `logo` prop. It renders inside a 36×36px rounded container in the sidebar header. The `SidebarLogo` component handles collapse animation and RTL alignment automatically.

```tsx
// Text abbreviation (default style)
<SidebarLayout logo='AC' appName='Acme' navItems={navigation()}>

// Image
<SidebarLayout logo={<img src='/logo.svg' width={24} height={24} />} appName='Acme' navItems={navigation()}>

// Icon component
import { Rocket } from 'lucide-react'
<SidebarLayout logo={<Rocket size={20} />} appName='Acme' navItems={navigation()}>
```

To replace the footer promo card pass a custom `ReactNode` to `footer`, or pass `null` to remove it entirely.

The logo area also shows an OS-aware keyboard shortcut hint (`⌘K` on macOS, `Ctrl+K` on Windows/Linux) when the sidebar is expanded. This hint is detected client-side via `navigator.userAgent` and hidden during SSR to avoid hydration mismatches.

---

## Navigation Item Types

The sidebar accepts an array of four item types mixed freely: `SidebarNavLink`, `SidebarNavGroup`, `SidebarSection`, and `SidebarNavMore`. All are defined in `core/layouts/types.ts`.

### 1. SidebarNavLink — Simple clickable link

```typescript
type SidebarNavLink = {
  title: string
  path?: string
  icon?: string           // Iconify key, e.g. 'lucide:home'
  action?: string         // CASL action — omit to always show
  subject?: string        // CASL subject — omit to always show
  disabled?: boolean
  badgeContent?: string   // e.g. '3' or 'New'
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  externalLink?: boolean  // Opens via window.open instead of router.push
  openInNewTab?: boolean  // Passes '_blank' target to window.open
}
```

```typescript
{
  title: 'Reports',
  path: '/dashboard/reports',
  icon: 'lucide:bar-chart-3',
  action: 'read',
  subject: 'Reports',
  badgeContent: 'New',
  badgeColor: 'success',
}
```

### 2. SidebarNavGroup — Collapsible group with children

```typescript
type SidebarNavGroup = {
  title: string
  icon?: string
  action?: string
  subject?: string
  badgeContent?: string
  badgeColor?: BadgeColor
  children?: (SidebarNavGroup | SidebarNavLink)[]  // Supports nesting
}
```

The group auto-opens when any child route is active. When the sidebar is **collapsed**, the group header row disappears entirely and its children are rendered flat — each link shows its own icon and badge directly. This keeps all navigation accessible in collapsed mode without an extra nesting level.

```typescript
{
  title: 'Tickets',
  icon: 'lucide:ticket',
  action: 'read',
  subject: 'Tickets',
  children: [
    { title: 'All Tickets', path: '/dashboard/tickets',      icon: 'lucide:list' },
    { title: 'My Tickets',  path: '/dashboard/tickets/mine', icon: 'lucide:user-check' },
  ],
}
```

### 3. SidebarSection — Labeled section with a header

```typescript
type SidebarSection = {
  sectionTitle: string
  items: (SidebarNavLink | SidebarNavGroup | SidebarNavMore)[]
  action?: string
  subject?: string
  icon?: string             // Action button icon shown in the header
  tooltip?: string          // Tooltip for the action button
  path?: string             // Where the action button navigates
  defaultCollapsed?: boolean
}
```

When `icon` and `path` are both set, a small icon button appears in the section header (e.g. an "Invite user" shortcut). Sections hide entirely when all their items fail permission checks.

```typescript
{
  sectionTitle: 'Administration',
  action: 'read',
  subject: 'Users',
  icon: 'lucide:user-plus',
  tooltip: 'Invite a new user',
  path: '/dashboard/users/invite',
  items: [
    { title: 'Users',    path: '/dashboard/users',    icon: 'lucide:users',    action: 'read',   subject: 'Users' },
    { title: 'Settings', path: '/dashboard/settings', icon: 'lucide:settings', action: 'manage', subject: 'Settings' },
  ],
}
```

### 4. SidebarNavMore — Overflow / "view more" row

```typescript
type SidebarNavMore = {
  title: string
  isMore: boolean   // Must be true — this flag identifies the type
  action?: string
  subject?: string
  path?: string
  icon?: string
  tooltip?: string
}
```

```typescript
{
  title: 'More options',
  isMore: true,
  icon: 'lucide:ellipsis',
  tooltip: 'More options',
  path: '/dashboard/more',
}
```

---

## Auth & Permission Fields

Every item type supports optional `action` and `subject` fields. `NavItems.tsx` evaluates `ability.can(action, subject)` for each item before rendering. Items that fail the check are silently removed.

**Rules:**
- Items with **no** `action`/`subject` are always visible (public items).
- For groups: if all children fail, the group header is also hidden.
- For sections: if all items fail, the section header is also hidden.

```typescript
// Visible to anyone who can 'read' 'Users' (admin + manager)
{ title: 'Users', path: '/dashboard/users', icon: 'lucide:users', action: 'read', subject: 'Users' }

// Visible only to admin (who can 'manage' 'Settings')
{ title: 'Settings', path: '/dashboard/settings', icon: 'lucide:settings', action: 'manage', subject: 'Settings' }

// Always visible — no permission check
{ title: 'Home', path: '/home', icon: 'lucide:home' }
```

### Default role permissions

| Subject   | admin  | manager | agent  | viewer |
|-----------|--------|---------|--------|--------|
| Dashboard | manage | read    | read   | read   |
| Users     | manage | manage  | —      | —      |
| Tickets   | manage | manage  | manage | —      |
| Reports   | manage | manage  | read   | read   |
| Settings  | manage | —       | —      | —      |

See `AuthorizationDocumentation.md` for how to add new subjects, roles, and route protections.

---

## Dynamic Routes

Dynamic routes let you fetch navigation items from an API at request time and merge them into the sidebar after the static routes.

### How it works

`navigation/dynamicRoutes.ts` exports an async skeleton function. It is called in the server component `app/(dashboard)/layout.tsx`, wrapped in a try/catch so a fetch failure falls back to an empty array and never crashes the layout:

```typescript
// app/(dashboard)/layout.tsx
let dynamicNavItems: Awaited<ReturnType<typeof fetchDynamicRoutes>> = []
try {
  dynamicNavItems = await fetchDynamicRoutes()
} catch (error) {
  console.error('Failed to fetch dynamic nav routes:', error)
}
```

The result is then passed as `dynamicNavItems` to `SidebarLayout`, which merges it with static items:

```typescript
// inside SidebarLayout
const mergedNavItems = [...navItems, ...(dynamicNavItems ?? [])]
```

Static routes always come first; dynamic routes follow in API order.

### Wiring up a real API

Open `navigation/dynamicRoutes.ts` and follow the inline comments:

```typescript
export async function fetchDynamicRoutes(): Promise<SidebarNavItems> {
  // Step 1: Call your API
  const res = await fetch('https://your-api.com/navigation', {
    cache: 'no-store',
  })
  const data = await res.json()

  // Step 2: Map to SidebarNavItems format
  return data.map((item: any) => ({
    title: item.label,
    path: item.href,
    icon: item.iconKey ?? 'lucide:link',

    // Step 3: Add permissions if needed
    action: item.requiredAction ?? 'read',
    subject: item.requiredSubject,
  }))
}
```

### Caching options

| Scenario | `fetch` option |
|----------|----------------|
| Always fresh (CMS-driven) | `cache: 'no-store'` |
| Revalidate every N seconds | `next: { revalidate: 60 }` |
| Static at build time | `cache: 'force-cache'` (default) |

---

## Badges

`SidebarNavLink` supports badges.

| Field          | Type     | Description |
|----------------|----------|-------------|
| `badgeContent` | `string` | Text inside the badge: `'3'`, `'New'`, `'!'` |
| `badgeColor`   | `BadgeColor` | `'default'` `'primary'` `'secondary'` `'success'` `'error'` `'warning'` `'info'` |

When the sidebar is **collapsed** the badge attaches to the link's icon. When **expanded** it animates in to the right of the label (Framer Motion `AnimatePresence` + `motion.div`), and animates out when the sidebar collapses.

When a `SidebarNavGroup` is collapsed the group header row disappears and children render their own icons — each child link shows its own badge directly on its icon with no rollup.

```typescript
{
  title: 'Inbox',
  path: '/dashboard/inbox',
  icon: 'lucide:inbox',
  badgeContent: '12',
  badgeColor: 'error',
}
```

---

## External Links

Use `externalLink: true` on a `SidebarNavLink` to open the path outside the Next.js router:

```typescript
{
  title: 'Documentation',
  path: 'https://docs.example.com',
  icon: 'lucide:book-open',
  externalLink: true,
  openInNewTab: true,
}
```

| Field           | Behavior |
|-----------------|----------|
| `externalLink: true` | Uses `window.open` instead of `router.push` |
| `openInNewTab: true` | Opens in a new tab (`'_blank'`) |
| `openInNewTab` omitted | Opens in the same tab (`'_self'`) |

---

## Cmd+K Command Palette

Pressing `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) opens a search dialog that lets users jump to any navigation link instantly.

- Flattens the entire nav tree (links inside groups, sections, and nested groups) into a searchable list
- Filters by title as you type — case-insensitive substring match
- `ArrowUp` / `ArrowDown` to move through results, `Enter` to navigate, `Escape` to close
- Clicking any result navigates via `router.push` and closes the dialog

The keyboard listener is registered in `SidebarLayout/index.tsx` on mount and removed on unmount. A small `⌘K` / `Ctrl+K` hint is shown below the app name in the sidebar header as a visual reminder — it is OS-aware and determined client-side.

The `CommandPalette` component is located at `SidebarLayout/components/CommandPalette.tsx` and receives `navItems` from the layout. Navigation flattening is handled by `SidebarUtils.flattenNavItems()`.

---

## Pinned Favorites

Users can pin any navigation link to a persistent "Pinned" section that appears at the top of the sidebar, above all other nav items.

### Pinning items

Right-click any nav link and select **"Pin to sidebar"** from the context menu. Right-clicking again and selecting **"Unpin"** removes it. Hovering a pinned item reveals a small `×` button on the right that also unpins it.

### Persistence

Pinned items are stored in `localStorage` under the key `sidebar-favorites` as a JSON array of `{ path, title, icon? }`. They survive page reloads and browser restarts.

### FavoritesContext

The pinning system is powered by `FavoritesContext.tsx`, which is provided by `FavoritesProvider` in `SidebarLayout/index.tsx`. It exposes:

```typescript
interface FavoritesContextValue {
  pinnedItems: FavoriteItem[]           // current pinned list in pin order
  pinItem: (item: FavoriteItem) => void  // adds to the list (no-op if already pinned)
  unpinItem: (path: string) => void      // removes by path
  isPinned: (path: string) => boolean    // check without subscribing to the full list
}
```

To access it in a custom component:

```tsx
import { useFavorites } from '@/core/layouts/SidebarLayout/FavoritesContext'

const { pinnedItems, pinItem, unpinItem, isPinned } = useFavorites()
```

---

## Right-Click Context Menu

Every nav link and group row responds to right-click with a MUI `Menu` offering contextual actions.

| Action                 | Availability              | Behavior                                              |
|------------------------|---------------------------|-------------------------------------------------------|
| Open in new tab        | Links only (has `path`)   | `window.open(path, '_blank')`                         |
| Copy link              | Links only (has `path`)   | Writes `window.location.origin + path` to clipboard   |
| Pin to sidebar / Unpin | Links only (has `path`)   | Toggles pin state via `FavoritesContext`              |

Groups show only the "Pin to sidebar" option (disabled, since groups have no `path`). Right-clicking anywhere on the row outside an interactive element (icon button, badge) triggers the menu.

---

## Persistent Collapse State

The sidebar's collapsed/expanded state is automatically persisted to `localStorage` via `SettingsContext`. On the next page load the sidebar restores to whatever state the user left it in.

**Important distinction between collapse actions:**

| Action | Persists? | When used |
|--------|-----------|-----------|
| User clicks the `›` / `‹` toggle button | Yes | Explicit user preference |
| Sidebar resets to expanded on mobile breakpoint | No | Programmatic UI reset — preserves desktop preference |

This means resizing the window to mobile and back will not lose a desktop collapse preference — the toggle button is the only action that writes to settings.

The setting is stored as `sidebarCollapsed: boolean` inside the shared `settings` object in `localStorage` (key `'settings'`).

---

## RTL Support

The sidebar is fully RTL-aware. When the active language is Arabic (`'ar'`), all directional elements flip automatically — no extra configuration required.

| Element | LTR | RTL |
| ------- | --- | --- |
| Desktop sidebar | Fixed to the **left** | Fixed to the **right** |
| Mobile drawer anchor | **Left** edge | **Right** edge |
| Collapse toggle chevron | Points left (collapse) / right (expand) | Points right (collapse) / left (expand) |
| Mobile hamburger button | `left: 12px` | `right: 12px` |
| Main content offset | `marginLeft: sidebarWidth` | `marginRight: sidebarWidth` |
| Label slide-in direction | Slides in from the **left** | Slides in from the **right** |
| Tooltip placement | **Right** of icon | **Left** of icon |

RTL is driven by the `useLanguage` hook (`language === 'ar'`). Switching the app language at runtime updates all sidebar directions instantly.

---

## Animations

All sidebar animations are implemented with **Framer Motion** — no CSS transitions are used for show/hide behavior.

| Element | Animation |
| ------- | --------- |
| Sidebar width (expand/collapse) | `motion.div` with `tween` variants (`0.3s`, cubic-easing) |
| Nav labels | `SidebarAnimatedLabel` — fade + slide on enter/exit via `AnimatePresence` |
| Expanded badges | `motion.div` — fade + slide, coordinated with `AnimatePresence` |
| Group header row | `motion.div` — fades in/out when sidebar collapses/expands |
| Footer | `motion.div` — height + opacity animate in with a delay so the sidebar finishes expanding first; collapses immediately with no delay |
| Pinned items | `motion.div` — height + opacity animate in/out when items are pinned or unpinned |
| App name / Cmd+K hint | `motion.div` — fade + slide in/out together with `AnimatePresence` on collapse |

`AnimatePresence initial={false}` is used throughout so animations only fire on subsequent toggles, not on the initial page render.
