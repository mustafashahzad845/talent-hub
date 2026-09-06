import type { LeaveRequest } from "@/lib/types";
import { employees } from "@/lib/data/employees";
import { attendanceSummary } from "@/lib/data/attendance";

function datePlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const leaveTypes: LeaveRequest["leaveType"][] = [
  "ANNUAL",
  "SICK",
  "CASUAL",
  "EMERGENCY",
];

function buildLeaves(): LeaveRequest[] {
  const requests: LeaveRequest[] = [];
  const pool = employees.filter((e) => e.status !== "INACTIVE");
  const count = Math.min(24, pool.length);

  for (let i = 0; i < count; i++) {
    const emp = pool[i];
    const statusRoll = (i * 5) % 10;
    const status: LeaveRequest["status"] =
      statusRoll < 5 ? "PENDING" : statusRoll < 8 ? "APPROVED" : "REJECTED";

    requests.push({
      id: `leave-${String(i + 1).padStart(3, "0")}`,
      employeeId: emp.id,
      employeeName: emp.name,
      leaveType: leaveTypes[i % leaveTypes.length],
      startDate: datePlus((i % 14) + 1),
      endDate: datePlus((i % 14) + 2 + (i % 3)),
      reason:
        i % 2 === 0
          ? "Family event"
          : i % 3 === 0
            ? "Medical appointment"
            : "Personal leave",
      status,
    });
  }

  return requests;
}

export const leaveRequests: LeaveRequest[] = buildLeaves();

export const pendingLeaveCount = leaveRequests.filter(
  (l) => l.status === "PENDING"
).length;

export const onLeaveCount = attendanceSummary.absent;

export function getEmployeeLeaves(employeeId: string): LeaveRequest[] {
  return leaveRequests.filter((l) => l.employeeId === employeeId);
}

export function getLeaveBalance(employeeId: string): number {
  const approved = getEmployeeLeaves(employeeId).filter(
    (l) => l.status === "APPROVED"
  ).length;
  return Math.max(10 - approved, 0);
}