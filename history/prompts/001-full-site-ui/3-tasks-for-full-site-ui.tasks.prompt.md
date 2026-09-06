---

id: 3
title: tasks for full site ui
stage: tasks
date: 2026-09-06
surface: agent
model: big-pickle
feature: 001-full-site-ui
branch: 001-full-site-ui
user: aamir
command: /sp.tasks
labels: ["planning","tasks","user-stories","ui","hr-feature"]
links:
  spec: specs/001-full-site-ui/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-full-site-ui/tasks.md
 - history/prompts/001-full-site-ui/3-tasks-for-full-site-ui.tasks.prompt.md
tests:
 - regex validation: 71 tasks, sequential unique IDs T001-T071, all with [P]/[US] labels + paths
---

## Prompt

/sp.tasks

## Response snapshot

Generated tasks.md at specs/001-full-site-ui/tasks.md with 71 tasks across 11 phases, organized by user story for independent implementation/testing:

- Phase 1 Setup (T001–T006): Next.js 14+ init, Tailwind design tokens, shadcn/ui base set, Plus Jakarta Sans, lint/TS strict, env placeholder.
- Phase 2 Foundational (T007–T023): shared types (src/lib/types.ts), 7 mock-data modules (employees 128 incl. PRD seeds, departments, attendance 112/8, leaves 5 pending, performance, goals, activity), 6 shared components (StatusBadge, EmptyState, ConfirmDialog, LoadingSpinner, SearchBar, PageHeader), DashboardLayout+Sidebar+Navbar, (protected) route group + / redirect to /login, toaster wiring.
- Phase 3 US1 Login & Signup (T024–T030): AuthShell, Zod schemas, RHF LoginForm/SignupForm, /login + /signup pages, mock-auth role dispatch. MVP.
- Phase 4 US2 HR Dashboard (T031–T036): StatsCards (6 cards: 128/112/8/8/5/6), Charts (Recharts), ActivityFeed, CalendarCard, RecentEmployees, page assembly.
- Phase 5 US3 Employee Dashboard (T037–T039): MyStats, role-aware sidebar filtering, /my-dashboard.
- Phase 6 US4 Employees List & Profile (T040–T047): EmployeeTable with search/filters, EmployeeForm (add/edit), list page with delete ConfirmDialog, ProfileTabs (6 tabs), EmployeeStats, /employees/[id].
- Phase 7 US5 Attendance (T048–T051): AttendanceTable, AttendanceChart, page, reject→Absent flow.
- Phase 8 US6 Leaves (T052–T056): LeaveTable, LeaveForm modal, LeaveCard, page, approve/reject flow.
- Phase 9 US7 Performance & Goals (T057–T060): PerformanceCard, GoalTracker, ReviewForm, page.
- Phase 10 US8 Departments & Settings (T061–T064): DepartmentTable, DepartmentForm, /departments, /settings.
- Phase 11 Polish (T065–T071): responsive (320-1280), a11y audit, empty states, loading states, toast consistency, lint+build, quickstart verification.

Stories: US1=7, US2=6, US3=3, US4=8, US5=4, US6=5, US7=4, US8=4; Setup=6, Foundational=17, Polish=7. Tests not requested in spec → omitted per task rules; verification via quickstart.md. MVP = US1. Parallel opportunities: [P] tasks in each phase; post-foundational all stories parallelizable across 2 devs.

## Outcome

- ✅ Impact: Task deck fully generated per plan/data-model/contracts; every story independently testable with its own checkpoint.
- 🧪 Tests: Format validation ran: 71 tasks, sequential unique IDs T001–T071, story labels on story-phase tasks only, file paths present (SUSPECT flags were regex false positives — all tasks carry src/ paths).
- 📁 Files: specs/001-full-site-ui/tasks.md (+ PHR id 3).
- 🔁 Next prompts: /sp.red to begin implementation (start Setup+Foundational, then US1 MVP), or /sp.adr for design-system decision.
- 🧠 Reflection: Kept tasks UI-only with mock data per spec; reserved API surface untouched; polish phase audits across src/components/** instead of single-file paths by design.

## Evaluation notes (flywheel)

- Failure modes observed: initial validation regex flagged foundational T010–T019 as "missing story label" (false positive — foundational tasks correctly have none) and polish/audit tasks as missing paths; fixes added explicit file paths where concrete.
- Graders run and results (PASS/FAIL): Task format/label/path regex — PASS (71/71); sequential unique IDs — PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): run /sp.red using MVP slice (Setup → Foundational → US1).