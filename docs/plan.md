# talent-hub Implementation Plan

**Date:** 2026-09-06
**Project:** talent-hub (HR Management System)
**Timeline:** 1.5 hours
**Team:** 2 developers

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| Auth | Custom JWT + bcryptjs |
| UI | shadcn/ui + Tailwind CSS |
| Forms | React Hook Form + Zod |
| State | React Context |
| API | Next.js API Routes |

---

## Database Schema

**Tables:** User, Employee, Department, Attendance, Leave, Performance, Goal, Skill, EmploymentHistory

**Key Enums:**
- Role: HR, ADMIN, EMPLOYEE
- EmployeeStatus: ACTIVE, ON_LEAVE, INACTIVE
- AttendanceStatus: PRESENT, LATE, ABSENT
- LeaveType: ANNUAL, SICK, CASUAL, EMERGENCY
- LeaveStatus: PENDING, APPROVED, REJECTED
- GoalStatus: PENDING, IN_PROGRESS, COMPLETED
- SkillLevel: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT

---

## API Routes

```
/app/api/
├── auth/
│   ├── login/route.ts
│   ├── register/route.ts
│   └── logout/route.ts
├── employees/
│   ├── route.ts              (GET all, POST create)
│   └── [id]/
│       ├── route.ts          (GET, PUT, DELETE)
│       ├── attendance/route.ts
│       ├── leaves/route.ts
│       └── performance/route.ts
├── departments/
│   ├── route.ts              (GET all, POST create)
│   └── [id]/route.ts         (PUT, DELETE)
├── attendance/
│   ├── route.ts              (GET all, POST mark)
│   └── [id]/route.ts         (PUT update, DELETE)
├── leaves/
│   ├── route.ts              (GET all, POST create)
│   └── [id]/
│       ├── route.ts          (GET one)
│       ├── approve/route.ts
│       └── reject/route.ts
├── performance/
│   ├── route.ts              (GET all, POST create)
│   └── [id]/route.ts         (PUT update)
├── dashboard/route.ts        (GET stats)
└── search/route.ts           (GET search)
```

---

## App Routes (Pages)

```
/app
├── page.tsx                         → redirect /dashboard
├── login/page.tsx
├── (protected)/
│   ├── layout.tsx                   → DashboardLayout
│   ├── dashboard/page.tsx
│   ├── employees/
│   │   ├── page.tsx                 → list + search/filter
│   │   └── [id]/page.tsx            → profile with tabs
│   ├── attendance/page.tsx
│   ├── leaves/page.tsx
│   ├── performance/page.tsx
│   ├── departments/page.tsx
│   └── settings/page.tsx
```

---

## Component Structure

```
/components
├── ui/                              → shadcn components
├── layout/
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   └── DashboardLayout.tsx
├── employees/
│   ├── EmployeeTable.tsx
│   ├── EmployeeCard.tsx
│   ├── EmployeeForm.tsx
│   ├── EmployeeProfile.tsx
│   └── EmployeeStats.tsx
├── attendance/
│   ├── AttendanceTable.tsx
│   ├── CheckInOut.tsx
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
├── dashboard/
│   ├── StatsCards.tsx
│   ├── ActivityFeed.tsx
│   ├── Calendar.tsx
│   └── Charts.tsx
└── shared/
    ├── SearchBar.tsx
    ├── StatusBadge.tsx
    ├── ConfirmDialog.tsx
    ├── LoadingSpinner.tsx
    └── EmptyState.tsx
```

---

## Feature Specs (7 total)

| # | Spec | Coverage |
|---|------|----------|
| 1 | auth | Login, Register, JWT, Middleware, Roles |
| 2 | dashboard | Stats, Charts, Activity Feed, Calendar |
| 3 | employees | CRUD, Search, Filter, Profile, Skills, History |
| 4 | attendance | Auto-status, Check-in/out, HR Reject |
| 5 | leaves | Request, Approve/Reject, Notifications |
| 6 | performance | Metrics, Goals, Review Cycles |
| 7 | departments | CRUD, Employee Count |

---

## Implementation Phases (1.5 hours)

### Phase 1: Foundation (15 min)
- [ ] Initialize Next.js project
- [ ] Install dependencies (shadcn/ui, prisma, bcryptjs, jsonwebtoken, zod)
- [ ] Configure Tailwind + shadcn/ui
- [ ] Set up Prisma schema + Neon connection
- [ ] Create JWT helpers + auth middleware

### Phase 2: Auth & Layout (20 min)
- [ ] Login page + API
- [ ] Register page + API
- [ ] Auth middleware (protect routes)
- [ ] Dashboard layout (Sidebar + Navbar)

### Phase 3: Dashboard (15 min)
- [ ] Dashboard stats API
- [ ] StatsCards component
- [ ] Charts component
- [ ] ActivityFeed component
- [ ] Calendar component

### Phase 4: Employee Management (25 min)
- [ ] Employee CRUD API
- [ ] EmployeeTable with search/filter
- [ ] EmployeeForm (add/edit modal)
- [ ] EmployeeProfile page with tabs
- [ ] EmployeeStats

### Phase 5: Attendance (20 min)
- [ ] Attendance API
- [ ] Auto-status logic (before/after 9:30 AM)
- [ ] AttendanceTable component
- [ ] CheckInOut component
- [ ] HR reject attendance

### Phase 6: Leave Management (20 min)
- [ ] Leave CRUD API
- [ ] Leave request form
- [ ] LeaveTable with filters
- [ ] Approve/Reject API + UI
- [ ] In-app notifications

### Phase 7: Performance (20 min)
- [ ] Performance CRUD API
- [ ] Goal CRUD API
- [ ] PerformanceCard component
- [ ] GoalTracker component
- [ ] ReviewForm

### Phase 8: Department & Polish (15 min)
- [ ] Department CRUD API + UI
- [ ] Responsive design
- [ ] Loading + empty states
- [ ] Error handling
- [ ] Toast notifications

---

## Business Rules

| Rule | Logic |
|------|-------|
| Attendance | Check-in before 9:30 AM = Present, after = Late, none = Absent |
| HR Reject | HR can reject attendance → status changes to Absent |
| Leave Flow | Employee submit → Pending → HR Approve/Reject → Final |
| Performance | Overall = (Productivity + Teamwork + Punctuality) / 3 |
| Roles | HR = full access, Employee = own data only |

---

## Definition of Done

- [ ] HR can log in
- [ ] Employee can log in
- [ ] Dashboard loads with stats, charts, activity, calendar
- [ ] Employees CRUD works
- [ ] Employee profile with tabs works
- [ ] Attendance auto-status works
- [ ] Employee self check-in/out works
- [ ] HR can reject attendance
- [ ] Leave request/approval works
- [ ] In-app notifications work
- [ ] Performance tracking works
- [ ] Goal tracking works
- [ ] Department CRUD works
- [ ] Multi-field search works
- [ ] UI is responsive
- [ ] Main demo flow works end-to-end
