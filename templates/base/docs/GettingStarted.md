# Getting Started

This guide walks you through scaffolding a new project with `create-shortcut-next` and getting it running locally.

---

## Prerequisites

- **Node.js** 18 or later
- A package manager: `npm`, `pnpm`, `yarn`, or `bun`

---

## 1. Run the CLI

```bash
npx create-shortcut-next
```

You will be prompted with a series of questions:

```
◆ Project name
│  my-app
◆ Select a preset
│  ● Base (MUI + React Hook Form + TanStack Query)
│  ○ Tailwind (Base + Tailwind CSS v4)
◆ Select a package manager
│  ● pnpm  ○ npm  ○ yarn  ○ bun
◆ Initialize a git repository?
│  ● Yes  ○ No
◆ Install dependencies?
│  ● Yes  ○ No
```

### Presets

| Preset | Includes |
|--------|----------|
| **Base** | MUI v6, React Hook Form, TanStack Query v5, i18next, CASL, Axios |
| **Tailwind** | Everything in Base + Tailwind CSS v4 + PostCSS |

### CLI flags (non-interactive)

You can skip the prompts entirely by passing flags:

```bash
npx create-shortcut-next my-app --preset tailwind --pm pnpm --no-git
```

| Flag | Values | Default |
|------|--------|---------|
| `--preset` | `base` \| `tailwind` | prompted |
| `--pm` | `npm` \| `pnpm` \| `yarn` \| `bun` | prompted |
| `--no-git` | — | git is initialized |
| `--no-install` | — | dependencies are installed |

---

## 2. Start the development server

```bash
cd my-app
npm run dev        # or pnpm dev / yarn dev / bun dev
```

The app runs at **http://localhost:3000** by default.

---

## 3. Connect your backend

Open `.env.local` (create it if it doesn't exist) and set your backend URL:

```env
NEXT_PUBLIC_URL=http://localhost:8000
```

The Next.js rewrite in `next.config.ts` proxies all `/api/*` requests to this URL, so your frontend never exposes the backend origin to the browser. See [ApiClient.md](./ApiClient.md) for details.

---

## 4. Project structure overview

```
my-app/
├── app/                        # Next.js 15 App Router
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout (font, providers)
│   ├── (dashboard)/            # Protected route group
│   │   ├── layout.tsx          # Dashboard layout (sidebar)
│   │   └── dashboard/          # Example dashboard pages
│   ├── login/                  # Public login page
│   ├── signup/                 # Public signup page
│   └── unauthorized/           # 403 error page
├── core/                       # Core infrastructure (don't touch unless customizing)
│   ├── clients/apiClient.ts    # Axios instance with token refresh
│   ├── configs/                # Auth endpoints, theme defaults, i18n
│   ├── context/                # AuthContext, SettingsContext
│   ├── hooks/                  # useAuth, useAbility, useSettings, ...
│   └── theme/                  # MUI theme + component overrides
├── lib/abilities/              # CASL authorization system
│   ├── routeMap.ts             # Route → permission mapping
│   ├── roles.ts                # Role → abilities mapping
│   └── types.ts                # Subjects, Actions, UserRole types
├── navigation/                 # Sidebar nav items
├── providers/                  # AppProviders composition
├── public/                     # Static assets (favicon, images)
├── docs/                       # This documentation
└── next.config.ts              # Next.js config (rewrites, images)
```

---

## 5. Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript validation (no emit) |

---

## 6. Next steps

| Topic | Guide |
|-------|-------|
| API calls & backend config | [ApiClient.md](./ApiClient.md) |
| Theme name, mode, colors | [ThemeCustomization.md](./ThemeCustomization.md) |
| MUI component overrides | [MuiOverrides.md](./MuiOverrides.md) |
| Login, signup, tokens | [Authentication.md](./Authentication.md) |
| Route protection & roles | [AuthorizationDocumentation.md](./AuthorizationDocumentation.md) |
| Sidebar navigation | [SidebarDocumentation.md](./SidebarDocumentation.md) |
