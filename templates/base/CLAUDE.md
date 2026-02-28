# CLAUDE.md — Project Guide

This project was scaffolded with [create-shortcut-next](https://github.com/Hadi87s/shortcut-next). Every system below is **already built and wired up**. Check this file before writing any new code — the feature you need likely already exists.

---

## Golden Rules

- **Never** create a custom Axios instance, auth context, permission guard, sidebar, or i18n setup — they already exist.
- **Never** install `axios`, `i18next`, `react-hook-form`, `yup`, or `@casl/ability` — they are already in `package.json`.
- **Always** check `core/hooks/`, `core/context/`, `components/ability/`, and `components/common/` before writing something new.

---

## 1. Authentication

Already available — do not reimplement.

**Hook:** `useAuth()` from `@/core/context/AuthContext`

```tsx
import { useAuth } from '@/core/context/AuthContext'

const { user, isAuthenticated, isLoading, login, signup, logout } = useAuth()

// Login
await login({ email: 'user@example.com', password: 'secret' }, (err) => {
  console.error(err)
})

// Logout
logout()
```

**HTTP Client:** `apiClient` from `@/core/clients/apiClient`

```tsx
import apiClient from '@/core/clients/apiClient'

// Bearer token is injected automatically
const { data } = await apiClient.get('/api/users')
await apiClient.post('/api/users', { name: 'Alice' })
```

- Token refresh on 401 (with request queuing) is handled automatically.
- Auto-logout on 403 is handled automatically.
- Base URL is set from `NEXT_PUBLIC_URL` in your `.env` file.
- Auth storage keys are in `core/configs/authConfig.ts`.

> **Never** use `fetch()` or create a new Axios instance. Always use `apiClient`.

---

## 2. Authorization (CASL)

Already available — do not reimplement.

**Roles (hierarchy):** `admin` > `manager` > `agent` > `viewer`

**Hooks:**

```tsx
import { useAbility, useCan } from '@/core/hooks/useAbility'

// Option 1: full ability object
const ability = useAbility()
if (ability.can('read', 'Users')) { /* ... */ }

// Option 2: simple boolean
const canManage = useCan('manage', 'Settings')
```

**Conditional rendering:**

```tsx
import Can from '@/components/ability/Can'

<Can do="read" this="Users">
  <UsersList />
</Can>

<Can not do="manage" this="Settings">
  <ReadOnlyView />
</Can>
```

**Protect a new route** — add one entry to `lib/abilities/routeMap.ts`:

```ts
{ pattern: '/dashboard/reports', action: 'read', subject: 'Reports' },
{ pattern: '/dashboard/users/[id]', action: 'manage', subject: 'Users' },
{ pattern: '/settings/*', action: 'manage', subject: 'Settings' },
```

The middleware enforces this automatically. No other changes needed.

**Add a new role** — edit `lib/abilities/roles.ts` and add the role name to `UserRole` in `lib/abilities/types.ts`.

> **Never** write custom middleware or manual permission checks. Use the hooks, `Can` component, and `routeMap.ts`.

---

## 3. Sidebar Layout

Already available — do not build a custom sidebar.

**Usage:**

```tsx
import SidebarLayout from '@/core/layouts/SidebarLayout'
import { sidebarRoutes } from '@/navigation/sidebarRoutes'

export default function Layout({ children }) {
  return (
    <SidebarLayout navItems={sidebarRoutes()} appName="My App">
      {children}
    </SidebarLayout>
  )
}
```

**Add a nav item** — edit `navigation/sidebarRoutes.ts`:

```ts
import { SidebarNavLink, SidebarSection, SidebarNavGroup } from '@/core/layouts/types'

// Single link (filtered by CASL automatically)
const item: SidebarNavLink = {
  type: 'link',
  title: 'Reports',
  path: '/dashboard/reports',
  icon: <Icon icon="tabler:chart-bar" />,
  action: 'read',
  subject: 'Reports',
}

// Collapsible group
const group: SidebarNavGroup = {
  type: 'group',
  title: 'Management',
  icon: <Icon icon="tabler:settings" />,
  children: [item],
}

// Section header
const section: SidebarSection = {
  type: 'section',
  title: 'Analytics',
  items: [item],
}
```

**Programmatic control:**

```tsx
import { useSidebar } from '@/core/layouts/SidebarLayout/SidebarContext'

const { isCollapsed, toggleCollapsed, setIsMobileOpen } = useSidebar()
```

**Favorites (pin items):**

```tsx
import { useFavorites } from '@/core/layouts/SidebarLayout/FavoritesContext'

const { pinItem, unpinItem, isPinned } = useFavorites()
```

> **Never** create a custom drawer or navigation component. Add items to the navigation config files.

---

## 4. Theme & Settings

Already available — do not create a custom theme provider.

**Settings hook:**

```tsx
import { useSettings } from '@/core/context/SettingsContext'

const { mode, direction, language, themeColor } = useSettings()
```

**Toggle dark/light mode:**

```tsx
import { useToggleMode } from '@/core/hooks/useToggleMode'

const { mode, toggleMode } = useToggleMode()
<button onClick={toggleMode}>Switch to {mode === 'dark' ? 'Light' : 'Dark'}</button>
```

**Change theme defaults** — edit `core/configs/themeConfig.ts`:

```ts
const themeConfig = {
  mode: 'dark',       // 'light' | 'dark'
  direction: 'ltr',   // 'ltr' | 'rtl'
  borderRadius: 10,
  responsiveFontSizes: true,
  disableRipple: true,
}
```

**Customize a MUI component** — edit the relevant file in `core/theme/overrides/`:

```ts
// core/theme/overrides/button.ts
root: ({ theme }) => ({
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 600,
})
```

Available overrides: Accordion, Alerts, Autocomplete, Avatar, Backdrop, Breadcrumb, Button, ButtonGroup, Card, Chip, DataGrid, Dialog, Divider, FAB, IconButton, Input, Link, List, Menu, Pagination, Paper, Popover, Progress, Rating, Select, Snackbar, Switch, Table, Tabs, TextField, Timeline, ToggleButton, Tooltip, Typography.

**Change the color palette** — edit `core/theme/palette/index.ts`.

**Hex utility:**

```tsx
import { hexToRGBA } from '@/core/utils/hex-to-rgba'

const color = hexToRGBA('#5B74FF', 0.2) // 'rgba(91, 116, 255, 0.2)'
```

> **Never** override MUI components with inline `sx` hacks for global styling. Use the override files.

---

## 5. Internationalization (i18n)

Already available — do not install or configure i18next.

**Translate strings:**

```tsx
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()
<Typography>{t('common.welcome', 'Welcome')}</Typography>
```

**Switch language:**

```tsx
import { useLanguage } from '@/core/hooks/useLanguage'

const { language, handleLanguageChange } = useLanguage()
// Switching to Arabic also sets direction to RTL automatically
handleLanguageChange('ar')
```

**Ready-made components:**

```tsx
import Translations from '@/components/common/Translations'
import LanguageDropdown from '@/components/common/LanguageDropdown'

<Translations text="common.home" />
<LanguageDropdown />
```

**Add translations** — add keys to the JSON files in `public/locales/en/` and `public/locales/ar/`.

> **Never** hardcode user-visible strings. Always use `t()` and add the key to both locale files.

---

## 6. Data Fetching (TanStack Query)

Already available — `QueryClientProvider` is set up in `providers/AppProviders.tsx`.

**Server/client data fetching:**

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/core/clients/apiClient'

// Fetch
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => apiClient.get('/api/users').then(r => r.data),
})

// Mutate
const queryClient = useQueryClient()
const { mutate } = useMutation({
  mutationFn: (payload) => apiClient.post('/api/users', payload),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
})
```

> **Never** use raw `fetch()` or a new Axios instance. Always compose `apiClient` with TanStack Query.

---

## 7. Forms (React Hook Form + Yup)

Already available.

```tsx
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({ email: yup.string().email().required() })

const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
})
```

- See `components/auth/LoginForm.tsx` and `SignupForm.tsx` as reference implementations.
- Use `<FormFieldWrapper>` from `@/components/ui/FormFieldWrapper` for consistent label + input layout.

---

## 8. Icons

Already available — do not install a separate icon library.

```tsx
import Icon from '@/components/icon/Icon'

<Icon icon="tabler:home" />
<Icon icon="tabler:settings" fontSize={24} />
```

Uses [Iconify](https://icon-sets.iconify.design/) — any Iconify icon name works. Custom icon aliases are in `core/icons/customIcons.ts`.

---

## 9. Shared Components & Utilities

| Component / Utility | Import | Purpose |
|---|---|---|
| `<Spinner />` | `@/components/loaders/Spinner` | Loading indicator |
| `<HydrationGate>` | `@/components/wrappers/HydrationGate` | Prevent SSR/client hydration mismatch |
| `<GradientText>` | `@/components/ui/GradientText` | Gradient-styled text |
| `<ErrorMessage>` | `@/components/ui/ErrorMessage` | Inline error alert |
| `hexToRGBA` | `@/core/utils/hex-to-rgba` | Convert hex color to rgba |

---

## 10. Mock API (MSW)

Development mock handlers live in `lib/mocks/handlers/`. To add a new mock endpoint:

```ts
// lib/mocks/handlers/myFeature.ts
import { http, HttpResponse } from 'msw'

export const myHandlers = [
  http.get('/api/items', () => HttpResponse.json({ items: [] })),
]
```

Then register it in `lib/mocks/browser.ts`.

---

## File Structure Reference

```
app/                        # Next.js App Router pages
components/
  ability/Can.tsx           # Conditional render by permission
  auth/                     # LoginForm, SignupForm
  common/                   # Translations, LanguageDropdown, Direction
  icon/Icon.tsx             # Iconify wrapper
  loaders/Spinner.tsx
  ui/                       # ErrorMessage, GradientText, FormFieldWrapper
  wrappers/HydrationGate.tsx
core/
  clients/apiClient.ts      # Axios instance (use this for ALL requests)
  configs/                  # authConfig, themeConfig, i18n, clientConfig
  context/
    AuthContext.tsx          # useAuth()
    SettingsContext.tsx      # useSettings()
  hooks/
    useAbility.ts            # useAbility(), useCan()
    useLanguage.ts           # useLanguage()
    useToggleMode.ts         # useToggleMode()
  icons/customIcons.ts
  layouts/
    SidebarLayout/           # Full sidebar system
    types.ts                 # SidebarNavLink, SidebarNavGroup, etc.
  theme/
    overrides/               # 30+ MUI component overrides
    palette/                 # Color palette
  utils/hex-to-rgba.ts
lib/
  abilities/
    roles.ts                 # Role → abilities mapping
    routeMap.ts              # Route → permission mapping (add new routes here)
    types.ts                 # UserRole, Subjects, Actions types
  mocks/                     # MSW mock setup
navigation/
  sidebarRoutes.ts           # Static nav items (add new sidebar items here)
  dynamicRoutes.ts           # Async/dynamic nav items
providers/
  AppProviders.tsx           # All providers composed here
public/locales/              # Translation JSON files (en/, ar/)
```
