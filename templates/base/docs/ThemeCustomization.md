# Theme Customization

This guide covers how to change the app name, favicon, default color mode, colors, and other global theme settings.

> **Important:** After changing any value in `themeConfig.ts`, clear the browser's `localStorage` to see the effect. The app persists settings locally and will use the cached value until cleared.

---

## themeConfig.ts

All top-level theme defaults live in `core/configs/themeConfig.ts`:

```ts
const themeConfig: ThemeConfig = {
  templateName: 'Next-Shortcut',       // App name shown in the sidebar
  mode: 'dark',                         // 'light' | 'dark' — default color mode
  direction: 'ltr',                     // 'ltr' | 'rtl' — default text direction
  responsiveFontSizes: true,            // Scale typography with viewport width
  disableRipple: true,                  // Remove MUI click ripple effects
  toastPosition: 'bottom-center',       // Toast notification position
  borderRadius: 10,                     // Global border-radius in px (buttons, cards, inputs)
  common: {
    sidebarRadius: 1,                   // Border-radius multiplier for sidebar items
  }
}
```

### Changing the app name

```ts
templateName: 'My Dashboard App',
```

This value appears as the app name in the sidebar header next to the logo.

### Changing the default color mode

```ts
mode: 'light',   // or 'dark'
```

Users can still toggle between modes at runtime via the theme toggle button. This sets the initial mode for new visitors.

### Changing the default direction

```ts
direction: 'rtl',
```

For Arabic-first apps, set `direction: 'rtl'`. This applies RTL layout to MUI components and the sidebar automatically.

### Changing the toast position

```ts
toastPosition: 'top-right',
// options: 'top-left' | 'top-center' | 'top-right'
//          'bottom-left' | 'bottom-center' | 'bottom-right'
```

### Changing the global border radius

```ts
borderRadius: 6,  // More angular
borderRadius: 16, // More rounded
```

This affects buttons, cards, chips, inputs, and all other MUI components that use `themeConfig.borderRadius`.

---

## Favicon & app icon

Replace the file at `public/favicon.ico` with your own icon.

For modern browsers that support SVG favicons or PNG, add additional `<link>` tags in `app/layout.tsx`:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'My App',
  description: 'My app description',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}
```

Place any additional icon files in the `public/` folder.

---

## Colors (palette)

The color palette is defined in `core/theme/palette/index.ts`. This is where you change the primary brand color, secondary color, and all semantic colors.

### Changing the primary color

Find the `brand` object and update the hex values:

```ts
// core/theme/palette/index.ts
const brand = {
  50:  '#EEF0FF',
  100: '#DDE2FF',
  200: '#BEC7FF',
  300: '#9DABFF',
  400: '#7C8FFF',
  500: '#5B74FF',   // ← main primary color
  600: '#415BEE',
  700: '#2F46CF',   // ← dark primary color
  800: '#2132A6',
  900: '#1A2880'
}
```

The theme uses `brand[400]` as `primary.light`, `brand[500]` as `primary.main`, and `brand[700]` as `primary.dark`.

### Changing the background colors

```ts
background: {
  default: isDark ? '#0b1020' : '#fff',   // Page background
  paper: isDark ? '#0f1724' : '#fff',     // Card/paper background
}
```

### Changing semantic colors

```ts
secondary: { light: '#64E1FF', main: '#00D0FF', dark: '#00A3CC', contrastText: '#001219' },
error:     { light: '#FF7A7A', main: '#FF4D4F', dark: '#C62828' },
warning:   { light: '#FFD166', main: '#FFB703', dark: '#C98A00' },
info:      { light: '#9AD0FF', main: '#55ADFF', dark: '#1E7ED6' },
success:   { light: '#33D69F', main: '#11C28B', dark: '#0E9B6F' },
```

### Adding a custom color token

Custom colors are available via `theme.palette.customColors`:

```ts
customColors: {
  // existing tokens...
  myBrandGold: '#F4A535',   // add your own
}
```

Then use it in `sx` props or styled components:

```tsx
<Box sx={{ color: theme => theme.palette.customColors.myBrandGold }} />
```

> You'll also need to extend the TypeScript types in `core/theme/types.ts` to add your new token without type errors.

---

## Typography

Typography configuration is in `core/theme/typography/index.ts`. The root layout (`app/layout.tsx`) applies the **Montserrat** font from Google Fonts.

To change the font:

1. Update the font import in `app/layout.tsx`
2. Update the `fontFamily` in `core/theme/typography/index.ts`

---

## Settings persistence

User preferences (mode, direction, language, sidebar state) are stored in `localStorage` under the key `'settings'`. The `SettingsContext` reads from this on every page load.

This means `themeConfig.ts` values only apply when no stored settings exist yet (new visitors, or after clearing localStorage). To reset a user's preferences, clear `localStorage.removeItem('settings')`.
