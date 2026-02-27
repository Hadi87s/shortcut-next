# API Client & Backend Configuration

This guide covers the Axios-based API client, the Next.js rewrite proxy, and how to configure the setup for both **integrated** (same-origin) and **separate** (external) backends.

---

## How it works

The template uses a two-layer approach to API communication:

```
Browser  →  /api/*  →  Next.js rewrite  →  NEXT_PUBLIC_URL/*  →  Your backend
```

1. **`next.config.ts`** rewrites every `/api/*` request to your backend URL.
2. **`core/clients/apiClient.ts`** is an Axios instance pre-configured with the `/api` base URL, automatic JWT injection, and token refresh.

The browser only ever talks to `/api/*` — your real backend URL is never exposed to the client.

---

## Environment setup

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_URL=http://localhost:8000
```

This is the only required environment variable. The rewrite in `next.config.ts` picks it up automatically:

```ts
// next.config.ts
async rewrites() {
  return [
    {
      source: `/api/:api_path*`,
      destination: `${process.env.NEXT_PUBLIC_URL}/:api_path*`
    }
  ]
}
```

A request to `/api/auth/login` becomes a server-side request to `http://localhost:8000/auth/login`.

---

## Using the API client

Import `apiClient` anywhere in your app:

```ts
import apiClient from '@/core/clients/apiClient'

// GET
const { data } = await apiClient.get('/users')

// POST
const { data } = await apiClient.post('/tickets', { title, description })

// PUT
await apiClient.put(`/tickets/${id}`, payload)

// DELETE
await apiClient.delete(`/tickets/${id}`)
```

The client automatically:
- Attaches the `Authorization: Bearer <token>` header from `localStorage`
- Refreshes the token on 401 responses and retries the original request
- Logs the user out on 403 responses or if token refresh fails

---

## What the client does under the hood

### Request interceptor

Before every request (except the refresh endpoint itself), the client reads `accessToken` from `localStorage` and injects it as a Bearer token:

```ts
config.headers.Authorization = `Bearer ${token}`
```

### Response interceptor — token refresh

When a `401` response is received:

1. If a refresh is already in progress, the failing request is queued.
2. Otherwise, it calls `POST /api/auth/refresh` (using the `refreshToken` cookie).
3. On success, the new access token is stored and all queued requests are retried.
4. On failure, `logoutUser()` is called and the user is redirected to `/login`.

```
Request → 401 → refresh in progress?
  Yes → queue request, wait for token
  No  → call /api/auth/refresh
          ↓ success → retry all queued requests with new token
          ↓ failure → logout + redirect /login
```

### Response interceptor — 403

A `403` immediately triggers `logoutUser()`. This handles expired or invalid tokens that the server recognizes as forbidden.

---

## Customizing the configuration

All auth-related settings live in `core/configs/clientConfig.ts`:

```ts
const authConfig = {
  baseURL: '/api',                        // Prefix for all API calls
  loginEndpoint: '/auth/login',           // POST login
  signupEndpoint: '/auth/signup',         // POST signup
  refreshEndpoint: '/auth/refresh',       // POST token refresh

  storageTokenKeyName: 'accessToken',     // localStorage key for access token
  storageRefreshTokenKeyName: 'refreshToken',
  storageUserDataKeyName: 'userData',

  loginPageURL: '/login',                 // Redirect on logout
  homePageURL: '/home',                   // Redirect after login

  requestTimeout: 15000,                  // 15 seconds

  cookieName: 'accessToken',             // Cookie name for SSR middleware
  cookieMaxAge: 60 * 60 * 24 * 7,        // 7 days
  cookieSameSite: 'Strict'
}
```

---

## Scenarios

### Integrated backend (same server)

Your Next.js app and backend run together (e.g. Next.js API routes, or a monorepo with a server on a different port locally but same domain in production).

**`.env.local`:**
```env
NEXT_PUBLIC_URL=http://localhost:8000
```

In production, if they share the same domain, set:
```env
NEXT_PUBLIC_URL=https://api.yourdomain.com
```

No other changes needed — the rewrite handles the proxying.

### Separate backend (external API)

Your backend is hosted on a completely separate domain (e.g. `https://api.yourdomain.com`).

**`.env.local` (development):**
```env
NEXT_PUBLIC_URL=http://localhost:8000
```

**`.env.production` (or your hosting environment variables):**
```env
NEXT_PUBLIC_URL=https://api.yourdomain.com
```

The rewrite proxy keeps CORS non-issues since all requests go through the Next.js server.

### Removing the proxy (direct calls)

If your backend handles CORS itself and you want the client to call it directly, remove the rewrite from `next.config.ts` and update `baseURL` in `clientConfig.ts`:

```ts
// core/configs/clientConfig.ts
const authConfig = {
  baseURL: process.env.NEXT_PUBLIC_URL ?? 'https://api.yourdomain.com',
  // ...
}
```

> **Note:** Removing the proxy exposes your backend URL to the browser. Only do this if your backend has CORS configured correctly.

### Changing the API path prefix

By default, all requests use `/api` as the prefix. To change it (e.g. to `/v1`):

1. Update `baseURL` in `core/configs/clientConfig.ts`:
   ```ts
   baseURL: '/v1',
   ```
2. Update the rewrite source in `next.config.ts`:
   ```ts
   source: `/v1/:api_path*`,
   ```

---

## Token refresh — backend requirements

The refresh flow expects:

- **Endpoint:** `POST /auth/refresh`
- **Auth:** The refresh token sent as an HTTP-only cookie (the client uses `withCredentials: true`)
- **Response:** `{ token: string }` — the new access token

```json
{ "token": "eyJhbGci..." }
```

If your backend returns a different shape, update the `refreshToken` function in `core/clients/apiClient.ts`:

```ts
const refreshToken = () => {
  return axios.post<{ accessToken: string }>(`${baseURL}${authConfig.refreshEndpoint}`, {}, { withCredentials: true })
}

// Then in the interceptor:
const { accessToken } = refreshRes.data   // instead of { token }
```

---

## Manually triggering logout

The `logoutUser` utility is exported and can be called from anywhere:

```ts
import { logoutUser } from '@/core/clients/apiClient'

// Clears tokens, cookies, and redirects to /login
await logoutUser()
```
