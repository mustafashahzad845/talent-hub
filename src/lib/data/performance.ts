import type { PerformanceRecord } from "@/lib/types";
import { employees } from "@/lib/data/employees";

function dateDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function buildPerformance(): PerformanceRecord[] {
  const records: PerformanceRecord[] = [];
  const pool = employees.filter((e) => e.status !== "INACTIVE");

  pool.forEach((emp, i) => {
    const productivity = 55 + ((i * 13) % 41);
    const teamwork = 60 + ((i * 11) % 37);
    const punctuality = 50 + ((i * 17) % 47);
    const overallScore = Math.round(
      (productivity + teamwork + punctuality) / 3
    );

    records.push({
      id: `perf-${String(i + 1).padStart(3, "0")}`,
      employeeId: emp.id,
      employeeName: emp.name,
      productivity,
      teamwork,
      punctuality,
      overallScore,
      reviewDate: dateDaysAgo((i * 4) % 60),
    });
  });

  return records;
}

export const performanceRecords: PerformanceRecord[] = buildPerformance();

export function getEmployeePerformance(
  employeeId: string
): PerformanceRecord | undefined {
  return performanceRecords.find((p) => p.employeeId === employeeId);
}

export function getPerformanceScore(employeeId: string): number {
  return getEmployeePerformance(employeeId)?.overallScore ?? 0;
}