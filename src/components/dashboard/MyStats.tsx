import { CalendarCheck2, Star, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAttendanceRate } from "@/lib/data/attendance";
import { getLeaveBalance } from "@/lib/data/leaves";
import { getPerformanceScore } from "@/lib/data/performance";
import type { Employee } from "@/lib/types";

interface MyStatsProps {
  employee: Employee;
}

export function MyStats({ employee }: MyStatsProps) {
  const stats = [
    {
      label: "My Attendance",
      value: `${getAttendanceRate(employee.id)}%`,
      icon: CalendarCheck2,
      accent: "bg-primary/10 text-primary",
    },
    {
      label: "Leave Balance",
      value: `${getLeaveBalance(employee.id)} days`,
      icon: Briefcase,
      accent: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Performance Score",
      value: `${getPerformanceScore(employee.id)}`,
      icon: Star,
      accent: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.accent}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-2xl font-extrabold text-foreground">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}