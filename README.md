# Data Protection Dashboard

Vite + React + TypeScript + Tailwind + shadcn/ui, backed by Supabase.

## Local development
```sh
npm install
npm run dev
```

## Build
```sh
npm run build   # output in dist/
```

## Deploy to Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`, `NODE_VERSION=20`

`public/_redirects` provides SPA fallback so deep links work.
