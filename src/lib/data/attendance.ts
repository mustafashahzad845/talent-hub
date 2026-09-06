import type { AttendanceRecord } from "@/lib/types";
import { employees } from "@/lib/data/employees";

const today = new Date();

function dateOf(daysAgo: number): string {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function buildAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  let present = 0;
  let late = 0;
  let absent = 0;

  employees.forEach((emp, i) => {
    const roll = (i * 7) % 11;
    let status: AttendanceRecord["status"] = "PRESENT";
    let checkIn: string | null = "09:00";
    let checkOut: string | null = "18:00";

    if (roll === 3 || roll === 9) {
      status = "LATE";
      checkIn = "09:45";
    } else if (roll === 5 || roll === 8 || roll === 10) {
      status = "ABSENT";
      checkIn = null;
      checkOut = null;
    }

    if (status === "PRESENT") present++;
    else if (status === "LATE") late++;
    else absent++;

    records.push({
      id: `att-${String(i + 1).padStart(3, "0")}`,
      employeeId: emp.id,
      employeeName: emp.name,
      date: dateOf((i * 3) % 7),
      checkIn,
      checkOut,
      status,
    });
  });

  return records;
}

export const attendanceRecords: AttendanceRecord[] = buildAttendance();

export const attendanceSummary = {
  present: attendanceRecords.filter((r) => r.status === "PRESENT").length,
  late: attendanceRecords.filter((r) => r.status === "LATE").length,
  absent: attendanceRecords.filter((r) => r.status === "ABSENT").length,
  total: attendanceRecords.length,
};

export function getEmployeeAttendance(employeeId: string): AttendanceRecord[] {
  return attendanceRecords.filter((r) => r.employeeId === employeeId);
}

export function getAttendanceRate(employeeId: string): number {
  const records = getEmployeeAttendance(employeeId);
  if (records.length === 0) return 0;
  const present = records.filter(
    (r) => r.status === "PRESENT" || r.status === "LATE"
  ).length;
  return Math.round((present / records.length) * 100);
}