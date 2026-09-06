# Talent Hub --- Smart HR Management System

## Project Overview

Talent Hub is a modern full-stack HR Management System for small and
medium-sized organizations. It centralizes employee records, attendance,
leave management, performance tracking, goal tracking, and HR analytics
in one dashboard.

**Target:** 1.5-hour MVP, built by 2 developers with AI assistance.

## Main Users

### HR / Admin

-   Login/logout
-   Protected dashboard
-   Manage employees
-   Search/filter employees
-   View employee profiles
-   Manage attendance
-   Approve/reject leave requests
-   Manage performance
-   Manage departments

### Employee

-   Personal login
-   View profile
-   Submit leave requests
-   Self check-in/out
-   View attendance
-   View performance

------------------------------------------------------------------------

# Core Features

## 1. Authentication

-   HR/Admin/Employee login
-   Register new users
-   Protected dashboard
-   Logout
-   Session handling with JWT
-   Roles: HR, ADMIN, EMPLOYEE

## 2. Smart Dashboard

Statistics: - Total Employees - Present Today - On Leave - Late Today -
Departments - Pending Leave Requests

Dashboard sections: - Stats cards - Charts - Activity Feed - Calendar -
Employees by department - Recently joined employees

Example:

``` text
Total Employees: 128
Present Today:   112
On Leave:          8
Late Today:        8
Pending Leaves:    5
```

## 3. Employee Management

Employee table: - Avatar - Employee ID - Name - Email - Department -
Position - Joining date - Status

Actions: - View - Add - Edit - Delete - Search - Filter

Employee fields:

``` text
Full Name
Email
Phone
Department
Position
Joining Date
Status
```

Status: - Active - On Leave - Inactive

## 4. Employee Profile

Show: - Name - Position - Department - Email - Phone - Joining date -
Status - Attendance percentage - Leave count - Performance score

Tabs:

``` text
Overview
Attendance
Leaves
Performance
Skills
Employment History
```

## 5. Attendance Management

Attendance table:

``` text
Employee      Check-in     Check-out    Status
Ali Khan      09:02 AM     05:10 PM     Present
Ahmed Raza    09:35 AM     05:00 PM     Late
Sara Ahmed    --           --           Absent
```

Statuses: - Present - Late - Absent

Auto-status logic: - Check-in before 9:30 AM = Present - Check-in after
9:30 AM = Late - No check-in = Absent

HR actions: - Reject attendance (changes status to Absent)

Basic formula:

``` text
Attendance % = Present Days / Total Working Days × 100
```

## 6. Leave Management

Leave request:

``` text
Employee: Ali Khan
Leave Type: Annual Leave
From: 12 September 2026
To: 14 September 2026
Reason: Personal
Status: Pending
```

Leave types: - Annual Leave - Sick Leave - Casual Leave - Emergency
Leave

Statuses: - Pending - Approved - Rejected

HR actions:

``` text
Pending → Approve
Pending → Reject
```

Notifications: - In-app notifications for leave status changes

## 7. Employee Performance

Metrics: - Productivity - Teamwork - Punctuality - Overall score

Example:

``` text
Productivity: 90%
Teamwork:     82%
Punctuality:  88%
Overall:      87%
```

Formula:

``` text
Overall Score =
(Productivity + Teamwork + Punctuality) / 3
```

Actions: - Add performance record - Update performance - View
performance

## 8. Goal Tracking

Goal fields: - Title - Description - Status (Pending, In Progress,
Completed) - Target Date - Employee

Actions: - Create goal - Update goal status - View goals by employee

## 9. Department Management

Example departments: - IT - HR - Marketing - Finance - Sales -
Operations

Features: - Add - Edit - Delete - Employee count

## 10. Global Search

Search by: - Name - Email - Employee ID - Department - Position

------------------------------------------------------------------------

# UI/UX

Build it like a modern SaaS dashboard.

Sidebar:

``` text
Dashboard
Employees
Attendance
Leaves
Performance
Departments
Settings
Logout
```

Use: - Cards - Tables - Modals - Forms - Dropdowns - Badges - Tabs -
Toast notifications - Loading states - Empty states - Confirmation
dialogs

Responsive on desktop, tablet, and mobile.

------------------------------------------------------------------------

# Recommended Tech Stack

-   **Framework:** Next.js 14+ (App Router)
-   **Database:** Neon PostgreSQL
-   **ORM:** Prisma
-   **Auth:** Custom JWT + bcryptjs
-   **UI:** shadcn/ui + Tailwind CSS
-   **Forms:** React Hook Form + Zod
-   **State:** React Context
-   **API:** Next.js API Routes

------------------------------------------------------------------------

# Database Design

## users

``` text
id
email
password
name
role (HR, ADMIN, EMPLOYEE)
created_at
updated_at
```

## employees

``` text
id
user_id
name
email
phone
department_id
position
joining_date
status (ACTIVE, ON_LEAVE, INACTIVE)
avatar
created_at
updated_at
```

## departments

``` text
id
name
created_at
updated_at
```

## attendance

``` text
id
employee_id
date
check_in
check_out
status (PRESENT, LATE, ABSENT)
created_at
updated_at
```

## leaves

``` text
id
employee_id
leave_type (ANNUAL, SICK, CASUAL, EMERGENCY)
start_date
end_date
reason
status (PENDING, APPROVED, REJECTED)
created_at
updated_at
```

## performance

``` text
id
employee_id
productivity
teamwork
punctuality
overall_score
review_date
created_at
updated_at
```

## goals

``` text
id
employee_id
title
description
status (PENDING, IN_PROGRESS, COMPLETED)
target_date
created_at
updated_at
```

## skills

``` text
id
employee_id
name
level (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
created_at
updated_at
```

## employment_history

``` text
id
employee_id
company
position
start_date
end_date
created_at
updated_at
```

Relationships:

``` text
users.id
      ↓
employees.user_id

departments.id
      ↓
employees.department_id

employees.id
   ├── attendance.employee_id
   ├── leaves.employee_id
   ├── performance.employee_id
   ├── goals.employee_id
   ├── skills.employee_id
   └── employment_history.employee_id
```

------------------------------------------------------------------------

# Suggested Routes

## App Routes (Pages)

``` text
/login
/register
/dashboard
/employees
/employees/[id]
/attendance
/leaves
/performance
/departments
/settings
```

## API Routes

``` text
/api/auth/login
/api/auth/register
/api/auth/logout
/api/employees
/api/employees/[id]
/api/employees/[id]/attendance
/api/employees/[id]/leaves
/api/employees/[id]/performance
/api/departments
/api/departments/[id]
/api/attendance
/api/attendance/[id]
/api/leaves
/api/leaves/[id]
/api/leaves/[id]/approve
/api/leaves/[id]/reject
/api/performance
/api/performance/[id]
/api/dashboard
/api/search
```

For speed, employee add/edit can use modals instead of separate pages.

------------------------------------------------------------------------

# Component Structure

``` text
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

------------------------------------------------------------------------

# Two-Person Team Division

## Developer 1 --- Frontend

-   Next.js setup
-   Tailwind + shadcn/ui
-   Login/Register UI
-   Sidebar/navbar
-   Dashboard (StatsCards, Charts, ActivityFeed, Calendar)
-   Employee pages
-   Employee profile
-   Attendance UI
-   Leave UI
-   Performance UI
-   Responsive design

**Priority:** beautiful, polished interface.

## Developer 2 --- Backend / Database

-   Neon PostgreSQL + Prisma setup
-   Database schema
-   Relationships
-   Authentication (JWT + bcryptjs)
-   Employee CRUD
-   Attendance (auto-status)
-   Leave approval/rejection
-   Performance CRUD
-   Goal CRUD
-   Dashboard statistics API
-   Search API
-   Demo/seed data

**Priority:** working data operations.

------------------------------------------------------------------------

# 90-Minute Development Plan

## Phase 1: Foundation (15 min)

Both: - Create project - Install dependencies - Configure Tailwind +
shadcn/ui - Set up Prisma schema + Neon connection - Create JWT helpers
+ auth middleware

## Phase 2: Auth & Layout (20 min)

Developer 1: - Login/Register UI - Dashboard layout (Sidebar + Navbar)

Developer 2: - Login/Register API - Auth middleware - Protect routes

## Phase 3: Dashboard (15 min)

Developer 1: - StatsCards - Charts - ActivityFeed - Calendar

Developer 2: - Dashboard stats API - Seed data

## Phase 4: Employee Management (25 min)

Developer 1: - Employee table - Employee form modal - Employee profile
with tabs - Employee stats

Developer 2: - Employee CRUD API - Search API

## Phase 5: Attendance (20 min)

Developer 1: - Attendance table - Check-in/out component

Developer 2: - Attendance API - Auto-status logic - HR reject attendance

## Phase 6: Leave Management (20 min)

Developer 1: - Leave table - Leave form - Notifications

Developer 2: - Leave CRUD API - Approve/Reject API

## Phase 7: Performance & Goals (20 min)

Developer 1: - Performance card - Goal tracker - Review form

Developer 2: - Performance CRUD API - Goal CRUD API

## Phase 8: Department & Polish (15 min)

Both: - Department CRUD - Responsive design - Loading + empty states -
Error handling - Toast notifications - Final testing

------------------------------------------------------------------------

# Demo Data

Use realistic records:

``` text
Ali Khan
IT — Senior Developer — Active

Sara Ahmed
HR — HR Executive — Active

Ahmed Raza
Marketing — UI/UX Designer — On Leave

Usman Malik
Finance — Accountant — Active
```

Add enough records to make the dashboard look populated.

------------------------------------------------------------------------

# Business Rules

| Rule | Logic |
|------|-------|
| Attendance | Check-in before 9:30 AM = Present, after = Late, none = Absent |
| HR Reject | HR can reject attendance → status changes to Absent |
| Leave Flow | Employee submit → Pending → HR Approve/Reject → Final |
| Performance | Overall = (Productivity + Teamwork + Punctuality) / 3 |
| Roles | HR = full access, Employee = own data only |

---

# Dashboard Calculations

``` text
Total Employees
= COUNT(employees)

Present Today
= COUNT(attendance WHERE date = today AND status = 'Present')

Late Today
= COUNT(attendance WHERE date = today AND status = 'Late')

On Leave
= approved leave covering today's date

Pending Leaves
= COUNT(leaves WHERE status = 'Pending')

Departments
= COUNT(departments)
```

------------------------------------------------------------------------

# MVP Rules

## Build

-   Neon PostgreSQL + Prisma
-   Custom JWT authentication
-   Reusable components (shadcn/ui)
-   Demo/seed data
-   Important user flows
-   Working CRUD
-   Goal tracking
-   Responsive UI
-   AI-assisted boilerplate

## Do NOT build in the 1.5-hour MVP

-   Payroll
-   Salary calculations
-   Recruitment pipeline
-   Interview scheduling
-   Biometric attendance
-   Email automation
-   Advanced analytics
-   Multi-company tenancy
-   Complex permissions
-   PDF reports

------------------------------------------------------------------------

# Future Scope

-   Payroll and salary slips
-   Recruitment management
-   Interview scheduling
-   Email/push notifications
-   Advanced attendance analytics
-   Performance review history
-   Employee documents
-   Holiday calendar
-   Organization-level roles
-   Multi-company support
-   AI HR assistant
-   AI-powered employee insights

------------------------------------------------------------------------

# Security

For the MVP: - Use Custom JWT with bcryptjs for password hashing - Never
expose secret keys in frontend code - Use environment variables - Protect
dashboard routes with auth middleware - Validate all forms with Zod - Use
Prisma for secure database access

Example environment variables:

``` text
DATABASE_URL
JWT_SECRET
NEXT_PUBLIC_APP_URL
```

------------------------------------------------------------------------

# Branding

## Name

**Talent Hub**

## Tagline

**Smart Workforce Management, Simplified.**

Alternative: **One Platform. Your Entire Workforce.**

------------------------------------------------------------------------

# Presentation Pitch

> Talent Hub is a smart HR management platform designed to centralize
> employee management, attendance, leave processing, performance
> tracking, and goal management in one modern dashboard. It helps HR
> teams reduce manual work and get a clear overview of their workforce.

------------------------------------------------------------------------

# Demo Scenario

1.  Login as HR/Admin
2.  Show dashboard statistics, charts, activity feed, calendar
3.  Search for an employee
4.  Open employee profile (show tabs: overview, attendance, leaves,
    performance, skills, history)
5.  Show attendance with auto-status
6.  Open pending leave
7.  Approve the leave (show in-app notification)
8.  Open performance and goals
9.  Return to dashboard and show updated data

------------------------------------------------------------------------

# Definition of Done

-   [ ] HR can log in
-   [ ] Employee can log in
-   [ ] Dashboard loads with stats, charts, activity, calendar
-   [ ] Employees CRUD works
-   [ ] Employee profile with tabs works
-   [ ] Attendance auto-status works
-   [ ] Employee self check-in/out works
-   [ ] HR can reject attendance
-   [ ] Leave request/approval works
-   [ ] In-app notifications work
-   [ ] Performance tracking works
-   [ ] Goal tracking works
-   [ ] Department CRUD works
-   [ ] Multi-field search works
-   [ ] UI is responsive
-   [ ] Main demo flow works end-to-end

------------------------------------------------------------------------

# Final MVP Architecture

``` text
                 TALENT HUB
                      |
           ┌──────────┴──────────┐
           |                     |
        HR LOGIN             DASHBOARD
                                 |
        ┌──────────┬─────────────┼────────────┬────────────┐
        ↓          ↓             ↓            ↓            ↓
    Employees  Attendance      Leaves    Performance  Departments
        |                                        |
        ↓                                        ↓
 Employee Profile                          Goal Tracking
```

**Final Stack:**

``` text
Next.js 14+ (App Router)
React
Tailwind CSS
shadcn/ui
Neon PostgreSQL
Prisma
Custom JWT + bcryptjs
React Hook Form + Zod
React Context
```

**Team:**

``` text
Developer 1 → Frontend + UI/UX
Developer 2 → Database + Backend Logic
```

**Target:** A polished, working HR SaaS MVP that can be built and
demonstrated within approximately 1.5 hours with AI-assisted development.