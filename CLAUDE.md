# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shortcut Next is an NPM CLI scaffolding tool that generates Next.js 15+ projects with pre-configured MUI, React Hook Form, TanStack Query, and optional Tailwind CSS v4.

## Development Commands

This is a CLI tool (no build step required). To test locally:
```bash
node bin/shortcut-next.mjs  # Run the CLI directly
```

The generated apps use these scripts (defined in `templates/base/package.json`):
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript validation

## Architecture

### Entry Points
- `bin/shortcut-next.mjs` - CLI executable, calls `src/run.mjs`
- `src/run.mjs` - Main scaffolding logic using cac (CLI parser) and @clack/prompts

### Template Structure (`templates/base/`)
The single template gets copied to user projects. Tailwind preset augments this template.

**`@core/` - Core infrastructure layer:**
- `clients/apiClient.ts` - Axios instance with token refresh, auto-logout on 401/403
- `context/AuthContext.tsx` - Authentication state (login/signup/logout, token storage)
- `context/SettingsContext.tsx` - Theme mode, direction (RTL/LTR), language persistence
- `theme/` - MUI theme configuration with component overrides, dark mode, RTL support
- `configs/` - Auth endpoints, i18n setup, theme defaults

**`providers/` - React context composition:**
- `AppProviders.tsx` - Composes Auth → Settings → Theme → Query → i18n providers
- `I18nProvider.tsx` - i18next initialization

**`app/` - Next.js App Router:**
- `layout.tsx` - Root layout with Google Fonts (Poppins/Cairo for RTL)
- `(dashboard)/` - Protected route group with example pages
- `unauthorized/` - Access denied error page

**`lib/abilities/` - CASL Authorization System:**

- `types.ts` - TypeScript types (Subjects, Actions, UserRole, AppAbility)
- `roles.ts` - Role → abilities mapping using CASL's AbilityBuilder
- `routeMap.ts` - Centralized route → permission mapping (single source of truth)
- `routeMatcher.ts` - Pattern matching for exact, dynamic [param], and wildcard /* routes
- `checkAuthorization.ts` - Authorization orchestration function
- `index.ts` - Barrel exports

### Authorization System

The template includes a production-ready CASL-based authorization system:

**Roles (hierarchy: admin > manager > agent > viewer):**

- `admin` - Full access to everything
- `manager` - Read all, manage Users/Tickets/Reports, no Settings
- `agent` - Read Dashboard/Tickets/Reports, manage Tickets
- `viewer` - Read Dashboard/Reports only

**Adding protected routes:**

1. Add entry to `lib/abilities/routeMap.ts` with pattern, action, subject
2. That's it - middleware handles enforcement automatically

**Middleware flow:**

1. Skip static assets (`/_next`, `/api`, etc.)
2. Allow public routes without auth
3. Extract JWT from `accessToken` cookie, decode with `jose`
4. Check authorization via CASL
5. Redirect: unauthenticated → `/login`, forbidden → `/unauthorized`

**Client-side permission checks:**

```tsx
import { useAbility, useCan } from '@/@core/hooks/useAbility'

// Option 1: Full ability object
const ability = useAbility()
if (ability.can('read', 'Users')) { /* show users link */ }

// Option 2: Simple boolean check
const canManageSettings = useCan('manage', 'Settings')
```

**JWT requirements:** Backend must include `role` claim in JWT payload.

### Key Patterns
- ES Modules throughout (`"type": "module"` in package.json)
- Tokens stored in localStorage + cookies for SSR support
- i18n supports English/Arabic with auto-detection
- Theme persisted to localStorage

### Preset Logic
The `addTailwindV4()` function in `src/run.mjs`:
1. Adds Tailwind v4 + PostCSS dependencies
2. Creates `postcss.config.mjs`
3. Prepends `@import "tailwindcss"` to globals.css
4. Ensures layout.tsx imports globals.css
5. Removes old tailwind.config.* files (v4 is zero-config)

## Important Note
After major changes, please update this file (CLAUDE.md). Keep this file up-to-date with the project's status
