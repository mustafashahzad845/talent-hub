import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProfileTabs } from "@/components/employees/ProfileTabs";
import { getEmployeeById } from "@/lib/data/employees";

interface EmployeeProfilePageProps {
  params: { id: string };
}

export function generateMetadata({
  params,
}: EmployeeProfilePageProps): Metadata {
  const employee = getEmployeeById(params.id);
  return {
    title: employee ? employee.name : "Employee Profile",
  };
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

export default function EmployeeProfilePage({
  params,
}: EmployeeProfilePageProps) {
  const employee = getEmployeeById(params.id);
  if (!employee) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">
              {initials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1
              className="truncate text-2xl font-bold tracking-tight"
              style={{ overflowWrap: "anywhere" }}
            >
              {employee.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {employee.position} · {employee.departmentName} ·{" "}
              {employee.employeeId}
            </p>
          </div>
          <StatusBadge status={employee.status} className="shrink-0" />
        </CardContent>
      </Card>

      <ProfileTabs employee={employee} />
    </div>
  );
}