import { CalendarCheck2, Briefcase, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAttendanceRate } from "@/lib/data/attendance";
import { getEmployeeLeaves } from "@/lib/data/leaves";
import { getPerformanceScore } from "@/lib/data/performance";

interface EmployeeStatsProps {
  employeeId: string;
}

export function EmployeeStats({ employeeId }: EmployeeStatsProps) {
  const stats = [
    {
      label: "Attendance",
      value: `${getAttendanceRate(employeeId)}%`,
      icon: CalendarCheck2,
      accent: "bg-primary/10 text-primary",
    },
    {
      label: "Leaves Taken",
      value: getEmployeeLeaves(employeeId).length,
      icon: Briefcase,
      accent: "bg-amber-500/10 text-amber-600",
    },
    {
      label: "Performance",
      value: getPerformanceScore(employeeId),
      icon: Star,
      accent: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.accent}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xl font-extrabold text-foreground">
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