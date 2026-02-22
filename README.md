# Shortcut Next

Stop starting from scratch. Scaffold a production-ready **Next.js 16** project with **MUI**, **React Hook Form**, **TanStack Query**, role-based authorization, i18n, dark mode, and an AI chat assistant — all wired up and ready to go.

---

## What You Get

- **Next.js 16** with App Router and TypeScript (strict mode)
- **MUI v7** — fully themed with 30+ customized components, dark mode, and RTL support
- **React Hook Form** + Yup validation
- **TanStack Query** for data fetching and caching
- **CASL authorization** — role-based access control out of the box
- **i18n** — English and Arabic with auto-detection
- **Tailwind CSS v4** (optional preset)
- **CopilotKit** — floating AI chat assistant powered by OpenAI, built in
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
├── layout.tsx              # Root layout (fonts, providers, CopilotKit)
├── page.tsx                # Landing page (public)
├── login/page.tsx          # Login / Signup page
├── home/page.tsx           # Authenticated home page
├── unauthorized/page.tsx   # Access denied page
├── (dashboard)/
│   └── dashboard/page.tsx  # Dashboard with role-aware cards
└── api/copilotkit/
    └── route.ts            # CopilotKit AI runtime endpoint

components/copilotkit/
└── CopilotWidget.tsx       # Floating AI chat popup

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

The `.env` file in your project root:

```env
NEXT_PUBLIC_URL=https://your-backend-url.com

# CopilotKit AI Chat
OPENAI_API_KEY=your-openai-api-key-here
NEXT_PUBLIC_COPILOTKIT_RUNTIME_URL=/api/copilotkit
OPENAI_MODEL=gpt-4o-mini
```

---

## CopilotKit AI Chat

Every scaffolded project includes a **floating AI chat assistant** powered by [CopilotKit](https://docs.copilotkit.ai) and OpenAI. The chat popup appears in the bottom-right corner of the app.

### Setup

Set your OpenAI API key in `.env`:

```env
OPENAI_API_KEY=your-openai-api-key-here
```

Obtain a key from [platform.openai.com](https://platform.openai.com/api-keys).

### Changing the Model

Update `OPENAI_MODEL` in `.env`:

```env
OPENAI_MODEL=gpt-4o-mini   # default
# OPENAI_MODEL=gpt-4o
# OPENAI_MODEL=gpt-3.5-turbo
```

### Customizing the Assistant

Edit `components/copilotkit/CopilotWidget.tsx`:

```tsx
<CopilotPopup
  instructions='You are a helpful assistant specialized in customer support.'
  labels={{
    title: 'Support Assistant',
    placeholder: 'Describe your issue...',
    initial: 'Hi! How can I help you today?',
  }}
/>
```

### Using a Different AI Provider

Replace `OpenAIAdapter` in `app/api/copilotkit/route.ts`:

```ts
// Anthropic
import { AnthropicAdapter } from '@copilotkit/runtime'
const serviceAdapter = new AnthropicAdapter()

// Groq
import { GroqAdapter } from '@copilotkit/runtime'
const serviceAdapter = new GroqAdapter({ model: 'llama3-8b-8192' })
```

### Adding AI-Aware Actions

In any client component, use `useCopilotAction` to give the assistant access to app state:

```tsx
import { useCopilotAction } from '@copilotkit/react-core'

useCopilotAction({
  name: 'navigateTo',
  description: 'Navigate the user to a page',
  parameters: [{ name: 'path', type: 'string', description: 'The route path' }],
  handler: async ({ path }) => {
    router.push(path)
  },
})
```

---

## License

MIT
