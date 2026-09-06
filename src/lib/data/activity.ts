import type { ActivityItem } from "@/lib/types";
import { employees } from "@/lib/data/employees";

function timeAgo(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

const activities: ActivityItem[] = [
  {
    id: "act-001",
    actorName: "Sara Ahmed",
    verb: "approved leave",
    target: "Ali Khan · Annual leave",
    timestamp: timeAgo(2),
  },
  {
    id: "act-002",
    actorName: "Ahmed Raza",
    verb: "joined Talent Hub",
    target: "UI/UX Designer · Marketing",
    timestamp: timeAgo(5),
  },
  {
    id: "act-003",
    actorName: "Usman Malik",
    verb: "submitted a leave request",
    target: "Sick leave · 2 days",
    timestamp: timeAgo(8),
  },
  {
    id: "act-004",
    actorName: "HR Team",
    verb: "published a new policy",
    target: "Work-from-home guidelines",
    timestamp: timeAgo(26),
  },
  {
    id: "act-005",
    actorName: "Ali Khan",
    verb: "completed a goal",
    target: "Ship Q3 product roadmap",
    timestamp: timeAgo(30),
  },
  {
    id: "act-006",
    actorName: "Sara Ahmed",
    verb: "updated profile",
    target: "Role change · HR Executive",
    timestamp: timeAgo(49),
  },
  {
    id: "act-007",
    actorName: "Nasir Khan",
    verb: "marked attendance",
    target: "Late check-in · 09:42",
    timestamp: timeAgo(55),
  },
  {
    id: "act-008",
    actorName: "Finance Team",
    verb: "generated a report",
    target: "Monthly payroll summary",
    timestamp: timeAgo(72),
  },
];

export const activityFeed: ActivityItem[] = activities;

export function getEmployeeActivity(employeeName: string): ActivityItem[] {
  return activities.filter((a) => a.actorName === employeeName);
}