import type { EmploymentHistoryItem } from "@/lib/types";
import { employees } from "@/lib/data/employees";

const companies = [
  { company: "TechNova Solutions", position: "Junior Developer" },
  { company: "CloudPeak Systems", position: "Software Engineer" },
  { company: "BrightWorks Agency", position: "UX Designer" },
  { company: "GlobalSoft Ltd", position: "Product Analyst" },
  { company: "PrimeConsult Group", position: "Consultant" },
  { company: "UrbanIQ", position: "Marketing Associate" },
];

function buildEmploymentHistory(): EmploymentHistoryItem[] {
  const items: EmploymentHistoryItem[] = [];
  let serial = 1;

  employees.forEach((emp, i) => {
    if (i === 0) return;
    const history = companies[i % companies.length];
    items.push({
      id: `emp-hist-${String(serial).padStart(3, "0")}`,
      employeeId: emp.id,
      company: history.company,
      position: history.position,
      startDate: `20${
        i % 6
      }-${String((i % 12) + 1).padStart(2, "0")}-01`,
      endDate: `20${(i % 6) + 3}-${String((i % 12) + 1).padStart(2, "0")}-30`,
    });
    serial++;
  });

  return items;
}

export const employmentHistory: EmploymentHistoryItem[] =
  buildEmploymentHistory();

export function getEmployeeEmploymentHistory(
  employeeId: string
): EmploymentHistoryItem[] {
  return employmentHistory.filter((h) => h.employeeId === employeeId);
}