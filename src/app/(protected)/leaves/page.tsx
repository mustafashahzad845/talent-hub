"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { LeaveTable } from "@/components/leaves/LeaveTable";
import { LeaveForm } from "@/components/leaves/LeaveForm";
import { LeaveCard } from "@/components/leaves/LeaveCard";
import { leaveRequests } from "@/lib/data/leaves";
import { getEmployeeById } from "@/lib/data/employees";
import type { LeaveRequest, LeaveStatus } from "@/lib/types";
import type { LeaveFormValues } from "@/lib/validations/leave";

type Decision = "APPROVED" | "REJECTED";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(leaveRequests);
  const [formOpen, setFormOpen] = useState(false);

  const pending = useMemo(
    () => leaves.filter((l) => l.status === "PENDING"),
    [leaves]
  );

  function handleDecide(leave: LeaveRequest, decision: Decision) {
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === leave.id ? { ...l, status: decision as LeaveStatus } : l
      )
    );
    toast.success(
      decision === "APPROVED" ? "Leave approved" : "Leave rejected",
      {
        description: `${leave.employeeName}'s ${leave.leaveType} leave.`,
      }
    );
  }

  function handleSubmitLeave(values: LeaveFormValues) {
    const employee = getEmployeeById(values.employeeId);
    const next: LeaveRequest = {
      id: `leave-${Date.now()}`,
      employeeId: values.employeeId,
      employeeName: employee?.name ?? "Unknown",
      leaveType: values.leaveType,
      startDate: values.startDate,
      endDate: values.endDate,
      reason: values.reason,
      status: "PENDING",
    };
    setLeaves((prev) => [next, ...prev]);
    toast.success("Leave request submitted", {
      description: `${next.employeeName}'s request is pending approval.`,
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaves"
        subtitle={`${pending.length} pending requests awaiting review.`}
        action={
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New leave
          </Button>
        }
      />

      {pending.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pending.slice(0, 3).map((leave) => (
            <LeaveCard key={leave.id} leave={leave} />
          ))}
        </div>
      )}

      <LeaveTable leaves={leaves} onDecide={handleDecide} />

      <LeaveForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmitLeave={handleSubmitLeave}
      />
    </div>
  );
}