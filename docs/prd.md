# PeoplePulse --- Smart HR Management System

## Project Overview

PeoplePulse is a modern full-stack HR Management System for small and
medium-sized organizations. It centralizes employee records, attendance,
leave management, performance tracking, and HR analytics in one
dashboard.

**Target:** 1-hour MVP, built by 2 developers with AI assistance.

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

### Employee --- Future Scope

-   Personal login
-   View profile
-   Submit leave requests
-   View attendance
-   View performance

------------------------------------------------------------------------

# Core Features

## 1. Authentication

-   HR/Admin login
-   Protected dashboard
-   Logout
-   Session handling
-   Use Supabase Auth for the MVP

## 2. Smart Dashboard

Statistics: - Total Employees - Present Today - On Leave - Late Today -
Departments - Pending Leave Requests

Dashboard sections: - Attendance overview - Employees by department -
Pending leave requests - Recently joined employees

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

## 8. Department Management

Example departments: - IT - HR - Marketing - Finance - Sales -
Operations

Features: - Add - Edit - Delete - Employee count

## 9. Global Search

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

-   **Frontend:** Next.js + React + Tailwind CSS
-   **Backend/Data:** Supabase
-   **Database:** Supabase PostgreSQL
-   **Authentication:** Supabase Auth
-   **Deployment:** Vercel

For a 1-hour project, avoid a separate Express server unless your class
specifically requires it. Supabase keeps authentication and database
integration fast.

------------------------------------------------------------------------

# Database Design

## employees

``` text
id
name
email
phone
department_id
position
joining_date
status
created_at
```

## attendance

``` text
id
employee_id
date
check_in
check_out
status
created_at
```

## leaves

``` text
id
employee_id
leave_type
start_date
end_date
reason
status
created_at
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
```

## departments

``` text
id
name
created_at
```

Relationships:

``` text
departments.id
      ↓
employees.department_id

employees.id
   ├── attendance.employee_id
   ├── leaves.employee_id
   └── performance.employee_id
```

------------------------------------------------------------------------

# Suggested Routes

``` text
/login
/dashboard
/employees
/employees/[id]
/attendance
/leaves
/performance
/departments
```

For speed, employee add/edit can use modals instead of separate pages.

------------------------------------------------------------------------

# Component Structure

``` text
components/
├── Sidebar
├── Navbar
├── StatCard
├── EmployeeTable
├── EmployeeModal
├── EmployeeProfile
├── AttendanceTable
├── LeaveTable
├── LeaveModal
├── PerformanceCard
├── DepartmentTable
├── SearchBar
├── StatusBadge
├── LoadingSpinner
└── ConfirmDialog
```

------------------------------------------------------------------------

# Two-Person Team Division

## Developer 1 --- Frontend

-   Next.js setup
-   Tailwind
-   Login UI
-   Sidebar/navbar
-   Dashboard
-   Employee pages
-   Employee profile
-   Attendance UI
-   Leave UI
-   Performance UI
-   Responsive design

**Priority:** beautiful, polished interface.

## Developer 2 --- Backend / Database

-   Supabase setup
-   Database schema
-   Relationships
-   Authentication
-   Employee CRUD
-   Attendance
-   Leave approval/rejection
-   Performance CRUD
-   Demo/seed data
-   Security policies if time permits

**Priority:** working data operations.

------------------------------------------------------------------------

# 60-Minute Development Plan

## 0--5 min

Both: - Create project - Configure Supabase - Create tables - Add
environment variables

## 5--25 min

Developer 1: - Login - Layout - Dashboard - Employee table

Developer 2: - Auth - Employee CRUD - Attendance - Leaves - Demo data

## 25--40 min

Developer 1: - Employee profile - Attendance screen - Leave screen -
Performance screen

Developer 2: - Connect attendance - Connect leaves - Leave
approval/rejection - Performance - Dashboard statistics

## 40--50 min

Integration: - Connect frontend to Supabase - Test CRUD - Test
attendance - Test leave approval - Test performance

## 50--57 min

Polish: - Responsive UI - Toasts - Loading states - Empty states - Demo
data - Fix bugs

## 57--60 min

Final test:

``` text
Login
↓
Dashboard
↓
Employees
↓
Employee Profile
↓
Attendance
↓
Leaves
↓
Approve Leave
↓
Performance
↓
Dashboard
```

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
```

------------------------------------------------------------------------

# MVP Rules

## Build

-   Supabase
-   Reusable components
-   Demo data
-   Important user flows
-   Working CRUD
-   Responsive UI
-   AI-assisted boilerplate

## Do NOT build in the 1-hour MVP

-   Payroll
-   Salary calculations
-   Recruitment pipeline
-   Interview scheduling
-   Biometric attendance
-   Email automation
-   Advanced analytics
-   Multi-company tenancy
-   Complex permissions
-   Employee self-service portal
-   PDF reports

------------------------------------------------------------------------

# Future Scope

-   Payroll and salary slips
-   Recruitment management
-   Interview scheduling
-   Employee self-service portal
-   Email/push notifications
-   Advanced attendance analytics
-   Performance review history
-   Goal tracking
-   Employee documents
-   Holiday calendar
-   Organization-level roles
-   Multi-company support
-   AI HR assistant
-   AI-powered employee insights

------------------------------------------------------------------------

# Security

For the MVP: - Use Supabase Auth - Never expose secret keys in frontend
code - Use environment variables - Protect dashboard routes - Validate
forms - Use database access policies where possible

Example public environment variables:

``` text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Never put a Supabase service-role key in client-side code.

------------------------------------------------------------------------

# Branding

## Name

**PeoplePulse**

## Tagline

**Smart Workforce Management, Simplified.**

Alternative: **One Platform. Your Entire Workforce.**

------------------------------------------------------------------------

# Presentation Pitch

> PeoplePulse is a smart HR management platform designed to centralize
> employee management, attendance, leave processing, and performance
> tracking in one modern dashboard. It helps HR teams reduce manual work
> and get a clear overview of their workforce.

------------------------------------------------------------------------

# Demo Scenario

1.  Login as HR/Admin
2.  Show dashboard statistics
3.  Search for an employee
4.  Open employee profile
5.  Show attendance
6.  Open pending leave
7.  Approve the leave
8.  Open performance
9.  Return to dashboard and show updated data

------------------------------------------------------------------------

# Definition of Done

-   [ ] HR can log in
-   [ ] Dashboard loads
-   [ ] Employees can be created
-   [ ] Employees can be edited
-   [ ] Employees can be deleted
-   [ ] Employees can be searched
-   [ ] Employee profile works
-   [ ] Attendance works
-   [ ] Leave requests work
-   [ ] Leave approval/rejection works
-   [ ] Performance works
-   [ ] Database stores data
-   [ ] UI is responsive
-   [ ] Main demo flow works without errors

------------------------------------------------------------------------

# Final MVP Architecture

``` text
                 PEOPLEPULSE
                     |
          ┌──────────┴──────────┐
          |                     |
       HR LOGIN             DASHBOARD
                                |
       ┌──────────┬─────────────┼────────────┬────────────┐
       ↓          ↓             ↓            ↓            ↓
   Employees  Attendance      Leaves    Performance  Departments
       |
       ↓
 Employee Profile
```

**Final Stack:**

``` text
Next.js
React
Tailwind CSS
Supabase
PostgreSQL
Supabase Auth
Vercel
```

**Team:**

``` text
Developer 1 → Frontend + UI/UX
Developer 2 → Database + Backend Logic
```

**Target:** A polished, working HR SaaS MVP that can be built and
demonstrated within approximately one hour with AI-assisted development.