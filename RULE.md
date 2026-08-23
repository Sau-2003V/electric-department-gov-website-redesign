# Project Rules

## Tech Stack

- **Runtime & PM**: Node.js + npm (`npm` only — never `bun`, `pnpm`, or `yarn`)
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwindcss
- **Styling**: Tailwind CSS v4 + Design Tokens (`design.md` & `src/app/globals.css`)
- **UI & Icons**: Base UI, Lucide React (primary icon set), Sonner
- **Animation**: Motion / Framer Motion
- **Data & Auth**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`), TanStack Query v5
- **Validation**: Zod + React Hook Form

## Directory Structure

- `src/app/(actions)/` — Server Actions (`"use server"`)
- `src/components/` — Shared/reusable components used across pages (route-only UI goes in route's `_components/`)
- `src/database/` — Supabase clients (`supabase/`) and query functions (`query/`)
- `src/hooks/` — Custom React hooks
- `src/lib/` — Helpers, utilities, shared contexts (`cn()`, springs, etc.)
- `src/proxy.ts` — Proxy / middleware for auth sessions and routing

## Core Rules

1. **Always npm**: Run all project commands via `npm` (`npm run dev`, `npm install <pkg>`, `npm run build`). Do not use Bun, pnpm, or Yarn.
2. **Design System & Styling**: Always use `design.md` and `globals.css` for styling purposes. Style strictly with Tailwind utility classes, custom design tokens, and `cn()` from `@/lib/utils`.
3. **No Hard-Coded Colors or Text Sizes**: Never use hard-coded colors (e.g. hex `#...`, rgb/hsl) or arbitrary text sizes. Always use the tokens and utility classes defined in `globals.css`.
4. **Relative Typography**: Avoid `px`-based text sizes; use `rem` or `em` units (or Tailwind font size classes) according to need.
5. **Data Fetching**: Use TanStack React Query for client-side queries and mutations.
6. **Naming**: Use `PascalCase.tsx` for component files; `kebab-case.ts` or `camelCase.ts` for hooks/utilities.
7. **UI & Feedback**: Use `sonner` (`toast.success` / `toast.error`) for action feedback; prefer `lucide-react` icons.
8. **Strict Types**: Zero `any`. Validate all inputs and forms with Zod schemas.
9. **Server First**: Default to Server Components; add `"use client"` only when client interactivity/hooks are required.
10. **Imports**: Always import via `@/*` path alias.

## Component Reuse (MANDATORY)

> **Before writing any UI code, always check the existing component inventory below.**
> Compose new features from these primitives. Do NOT recreate UI from scratch if a suitable component already exists.

### Rule

- **Search first**: Before building any UI element, look inside `src/components/ui/` and `src/components/` for an existing primitive that fits.
- **Extend, don't duplicate**: Wrap or extend an existing component via props/variants instead of copying its implementation.
- **Modular composition**: Assemble pages and features by composing these building blocks. Keep new components thin wrappers around the primitives below.
- **New primitives last resort**: Only create a brand-new component in `src/components/ui/` when no existing primitive can be reasonably extended, and document why in a comment at the top of the file.
