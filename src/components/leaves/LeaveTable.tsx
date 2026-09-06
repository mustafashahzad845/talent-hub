"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import type { LeaveRequest } from "@/lib/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

type Decision = "APPROVED" | "REJECTED";

interface LeaveTableProps {
  leaves: LeaveRequest[];
  onDecide: (leave: LeaveRequest, decision: Decision) => void;
}

export function LeaveTable({ leaves, onDecide }: LeaveTableProps) {
  const [pendingDecision, setPendingDecision] = useState<{
    leave: LeaveRequest;
    decision: Decision;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleConfirm() {
    if (!pendingDecision) return;
    setSubmitting(true);
    setTimeout(() => {
      onDecide(pendingDecision.leave, pendingDecision.decision);
      setPendingDecision(null);
      setSubmitting(false);
    }, 400);
  }

  const confirmIsApprove = pendingDecision?.decision === "APPROVED";

  return (
    <>
      {leaves.length === 0 ? (
        <EmptyState
          title="No leave requests"
          description="Leave requests will appear here once submitted."
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-muted text-xs font-semibold">
                          {initials(leave.employeeName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate text-sm font-semibold">
                        {leave.employeeName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {leave.leaveType}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {leave.startDate}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {leave.endDate}
                  </TableCell>
                  <TableCell className="max-w-[12rem]">
                    <span className="line-clamp-2 text-sm">{leave.reason}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={leave.status} />
                  </TableCell>
                  <TableCell>
                    {leave.status === "PENDING" ? (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                          onClick={() =>
                            setPendingDecision({ leave, decision: "APPROVED" })
                          }
                        >
                          <CheckCircle2 className="mr-1 h-4 w-4" aria-hidden="true" />
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() =>
                            setPendingDecision({ leave, decision: "REJECTED" })
                          }
                        >
                          <XCircle className="mr-1 h-4 w-4" aria-hidden="true" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {leave.status === "APPROVED" ? "Approved" : "Rejected"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDecision}
        onOpenChange={(open) => {
          if (!open) setPendingDecision(null);
        }}
        title={confirmIsApprove ? "Approve leave" : "Reject leave"}
        description={
          pendingDecision
            ? `${confirmIsApprove ? "Approve" : "Reject"} ${pendingDecision.leave.employeeName}'s ${pendingDecision.leave.leaveType} leave (${pendingDecision.leave.startDate} → ${pendingDecision.leave.endDate})?`
            : undefined
        }
        confirmLabel={confirmIsApprove ? "Approve" : "Reject"}
        destructive={!confirmIsApprove}
        loading={submitting}
        onConfirm={handleConfirm}
      />
    </>
  );
}