import Link from "next/link";
import { ChevronRight, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { employees } from "@/lib/data/employees";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

export function RecentEmployees() {
  const recent = [...employees]
    .sort((a, b) => b.joiningDate.localeCompare(a.joiningDate))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base">Recently Joined</CardTitle>
        <Link
          href="/employees"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View all
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {recent.map((emp) => (
          <Link
            key={emp.id}
            href={`/employees/${emp.id}`}
            className="flex items-center gap-3 rounded-md p-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-muted text-xs font-semibold">
                {initials(emp.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{emp.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {emp.position} · {emp.departmentName}
              </p>
            </div>
            <StatusBadge status={emp.status} className="shrink-0" />
          </Link>
        ))}
        {recent.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <UserPlus className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">No recent hires.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}