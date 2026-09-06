# Implementation Plan: Full-Site HR Management UI (A–Z)

**Branch**: `001-full-site-ui` | **Date**: 2026-09-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-full-site-ui/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build the complete UI surface of **Talent Hub**, a modern HR management SaaS, across every page defined in the PRD: Login, Signup, HR/Admin dashboard, Employee dashboard, Employees list + profile (6 tabs), Attendance, Leaves, Performance + Goals, Departments, and Settings. All pages share **one reusable design system** (light SaaS theme, indigo/blue primary, dark sidebar) built with the project's sanctioned stack (Next.js 14+ App Router, Tailwind CSS, shadcn/ui, React Hook Form + Zod, React Context) and render against **mock/seed data** so the UI is fully demonstrable with no live backend. Backend/API is explicitly out of scope for this feature.

## Technical Context

**Language/Version**: TypeScript (Next.js 14+ environment)
**Primary Dependencies**: Next.js 14+ (App Router), Tailwind CSS, shadcn/ui (Radix primitives), React Hook Form + Zod, lucide-react icons, Recharts (charts) — sanctioned by docs/plan.md
**Storage**: N/A — UI-only feature; all page data rendered from local mock/seed data modules. (Neon PostgreSQL + Prisma remain out of scope in this feature.)
**Testing**: Jest / React Testing Library for component and page render tests
**Target Platform**: Web browsers — desktop, tablet, and mobile (responsive, no horizontal scroll at 320/375/414/768/1280 px)
**Project Type**: web (full web application)
**Performance Goals**: WCAG AA contrast (4.5:1 normal text), no horizontal scroll, reduced-motion respected, smooth transitions (150–300ms), lazy-loaded route sections where useful
**Constraints**: No secrets in frontend code (env vars only); Zod validation on all forms; one shared design system (no per-page token improvisation); every interactive component ships default/hover/focus/active/disabled/loading/error/success states
**Scale/Scope**: 10 pages + reusable app shell (sidebar + navbar); single-tenant MVP; demo employees from PRD (Ali Khan, Sara Ahmed, Ahmed Raza, Usman Malik) plus seed data to make dashboards look populated

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

> Note: `.specify/memory/constitution.md` is currently an unfilled template. Gates below are derived from the authoritative project rules in `AGENTS.md` (Execution Contract, Code Standards, Tech Stack Rules, Security Rules) and `docs/prd.md` / `docs/plan.md`.

| Gate | Requirement | Status |
|------|-------------|--------|
| G1. Stack conformance | Next.js 14+ App Router; Tailwind + shadcn/ui; React Hook Form + Zod; React Context (no Redux/Zustand); Next.js API routes (no Server Actions) | ✅ PASS — plan follows sanctioned stack |
| G2. UI-only scope | Backend/DB/auth logic NOT built in this feature | ✅ PASS — scope bounded to visual layer |
| G3. Security rules | No secret keys in frontend; env vars for secrets; Zod validation on all forms | ✅ PASS — frontend has no secrets; all forms Zod-validated |
| G4. File naming | Components PascalCase; utilities camelCase; pages in App Router `page.tsx` | ✅ PASS — mirrors existing structure |
| G5. Responsive + a11y | No horizontal scroll; 4.5:1 contrast; keyboard focus; reduced-motion | ✅ PASS — explicit requirements in spec |

No violations; no complexity tracking required.

## Project Structure

### Documentation (this feature)

```text
specs/001-full-site-ui/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
│   ├── pages.md         # Page -> route mapping and data contracts
│   └── components.md    # Shared component library contract
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, theme provider
│   ├── page.tsx                  # Redirect / -> /login
│   ├── globals.css               # Tailwind + design tokens
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── (protected)/              # Auth-shell route group
│       ├── layout.tsx            # DashboardLayout (Sidebar + Navbar)
│       ├── dashboard/page.tsx    # HR dashboard
│       ├── my-dashboard/page.tsx # Employee dashboard
│       ├── employees/page.tsx    # Employees list
│       ├── employees/[id]/page.tsx  # Employee profile (tabs)
│       ├── attendance/page.tsx
│       ├── leaves/page.tsx
│       ├── performance/page.tsx
│       ├── departments/page.tsx
│       └── settings/page.tsx

components/
├── ui/                           # shadcn/ui generated components
├── layout/
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   └── DashboardLayout.tsx
├── dashboard/
│   ├── StatsCards.tsx
│   ├── Charts.tsx
│   ├── ActivityFeed.tsx
│   ├── Calendar.tsx (or use a calendar card)
│   └── RecentEmployees.tsx
├── employees/
│   ├── EmployeeTable.tsx
│   ├── EmployeeForm.tsx
│   ├── EmployeeProfile.tsx
│   ├── ProfileTabs.tsx
│   └── EmployeeStats.tsx
├── attendance/
│   ├── AttendanceTable.tsx
│   └── AttendanceChart.tsx
├── leaves/
│   ├── LeaveTable.tsx
│   ├── LeaveForm.tsx
│   └── LeaveCard.tsx
├── performance/
│   ├── PerformanceCard.tsx
│   ├── GoalTracker.tsx
│   └── ReviewForm.tsx
├── departments/
│   ├── DepartmentTable.tsx
│   └── DepartmentForm.tsx
└── shared/
    ├── SearchBar.tsx
    ├── StatusBadge.tsx
    ├── ConfirmDialog.tsx
    ├── LoadingSpinner.tsx
    ├── EmptyState.tsx
    └── PageHeader.tsx

lib/
├── data/                          # Mock/seed data modules
│   ├── employees.ts
│   ├── attendance.ts
│   ├── leaves.ts
│   ├── performance.ts
│   ├── goals.ts
│   └── departments.ts
└── types.ts                       # Shared UI data types

tests/
├── components/                    # Component tests
├── pages/                         # Page render tests
└── helpers/                       # Test utilities
```

**Structure Decision**: Standard Next.js 14 App Router web application. The authenticated pages live in a `(protected)` route group wrapped by `DashboardLayout` (Sidebar + Navbar) so auth-shell chrome is shared across all dashboards/management pages. Marketing/home is intentionally omitted (outside scope per spec). Mock data lives in `lib/data/` as typed modules so components and pages render fully without a backend and can later swap to real API calls.

## Complexity Tracking

Not needed — Constitution Check passes with no violations.