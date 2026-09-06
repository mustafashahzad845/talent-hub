# Research: Full-Site HR Management UI (A–Z)

**Branch**: `001-full-site-ui` | **Date**: 2026-09-06 | **Plan**: [plan.md](./plan.md)

## Resolved Unknowns

### D1. Design System Direction

- **Decision**: Light SaaS theme with indigo/blue primary + dark sidebar; one reusable design token set shared across all pages.
- **Rationale**: Matches the user-selected direction ("Light SaaS + Indigo/Blue primary + dark sidebar") and the PRD's "modern SaaS dashboard" requirement. Independent UI/UX research (ui-ux-pro-max `--design-system` for "HR SaaS workforce management dashboard enterprise") returned a directly applicable token system.
- **Alternatives considered**: Dark navy + gradient theme (more "exciting" but heavier for data-dense HR tables); pure minimal grayscale (professional but less distinctive).

**Recommended token set** (from research):

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#2563EB` | `--color-primary` |
| Secondary | `#3B82F6` | `--color-secondary` |
| Background | `#F8FAFC` | `--color-background` |
| Foreground | `#1E293B` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Muted | `#E9EFF8` | `--color-muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` |
| Border | `#E2E8F0` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#2563EB` | `--color-ring` |

- **Typography**: Plus Jakarta Sans for headings + body (research match for enterprise/B2B SaaS, iOS/Android dynamic-type compatible). Loaded via `next/font` (self-hosted) — no external font CDN dependency.
- **Anti-patterns to avoid**: emoji as icons (use lucide-react SVG), excessive animation, dark-mode-by-default, per-page token improvisation (all colors/fonts via named tokens).

### D2. Navigation & App Shell

- **Decision**: `(protected)` route group wrapped by a shared `DashboardLayout` containing `Sidebar` + `Navbar`.
- **Rationale**: All authenticated pages share chrome; one layout = consistency + single implementation of responsive sidebar behavior. Matches the PRD component structure (`layout/Sidebar.tsx`, `layout/Navbar.tsx`, `layout/DashboardLayout.tsx`) and plan.md structure.
- **Alternatives considered**: Per-page layouts (duplication, inconsistent), marketing-first shell (out of scope).
- **Sidebar content (HR)**: Dashboard, Employees, Attendance, Leaves, Performance, Departments, Settings, Logout (per PRD). **Employee sidebar**: My Dashboard, My Profile, My Attendance, My Leaves, Performance.
- **Mobile**: Sidebar becomes a slide-in drawer toggled from the navbar (max ~320px drawer width), no horizontal scroll. Top navbar shows: page title / breadcrumb, global search, notifications, avatar menu.

### D3. Data Source (Mock/Seed)

- **Decision**: Typed mock-data modules in `lib/data/` (employees, attendance, leaves, performance, goals, departments) consumed directly by pages/components.
- **Rationale**: Spec FR-025 requires the UI to render fully without a live backend. Typed modules keep the UI data-driven ("looks real") and allow a later swap to real API calls with minimal churn.
- **Seed baseline** (PRD demo data): Ali Khan (IT, Senior Developer, Active), Sara Ahmed (HR, HR Executive, Active), Ahmed Raza (Marketing, UI/UX Designer, On Leave), Usman Malik (Finance, Accountant, Active); add enough records to populate dashboard stats + charts.
- **Dashboard numbers seed target** (from PRD example): Total Employees 128, Present Today 112, On Leave 8, Late Today 8, Pending Leaves 5, Departments 6.

### D4. Charts & Visualization

- **Decision**: Recharts for the dashboard charts (employees by department bar/donut chart; attendance trend line/area chart; attendance present/late/absent breakdown).
- **Rationale**: Popular, React-native, pairs well with React 18/19 + Tailwind, and shadcn/ui has an official Recharts-based Chart component to keep visuals consistent. Charts get legends, tooltips, and accessible colors (never color-only encoding).
- **Alternatives considered**: ECharts (heavier), Chart.js (imperative, less React-idiomatic), hand-rolled SVG (too costly for MVP).

### D5. Forms & Validation

- **Decision**: React Hook Form + Zod for all forms (login, signup, employee add/edit modal, leave request modal, review/goal modals, department modal) with Zod schemas per entity.
- **Rationale**: Sanctioned by plan.md stack rules; field-level inline errors without page reload (spec SC-007); shadcn Form primitives (Radix + RHF) integrate cleanly.
- **Validation rules**: email format, required fields, password min length + confirmation match on signup, date ranges (leave To >= From), numeric ranges 0–100 for performance percentages.

### D6. Responsiveness & Accessibility Baseline

- **Decision**: Mobile-first breakpoints (320/375/414/768/1280 px), `overflow-x: clip` on html/body, tables scroll within their containers, buttons/nav links never wrap to two lines.
- **Accessibility**: 4.5:1 contrast for normal text; visible `:focus-visible` rings; `aria-label`s on icon-only buttons; `prefers-reduced-motion` respected; all interactive components implement default/hover/focus/active/disabled/loading/error/success states.
- **Rationale**: Spec FR-022/023/024 and Hallmark's responsive floor (root overflow-x clip, image-grid `minmax(0,1fr)`, headers wrap via `overflow-wrap:anywhere`).

## Open Items

- None — all spec unknowns resolved. (Constitution file is an unfilled template; gates were derived from AGENTS.md + docs and all pass.)