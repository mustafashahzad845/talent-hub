import type { Skill } from "@/lib/types";
import { employees } from "@/lib/data/employees";

const skillPool: { name: string; level: Skill["level"] }[] = [
  { name: "React", level: "EXPERT" },
  { name: "TypeScript", level: "ADVANCED" },
  { name: "Node.js", level: "ADVANCED" },
  { name: "PostgreSQL", level: "INTERMEDIATE" },
  { name: "UI/UX Design", level: "EXPERT" },
  { name: "Figma", level: "ADVANCED" },
  { name: "Data Analysis", level: "INTERMEDIATE" },
  { name: "Excel", level: "EXPERT" },
  { name: "Marketing Strategy", level: "ADVANCED" },
  { name: "Communication", level: "EXPERT" },
  { name: "Leadership", level: "INTERMEDIATE" },
  { name: "Project Management", level: "ADVANCED" },
  { name: "Recruiting", level: "INTERMEDIATE" },
  { name: "Accounting", level: "ADVANCED" },
  { name: "Content Writing", level: "INTERMEDIATE" },
  { name: "DevOps / CI-CD", level: "INTERMEDIATE" },
  { name: "Graphic Design", level: "ADVANCED" },
  { name: "Customer Support", level: "INTERMEDIATE" },
  { name: "SEO", level: "BEGINNER" },
  { name: "Python", level: "BEGINNER" },
];

function buildSkills(): Skill[] {
  const skills: Skill[] = [];
  let serial = 1;
  employees.forEach((emp, i) => {
    const count = 3 + (i % 3);
    for (let s = 0; s < count; s++) {
      const base = skillPool[(i + s * 5) % skillPool.length];
      skills.push({
        id: `skill-${String(serial).padStart(3, "0")}`,
        employeeId: emp.id,
        name: base.name,
        level: base.level,
      });
      serial++;
    }
  });
  return skills;
}

export const skills: Skill[] = buildSkills();

export function getEmployeeSkills(employeeId: string): Skill[] {
  return skills.filter((s) => s.employeeId === employeeId);
}