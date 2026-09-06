import type { Goal } from "@/lib/types";
import { employees } from "@/lib/data/employees";

function datePlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const goalTemplates = [
  { title: "Ship Q3 product roadmap", description: "Deliver the scheduled feature releases before the quarter closes." },
  { title: "Improve onboarding flow", description: "Reduce time-to-first-value for new hires from 14 to 7 days." },
  { title: "Launch referral program", description: "Roll out an employee referral program across all departments." },
  { title: "Cut cloud infrastructure spend", description: "Optimize infrastructure usage to reduce monthly cost by 15%." },
  { title: "Complete compliance training", description: "Ensure 100% of staff complete mandatory compliance modules." },
  { title: "Rebrand marketing collateral", description: "Refresh all public materials to match the new design system." },
  { title: "Automate payroll reporting", description: "Remove manual effort from monthly payroll by automating reports." },
  { title: "Improve support SLA", description: "Reach 95% support tickets resolved within 24 hours." },
];

function buildGoals(): Goal[] {
  const goals: Goal[] = [];
  const pool = employees.filter((e) => e.status !== "INACTIVE");

  goalTemplates.forEach((template, i) => {
    const emp = pool[(i * 11) % pool.length];
    const statusRoll = (i * 3) % 6;
    const status: Goal["status"] =
      statusRoll < 1 ? "PENDING" : statusRoll < 4 ? "IN_PROGRESS" : "COMPLETED";

    goals.push({
      id: `goal-${String(i + 1).padStart(3, "0")}`,
      employeeId: emp.id,
      employeeName: emp.name,
      title: template.title,
      description: template.description,
      status,
      targetDate: datePlus(20 + i * 15),
      progress: status === "COMPLETED" ? 100 : status === "IN_PROGRESS" ? 30 + i * 12 : 0,
    });
  });

  return goals;
}

export const goals: Goal[] = buildGoals();

export function getEmployeeGoals(employeeId: string): Goal[] {
  return goals.filter((g) => g.employeeId === employeeId);
}