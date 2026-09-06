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

  employees.forEach((emp, i) => {
    let status: AttendanceRecord["status"];
    let checkIn: string | null;
    let checkOut: string | null;

    if (i < 112) {
      status = "PRESENT";
      checkIn = "09:00";
      checkOut = "18:00";
    } else if (i < 120) {
      status = "LATE";
      checkIn = "09:45";
      checkOut = "18:10";
    } else {
      status = "ABSENT";
      checkIn = null;
      checkOut = null;
    }

    records.push({
      id: `att-${String(i + 1).padStart(3, "0")}`,
      employeeId: emp.id,
      employeeName: emp.name,
      date: dateOf(i % 7),
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

export const weeklyAttendanceTrend = [
  { day: "Mon", present: 108, late: 9, absent: 11 },
  { day: "Tue", present: 115, late: 6, absent: 7 },
  { day: "Wed", present: 112, late: 8, absent: 8 },
  { day: "Thu", present: 110, late: 10, absent: 8 },
  { day: "Fri", present: 117, late: 5, absent: 6 },
  { day: "Sat", present: 104, late: 12, absent: 12 },
  { day: "Sun", present: 112, late: 8, absent: 8 },
];

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