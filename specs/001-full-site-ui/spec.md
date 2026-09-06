# Feature Specification: Full-Site HR Management UI (A–Z)

**Feature Branch**: `001-full-site-ui`
**Created**: 2026-09-06
**Status**: Draft
**Input**: User description (verbatim): "bhai mujhe ui bana nhi hai shai hr manage menagemnt app ki tou ap sab se pehle @docs/ read kro or skills ka use kr k banao abhi only homepage banao desogn modern, profesional, pleasnt, asthetic, exiciting, elegant, beafutigl using skills frontend, hallmark, ui-ux-promax tou ab ap isk hisab se spec likho frontend ui k lie only tou ap mujh se Q poucho aur docs main prhna likha hai kia kia hcheez hon is k hisab se ui banani hai tou ap mujh s is hisab se Q poucho"

## User Scenarios & Testing *(mandatory)*

### Scope Summary

The UI surface of Talent Hub is delivered as a single, coherent, modern SaaS product across the **entire website**. The following pages are in scope and share **one reusable design system** so every page feels like the same product:

1. Login page
2. Signup/Register page
3. HR / Admin dashboard
4. Employee dashboard
5. Employees list + Employee profile (detail with tabs)
6. Attendance page
7. Leaves page
8. Performance + Goals page
9. Departments page
10. Settings page

Full-stack backend (APIs, database, auth logic) is **out of scope** — this spec is strictly the visual/UI layer. All pages are built to render against mock/seed data so the UI can be demonstrated without a live API.

### User Story 1 - Branded Login & Signup (Priority: P1)

Users authenticate through polished, on-brand Login and Signup pages. The login page presents email + password fields and a submit action; signup collects the details needed to create an account. Both must include appropriate form states (default, focus, error, disabled, loading/submitting) and failure handling (invalid credentials style messaging), all matching the product's design system.

**Why this priority**: Every authenticated user passes through auth screens; they must instill confidence and match the product brand.

**Independent Test**: A user can load the login and signup pages and see fully styled, responsive forms with proper input labels, focus/error/loading states, and a primary submit button that visually activates on valid input.

**Acceptance Scenarios**:

1. **Given** the Login page, **When** a user fills email and password and submits, **Then** the button shows a loading state and the form validates input before proceeding.
2. **Given** the Signup page, **When** a user fills required fields that fail validation (e.g., mismatched or weak password, invalid email), **Then** inline field-level errors appear adjacent to the offending field.
3. **Given** the Login/Signup pages, **When** viewed on mobile, **Then** the form fits within the viewport with no horizontal scroll.
4. **Given** valid credentials on login, **When** submitted, **Then** the user is routed to a role-appropriate dashboard (HR/Admin vs Employee) — routing logic may be mocked for UI demonstration.

---

### User Story 2 - HR / Admin Dashboard (Priority: P1)

After login as HR or Admin, the dashboard is the operational home. It shows summary statistics (total employees, present today, on leave, late today, pending leaves, departments), charts, an activity feed, a calendar, employees by department, and recently joined employees — all presented in a modern SaaS dashboard layout with a navigation sidebar and top navbar.

**Why this priority**: This is the day-to-day operational view for the primary user type and serves as the app shell for every protected page.

**Independent Test**: An HR user can land on the dashboard and view all stats cards, charts, activity feed, and calendar sections populated from mock data, with the sidebar + navbar always visible.

**Acceptance Scenarios**:

1. **Given** an HR user on the dashboard, **When** the page loads, **Then** they see: Total Employees, Present Today, On Leave, Late Today, Pending Leaves, and Departments stat cards.
2. **Given** an HR user on the dashboard, **When** the page loads, **Then** they see chart(s) (e.g., employees by department, attendance over time), an activity feed, a calendar, and recently-joined employees.
3. **Given** the dashboard shell, **When** the user navigates via the sidebar, **Then** the active section is highlighted and the page changes without losing layout context.
4. **Given** the dashboard, **When** the viewport is small (mobile), **Then** the sidebar collapses to a usable navigation pattern (e.g., drawer/toggle) and content remains usable.

---

### User Story 3 - Employee Dashboard (Priority: P2)

Employees get their own dashboard reflecting self-service focus: personal profile snapshot, own attendance, own leave requests, own performance/goals. Data is scoped to "my data" as per the business rules (HR = full access; Employee = own data only).

**Why this priority**: Required for the two-user-type promise, slightly lower than HR because it builds on the same app shell and components.

**Independent Test**: After logging in as an Employee, the user sees a dashboard and navigation restricted to their own employee actions (profile, my attendance, my leaves, my performance), populated from mock data.

**Acceptance Scenarios**:

1. **Given** an Employee login, **When** the dashboard loads, **Then** the user sees only their own stats (my attendance %, my leave balance, my performance score) not organization-wide data.
2. **Given** the Employee dashboard, **When** the sidebar renders, **Then** it shows employee-appropriate sections (Profile, My Attendance, My Leaves, Performance) rather than HR-only management pages (e.g., add/edit employees).
3. **Given** the Employee dashboard, **When** the page loads on any screen size, **Then** the layout renders without breakage.

---

### User Story 4 - Employees List & Profile (Priority: P1)

HR manages the workforce via an employee table with avatar, employee ID, name, email, department, position, joining date, and status, plus search + filter. Clicking an employee opens a profile page with tabs: Overview, Attendance, Leaves, Performance, Skills, Employment History. Add/Edit/Delete actions are available (modals used for add/edit).

**Why this priority**: Core HR management; the table + profile pattern is reused conceptually across the app.

**Independent Test**: An HR user sees the employee table with sortable/searchable/filterable data, opens any row's profile, and navigates all profile tabs, each rendering its own mock content.

**Acceptance Scenarios**:

1. **Given** the Employees list page, **When** it loads, **Then** the table shows avatar, ID, name, email, department, position, joining date, and status for each row with active/on-leave/inactive status badges.
2. **Given** the Employees list, **When** the user types in search or applies filters (department, status), **Then** rows filter accordingly.
3. **Given** the Employees list, **When** the user clicks a row or "View", **Then** the Employee profile page opens showing all six tabs (Overview, Attendance, Leaves, Performance, Skills, Employment History).
4. **Given** the employee profile Overview tab, **Then** it shows name, position, department, email, phone, joining date, status, attendance %, leave count, and performance score.
5. **Given** an employee profile sub-tab, **When** it has no records, **Then** an empty state with a call-to-action is shown instead of a blank panel.

---

### User Story 5 - Attendance Page (Priority: P2)

HR views and manages attendance via a table (employee, check-in, check-out, status) with statuses Present / Late / Absent shown as badges, plus an HR action to reject attendance (changes status to Absent). A check-in/out component exists (for self-service) and an attendance chart may be shown.

**Why this priority**: Part of core HR operations; builds on shared table + badge + modal components.

**Independent Test**: An HR user views the attendance table with correct status badges, sees an attendance chart, and can trigger the reject attendance action which visually changes status to Absent.

**Acceptance Scenarios**:

1. **Given** the Attendance page, **Then** each row shows employee, check-in, check-out, and a Present/Late/Absent status badge.
2. **Given** the Attendance page, **When** HR selects "Reject" on an attendance record, **Then** a confirmation dialog appears and, on confirm, the status changes to Absent.
3. **Given** the Attendance page, **Then** a chart or summary of attendance is visible (e.g., present/late/absent breakdown or trend).
4. **Given** the Attendance page, **When** there are no records, **Then** an empty state is shown.

---

### User Story 6 - Leaves Page (Priority: P2)

HR reviews and manages leave requests in a table (employee, leave type, from, to, reason, status) with statuses Pending/Approved/Rejected as badges and Approve/Reject actions for pending leaves. A leave request form (modal) collects employee, leave type (Annual/Sick/Casual/Emergency), dates, and reason. In-app notification/toast for status changes.

**Why this priority**: Core approval workflow; builds on table, modal, badge, and toast components.

**Independent Test**: An HR user sees the leave list with status badges, opens the request form, and can approve/reject a pending leave which updates status and fires a toast notification.

**Acceptance Scenarios**:

1. **Given** the Leaves page, **Then** the table shows employee, leave type, start/end dates, reason, and a Pending/Approved/Rejected badge per row.
2. **Given** a pending leave, **When** HR clicks Approve or Reject, **Then** a confirmation dialog appears and, on confirm, the status changes and a toast notification is shown.
3. **Given** the Leaves page, **When** HR opens the "New Leave" action, **Then** a form modal appears with leave type, dates, and reason; validation errors show inline.

---

### User Story 7 - Performance & Goals (Priority: P2)

HR views employee performance (productivity, teamwork, punctuality, overall score) and goal tracking (title, description, status, target date, assigned employee). Performance cards + a goal tracker + a review/add form (modal) are included.

**Why this priority**: Important for a full product feel; builds on cards, forms, and progress/badge components.

**Independent Test**: HR sees performance cards with metrics and an overall score, a goal tracker list with status badges, and can open an add-review/add-goal modal that validates input.

**Acceptance Scenarios**:

1. **Given** the Performance page, **Then** performance cards show productivity, teamwork, punctuality, and an overall score.
2. **Given** the Performance page, **Then** a goal tracker lists goals with title, description, status (Pending/In Progress/Completed), target date, and assigned employee.
3. **Given** the Performance page, **When** HR opens add review or add goal, **Then** a modal form opens with inline validation.

---

### User Story 8 - Departments & Settings (Priority: P3)

HR manages departments (list/table with employee count, add/edit/delete) and views a Settings page (profile/config). These complete the sidebar navigation's feature set.

**Why this priority**: Lower than core flows but part of a complete, demonstrable product.

**Independent Test**: HR can view departments with counts, add/edit/delete a department via modal, and open a styled Settings page.

**Acceptance Scenarios**:

1. **Given** the Departments page, **Then** each department shows its name and employee count with add/edit/delete actions.
2. **Given** the Departments page, **When** HR adds or edits a department, **Then** a form modal opens with validation.
3. **Given** the Settings page, **Then** it renders profile and configuration fields in the shared design system.

---

### Edge Cases

- **Empty states**: Every list/table page (employees, attendance, leaves, performance, departments) must show a clear empty-state with an actionable call-to-action rather than a blank panel.
- **No horizontal scroll**: All pages must render cleanly at 320 / 375 / 414 / 768 / 1280 px widths with no horizontal scroll.
- **Long content**: Headlines and labels must wrap without breaking layout; buttons must not wrap text onto two lines.
- **Reduced motion**: Any animation must respect a user's reduced-motion preference.
- **Form validation empty submit**: Submitting Login/Signup or any modal form empty shows inline errors, never a silent failure.
- **Status badges on unknown value**: Any unrecognized status value renders a neutral/fallback badge style rather than breaking.
- **Login route by role**: Mock logic routes HR/Admin to the HR dashboard and Employee to the Employee dashboard; if role unknown, show a neutral default.
- **Table overflow**: Wide tables scroll within their container (no page-level horizontal scroll).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product MUST use one shared, reusable design system (theme tokens, typography, color, spacing, component library) so all pages look consistent.
- **FR-002**: The Login page MUST present email + password inputs with visible labels, inline validation errors, a loading state on submit, and connect to Signup.
- **FR-003**: The Signup page MUST present required registration fields with visible labels, inline validation (valid email, required fields, password confirmation), and a loading state on submit.
- **FR-004**: After login, users MUST be routed to a role-appropriate dashboard: HR/Admin to the HR dashboard, Employee to the Employee dashboard (mockable for UI-only scope).
- **FR-005**: The app shell MUST provide a navigation sidebar and top navbar shared across all protected pages, responsive on mobile (collapsible sidebar/drawer).
- **FR-006**: The HR dashboard MUST display stat cards for Total Employees, Present Today, On Leave, Late Today, Pending Leaves, and Departments, plus charts, an activity feed, a calendar, employees by department, and recently joined employees.
- **FR-007**: The Employee dashboard MUST display only the logged-in user's own data (profile snapshot, my attendance, my leaves, my performance) with employee-scoped navigation.
- **FR-008**: The Employees list page MUST render a table with avatar, employee ID, name, email, department, position, joining date, and status, with search and filters (by department and status).
- **FR-009**: The Employees list MUST support View, Add, Edit, and Delete actions, with Add/Edit in a modal and Delete confirmed via a dialog.
- **FR-010**: The Employee profile page MUST show six tabs: Overview, Attendance, Leaves, Performance, Skills, and Employment History.
- **FR-011**: The Overview tab MUST show name, position, department, email, phone, joining date, status, attendance %, leave count, and performance score.
- **FR-012**: The Attendance page MUST show a table with employee, check-in, check-out, and Present/Late/Absent status badges, plus a "Reject attendance" action (with confirmation) that changes status to Absent.
- **FR-013**: The Attendance page MUST include an attendance chart or summary and empty states.
- **FR-014**: The Leaves page MUST show a table with employee, leave type (Annual/Sick/Casual/Emergency), start/end dates, reason, and Pending/Approved/Rejected status badges.
- **FR-015**: The Leaves page MUST include Approve/Reject actions for pending leaves (with confirmation) and surface a toast notification on status change.
- **FR-016**: The Leaves page MUST include a leave request form (modal) with leave type, dates, reason, and inline validation.
- **FR-017**: The Performance page MUST show performance cards with productivity, teamwork, punctuality, and overall score.
- **FR-018**: The Performance page MUST include a goal tracker showing title, description, status (Pending/In Progress/Completed), target date, and assigned employee, plus add-review/add-goal modals with validation.
- **FR-019**: The Departments page MUST show departments with employee counts and Add/Edit/Delete actions via validated modals.
- **FR-020**: The Settings page MUST render profile/configuration fields using the shared design system.
- **FR-021**: Every list/table page MUST show a clear empty state with an actionable call-to-action when there is no data.
- **FR-022**: All interactive components MUST ship states for default, hover, focus-visible, active, disabled, loading, error, and success.
- **FR-023**: Color contrast for text MUST meet accessibility standards (at least 4.5:1 for normal text), and all icons MUST have accessible labels or be marked decorative.
- **FR-024**: Motion MUST respect the user's reduced-motion preference, and transitions MUST use consistent, context-aware durations.
- **FR-025**: The UI MUST consume mock/seed data (per representative demo employees from the PRD) so every page renders fully without a live backend.

### Key Entities *(include if feature involves data)*

- **Employee**: Avatars, employee ID, name, email, phone, department, position, joining date, status (Active/On Leave/Inactive), attendance %, leave count, performance score.
- **Department**: Name and employee count.
- **Attendance Record**: Employee, check-in time, check-out time, status (Present/Late/Absent).
- **Leave Request**: Employee, leave type (Annual/Sick/Casual/Emergency), start date, end date, reason, status (Pending/Approved/Rejected).
- **Performance Record**: Productivity, teamwork, punctuality, overall score, review date.
- **Goal**: Title, description, status (Pending/In Progress/Completed), target date, assigned employee.
- **Skill**: Name and level (Beginner/Intermediate/Advanced/Expert).
- **Employment History**: Company, position, start date, end date.
- **User/Role**: Roles HR / ADMIN / EMPLOYEE drive dashboard and navigation differences.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The complete UI can be demonstrated end-to-end with mock data, without a live backend, across all in-scope pages.
- **SC-002**: All pages render without horizontal scroll at 320, 375, 414, 768, and 1280 px widths.
- **SC-003**: A user can reach every page in the feature set (Login, Signup, HR Dashboard, Employee Dashboard, Employees, Employee Profile, Attendance, Leaves, Performance, Departments, Settings) from the product's own navigation within at most 2 clicks/clicks-through.
- **SC-004**: Text content achieves at least a 4.5:1 contrast ratio on its background for normal-sized text (WCAG AA), verified across all pages.
- **SC-005**: All interactive components expose the full set of states (default, hover, focus, active, disabled, loading, error, success).
- **SC-006**: A user can identify what Talent Hub does and how to log in / sign up from the Login screen in under 10 seconds.
- **SC-007**: All forms (login, signup, and modal forms) show inline, field-level validation errors without a page reload.
- **SC-008**: Reduced-motion preference is honored — no disruptive motion for users who enable reduced-motion.