# Shortcut Next

Stop starting from scratch. Scaffold a production-ready **Next.js 15+** project with **MUI**, **React Hook Form**, **TanStack Query**, role-based authorization, i18n, and dark mode — all wired up and ready to go.

---

## What You Get

- **Next.js 15** with App Router and TypeScript (strict mode)
- **MUI v7** — fully themed with 30+ customized components, dark mode, and RTL support
- **React Hook Form** + Yup validation
- **TanStack Query** for data fetching and caching
- **CASL authorization** — role-based access control out of the box
- **i18n** — English and Arabic with auto-detection
- **Tailwind CSS v4** (optional preset)
- **MSW** — mock API responses during development

---

## Installation

Run this single command and follow the prompts:

```bash
npx shortcut-next@latest
```

You'll be asked three things:

1. **Project name** — the folder that will be created
2. **Preset** — `base` (MUI stack) or `tailwind` (MUI + Tailwind v4)
3. **Package manager** — pnpm, npm, yarn, or bun

That's it. The CLI creates your project, initializes git, and installs dependencies.

### Skip the Prompts (Optional)

```bash
npx shortcut-next@latest my-app --preset tailwind --pm pnpm
```

| Flag            | Options                        |
| --------------- | ------------------------------ |
| `--preset`      | `base` or `tailwind`           |
| `--pm`          | `npm`, `pnpm`, `yarn`, `bun`   |
| `--no-git`      | Skip git initialization        |
| `--no-install`  | Skip dependency installation   |

### Start Developing

```bash
cd my-app
npm run dev
```

Other available scripts:

```bash
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript validation
npm run format     # Prettier
```

---

## Project Structure

```text
app/
├── layout.tsx              # Root layout (fonts, providers)
├── page.tsx                # Landing page (public)
├── login/page.tsx          # Login / Signup page
├── home/page.tsx           # Authenticated home page
├── unauthorized/page.tsx   # Access denied page
└── (dashboard)/
    └── dashboard/page.tsx  # Dashboard with role-aware cards

core/
├── clients/apiClient.ts    # Axios instance (token refresh, auto-logout)
├── context/AuthContext.tsx  # Auth state (login, signup, logout)
├── context/SettingsContext.tsx  # Theme mode, direction, language
├── theme/                  # MUI theme system (see below)
├── configs/                # Auth endpoints, i18n, theme defaults
└── hooks/                  # useAbility, useCan, useLanguage

lib/abilities/              # CASL authorization (see below)
providers/AppProviders.tsx   # Composes all context providers
proxy.ts                    # Middleware (auth + route protection)
```

---

## Authorization

The template includes a ready-to-use role-based access system powered by [CASL](https://casl.js.org/).

### Roles

| Role      | What they can do                                         |
| --------- | -------------------------------------------------------- |
| `admin`   | Full access to everything                                |
| `manager` | Read all, manage Users/Tickets/Reports, no Settings      |
| `agent`   | Read Dashboard/Tickets/Reports, manage Tickets           |
| `viewer`  | Read Dashboard and Reports only                          |

Your backend JWT must include a `role` claim. The token is read from an `accessToken` cookie.

### Protect a New Route

Add one entry to `lib/abilities/routeMap.ts`:

```ts
export const routePermissions: RoutePermission[] = [
  // ... existing routes

  // Exact route
  { pattern: '/dashboard/reports', action: 'read', subject: 'Reports' },

  // Dynamic param
  { pattern: '/dashboard/users/[id]', action: 'manage', subject: 'Users' },

  // Wildcard (all sub-routes)
  { pattern: '/settings/*', action: 'manage', subject: 'Settings' },
]
```

That's it — the middleware handles enforcement automatically.

### Check Permissions in Components

```tsx
import { useAbility, useCan } from '@/core/hooks/useAbility'

// Option 1: Full ability object
const ability = useAbility()
if (ability.can('read', 'Users')) {
  // show users link
}

// Option 2: Simple boolean
const canManageSettings = useCan('manage', 'Settings')
```

### Add a New Role

Edit `lib/abilities/roles.ts`:

```ts
export const roleAbilities: Record<UserRole, (can: Can, cannot: Cannot) => void> = {
  // ... existing roles

  support: (can) => {
    can('read', ['Dashboard', 'Tickets'])
    can('manage', 'Tickets')
  },
}
```

Then add `'support'` to the `UserRole` type in `lib/abilities/types.ts`.

---

## MUI Theme Customization

The theme lives in `core/theme/` and is fully modular.

### Change the Default Theme

Edit `core/configs/themeConfig.ts`:

```ts
const themeConfig = {
  mode: 'dark',           // 'light' or 'dark'
  direction: 'ltr',       // 'ltr' or 'rtl'
  responsiveFontSizes: true,
  disableRipple: true,
  borderRadius: 10,
}
```

### Customize a Component

Each MUI component has its own override file in `core/theme/overrides/`. For example, to change button styles, edit `core/theme/overrides/button.ts`:

```ts
const Button = (settings: Settings) => ({
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
      }),
      contained: ({ theme }) => ({
        boxShadow: theme.shadows[3],
      }),
    },
  },
})
```

### Components with Overrides

Accordion, Alerts, Autocomplete, Avatars, Backdrop, Breadcrumbs, Button, ButtonGroup, Card, Chip, DataGrid, Dialog, Divider, FAB, IconButton, Input, Link, List, Menu, Pagination, Paper, Popover, Progress, Rating, Select, Snackbar, Switches, Table, Tabs, TextField, Timeline, ToggleButton, Tooltip, Typography.

### Change the Color Palette

Edit `core/theme/palette/index.ts`:

```ts
primary: {
  light: '#8B9BFF',
  main: '#5B74FF',   // your brand color
  dark: '#3B54DF',
},
secondary: {
  main: '#00D0FF',
},
```

---

## Environment Variables

Create a `.env` file in your project root:

```env
NEXT_PUBLIC_URL=https://your-backend-url.com
```

---

## License

MIT
