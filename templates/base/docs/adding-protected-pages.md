# Adding Protected Pages

This guide explains how to add new pages with authentication and authorization.

## Quick Start

### Step 1: Create Your Page

Create a new page file **anywhere** in the `app/` folder:

```tsx
// app/invoices/page.tsx (or anywhere you want!)
'use client'

import { Container, Typography } from '@mui/material'

export default function InvoicesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4">Invoices</Typography>
      {/* Your page content */}
    </Container>
  )
}
```

> **Important:** Always add `'use client'` at the top when using MUI components.

**Note:** The file location doesn't matter for protection. You can place pages at:

- `app/invoices/page.tsx` → `/invoices`
- `app/(dashboard)/invoices/page.tsx` → `/invoices` (same URL, just organized)
- `app/admin/invoices/page.tsx` → `/admin/invoices`

Protection is determined by `routeMap.ts`, not folder structure.

### Step 2: Add Permission to Route Map

Open `lib/abilities/routeMap.ts` and add your route:

```ts
export const routePermissions: RoutePermission[] = [
  // ... existing routes ...

  // Add your new route
  {
    pattern: '/dashboard/invoices',
    action: 'read',
    subject: 'Invoices',  // New subject
    description: 'View invoices list',
  },
]
```

### Step 3: Add Subject to Types (if new)

If you created a new subject (like `'Invoices'`), add it to `lib/abilities/types.ts`:

```ts
export type Subjects =
  | 'Dashboard'
  | 'Users'
  | 'Settings'
  | 'Reports'
  | 'Tickets'
  | 'Invoices'  // Add your new subject
  | 'all'
```

### Step 4: Define Role Permissions

Open `lib/abilities/roles.ts` and add permissions for each role:

```ts
case 'manager':
  can('read', 'all')
  can('manage', 'Users')
  can('manage', 'Tickets')
  can('manage', 'Reports')
  can('manage', 'Invoices')  // Add permission
  cannot('manage', 'Settings')
  break

case 'agent':
  can('read', 'Dashboard')
  can('read', 'Tickets')
  can('read', 'Reports')
  can('read', 'Invoices')  // Add permission
  // ...
  break
```

**Done!** Your page is now protected.

---

## Route Pattern Examples

| Pattern | Matches | Use Case |
|---------|---------|----------|
| `/dashboard/invoices` | Exact path only | List page |
| `/dashboard/invoices/[id]` | `/dashboard/invoices/123` | Detail page |
| `/dashboard/invoices/*` | Any nested path | Section with sub-pages |

### Dynamic Route Example

```ts
// For /dashboard/invoices/[id]
{
  pattern: '/dashboard/invoices/[id]',
  action: 'read',
  subject: 'Invoices',
},

// For edit page /dashboard/invoices/[id]/edit
{
  pattern: '/dashboard/invoices/[id]/edit',
  action: 'update',
  subject: 'Invoices',
},

// For all nested pages under /invoices, including the page itself
{
  pattern: '/dashboard/invoices/*',
  action: 'update',
  subject: 'Invoices',
},
```

---

## Actions Reference

| Action | Meaning | Typical Use |
|--------|---------|-------------|
| `read` | View/list resources | List pages, detail pages |
| `create` | Create new resources | "New" or "Add" pages |
| `update` | Modify resources | Edit pages |
| `delete` | Remove resources | Delete functionality |
| `manage` | All of the above | Full access |

---

## Hiding UI Based on Permissions

To show/hide navigation or buttons based on user's role:

```tsx
'use client'

import { useAbility } from '@/@core/hooks/useAbility'

function Navigation() {
  const ability = useAbility()

  return (
    <nav>
      {ability.can('read', 'Invoices') && (
        <Link href="/dashboard/invoices">Invoices</Link>
      )}

      {ability.can('create', 'Invoices') && (
        <Button>New Invoice</Button>
      )}
    </nav>
  )
}
```

Or use the simpler `useCan` hook:

```tsx
import { useCan } from '@/@core/hooks/useAbility'

function InvoiceActions() {
  const canCreate = useCan('create', 'Invoices')
  const canDelete = useCan('delete', 'Invoices')

  return (
    <>
      {canCreate && <Button>New Invoice</Button>}
      {canDelete && <Button color="error">Delete</Button>}
    </>
  )
}
```

---

## Complete Example: Adding an "Orders" Section

### 1. Create the pages

```
app/(dashboard)/dashboard/orders/
├── page.tsx           # /dashboard/orders (list)
├── [id]/
│   └── page.tsx       # /dashboard/orders/123 (detail)
└── new/
    └── page.tsx       # /dashboard/orders/new (create)
```

### 2. Update types.ts

```ts
export type Subjects =
  | 'Dashboard'
  | 'Users'
  | 'Settings'
  | 'Reports'
  | 'Tickets'
  | 'Orders'  // Added
  | 'all'
```

### 3. Update routeMap.ts

```ts
// Orders - manager and admin
{ pattern: '/dashboard/orders', action: 'read', subject: 'Orders' },
{ pattern: '/dashboard/orders/[id]', action: 'read', subject: 'Orders' },
{ pattern: '/dashboard/orders/new', action: 'create', subject: 'Orders' },
{ pattern: '/dashboard/orders/[id]/edit', action: 'update', subject: 'Orders' },
```

### 4. Update roles.ts

```ts
case 'admin':
  can('manage', 'all')  // Already has access
  break

case 'manager':
  can('read', 'all')
  can('manage', 'Orders')  // Full access to orders
  break

case 'agent':
  can('read', 'Orders')    // Can only view
  break

case 'viewer':
  // No access to orders
  break
```

---

## Summary

1. **Create page** in `app/(dashboard)/dashboard/`
2. **Add route** to `lib/abilities/routeMap.ts`
3. **Add subject** to `lib/abilities/types.ts` (if new)
4. **Define permissions** in `lib/abilities/roles.ts`

The middleware automatically enforces these rules - no changes needed to individual pages!
