# i18n Documentation

This project uses [i18next](https://www.i18next.com/) with `react-i18next` for internationalization. The system supports **English** and **Arabic** out of the box, with full RTL/LTR layout switching tied to the language selection.

Everything is pre-wired — you only need to add translation keys and call `t()`.

---

## How It Works (Architecture Overview)

```
Language selected by user
        ↓
useLanguage() → i18n.changeLanguage(lng)
        ↓
SettingsContext saves { language, direction } to localStorage
        ↓
ThemeComponent applies MUI direction
        ↓
Direction component applies Emotion RTL plugin + sets document.dir
        ↓
All MUI components and your layout flip automatically
```

The entire pipeline is automatic. Switching language also switches text direction — no extra code needed.

---

## Configuration

**File:** `core/configs/i18n.ts`

```ts
i18n
  .use(Backend)           // loads JSON files from /public/locales/
  .use(LanguageDetector)  // detects user's preferred language
  .use(initReactI18next)  // connects to React
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'  // one flat JSON file per language
    },
    detection: {
      order: ['localStorage', 'htmlTag', 'navigator'],  // detection priority
      caches: ['localStorage']                          // where to persist
    },
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',        // use English if detected language is unsupported
    load: 'languageOnly',     // treat 'en-US' as 'en'
    react: {
      useSuspense: false      // avoids SSR hydration issues
    },
    interpolation: {
      escapeValue: false      // React already escapes output
    }
  })
```

### Language Detection Order

1. **localStorage** — if the user has previously selected a language, it is used immediately
2. **htmlTag** — reads the `lang` attribute on `<html>`
3. **navigator** — falls back to the browser's language setting

### Defaults

| Setting | Value | Description |
|---|---|---|
| `fallbackLng` | `'en'` | Used when detected language isn't supported |
| `supportedLngs` | `['en', 'ar']` | Only these two are loaded |
| `load` | `'languageOnly'` | `'en-US'` resolves to `'en'` |
| `useSuspense` | `false` | Safe for Next.js SSR |

---

## Translation Files

**Location:** `public/locales/`

```
public/
└── locales/
    ├── en.json   ← English
    └── ar.json   ← Arabic
```

Each file is a single flat-or-nested JSON object. Keys must exist in **both** files.

### English (`en.json`) — excerpt

```json
{
  "common": {
    "dark": "Dark",
    "light": "Light",
    "language": "Language",
    "english": "English",
    "arabic": "Arabic",
    "loading": "Loading"
  },
  "validation": {
    "emailRequired": "Email is required",
    "passwordMin8": "Password must be at least 8 characters",
    "passwordsDoNotMatch": "Passwords do not match"
  },
  "login": {
    "brand": "Welcome Back",
    "subtitle": "Sign in to continue to your account",
    "email": "Email",
    "password": "Password",
    "signIn": "Sign In",
    "dontHaveAccount": "Don't have an account?",
    "signUp": "Sign Up"
  }
}
```

### Arabic (`ar.json`) — same keys, Arabic values

```json
{
  "common": {
    "dark": "داكن",
    "light": "فاتح",
    "language": "اللغة",
    "english": "الإنجليزية",
    "arabic": "العربية",
    "loading": "جار التحميل"
  },
  "validation": {
    "emailRequired": "البريد الإلكتروني مطلوب",
    "passwordMin8": "يجب أن تكون كلمة المرور على الأقل 8 أحرف",
    "passwordsDoNotMatch": "كلمتا المرور غير متطابقتين"
  },
  "login": {
    "brand": "مرحباً بعودتك",
    "subtitle": "سجل الدخول للمتابعة إلى حسابك",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "signIn": "تسجيل الدخول",
    "dontHaveAccount": "ليس لديك حساب؟",
    "signUp": "إنشاء حساب"
  }
}
```

---

## Using Translations in Components

### Option 1 — `useTranslation()` hook (recommended)

```tsx
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('login.brand')}</h1>
      <p>{t('login.subtitle')}</p>
      <label>{t('login.email')}</label>
      <button>{t('login.signIn')}</button>
    </div>
  )
}
```

**With a fallback value** (shown if the key is missing):

```tsx
<h1>{t('dashboard.title', 'Dashboard')}</h1>
```

### Option 2 — `<Translations>` component

```tsx
import Translations from '@/components/common/Translations'

<h1><Translations text="login.brand" /></h1>
<p><Translations text="login.subtitle" /></p>
```

Use this when you need a quick inline translation without setting up the hook.

---

## Variables in Translations (Interpolation)

Use `{{variableName}}` in your JSON values, then pass values when calling `t()`.

**en.json:**

```json
{
  "HomePage": {
    "footer": "Built with ❤️ by {{name}} using MUI."
  },
  "dashboard": {
    "greeting": "Hello, {{firstName}}! You have {{count}} new messages."
  }
}
```

**ar.json:**

```json
{
  "HomePage": {
    "footer": "مبني بكل ❤️ بواسطة {{name}} باستخدام MUI."
  },
  "dashboard": {
    "greeting": "مرحباً، {{firstName}}! لديك {{count}} رسائل جديدة."
  }
}
```

**Component:**

```tsx
const { t } = useTranslation()

// Single variable
<p>{t('HomePage.footer', { name: 'Hadi' })}</p>
// EN → "Built with ❤️ by Hadi using MUI."
// AR → "مبني بكل ❤️ بواسطة Hadi باستخدام MUI."

// Multiple variables
<p>{t('dashboard.greeting', { firstName: 'Sara', count: 3 })}</p>
// EN → "Hello, Sara! You have 3 new messages."
// AR → "مرحباً، Sara! لديك 3 رسائل جديدة."
```

---

## Adding New Translation Keys

**Step 1** — Add the key to `public/locales/en.json`:

```json
{
  "tickets": {
    "title": "Support Tickets",
    "createNew": "Create Ticket",
    "status": {
      "open": "Open",
      "closed": "Closed",
      "pending": "Pending"
    },
    "emptyState": "No tickets found. Create your first one!"
  }
}
```

**Step 2** — Add the same key to `public/locales/ar.json`:

```json
{
  "tickets": {
    "title": "تذاكر الدعم",
    "createNew": "إنشاء تذكرة",
    "status": {
      "open": "مفتوحة",
      "closed": "مغلقة",
      "pending": "قيد الانتظار"
    },
    "emptyState": "لا توجد تذاكر. أنشئ أول تذكرة لك!"
  }
}
```

**Step 3** — Use in your component:

```tsx
const { t } = useTranslation()

<Typography variant="h4">{t('tickets.title')}</Typography>
<Button>{t('tickets.createNew')}</Button>
<Chip label={t('tickets.status.open')} />
<Typography>{t('tickets.emptyState')}</Typography>
```

---

## Switching Language Programmatically

Use the `useLanguage` hook from `@/core/hooks/useLanguage`.

```tsx
import useLanguage from '@/core/hooks/useLanguage'
import type { Locale } from '@/core/configs/i18n'

export default function MyComponent() {
  const { language, handleLanguageChange } = useLanguage()

  return (
    <div>
      <p>Current language: {language}</p>   {/* 'en' or 'ar' */}

      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('ar')}>عربي</button>
    </div>
  )
}
```

What `handleLanguageChange` does automatically:

1. Calls `i18n.changeLanguage(lng)` to load the new locale
2. Sets `direction: 'rtl'` when switching to Arabic, `'ltr'` for English
3. Saves the new `{ language, direction }` to localStorage via `SettingsContext`
4. The `Direction` component picks up the change and updates `document.dir` + applies the RTL CSS plugin

You do **not** need to touch `document.dir` or the MUI theme direction manually.

---

## Ready-Made Language Dropdown

A pre-built dropdown component is available — use it directly.

```tsx
import LanguageDropdown from '@/components/common/LanguageDropdown'

// Drop it anywhere in your header/settings area
<LanguageDropdown />
```

It reads and updates `useLanguage()` internally. No props required.

---

## RTL Support

RTL layout is fully automatic when Arabic is selected.

**What flips automatically:**
- MUI component layout (drawer opens from right, text aligns right, padding/margin mirrors)
- Emotion CSS-in-JS via `stylis-plugin-rtl` (physical → logical property conversion)
- `document.dir` attribute on `<html>`

**What you should write for RTL-safe styling:**

Use logical CSS properties instead of physical ones:

| Instead of | Use |
|---|---|
| `marginLeft` | `marginInlineStart` |
| `marginRight` | `marginInlineEnd` |
| `paddingLeft` | `paddingInlineStart` |
| `paddingRight` | `paddingInlineEnd` |
| `borderLeft` | `borderInlineStart` |
| `left: 0` | `insetInlineStart: 0` |
| `textAlign: 'left'` | `textAlign: 'start'` |

**Example:**

```tsx
// ❌ breaks RTL
<Box sx={{ marginLeft: 2 }}>Content</Box>

// ✓ works in both directions
<Box sx={{ marginInlineStart: 2 }}>Content</Box>
```

MUI's own components already use logical properties internally, so standard MUI usage is safe.

---

## Persistence

Language preference is saved to `localStorage` under the `settings` key as part of the global settings object:

```json
{
  "language": "ar",
  "direction": "rtl",
  "mode": "dark",
  "themeColor": "primary"
}
```

On the next page load, the `SettingsContext` restores this value and i18next reads it from `localStorage` via the `LanguageDetector` plugin — before any API call or render.

> **Note:** If you change `themeConfig.ts` defaults and the user already has a `settings` key in localStorage, the stored value takes precedence. Clear localStorage during development to test default changes.

---

## Adding a New Language

1. **Add the locale file** — create `public/locales/fr.json` with all the same keys
2. **Register it** in `core/configs/i18n.ts`:

```ts
supportedLngs: ['en', 'ar', 'fr'],
```

3. **Add it to the `Locale` type** in `core/configs/i18n.ts`:

```ts
export type Locale = 'ar' | 'en' | 'fr'
```

4. **Update `LanguageDropdown`** — add a `<MenuItem value="fr">` entry
5. **Update `useLanguage`** — adjust the `normalizeLang` function if needed:

```ts
const normalizeLang = (lng: string): Locale => {
  if (lng.startsWith('ar')) return 'ar'
  if (lng.startsWith('fr')) return 'fr'
  return 'en'
}
```

6. **Handle direction** in `handleLanguageChange` (French is LTR, no change needed):

```ts
saveSettings({ ...settings, direction: lng === 'ar' ? 'rtl' : 'ltr', language: lng })
```

---

## Validation Messages with i18n

Form validation messages are already translated. Use the `validation` namespace keys with your Yup schemas:

```tsx
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export function useLoginSchema() {
  const { t } = useTranslation()

  return yup.object({
    email: yup
      .string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(8, t('validation.passwordMin8'))
      .required(t('validation.passwordRequired')),
  })
}
```

Available validation keys (in both `en.json` and `ar.json`):

| Key | English | Arabic |
|---|---|---|
| `validation.invalidEmail` | Invalid email address | عنوان البريد الإلكتروني غير صالح |
| `validation.emailRequired` | Email is required | البريد الإلكتروني مطلوب |
| `validation.passwordMin6` | Password must be at least 6 characters | يجب أن تكون كلمة المرور على الأقل 6 أحرف |
| `validation.passwordMin8` | Password must be at least 8 characters | يجب أن تكون كلمة المرور على الأقل 8 أحرف |
| `validation.passwordRequired` | Password is required | كلمة المرور مطلوبة |
| `validation.firstNameRequired` | First name is required | الاسم الأول مطلوب |
| `validation.lastNameRequired` | Last name is required | اسم العائلة مطلوب |
| `validation.passwordsDoNotMatch` | Passwords do not match | كلمتا المرور غير متطابقتين |
| `validation.confirmPasswordRequired` | Please confirm your password | يرجى تأكيد كلمة المرور |

---

## Quick Reference

| Task | How |
|---|---|
| Translate a string | `const { t } = useTranslation()` → `t('namespace.key')` |
| Inline translation component | `<Translations text="namespace.key" />` |
| Switch language | `const { handleLanguageChange } = useLanguage()` → `handleLanguageChange('ar')` |
| Show language picker | `<LanguageDropdown />` |
| Add a new key | Add to both `en.json` and `ar.json` |
| Use a variable in a string | `t('key', { name: 'value' })` and `{{name}}` in JSON |
| Check current language | `const { language } = useLanguage()` — returns `'en'` or `'ar'` |
| Add a new language | Add JSON file + update `supportedLngs` + update `Locale` type |
