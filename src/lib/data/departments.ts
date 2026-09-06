import type { Department } from "@/lib/types";

export const departments: Department[] = [
  { id: "dept-it", name: "IT", employeeCount: 32 },
  { id: "dept-hr", name: "HR", employeeCount: 18 },
  { id: "dept-marketing", name: "Marketing", employeeCount: 22 },
  { id: "dept-finance", name: "Finance", employeeCount: 17 },
  { id: "dept-sales", name: "Sales", employeeCount: 24 },
  { id: "dept-ops", name: "Operations", employeeCount: 15 },
];

export function getDepartmentName(id: string): string {
  return departments.find((d) => d.id === id)?.name ?? "Unknown";
}