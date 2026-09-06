# Contracts: Component Library (Full-Site UI)

**Branch**: `001-full-site-ui` | **Date**: 2026-09-06 | **Spec**: [spec.md](../spec.md)

## Design Tokens (Global Source of Truth)

Defined once in `src/app/globals.css` (`:root`) and consumed via Tailwind `theme.extend.colors` referencing the CSS variables. Per-page values MUST reference tokens — no inline hex/font definitions (end of research D1).

### Color

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#2563EB` | Primary buttons, links, active nav, charts |
| `--color-secondary` | `#3B82F6` | Secondary surfaces, trust accents |
| `--color-background` | `#F8FAFC` | Page background (light) |
| `--color-foreground` | `#1E293B` | Body text |
| `--color-card` | `#FFFFFF` | Card/table surfaces |
| `--color-muted` | `#E9EFF8` | Muted fills (skeleton, chips) |
| `--color-muted-foreground` | `#475569` | Secondary text |
| `--color-border` | `#E2E8F0` | Hairline borders |
| `--color-destructive` | `#DC2626` | Delete/reject/destructive actions |
| `--color-ring` | `#2563EB` | Focus rings |

Sidebar: dark navy (`#0F172A` family) with white active-state highlight — implemented as a dedicated `sidebar` scope token set so "dark sidebar + light content" reads intentionally.

### Typography

- Display + body: **Plus Jakarta Sans** via `next/font` (self-hosted, variable weight 400/600/700/800). Headings always roman (`font-style: normal`).

### Spacing / Radius

- 4-pt scale; Tailwind defaults; cards `rounded-lg`; buttons/inputs radius per shadcn defaults (md).

## Component Inventory & States

Every interactive component implements **all 8 states**: default · hover · `:focus-visible` · active · disabled · loading · error · success.

| Component | Base | Notes |
|-----------|------|-------|
| `Button` | shadcn `button` variants | primary/secondary/ghost/destructive; loading state shows spinner + disables |
| `Input` / `Textarea` | shadcn `input` | error state red border + message; success subtle |
| `Select` | shadcn `select` (Radix) | labels always visible |
| `Dialog` | shadcn `dialog` | used for all forms + confirmations |
| `Tabs` | shadcn `tabs` | employee profile 6 tabs |
| `Table` / `DataTable` | shadcn `table` | scrolls within container |
| `Badge` | shadcn `badge` | `StatusBadge` wrapper with enum → color mapping + neutral fallback |
| `Toast` / `Sonner` | shadcn `sonner` | leave approve/reject, form success |
| `Avatar` | shadcn `avatar` | initials fallback |
| `Card` | shadcn `card` | stat cards, performance cards |
| `DropdownMenu` | shadcn `dropdown-menu` | row actions (View/Edit/Delete), navbar avatar menu |
| `Input`-based Search | `SearchBar` (shared) | debounced filter, keyboard focus ring |
| `Chart` | shadcn Chart (Recharts) | legends + tooltips + accessible colors |

## Layout Contract

- `DashboardLayout`: fixed dark `Sidebar` (desktop), `Navbar` with title/breadcrumb + search + notifications + avatar, content area `max-w` with padding. Mobile: sidebar → drawer (max 320px), toggled from navbar.
- Root `html`/`body`: `overflow-x: clip` (never `hidden`); robust wraps (`overflow-wrap:anywhere; min-width:0` on display headers; grid image tracks `minmax(0,1fr)`).
- Buttons/nav links: never wrap to two lines (whitespace-nowrap + truncation where needed).

## Icons

- **lucide-react** SVG icons only (no emoji icons). Decorative icons `aria-hidden`, icon-only buttons get `aria-label`.

## Accessibility Floor

- Text contrast ≥ 4.5:1 (normal); visible `:focus-visible` rings (ring token); `prefers-reduced-motion` honored (motion primitives gate on it); touch targets ≥ 44px; tables provide `aria-sort`/headers.