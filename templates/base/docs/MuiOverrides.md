# MUI Component Overrides

This guide explains how the MUI theme override system works and how to customize the appearance of any MUI component globally.

---

## How overrides are structured

Every MUI component has its own override file under `core/theme/overrides/`:

```
core/theme/overrides/
├── accordion.ts
├── alerts.ts
├── autocomplete.ts
├── avatars.ts
├── button.ts          ← example covered below
├── card.ts
├── chip.ts
├── dataGrid.ts
├── dialog.ts
├── input.ts
├── menu.ts
├── paper.ts
├── table.ts
├── textFields.ts
├── tooltip.ts
├── typography.ts
└── index.ts           ← assembles all overrides
```

Each file exports a function that returns an MUI `components` object. They are all merged together in `index.ts` and applied via `ThemeOptions.ts` → `ThemeComponent.tsx`.

---

## Reading an existing override

Here is the `button.ts` file as a reference:

```ts
// core/theme/overrides/button.ts
const Button = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: themeConfig.borderRadius,   // uses global borderRadius
          transition: 'all 0.15s ease-in-out',
          // hover tint for text variant
          '&.MuiButton-textPrimary:hover': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
          },
        }),
        contained: ({ theme }) => ({
          boxShadow: theme.shadows[3],
          '&:hover': { boxShadow: theme.shadows[6] },
        }),
        outlined: ({ theme }) => ({
          lineHeight: 1.572,
        }),
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple,   // controlled by themeConfig
      }
    }
  }
}
```

Key concepts:
- **`styleOverrides`** — CSS-in-JS styles injected into a slot (`root`, `contained`, `outlined`, etc.)
- **`defaultProps`** — default prop values applied to every instance of the component
- **`ownerState`** — gives you access to the component's props so you can apply conditional styles
- **`theme`** — gives you access to palette, spacing, shadows, breakpoints, etc.

---

## How to customize an existing override

### Example: Change the button border radius

Open `core/theme/overrides/button.ts` and update the `root` slot:

```ts
root: ({ ownerState, theme }) => ({
  borderRadius: 4,   // hard-coded value
  // or keep it dynamic:
  borderRadius: themeConfig.borderRadius,
}),
```

### Example: Make all outlined buttons thicker

```ts
outlined: ({ theme }) => ({
  borderWidth: 2,
  '&:hover': { borderWidth: 2 },
}),
```

### Example: Make all Cards have no box shadow

Open `core/theme/overrides/card.ts` and override the root:

```ts
MuiCard: {
  styleOverrides: {
    root: {
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
    }
  }
}
```

### Example: Change the default TextField variant

Open `core/theme/overrides/textFields.ts` and add `defaultProps`:

```ts
MuiTextField: {
  defaultProps: {
    variant: 'outlined',   // 'filled' | 'outlined' | 'standard'
    size: 'small',
  },
  styleOverrides: {
    root: { /* ... */ }
  }
}
```

---

## How to add an override for a new component

If a component doesn't have a dedicated file yet, add it directly to an existing file or create a new one.

### Option A: Add to an existing related file

For example, add `MuiAlert` customizations to `alerts.ts`:

```ts
// core/theme/overrides/alerts.ts
const Alerts = (mode: PaletteMode) => {
  return {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: ({ theme }) => ({
          backgroundColor: theme.palette.success.light,
        }),
      }
    }
  }
}
```

### Option B: Create a new file

1. Create `core/theme/overrides/badge.ts`:

```ts
const Badge = () => {
  return {
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          fontSize: '0.65rem',
        }
      }
    }
  }
}

export default Badge
```

2. Register it in `core/theme/overrides/index.ts`:

```ts
import MuiBadge from './badge'

const Overrides = (settings: Settings) => {
  // ... existing
  const badge = MuiBadge()

  return Object.assign(
    // ... existing,
    badge
  )
}
```

---

## Using `ownerState` for conditional styles

`ownerState` contains the props passed to the component at usage time. This lets you apply styles based on `color`, `variant`, `size`, etc.:

```ts
root: ({ ownerState, theme }) => ({
  // Style only small contained primary buttons
  ...(ownerState.size === 'small' &&
    ownerState.variant === 'contained' &&
    ownerState.color === 'primary' && {
      fontWeight: 700,
      letterSpacing: '0.05em',
    }),
})
```

---

## Using `theme` for palette-aware styles

```ts
root: ({ theme }) => ({
  // Different styles for dark vs light mode
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.grey[100],

  // Use spacing
  padding: theme.spacing(2, 3),

  // Use breakpoints
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
})
```

---

## Agent prompt for component overrides

You can use the following prompt with an AI assistant to generate override code for any MUI component:

```
I'm using a Next.js + MUI project with a custom theme override system.
Each MUI component has its own override file at `core/theme/overrides/<component>.ts`.
The file exports a function that returns an object with `MuiComponentName.styleOverrides` and/or `MuiComponentName.defaultProps`.
The function receives no arguments for most components, or `(mode: PaletteMode)` for mode-aware ones.
The `OwnerStateThemeType` type is `{ theme: Theme, ownerState: ... }`.

Please generate an override for [MUI component name] that [describe what you want].
Follow the exact pattern used in this example:

import { OwnerStateThemeType } from './'

const MyComponent = () => {
  return {
    MuiMyComponent: {
      styleOverrides: {
        root: ({ ownerState, theme }: OwnerStateThemeType) => ({
          // styles here
        }),
      },
      defaultProps: {
        // default props here
      }
    }
  }
}

export default MyComponent
```

---

## All overridden components

The following MUI components have dedicated override files:

| File | Components |
|------|------------|
| `accordion.ts` | MuiAccordion, MuiAccordionSummary, MuiAccordionDetails |
| `alerts.ts` | MuiAlert |
| `autocomplete.ts` | MuiAutocomplete |
| `avatars.ts` | MuiAvatar |
| `backdrop.ts` | MuiBackdrop |
| `breadcrumbs.ts` | MuiBreadcrumbs |
| `button.ts` | MuiButton, MuiButtonBase |
| `buttonGroup.ts` | MuiButtonGroup |
| `card.ts` | MuiCard, MuiCardContent, MuiCardHeader |
| `chip.ts` | MuiChip |
| `dataGrid.ts` | MuiDataGrid |
| `dialog.ts` | MuiDialog, MuiDialogTitle, MuiDialogContent, MuiDialogActions |
| `divider.ts` | MuiDivider |
| `fab.ts` | MuiFab |
| `iconButton.ts` | MuiIconButton |
| `input.ts` | MuiInputBase, MuiInput, MuiFilledInput, MuiOutlinedInput |
| `link.ts` | MuiLink |
| `list.ts` | MuiList, MuiListItem, MuiListItemText |
| `menu.ts` | MuiMenu, MuiMenuItem |
| `pagination.ts` | MuiPagination, MuiPaginationItem |
| `paper.ts` | MuiPaper |
| `popover.ts` | MuiPopover |
| `progress.ts` | MuiLinearProgress, MuiCircularProgress |
| `rating.ts` | MuiRating |
| `select.ts` | MuiSelect |
| `snackbar.ts` | MuiSnackbar |
| `switches.ts` | MuiSwitch |
| `table.ts` | MuiTable, MuiTableHead, MuiTableBody, MuiTableRow, MuiTableCell |
| `tabs.ts` | MuiTabs, MuiTab |
| `textFields.ts` | MuiTextField |
| `timeline.ts` | MuiTimeline, MuiTimelineItem |
| `toggleButton.ts` | MuiToggleButton, MuiToggleButtonGroup |
| `tooltip.ts` | MuiTooltip |
| `typography.ts` | MuiTypography |
