// ─── Landing Page Content Configuration ──────────────────────────────────────
// All user-visible text for the landing page lives here.
// Set `visible: false` on any section to hide it entirely from page.tsx.

export type TreeNode = {
  id: string
  name: string
  type: 'dir' | 'file'
  comment?: string
  children?: TreeNode[]
}

export type TerminalToken = {
  text: string
  color?: 'muted' | 'primary' | 'secondary' | 'text'
}

export type TerminalLine = {
  tokens: TerminalToken[]
  blank?: boolean
}

type Section<T> = { visible: boolean } & T

export type LandingContent = {
  nav: Section<{
    links: { label: string; href: string }[]
    cta: { label: string; href: string }
  }>
  hero: Section<{
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string; target: string }
    command: string
    scrollLabel: string
  }>
  installBanner: Section<{
    displayText: string
    command: string
  }>
  features: Section<{
    label: string
    heading: string
    cards: { num: string; name: string; desc: string }[]
  }>
  codeDemo: Section<{
    label: string
    heading: string
    body: string
    bullets: string[]
    terminalLines: TerminalLine[]
  }>
  techStack: Section<{
    label: string
    heading: string
    subheading: string
    cards: { role: string; name: string; desc: string }[]
    callout: string
  }>
  whatYouGet: Section<{
    label: string
    heading: string
    body: string
    terminalLabel: string
    defaultExpandedIds: string[]
    fileTree: TreeNode[]
    includedItems: { title: string; desc: string }[]
  }>
  howItWorks: Section<{
    label: string
    heading: string
    steps: { number: string; title: string; desc: string }[]
  }>
  stats: Section<{
    items: { animateTo: number | null; suffix: string; display: string; label: string }[]
  }>
  faq: Section<{
    label: string
    heading: string
    items: { question: string; answer: string }[]
  }>
  cta: Section<{
    label: string
    heading: string
    body: string
    primaryBtn: { label: string; copiedLabel: string; command: string }
    secondaryBtn: { label: string; href: string }
  }>
  footer: Section<{
    brand: { name: string; desc: string }
    techBadges: string[]
    templateLinks: { label: string; href: string }[]
    resourceLinks: { label: string; href: string; external: boolean }[]
    getStarted: { heading: string; command: string; note: string }
    copyright: string
    builtWith: string
  }>
}

export const landingContent: LandingContent = {
  // ─── Nav ──────────────────────────────────────────────────────────────────
  nav: {
    visible: true,
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Docs', href: '#docs' }
    ],
    cta: { label: 'Get Started', href: '/login' }
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    visible: true,
    eyebrow: 'NEXT.JS SCAFFOLDING CLI',
    title: 'Stop Starting From Scratch',
    subtitle:
      'One command scaffolds a complete Next.js 15 app: MUI v7, CASL RBAC, TanStack Query, i18n with RTL, and a protected dashboard — production-wired, not tutorial-grade.',
    primaryCta: { label: 'Get Started', href: '#get-started' },
    secondaryCta: {
      label: 'View on GitHub',
      href: 'https://github.com/Hadi87s/shortcut-next',
      target: '_blank'
    },
    command: 'npx shortcut-next@latest',
    scrollLabel: 'SCROLL'
  },

  // ─── Install Banner ────────────────────────────────────────────────────────
  installBanner: {
    visible: true,
    displayText: 'npx shortcut-next@latest',
    command: 'npx shortcut-next@latest'
  },

  // ─── Features ─────────────────────────────────────────────────────────────
  features: {
    visible: true,
    label: 'FEATURES',
    heading: 'A complete app, not a starter kit.',
    cards: [
      {
        num: '01',
        name: 'MUI v7 Design System',
        desc: 'Dark mode, light mode, RTL, and per-component theme overrides in /theme/. Switch palette tokens globally without touching component code.'
      },
      {
        num: '02',
        name: 'CASL Role-Based Auth',
        desc: 'Four roles: admin, manager, agent, viewer. Middleware enforces permissions on every route. Add a protected route by editing one file.'
      },
      {
        num: '03',
        name: 'Protected Dashboard Layout',
        desc: 'Collapsible sidebar, nested route groups, responsive layout shell — wired to auth so only permitted roles see each page.'
      },
      {
        num: '04',
        name: 'i18n with RTL Support',
        desc: 'English and Arabic out of the box. Language auto-detected from the browser; layout direction flips automatically.'
      },
      {
        num: '05',
        name: 'TanStack Query + Axios',
        desc: 'Server state and caching configured with sensible defaults. Axios interceptors handle JWT refresh and auto-logout on 401/403.'
      },
      {
        num: '06',
        name: 'React Hook Form + TypeScript',
        desc: 'Strongly-typed forms throughout. Full TypeScript coverage including CASL types, role enums, and API response shapes.'
      }
    ]
  },

  // ─── Code Demo ────────────────────────────────────────────────────────────
  codeDemo: {
    visible: true,
    label: 'QUICK START',
    heading: 'From zero to dashboard in under 30 seconds',
    body: 'The CLI asks three questions: project name, template preset, and package manager. Auth middleware, theme, providers, forms, and i18n — all configured and wired before you open your editor.',
    bullets: [
      'JWT auth context with token refresh built in',
      'CASL middleware guards routes before they render',
      'Arabic + English i18n with automatic RTL layout'
    ],
    terminalLines: [
      { tokens: [{ text: '# Install and scaffold', color: 'muted' }] },
      {
        tokens: [
          { text: '$ ', color: 'muted' },
          { text: 'npx', color: 'primary' },
          { text: ' shortcut-next@latest ', color: 'text' },
          { text: 'my-app', color: 'secondary' }
        ]
      },
      { blank: true, tokens: [] },
      { tokens: [{ text: '# Start developing', color: 'muted' }] },
      {
        tokens: [
          { text: '$ ', color: 'muted' },
          { text: 'cd', color: 'primary' },
          { text: ' ', color: 'text' },
          { text: 'my-app', color: 'secondary' },
          { text: ' && ', color: 'muted' },
          { text: 'npm', color: 'primary' },
          { text: ' run dev', color: 'text' }
        ]
      },
      { blank: true, tokens: [] },
      {
        tokens: [
          { text: '# Your app is ready at ', color: 'muted' },
          { text: 'localhost:3000', color: 'secondary' }
        ]
      }
    ]
  },

  // ─── Tech Stack ───────────────────────────────────────────────────────────
  techStack: {
    visible: true,
    label: 'TECH STACK',
    heading: 'Eight libraries. One command.',
    subheading:
      "Every dependency in the generated project is chosen for real production use. Here's what you get and why it's there.",
    cards: [
      {
        role: 'FRAMEWORK',
        name: 'Next.js 15',
        desc: 'App Router, Server Components, Layouts, and middleware — the full feature set, not a pages-directory fallback.'
      },
      {
        role: 'COMPONENT LIBRARY',
        name: 'Material UI v7',
        desc: 'Theming, dark mode, RTL layout, and per-component overrides all pre-configured. Use the design system immediately.'
      },
      {
        role: 'AUTHORIZATION',
        name: 'CASL',
        desc: 'Attribute-based access control with a four-role hierarchy. Middleware enforces it. Client hooks expose it.'
      },
      {
        role: 'SERVER STATE',
        name: 'TanStack Query v5',
        desc: 'Caching, background refetch, and loading states configured with sensible defaults. No manual fetch boilerplate.'
      },
      {
        role: 'FORMS',
        name: 'React Hook Form',
        desc: 'Strongly-typed, performant forms. Used on the login and signup pages out of the box with full validation wiring.'
      },
      {
        role: 'INTERNATIONALIZATION',
        name: 'i18next',
        desc: 'English and Arabic with automatic RTL detection. Language preference is persisted to localStorage.'
      },
      {
        role: 'HTTP CLIENT',
        name: 'Axios',
        desc: 'Interceptors handle JWT injection, 401 token refresh, and auto-logout. One Axios instance, fully configured.'
      },
      {
        role: 'TYPE SAFETY',
        name: 'TypeScript',
        desc: 'Full coverage: CASL ability types, role enums, API response shapes, and Next.js 15 server component props.'
      }
    ],
    callout: 'Tailwind CSS v4 — zero-config utility classes, added at scaffold time'
  },

  // ─── What You Get ─────────────────────────────────────────────────────────
  whatYouGet: {
    visible: true,
    label: 'WHAT YOU GET',
    heading: 'A working app, not a starting point.',
    body: 'Open your editor to a project that already does something. Every file below is scaffolded and wired on the first run.',
    terminalLabel: 'project structure',
    defaultExpandedIds: ['app', 'dashboard-group', 'lib-abilities', 'core', 'core-context', 'providers'],
    fileTree: [
      {
        id: 'app',
        name: 'app/',
        type: 'dir',
        comment: 'Next.js App Router root',
        children: [
          {
            id: 'dashboard-group',
            name: '(dashboard)/',
            type: 'dir',
            comment: 'protected route group',
            children: [
              {
                id: 'dashboard-dir',
                name: 'dashboard/',
                type: 'dir',
                children: [
                  {
                    id: 'dashboard-page',
                    name: 'page.tsx',
                    type: 'file',
                    comment: '→ Dashboard home'
                  }
                ]
              },
              {
                id: 'dashboard-layout',
                name: 'layout.tsx',
                type: 'file',
                comment: '→ Protected sidebar layout'
              }
            ]
          },
          {
            id: 'home-dir',
            name: 'home/',
            type: 'dir',
            children: [{ id: 'home-page', name: 'page.tsx', type: 'file', comment: '→ Home / landing page' }]
          },
          {
            id: 'login-dir',
            name: 'login/',
            type: 'dir',
            children: [
              {
                id: 'login-page',
                name: 'page.tsx',
                type: 'file',
                comment: '→ Login with React Hook Form'
              }
            ]
          },
          {
            id: 'unauthorized-dir',
            name: 'unauthorized/',
            type: 'dir',
            children: [
              {
                id: 'unauthorized-page',
                name: 'page.tsx',
                type: 'file',
                comment: '→ CASL redirect target'
              }
            ]
          },
          {
            id: 'root-layout',
            name: 'layout.tsx',
            type: 'file',
            comment: '→ Root layout + all providers'
          }
        ]
      },
      {
        id: 'lib-abilities',
        name: 'lib/abilities/',
        type: 'dir',
        comment: 'CASL authorization',
        children: [
          { id: 'roles', name: 'roles.ts', type: 'file', comment: '→ Role → ability definitions' },
          {
            id: 'routeMap',
            name: 'routeMap.ts',
            type: 'file',
            comment: '→ Route → permission mapping'
          },
          {
            id: 'routeMatcher',
            name: 'routeMatcher.ts',
            type: 'file',
            comment: '→ Pattern matching logic'
          },
          {
            id: 'checkAuth',
            name: 'checkAuthorization.ts',
            type: 'file',
            comment: '→ Auth orchestration'
          }
        ]
      },
      {
        id: 'core',
        name: 'core/',
        type: 'dir',
        comment: 'infrastructure layer',
        children: [
          {
            id: 'core-clients',
            name: 'clients/',
            type: 'dir',
            children: [
              {
                id: 'apiClient',
                name: 'apiClient.ts',
                type: 'file',
                comment: '→ Axios with token refresh'
              }
            ]
          },
          {
            id: 'core-context',
            name: 'context/',
            type: 'dir',
            children: [
              {
                id: 'authContext',
                name: 'AuthContext.tsx',
                type: 'file',
                comment: '→ login / logout / token state'
              },
              {
                id: 'settingsContext',
                name: 'SettingsContext.tsx',
                type: 'file',
                comment: '→ theme, language, direction'
              }
            ]
          },
          {
            id: 'core-theme',
            name: 'theme/overrides/',
            type: 'dir',
            comment: '→ per-component MUI overrides'
          }
        ]
      },
      {
        id: 'providers',
        name: 'providers/',
        type: 'dir',
        comment: 'React context composition',
        children: [
          {
            id: 'appProviders',
            name: 'AppProviders.tsx',
            type: 'file',
            comment: '→ Auth → Settings → Theme → Query'
          },
          {
            id: 'i18nProvider',
            name: 'I18nProvider.tsx',
            type: 'file',
            comment: '→ i18next initialization'
          }
        ]
      }
    ],
    includedItems: [
      {
        title: 'Login page',
        desc: 'React Hook Form with validation. JWT stored in localStorage and mirrored to cookies for SSR.'
      },
      {
        title: 'Protected dashboard layout',
        desc: 'Collapsible sidebar with nested routes and responsive design. Only accessible to authenticated users.'
      },
      {
        title: 'CASL authorization',
        desc: 'Route map + middleware check on every request. Add a protected route by editing one file.'
      },
      {
        title: 'Auth context',
        desc: 'login(), logout() with token storage, user state, and auto-redirect on session expiry.'
      },
      {
        title: 'Settings context',
        desc: 'Theme mode (dark/light), UI direction (LTR/RTL), and language — persisted to localStorage.'
      },
      {
        title: 'MUI theme system',
        desc: 'core/theme/overrides/ with one file per MUI component. Change global tokens without touching internals.'
      },
      {
        title: 'Axios API client',
        desc: 'Request interceptor injects the access token. Response interceptor handles 401 refresh and cascade logout.'
      },
      {
        title: 'MSW mock layer',
        desc: 'Mock Service Worker pre-configured for local development. Swap real endpoints in when ready.'
      }
    ]
  },

  // ─── How It Works ─────────────────────────────────────────────────────────
  howItWorks: {
    visible: true,
    label: 'HOW IT WORKS',
    heading: 'Interactive setup. Instant structure.',
    steps: [
      {
        number: 'STEP 01',
        title: 'Run the CLI',
        desc: 'Launch the interactive prompt. Answer three questions: project name, template preset, and package manager. The CLI handles the rest — git init, dependency install, project structure.'
      },
      {
        number: 'STEP 02',
        title: 'Choose your preset',
        desc: 'Pick the base MUI stack or add Tailwind v4. Dependencies install automatically with a clean initial commit ready to push.'
      },
      {
        number: 'STEP 03',
        title: 'Open your editor and ship',
        desc: 'Your project has a working login page, a protected dashboard, JWT handling, CASL middleware, and MUI theming — ready for your first feature commit.'
      }
    ]
  },

  // ─── Stats ────────────────────────────────────────────────────────────────
  stats: {
    visible: true,
    items: [
      { animateTo: 9, suffix: '+', display: '0+', label: 'INTEGRATED PACKAGES' },
      { animateTo: 4, suffix: '', display: '0', label: 'BUILT-IN RBAC ROLES' },
      { animateTo: null, suffix: '', display: '<30s', label: 'TO RUNNING DEV SERVER' }
    ]
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    visible: true,
    label: 'FAQ',
    heading: 'What developers ask first',
    items: [
      {
        question: 'What exactly does the scaffolded project contain?',
        answer:
          'A working login and signup page under /app/login/, a protected dashboard with sidebar navigation under /app/(dashboard)/, CASL middleware that guards every route, MUI theme overrides, Auth and Settings contexts, an Axios client with token refresh interceptors, and i18n for English and Arabic. All wired together before you write a line of code.'
      },
      {
        question: 'Do I need to install anything globally?',
        answer:
          'No. npx runs the latest version without a global install. The CLI scaffolds the project, installs dependencies with your chosen package manager, and initializes a git repository automatically.'
      },
      {
        question: 'How does the CASL authorization system work?',
        answer:
          'Roles map to abilities in a single file at lib/abilities/roles.ts. A route map at lib/abilities/routeMap.ts lists every protected path with the required action and subject. Next.js middleware decodes the JWT on every request and checks the user role against that map — no per-page auth guards needed.'
      },
      {
        question: 'Can I add Tailwind to the base preset later?',
        answer:
          'Tailwind v4 is a scaffolding-time choice because it needs PostCSS config and a globals.css import. To add it manually: install @tailwindcss/postcss, create postcss.config.mjs, and prepend @import "tailwindcss" to globals.css — the same three steps the CLI performs for the tailwind preset.'
      },
      {
        question: 'Is the JWT handling production-safe?',
        answer:
          'Tokens are stored in localStorage and mirrored to cookies so server components can read them via SSR. The Axios client intercepts 401 responses, attempts a token refresh, retries the original request, and triggers logout only if the refresh also fails. The middleware uses jose to verify and decode the JWT without exposing secrets to the client.'
      }
    ]
  },

  // ─── CTA ──────────────────────────────────────────────────────────────────
  cta: {
    visible: true,
    label: 'GET STARTED',
    heading: 'Your next project starts here',
    body: 'Auth, roles, theming, i18n, and data fetching — scaffolded in under 30 seconds. Open your editor to a working dashboard, not an empty folder.',
    primaryBtn: {
      label: 'Copy Install Command',
      copiedLabel: 'Copied!',
      command: 'npx shortcut-next@latest'
    },
    secondaryBtn: {
      label: 'View on GitHub',
      href: 'https://github.com/Hadi87s/shortcut-next'
    }
  },

  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    visible: true,
    brand: {
      name: '.shortcut',
      desc: 'A CLI tool that scaffolds production-ready Next.js 15 apps with MUI, auth, CASL RBAC, i18n, and a full data layer — wired in under 30 seconds.'
    },
    techBadges: ['Next.js 15', 'MUI v7', 'CASL', 'TanStack Query', 'TypeScript', 'i18next'],
    templateLinks: [
      { label: 'Features', href: '#features' },
      { label: 'Tech Stack', href: '#tech-stack' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' }
    ],
    resourceLinks: [
      { label: 'GitHub', href: 'https://github.com/Hadi87s/shortcut-next', external: true },
      { label: 'npm', href: 'https://www.npmjs.com/package/shortcut-next', external: true },
      { label: 'Issues', href: 'https://github.com/Hadi87s/shortcut-next/issues', external: true },
      {
        label: 'Changelog',
        href: 'https://github.com/Hadi87s/shortcut-next/releases',
        external: true
      }
    ],
    getStarted: {
      heading: 'Run this in your terminal:',
      command: 'npx shortcut-next@latest',
      note: 'No global install required.'
    },
    copyright: 'shortcut-next · MIT License',
    builtWith: 'Built with Next.js · Deployed on Vercel'
  }
}
