<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Next.js 16 (App Router) + React 19 + Tailwind v4 + shadcn/ui frontend. Single package, npm (`package-lock.json`) — not a monorepo. `CLAUDE.md` just points here; this file is the instruction source.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- Verify changes with `npm run lint` then `npm run typecheck`. **There are no tests, no test framework, and no CI.**
- `npm run format` — Prettier over `**/*.{ts,tsx}` only (not md/json/css). Style comes from `.prettierrc`: no semicolons, double quotes, LF, Tailwind class sorting.
- Seed the admin user: **no npm script exists.** Run `npx tsx scripts/seed-admin.ts` (tsx is not installed; npx fetches it). It loads `.env` — not `.env.local`, despite its own error message — and needs `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `MONGODB_URI`. It imports `dotenv`, which is not declared in package.json and only resolves via a transitive dependency.

## Data flow

- Job/application data does **not** come from this repo's database. Server actions in `app/lib/actions/*.ts` call an external backend at `process.env.NEXT_PUBLIC_API` (endpoints like `/jobs`, `/jobs/:id`, `/add-job`). MongoDB is used only by better-auth for users/sessions, so `.env` needs both `MONGODB_URI` and `NEXT_PUBLIC_API` for the app to function.
- better-auth wiring: `auth.ts` at repo root (server config; `role` is an `additionalFields` enum `admin | recruiter | seeker`, default `seeker`), `app/lib/auth-client.ts` (client), catch-all handler `app/api/auth/[...all]/route.ts`. Read the session server-side via `app/lib/GettingSessions/GetSessionFromServer.ts`.
- Routes: `app/(auth)/login|register`, `app/jobs` (public listing + `[id]` detail), `app/dashboard/{admin,recruiter,seeker}` behind a shared `app/dashboard/layout.tsx`. Add role-gated pages under the matching role folder.
- `/jobs` search + filter state is URL-driven: query params `search`, `location`, `jobType`, `category`, `isRemote` (`true`/`false`). The co-located client components (`SearchBar`, `FilterSideBar`, `JobList`) read them with `useSearchParams` and update them via `router.push` through the `app/jobs/useJobsSearch.ts` helper; `JobList` combines all params into one client-side filter. The old `Context/JobContext.tsx` provider was removed.

## Import alias gotcha

`@/*` maps to the repo root, and there are **two `lib` directories**:

- root `lib/` — shared `types.ts`, `utils.ts` (`cn`), `highlighter.tsx` → import as `@/lib/types`
- `app/lib/` — server actions, auth/session helpers → import as `@/app/lib/actions/jobs` (**not** `@/lib/actions/jobs`)

## UI components

- shadcn/ui with Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config`). Add components with `npx shadcn@latest add <name>`; they land in `components/ui/` (`components.json` style `base-nova`).
- New `.ts`/`.tsx` files should pass `npm run lint` and `npm run typecheck` before you're done.
