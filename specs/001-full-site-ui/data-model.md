# Data Model: Full-Site HR Management UI (A–Z)

**Branch**: `001-full-site-ui` | **Date**: 2026-09-06 | **Plan**: [plan.md](./plan.md)

> UI-only feature. Entities below are the **typed data shapes** consumed by the UI (from spec Key Entities). They mirror the future PRD schema so `lib/data` modules and later API integration stay compatible.

## Entities

### User
- id, email, password (displayed only as masked in Settings), name, role (`HR | ADMIN | EMPLOYEE`)
- Role drives dashboard routing and sidebar scope.
- Validation: valid email, required name, password min 8 with confirmation.

### Employee
- id, employeeId (string, e.g. "EMP-001"), name, email, phone, departmentId, departmentName, position, joiningDate, status (`Active | On Leave | Inactive`), avatar (initials or image path)
- Derived displays: attendance %, leave count, performance score (from related records)
- Search/filter by name, email, employeeId, department, position (PRD global search; table filters by department + status)

### Department
- id, name, employeeCount (derived)
- CRUD via modal (Add/Edit/Delete with confirm)

### AttendanceRecord
- id, employeeId, employeeName, date, checkIn (time | null), checkOut (time | null), status (`Present | Late | Absent`)
- Derived: attendance % = present days / total working days × 100 (PRD formula)
- HR action: reject → status becomes `Absent`

### LeaveRequest
- id, employeeId, employeeName, leaveType (`Annual | Sick | Casual | Emergency`), startDate, endDate, reason, status (`Pending | Approved | Rejected`)
- Validations: endDate >= startDate; reason required
- HR action: approve/reject pending → confirmation → toast

### PerformanceRecord
- id, employeeId, employeeName, productivity (0–100), teamwork (0–100), punctuality (0–100), overallScore, reviewDate
- Derived: overallScore = (productivity + teamwork + punctuality) / 3 (PRD formula)

### Goal
- id, employeeId, employeeName, title, description, status (`Pending | In Progress | Completed`), targetDate
- Progress implied by status badge; optional progress % for tracker visuals

### Skill
- id, employeeId, name, level (`Beginner | Intermediate | Advanced | Expert`)

### EmploymentHistory
- id, employeeId, company, position, startDate, endDate

### ActivityItem (dashboard feed)
- id, actorName, verb (e.g., "approved leave", "joined Talent Hub"), target, timestamp

## Relationships

```text
User 1—1 Employee
Employee 1—N AttendanceRecord
Employee 1—N LeaveRequest
Employee 1—N PerformanceRecord
Employee 1—N Goal
Employee 1—N Skill
Employee 1—N EmploymentHistory
Department 1—N Employee
```

## Enum Values (match PRD/plan.md)

| Field | Values |
|-------|--------|
| Employee.status | ACTIVE / ON_LEAVE / INACTIVE (display: Active / On Leave / Inactive) |
| Attendance.status | PRESENT / LATE / ABSENT |
| Leave.leaveType | ANNUAL / SICK / CASUAL / EMERGENCY |
| Leave.status | PENDING / APPROVED / REJECTED |
| Goal.status | PENDING / IN_PROGRESS / COMPLETED |
| Skill.level | BEGINNER / INTERMEDIATE / ADVANCED / EXPERT |
| Role | HR / ADMIN / EMPLOYEE |

## Validation Rules

- **Forms (Zod)**: email format + required; required name/text fields; password ≥ 8 with confirmation (signup); leave endDate ≥ startDate; performance scores 0–100 integers; department name required.
- **State transitions (UI-side)**: Leave `PENDING → APPROVED | REJECTED`; Attendance `PRESENT|LATE → ABSENT` (HR reject); Goal `PENDING → IN_PROGRESS → COMPLETED`.
- **Derived math** (PRD): Attendance % = present days / total working days × 100; Overall Score = (productivity + teamwork + punctuality) / 3.