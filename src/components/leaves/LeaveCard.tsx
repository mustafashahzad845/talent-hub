import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { LeaveRequest } from "@/lib/types";

interface LeaveCardProps {
  leave: LeaveRequest;
}

export function LeaveCard({ leave }: LeaveCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold">{leave.employeeName}</p>
          <StatusBadge status={leave.status} />
        </div>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary">
          {leave.leaveType} leave
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
          {leave.startDate} → {leave.endDate}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{leave.reason}</p>
      </CardContent>
    </Card>
  );
}