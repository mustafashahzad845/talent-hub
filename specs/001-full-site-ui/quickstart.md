# Quickstart: Full-Site HR Management UI

**Branch**: `001-full-site-ui` | **Date**: 2026-09-06 | **Plan**: [plan.md](./plan.md)

## Prerequisites

- Node.js 18+ (Next.js 14 requirement)
- npm (or pnpm/yarn)

## Setup

```bash
# Install dependencies
npm install

# Add shadcn/ui (configured for this project)
npx shadcn@latest init
npx shadcn@latest add button input card badge table tabs dialog dropdown-menu avatar toast sonner select textarea label separator skeleton tooltip

# Start dev server
npm run dev
```

## Mock Data

All page data comes from typed mock modules in `src/lib/data/` (`employees.ts`, `attendance.ts`, `leaves.ts`, `performance.ts`, `goals.ts`, `departments.ts`). No database or API required. To swap in a live backend, replace the module bodies with fetches to the corresponding `/api/*` endpoints (shapes preserved — see `contracts/pages.md`).

## Routes

| URL | Page |
|-----|------|
| `/` | Redirect → `/login` |
| `/login` | Login |
| `/signup` | Signup |
| `/dashboard` | HR/Admin dashboard |
| `/my-dashboard` | Employee dashboard |
| `/employees` | Employees list |
| `/employees/[id]` | Employee profile (6 tabs) |
| `/attendance` | Attendance |
| `/leaves` | Leaves |
| `/performance` | Performance + Goals |
| `/departments` | Departments |
| `/settings` | Settings |

## Design System

- Font: **Plus Jakarta Sans** via `next/font` (no external CDN).
- Colors: tokens in `src/app/globals.css` → `:root`; consumed via Tailwind `theme.extend.colors`.
- All interactive components ship 8 states (default/hover/focus/active/disabled/loading/error/success).

## Verification

1. Load every route in the list above — no horizontal scroll at 320/375/414/768/1280 px.
2. Login/Signup forms show inline Zod validation without reload.
3. Dashboard shows 6 stat cards, charts, activity feed, calendar, department breakdown, recent employees.
4. Employees table filters; profile renders all 6 tabs; empty states visible on cleared filters.
5. Attendance reject, leave approve/reject → confirmation dialog + status change + toast.
6. Reduced-motion preference respected; tab through pages shows visible focus rings.

## Tests

```bash
npm test        # Jest + React Testing Library (components + page render tests)
npm run lint    # ESLint
npm run build   # Production build check
```