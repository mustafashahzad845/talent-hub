"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import type { AttendanceRecord } from "@/lib/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onReject: (record: AttendanceRecord) => void;
}

export function AttendanceTable({ records, onReject }: AttendanceTableProps) {
  const [rejecting, setRejecting] = useState<AttendanceRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleConfirmReject() {
    if (!rejecting) return;
    setSubmitting(true);
    setTimeout(() => {
      onReject(rejecting);
      setRejecting(null);
      setSubmitting(false);
    }, 400);
  }

  return (
    <>
      {records.length === 0 ? (
        <EmptyState
          title="No attendance records"
          description="Attendance for today will appear here."
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow
                  key={record.id}
                  className={record.status === "ABSENT" ? "bg-destructive/5" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-muted text-xs font-semibold">
                          {initials(record.employeeName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate text-sm font-semibold">
                        {record.employeeName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {record.date}
                  </TableCell>
                  <TableCell>{record.checkIn ?? "—"}</TableCell>
                  <TableCell>{record.checkOut ?? "—"}</TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>
                  <TableCell>
                    {record.status !== "ABSENT" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setRejecting(record)}
                      >
                        <XCircle className="mr-1.5 h-4 w-4" aria-hidden="true" />
                        Reject
                      </Button>
                    ) : (
                      <Badge variant="outline" className="font-normal">
                        Marked absent
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={!!rejecting}
        onOpenChange={(open) => {
          if (!open) setRejecting(null);
        }}
        title="Reject attendance"
        description={
          rejecting
            ? `Reject attendance for ${rejecting.employeeName}? The status will change to Absent.`
            : undefined
        }
        confirmLabel="Reject"
        destructive
        loading={submitting}
        onConfirm={handleConfirmReject}
      />
    </>
  );
}