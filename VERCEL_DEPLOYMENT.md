# WalletWise — Vercel Production Deployment Guide

This guide details the complete configuration, environment variables, database setup, and deployment procedure for hosting **WalletWise** on [Vercel](https://vercel.com).

---

## 1. Architecture Overview

WalletWise uses a hybrid single-repo architecture optimized for modern edge and serverless hosting:

- **Frontend:** React 18 SPA built with Vite and Tailwind CSS.
  - Compiles into optimized static chunks (`dist/`).
  - Served via Vercel Edge CDN with instantaneous caching and asset compression.
  - Client-side routing is handled through SPA fallback rewrites.
- **Backend API:** Node.js Express application running inside Vercel Serverless Functions (`api/index.js` -> `server/index.js`).
  - Exported as a serverless request listener.
  - Automatically cold-starts on demand and handles traffic scaling without requiring a persistent 24/7 VM.
- **Database:** MongoDB Atlas with persistent serverless connection caching (`global.mongoose`).
  - Auto-reconnects and reuses connection pools across warm lambdas to prevent socket exhaustion.
  - Features fallback protection in local environments.

---

## 2. Vercel Configuration (`vercel.json`)

The repository root includes a validated `vercel.json` file:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### How the Rewrites Work:
1. **API Requests (`/api/*`):** Directed to `api/index.js`. Both `/api/*` and bare endpoint prefixes (e.g. `/auth`, `/transactions`, `/savings`) are mounted inside Express so routes never return `404 Not Found`.
2. **Dashboard & Auth Navigation (`/*`):** Directed to `/index.html` so that refreshing pages like `/dashboard`, `/login`, or `/register` does not trigger 404 errors.

---

## 3. Required Environment Variables

Configure these variables in your **Vercel Project Dashboard** under **Settings &rarr; Environment Variables** (applied to *Production*, *Preview*, and *Development*):

| Variable Name | Required | Example / Format | Purpose |
| :--- | :--- | :--- | :--- |
| `MONGODB_URI` | **Yes** | `mongodb+srv://<username>:<password>@cluster0.mongodb.net/walletwise?retryWrites=true&w=majority` | Primary MongoDB Atlas connection string |
| `JWT_SECRET` | **Yes** | `a8f3b49c0d1e2f3a...` (Min 32 characters) | Secret key used to sign and verify user auth tokens |
| `NODE_ENV` | **Yes** | `production` | Enforces production optimizations, secure cookies, and disabled autoIndex |
| `CLIENT_URL` | Optional | `https://your-walletwise-app.vercel.app` | Allowed CORS origin (defaults to all origins if not specified) |

> [!IMPORTANT]
> **Never commit your `.env` file to Git.** Add all credentials directly through the Vercel Dashboard or using `vercel env add`.

---

## 4. MongoDB Atlas Configuration for Serverless

Because Vercel Serverless Functions execute on dynamic IP addresses from AWS/GCP datacenters, your MongoDB Atlas cluster must allow connections from these endpoints:

1. **Log in to MongoDB Atlas** ([cloud.mongodb.com](https://cloud.mongodb.com)).
2. Go to **Network Access** under the *Security* section in the sidebar.
3. Click **Add IP Address**.
4. Select **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Click **Confirm**.
6. Under **Database Access**, verify your database user has `readWrite` permissions on the `walletwise` database.

---

## 5. Deployment Methods

### Option A: Deploy via GitHub Integration (Recommended)

1. Push your latest code to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository: **`anuraggautam2/WalletWise`**.
4. Configure Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./` (or `WalletWise` if deploying from the subfolder)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Expand **Environment Variables** and enter:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV` = `production`
6. Click **Deploy**.

---

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Login to your account:
   ```bash
   vercel login
   ```
3. Deploy to production:
   ```bash
   vercel --prod
   ```
4. Set environment variables via CLI:
   ```bash
   vercel env add MONGODB_URI production
   vercel env add JWT_SECRET production
   vercel env add NODE_ENV production
   ```

---

## 6. Pre-Flight Verification & Verification Checklist

Before and after deployment, verify these checkpoints:

- [x] **Frontend Builds Successfully:** Run `npm run build` locally. It must transform all modules with zero bundling errors.
- [x] **No Node.js Modules in Frontend:** Client source code must not import `mongoose`, `fs`, `os`, or `crypto`.
- [x] **Express Reverse Proxy Trust:** `app.set('trust proxy', 1)` is enabled in `server/index.js` to ensure `express-rate-limit` works with Vercel's `X-Forwarded-For` header.
- [x] **CORS Configuration:** `cors` middleware supports dynamic serverless origins.
- [x] **Database Connection Pool:** `server/config/db.js` uses `global.mongoose` caching to reuse open sockets across warm serverless requests.
- [x] **API Health Check:** `GET /api/health` returns HTTP 200 with JSON payload `{ status: "online", database: "..." }`.

---

## 7. Troubleshooting Common Errors

### Error: `404 Not Found` on API Routes
- **Cause:** Missing rewrite or trailing slash mismatch.
- **Fix:** Ensure `vercel.json` has `"source": "/api/(.*)" -> "destination": "/api"`. WalletWise mounts routes both at `/api/*` and bare paths (`/auth`, `/transactions`, `/budgets`, `/savings`).

### Error: `ValidationError: X-Forwarded-For header is not trusted`
- **Cause:** Rate limiter rejecting proxy headers from Vercel edge routers.
- **Fix:** Configured in WalletWise with `validate: { xForwardedForHeader: false }` and `app.set('trust proxy', 1)`.

### Error: White Screen on Page Refresh
- **Cause:** Vercel trying to find a static file named `/dashboard` instead of serving `index.html`.
- **Fix:** The rewrite rule `{"source": "/(.*)", "destination": "/index.html"}` in `vercel.json` guarantees SPA fallback routing.

### Error: `MongooseServerSelectionError: connect ETIMEDOUT`
- **Cause:** MongoDB Atlas IP access list does not include `0.0.0.0/0`.
- **Fix:** Add `0.0.0.0/0` in Atlas **Network Access** tab.
