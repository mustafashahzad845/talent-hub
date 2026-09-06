import { CalendarCheck2, CalendarClock, Building2, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { totalEmployees } from "@/lib/data/employees";
import { attendanceSummary } from "@/lib/data/attendance";
import { pendingLeaveCount, onLeaveToday } from "@/lib/data/leaves";
import { departments } from "@/lib/data/departments";

interface StatItem {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

const stats: StatItem[] = [
  {
    label: "Total Employees",
    value: totalEmployees,
    icon: Users,
    accent: "bg-primary/10 text-primary",
  },
  {
    label: "Present Today",
    value: attendanceSummary.present,
    icon: CalendarCheck2,
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "On Leave",
    value: onLeaveToday,
    icon: CalendarClock,
    accent: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "Late Today",
    value: attendanceSummary.late,
    icon: Clock,
    accent: "bg-orange-500/10 text-orange-600",
  },
  {
    label: "Pending Leaves",
    value: pendingLeaveCount,
    icon: CalendarCheck2,
    accent: "bg-sky-500/10 text-sky-600",
  },
  {
    label: "Departments",
    value: departments.length,
    icon: Building2,
    accent: "bg-violet-500/10 text-violet-600",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.accent}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}