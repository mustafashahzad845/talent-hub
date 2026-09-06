import type { Employee, Role } from "@/lib/types";
import { getEmployeeById } from "@/lib/data/employees";

const STORAGE_KEY = "talenthub.mock.role";

export function getStoredRole(): Role {
  if (typeof window === "undefined") return "HR";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "HR" || stored === "ADMIN" || stored === "EMPLOYEE") {
    return stored;
  }
  return "HR";
}

export function storeRole(role: Role): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, role);
}

export function getRoleDashboardTarget(role: Role): string {
  if (role === "HR" || role === "ADMIN") return "/dashboard";
  if (role === "EMPLOYEE") return "/my-dashboard";
  return "/login";
}

export function loginAs(role: Role): string {
  storeRole(role);
  return getRoleDashboardTarget(role);
}

export function getCurrentEmployee(role: Role): Employee {
  const hrFace = "emp-002";
  const employeeFace = "emp-001";
  return (
    getEmployeeById(role === "EMPLOYEE" ? employeeFace : hrFace) ??
    getEmployeeById(hrFace)!
  );
}