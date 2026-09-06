import Link from "next/link";
import { CalendarDays, UserRound } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Progress } from "@/components/ui/progress";
import type { Goal } from "@/lib/types";

interface GoalTrackerProps {
  goals: Goal[];
}

export function GoalTracker({ goals }: GoalTrackerProps) {
  if (goals.length === 0) {
    return (
      <EmptyState
        title="No goals yet"
        description="Create a goal to start tracking team progress."
      />
    );
  }

  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="rounded-lg border p-5 transition-colors hover:bg-muted/40"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">{goal.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {goal.description}
              </p>
            </div>
            <StatusBadge status={goal.status} className="shrink-0" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                <Link
                  href={`/employees/${goal.employeeId}`}
                  className="font-medium text-foreground hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {goal.employeeName}
                </Link>
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                Target: {goal.targetDate}
              </span>
            </div>
            <Progress value={goal.progress} className="h-2" />
            <p className="text-right text-xs font-medium text-muted-foreground">
              {goal.progress}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}