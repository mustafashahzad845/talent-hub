---

description: "Task list for full-site UI implementation (Talent Hub HR Management)"
---

# Tasks: Full-Site HR Management UI (A–Z)

**Input**: Design documents from `/specs/001-full-site-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature spec does not request a TDD/test-creation phase. Component tests are optional; verification is done via the quickstart checklist in Phase 11. Only add explicit `tests/` tasks if a TDD approach is requested later.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US8)
- Include exact file paths in descriptions

## Path Conventions

- **Single project (web app)**: `src/app/`, `src/components/`, `src/lib/`, `tests/` at repository root (per plan.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 14+ App Router project with TypeScript at repo root (package.json, tsconfig.json, next.config.mjs, src/ structure)
- [ ] T002 [P] Configure Tailwind CSS + design tokens in src/app/globals.css (tokens from research D1: indigo/blue primary #2563EB, bg #F8FAFC, sidebar navy scope)
- [ ] T003 [P] Initialize shadcn/ui in components.json and add base components to src/components/ui/: button, input, label, card, badge, table, tabs, dialog, dropdown-menu, avatar, select, textarea, separator, skeleton, tooltip
- [ ] T004 [P] Configure Plus Jakarta Sans via next/font in src/app/layout.tsx (self-hosted, weights 400/600/700/800)
- [ ] T005 [P] Configure ESLint, strict TypeScript in tsconfig.json, and Tailwind content config in tailwind.config.ts
- [ ] T006 Create src/app/.env.example and env handling for NEXT_PUBLIC_* placeholders (no secrets in frontend)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, mock-data layer, and shared shell components that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create shared UI data types (Employee, Department, AttendanceRecord, LeaveRequest, PerformanceRecord, Goal, Skill, EmploymentHistory, ActivityItem, User/Role enums) in src/lib/types.ts per data-model.md
- [ ] T008 [P] Create mock employee data (128 employees, PRD seeds Ali Khan/Sara Ahmed/Ahmed Raza/Usman Malik) in src/lib/data/employees.ts
- [ ] T009 [P] Create mock departments data (IT, HR, Marketing, Finance, Sales, Operations + counts) in src/lib/data/departments.ts
- [ ] T010 [P] Create mock attendance data (Present 112 / Late 8 / Absent counts) in src/lib/data/attendance.ts
- [ ] T011 [P] Create mock leaves data (Annual/Sick/Casual/Emergency, Pending 5) in src/lib/data/leaves.ts
- [ ] T012 [P] Create mock performance data (productivity/teamwork/punctuality/overall) in src/lib/data/performance.ts
- [ ] T013 [P] Create mock goals data (Pending/In Progress/Completed) in src/lib/data/goals.ts
- [ ] T014 [P] Create mock activity-feed items in src/lib/data/activity.ts
- [ ] T015 [P] Create StatusBadge (enum → color, neutral fallback) in src/components/shared/StatusBadge.tsx
- [ ] T016 [P] Create EmptyState (message + CTA slot) in src/components/shared/EmptyState.tsx
- [ ] T017 [P] Create ConfirmDialog (destructive/approve confirm) in src/components/shared/ConfirmDialog.tsx
- [ ] T018 [P] Create LoadingSpinner in src/components/shared/LoadingSpinner.tsx
- [ ] T019 [P] Create SearchBar (debounced input, focus ring) in src/components/shared/SearchBar.tsx
- [ ] T020 [P] Create PageHeader (title + subtitle + action slot) in src/components/shared/PageHeader.tsx
- [ ] T021 Create DashboardLayout + Sidebar (dark navy, HR nav) + Navbar (title/search/notifications/avatar) in src/components/layout/
- [ ] T022 Create protected route group src/app/(protected)/layout.tsx wrapping DashboardLayout, and root redirect src/app/page.tsx → /login
- [ ] T023 Wire toast/sonner provider (Toaster) into src/app/layout.tsx

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Branded Login & Signup (Priority: P1) 🎯 MVP

**Goal**: Polished on-brand login and signup pages with full form states (default/focus/error/disabled/loading) and inline Zod validation.

**Independent Test**: Visit `/login` and `/signup`; fill invalid/empty inputs → inline field errors without reload; submit valid input → loading state + (mock) role-appropriate redirect target.

### Implementation for User Story 1

- [ ] T024 [US1] Create AuthShell (brand panel + centered card, Plus Jakarta) in src/components/auth/AuthShell.tsx
- [ ] T025 [P] [US1] Create login + signup Zod schemas (email format, required, password ≥8 + confirm) in src/lib/validations/auth.ts
- [ ] T026 [P] [US1] Create LoginForm (RHF + Zod, loading state) in src/components/auth/LoginForm.tsx
- [ ] T027 [P] [US1] Create SignupForm (RHF + Zod, confirm password, loading state) in src/components/auth/SignupForm.tsx
- [ ] T028 [US1] Create login page src/app/login/page.tsx (links to /signup)
- [ ] T029 [US1] Create signup page src/app/signup/page.tsx (links to /login)
- [ ] T030 [US1] Create mock-auth role dispatch helper (HR/ADMIN → /dashboard, EMPLOYEE → /my-dashboard) in src/lib/auth/mock-auth.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (MVP)

---

## Phase 4: User Story 2 - HR / Admin Dashboard (Priority: P1)

**Goal**: Operational home for HR with 6 stat cards, charts, activity feed, calendar, department breakdown, and recently-joined employees inside the protected shell.

**Independent Test**: Visit `/dashboard` (after login-as-HR mock) → all stats cards, charts, activity feed, calendar, and recent-employees sections render from mock data.

### Implementation for User Story 2

- [ ] T031 [P] [US2] Create StatsCards (Total Employees/Present/On Leave/Late/Pending/Departments) in src/components/dashboard/StatsCards.tsx
- [ ] T032 [P] [US2] Create Charts (employees-by-department, attendance trend; Recharts + shadcn chart; legends + tooltips) in src/components/dashboard/Charts.tsx
- [ ] T033 [P] [US2] Create ActivityFeed in src/components/dashboard/ActivityFeed.tsx
- [ ] T034 [P] [US2] Create CalendarCard in src/components/dashboard/CalendarCard.tsx
- [ ] T035 [P] [US2] Create RecentEmployees in src/components/dashboard/RecentEmployees.tsx
- [ ] T036 [US2] Assemble HR dashboard page src/app/(protected)/dashboard/page.tsx (PageHeader + all dashboard components)

**Checkpoint**: HR dashboard renders fully and independently

---

## Phase 5: User Story 3 - Employee Dashboard (Priority: P2)

**Goal**: Employee home scoped to own data (my attendance %, leave balance, performance score, my activity) with employee-appropriate sidebar navigation.

**Independent Test**: With role=EMPLOYEE mock, sidebar shows employee sections and `/my-dashboard` renders only own-data cards.

### Implementation for User Story 3

- [ ] T037 [P] [US3] Create MyStats cards (attendance %, leave balance, performance score) in src/components/dashboard/MyStats.tsx
- [ ] T038 [P] [US3] Add role-aware sidebar filtering to src/components/layout/Sidebar.tsx (employee: My Dashboard/Profile/Attendance/Leaves/Performance)
- [ ] T039 [US3] Create employee dashboard page src/app/(protected)/my-dashboard/page.tsx

**Checkpoint**: Employee dashboard renders independently with scoped nav

---

## Phase 6: User Story 4 - Employees List & Profile (Priority: P1)

**Goal**: HR-grade employee table (search/filter, status badges, add/edit/delete) + profile page with 6 tabs (Overview/Attendance/Leaves/Performance/Skills/Employment History).

**Independent Test**: `/employees` loads searchable/filterable table; click a row → `/employees/[id]` renders all 6 tabs; add/edit/delete flows work against mock state.

### Implementation for User Story 4

- [ ] T040 [P] [US4] Create EmployeeTable (columns: avatar, employeeId, name, email, department, position, joiningDate, status; row actions) in src/components/employees/EmployeeTable.tsx
- [ ] T041 [P] [US4] Create EmployeeForm modal (RHF + Zod; add/edit) in src/components/employees/EmployeeForm.tsx
- [ ] T042 [US4] Wire search + department/status filters into EmployeeTable using shared SearchBar and src/lib/data/employees.ts
- [ ] T043 [US4] Create employees list page src/app/(protected)/employees/page.tsx (PageHeader + Add button + table + delete ConfirmDialog)
- [ ] T044 [P] [US4] Create ProfileTabs (6 tabs) in src/components/employees/ProfileTabs.tsx
- [ ] T045 [P] [US4] Create EmployeeStats (attendance %, leave count, performance score) in src/components/employees/EmployeeStats.tsx
- [ ] T046 [US4] Create employee profile page src/app/(protected)/employees/[id]/page.tsx (Overview tab per FR-011 + ProfileTabs)
- [ ] T047 [US4] Ensure all 6 profile tabs render mock content incl. EmptyState in src/components/employees/ProfileTabs.tsx

**Checkpoint**: Employee list + profile fully functional independently

---

## Phase 7: User Story 5 - Attendance (Priority: P2)

**Goal**: Attendance table (employee, check-in/out, Present/Late/Absent badges), attendance chart, and HR reject flow (confirm → status Absent).

**Independent Test**: `/attendance` renders table + chart; Reject on a record → ConfirmDialog → status becomes Absent (+ toast).

### Implementation for User Story 5

- [ ] T048 [P] [US5] Create AttendanceTable (check-in/out, status badges, row actions) in src/components/attendance/AttendanceTable.tsx
- [ ] T049 [P] [US5] Create AttendanceChart in src/components/attendance/AttendanceChart.tsx
- [ ] T050 [US5] Create attendance page src/app/(protected)/attendance/page.tsx
- [ ] T051 [US5] Add reject-attendance flow (ConfirmDialog + status → Absent + toast) in src/components/attendance/AttendanceTable.tsx

**Checkpoint**: Attendance page functional independently

---

## Phase 8: User Story 6 - Leaves (Priority: P2)

**Goal**: Leave table (type/dates/reason/status badges), request form modal, and approve/reject flow with confirmation + toast.

**Independent Test**: `/leaves` renders table; "New Leave" opens validated form; Approve/Reject on Pending → ConfirmDialog → status updates + toast.

### Implementation for User Story 6

- [ ] T052 [P] [US6] Create LeaveTable (leaveType, start/end, reason, status badges, actions) in src/components/leaves/LeaveTable.tsx
- [ ] T053 [P] [US6] Create LeaveForm modal (RHF + Zod: endDate ≥ startDate, reason required) in src/components/leaves/LeaveForm.tsx
- [ ] T054 [P] [US6] Create LeaveCard in src/components/leaves/LeaveCard.tsx
- [ ] T055 [US6] Create leaves page src/app/(protected)/leaves/page.tsx
- [ ] T056 [US6] Add approve/reject flow (ConfirmDialog + PENDING → APPROVED|REJECTED + toast + notification badge count) in src/components/leaves/LeaveTable.tsx

**Checkpoint**: Leaves page functional independently

---

## Phase 9: User Story 7 - Performance & Goals (Priority: P2)

**Goal**: Performance cards (productivity/teamwork/punctuality/overall), goal tracker, and add-review/add-goal modals with validation.

**Independent Test**: `/performance` renders performance cards + goal tracker with status badges; modals open with inline validation.

### Implementation for User Story 7

- [ ] T057 [P] [US7] Create PerformanceCard (metrics + derived overall score) in src/components/performance/PerformanceCard.tsx
- [ ] T058 [P] [US7] Create GoalTracker (status badges, target date, assignee) in src/components/performance/GoalTracker.tsx
- [ ] T059 [P] [US7] Create ReviewForm modal (RHF + Zod, 0–100 numeric ranges) in src/components/performance/ReviewForm.tsx
- [ ] T060 [US7] Create performance page src/app/(protected)/performance/page.tsx (goals grid + add-goal modal)

**Checkpoint**: Performance & Goals page functional independently

---

## Phase 10: User Story 8 - Departments & Settings (Priority: P3)

**Goal**: Departments CRUD (list + add/edit/delete modals, employee counts) and a Settings page in the shared design system.

**Independent Test**: `/departments` CRUD works against mock state; `/settings` renders profile/config form with validation.

### Implementation for User Story 8

- [ ] T061 [P] [US8] Create DepartmentTable (name + employeeCount + actions) in src/components/departments/DepartmentTable.tsx
- [ ] T062 [P] [US8] Create DepartmentForm modal (RHF + Zod) in src/components/departments/DepartmentForm.tsx
- [ ] T063 [US8] Create departments page src/app/(protected)/departments/page.tsx (add/edit/delete with ConfirmDialog)
- [ ] T064 [US8] Create settings page src/app/(protected)/settings/page.tsx (profile + config, RHF + Zod)

**Checkpoint**: All user stories independently functional

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T065 [P] Responsive pass at 320/375/414/768/1280 px (no horizontal scroll; add html/body overflow-x: clip to src/app/globals.css; sidebar drawer on mobile in src/components/layout/Sidebar.tsx; no two-line clickable text)
- [ ] T066 [P] Accessibility audit across src/components/** (4.5:1 contrast, visible :focus-visible rings, aria-labels on icon-only buttons, prefers-reduced-motion respected)
- [ ] T067 [P] Empty-state coverage on all list pages (src/components/employees/EmployeeTable.tsx, src/components/attendance/AttendanceTable.tsx, src/components/leaves/LeaveTable.tsx, src/components/performance/GoalTracker.tsx, src/components/departments/DepartmentTable.tsx)
- [ ] T068 [P] Loading states on all async/sidebar-navigation areas using src/components/shared/LoadingSpinner.tsx
- [ ] T069 [P] Toast/sonner consistency pass across src/components/** (all destructive/approve actions fire toasts; button verbs match action verbs)
- [ ] T070 Run `npm run lint` and `npm run build` (package.json scripts) and fix any errors
- [ ] T071 Run quickstart.md verification per specs/001-full-site-ui/quickstart.md: load every route, exercise forms, checkpoints across all 8 user stories

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1: US1, US2, US4 → P2: US3, US5, US6, US7 → P3: US8)
- **Polish (Phase 11)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 Login & Signup (P1)**: after Foundational; no deps on other stories
- **US2 HR Dashboard (P1)**: after Foundational; needs Sidebar/Navbar (T021), shared cards
- **US3 Employee Dashboard (P2)**: after Foundational + T021 (reuses dashboard shell); role-aware sidebar (T038)
- **US4 Employees List & Profile (P1)**: after Foundational; needs StatusBadge/EmptyState/SearchBar
- **US5 Attendance (P2)**: after Foundational; needs StatusBadge + ConfirmDialog
- **US6 Leaves (P2)**: after Foundational; needs StatusBadge/ConfirmDialog/toast
- **US7 Performance & Goals (P2)**: after Foundational; needs StatusBadge
- **US8 Departments & Settings (P3)**: after Foundational

### Within Each User Story

- Shared components → page assembly → interactions (confirm/toast)
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] (T002–T006)
- All Foundational tasks marked [P] (T008–T020)
- Once Foundational completes, all user stories can start in parallel (if team capacity allows)
- Components within a story marked [P] can run in parallel (different files)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 2 (HR Dashboard)

```bash
# Launch all dashboard components together:
Task: "Create StatsCards in src/components/dashboard/StatsCards.tsx"
Task: "Create Charts in src/components/dashboard/Charts.tsx"
Task: "Create ActivityFeed in src/components/dashboard/ActivityFeed.tsx"
Task: "Create CalendarCard in src/components/dashboard/CalendarCard.tsx"
Task: "Create RecentEmployees in src/components/dashboard/RecentEmployees.tsx"
# Then assemble (depends on all above):
Task: "Assemble HR dashboard page src/app/(protected)/dashboard/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (Login & Signup)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 Login/Signup → Validate → (MVP!)
3. US2 HR Dashboard → Validate → Demo
4. US4 Employees → Validate → Demo (core HR value)
5. US5 Attendance → Validate
6. US6 Leaves → Validate
7. US3 Employee Dashboard → Validate
8. US7 Performance → Validate
9. US8 Departments/Settings → Validate
10. Polish pass → Final

### Parallel Team Strategy

With 2 developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US2 HR Dashboard (P1) then US4 Employees (P1)
   - Developer B: US1 Login/Signup (P1) then US5/US6 (Attendance/Leaves)
3. Stories complete and integrate independently; sidebar/theme shared via T021

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that break independence