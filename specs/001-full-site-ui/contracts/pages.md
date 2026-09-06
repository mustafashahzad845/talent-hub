# Contracts: Page -> Route & Data Contracts (Full-Site UI)

**Branch**: `001-full-site-ui` | **Date**: 2026-09-06 | **Spec**: [spec.md](../spec.md)

## Page / Route Map

| Page | Route | Access | Shell | Key Sections |
|------|-------|--------|-------|--------------|
| Login | `/login` | Public | Auth | Email + password form, link to signup |
| Signup | `/signup` | Public | Auth | Registration form (name, email, password, confirm) |
| HR Dashboard | `/dashboard` | HR/Admin | Protected | StatsCards ×6, Charts, ActivityFeed, Calendar, Dept breakdown, Recent employees |
| Employee Dashboard | `/my-dashboard` | Employee | Protected | My stats (attendance %, leave balance, score), my activity |
| Employees | `/employees` | HR/Admin | Protected | Search + filter, EmployeeTable, Add/Edit modal, delete confirm |
| Employee Profile | `/employees/[id]` | HR/Admin | Protected | ProfileTabs: Overview, Attendance, Leaves, Performance, Skills, Employment History |
| Attendance | `/attendance` | HR/Admin | Protected | AttendanceTable, AttendanceChart, reject confirm |
| Leaves | `/leaves` | HR/Admin | Protected | LeaveTable, status badges, approve/reject, request modal, toasts |
| Performance | `/performance` | HR/Admin | Protected | PerformanceCard grid, GoalTracker, review/goal modals |
| Departments | `/departments` | HR/Admin | Protected | DepartmentTable/Grid + CRUD modals |
| Settings | `/settings` | Authenticated | Protected | Profile + config form |

**Routing decision**: `src/app/page.tsx` redirects `/` → `/login` (no marketing page — out of scope).

## Data Contract Summary (mock -> UI)

All mock data modules export typed arrays that components render directly:

| Module | Export | Shape Source |
|--------|--------|--------------|
| `lib/data/employees.ts` | `Employee[]` | data-model Employee |
| `lib/data/attendance.ts` | `AttendanceRecord[]` | data-model AttendanceRecord |
| `lib/data/leaves.ts` | `LeaveRequest[]` | data-model LeaveRequest |
| `lib/data/performance.ts` | `PerformanceRecord[]`, `Goal[]` | data-model |
| `lib/data/departments.ts` | `Department[]` | data-model Department |
| `lib/data/activity.ts` | `ActivityItem[]` | data-model ActivityItem |

## Component Contract (shared library)

Shared components MUST be used by all pages for consistency (FR-001):

| Component | Responsibility | Consumers |
|-----------|----------------|-----------|
| `StatusBadge` | Render enum value as colored badge; neutral fallback for unknown values | Employees, Attendance, Leaves, Performance, Departments |
| `ConfirmDialog` | Confirm destructive/approve actions before firing | Delete, Reject attendance, Approve/Reject leave |
| `EmptyState` | Empty table/list CTA panel | All list pages |
| `LoadingSpinner` | Loading indicator | All async-ish areas |
| `SearchBar` | Query input | Employees, Global |
| `PageHeader` | Title + subtitle + action slot | All pages |

## Future API Surface (for backend feature, NOT built here)

Reserved for later integration (matches plan.md API routes): `/api/auth/login|register|logout`, `/api/employees[/id]`, `/api/departments[/id]`, `/api/attendance[/id]`, `/api/leaves[/id{,/approve|reject}]`, `/api/performance[/id]`, `/api/dashboard`, `/api/search`. Mock modules are the same shapes these APIs would return.