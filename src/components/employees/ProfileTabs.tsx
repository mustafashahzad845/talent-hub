"use client";

import {
  BarChart3,
  Briefcase,
  CalendarDays,
  GraduationCap,
  History,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { EmployeeStats } from "@/components/employees/EmployeeStats";
import { getEmployeeAttendance, getAttendanceRate } from "@/lib/data/attendance";
import { getEmployeeLeaves } from "@/lib/data/leaves";
import { getEmployeePerformance } from "@/lib/data/performance";
import { getEmployeeGoals } from "@/lib/data/goals";
import { getEmployeeSkills } from "@/lib/data/skills";
import { getEmployeeEmploymentHistory } from "@/lib/data/employment";
import { getDepartmentName } from "@/lib/data/departments";
import type { Employee } from "@/lib/types";

function detailRow(icon: React.ComponentType<{ className?: string }>, label: string, value: string) {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

interface ProfileTabsProps {
  employee: Employee;
}

export function ProfileTabs({ employee }: ProfileTabsProps) {
  const attendance = getEmployeeAttendance(employee.id);
  const leaves = getEmployeeLeaves(employee.id);
  const performance = getEmployeePerformance(employee.id);
  const goals = getEmployeeGoals(employee.id);
  const employeeSkills = getEmployeeSkills(employee.id);
  const history = getEmployeeEmploymentHistory(employee.id);

  const levelVariant: Record<string, "muted" | "info" | "warning" | "destructive"> = {
    BEGINNER: "muted",
    INTERMEDIATE: "info",
    ADVANCED: "warning",
    EXPERT: "destructive",
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="leaves">Leaves</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="history">Employment History</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <EmployeeStats employeeId={employee.id} />
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {detailRow(UserRound, "Full name", employee.name)}
          {detailRow(Briefcase, "Position", employee.position)}
          {detailRow(
            GraduationCap,
            "Department",
            getDepartmentName(employee.departmentId)
          )}
          {detailRow(Mail, "Email", employee.email)}
          {detailRow(Phone, "Phone", employee.phone || "—")}
          {detailRow(CalendarDays, "Joining date", employee.joiningDate)}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Status</span>
          <StatusBadge status={employee.status} />
        </div>
      </TabsContent>

      <TabsContent value="attendance" className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Attendance rate:{" "}
          <span className="font-semibold text-foreground">
            {getAttendanceRate(employee.id)}%
          </span>
        </p>
        {attendance.length === 0 ? (
          <EmptyState
            title="No attendance records"
            description="Attendance for this employee will appear here."
          />
        ) : (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.checkIn ?? "—"}</TableCell>
                    <TableCell>{record.checkOut ?? "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={record.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </TabsContent>

      <TabsContent value="leaves" className="space-y-4">
        {leaves.length === 0 ? (
          <EmptyState
            title="No leave requests"
            description="Leave requests from this employee will appear here."
          />
        ) : (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>
                      <Badge variant="outline">{leave.leaveType}</Badge>
                    </TableCell>
                    <TableCell>{leave.startDate}</TableCell>
                    <TableCell>{leave.endDate}</TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>
                      <StatusBadge status={leave.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        {!performance ? (
          <EmptyState
            title="No performance review"
            description="A performance review for this employee will appear here."
          />
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Productivity", value: performance.productivity },
                { label: "Teamwork", value: performance.teamwork },
                { label: "Punctuality", value: performance.punctuality },
                { label: "Overall", value: performance.overallScore },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border p-4 text-center"
                >
                  <p className="text-2xl font-extrabold text-primary">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Reviewed on{" "}
              <span className="font-medium text-foreground">
                {performance.reviewDate}
              </span>
            </p>
          </div>
        )}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-foreground">Goals</h3>
          {goals.length === 0 ? (
            <EmptyState
              title="No goals assigned"
              description="Goals for this employee will appear here."
            />
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between gap-3 rounded-lg border p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{goal.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Target: {goal.targetDate}
                  </p>
                </div>
                <StatusBadge status={goal.status} />
              </div>
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        {employeeSkills.length === 0 ? (
          <EmptyState
            title="No skills recorded"
            description="Skills for this employee will appear here."
          />
        ) : (
          <div className="space-y-3">
            {employeeSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <p className="text-sm font-semibold">{skill.name}</p>
                <Badge variant={levelVariant[skill.level] ?? "muted"}>
                  {skill.level}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        {history.length === 0 ? (
          <EmptyState
            title="No employment history"
            description="Previous roles will appear here."
          />
        ) : (
          <div className="space-y-5">
            {history.map((item) => (
              <div key={item.id} className="flex gap-4">
                <span
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted"
                  aria-hidden="true"
                >
                  <History className="h-4 w-4 text-muted-foreground" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{item.company}</p>
                  <p className="text-sm text-muted-foreground">{item.position}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.startDate} → {item.endDate ?? "Present"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <Separator className="mt-6" />
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
        Data refreshed from mock records
      </p>
    </Tabs>
  );
}