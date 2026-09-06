"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/PageHeader";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { AttendanceChart } from "@/components/attendance/AttendanceChart";
import { attendanceRecords } from "@/lib/data/attendance";
import type { AttendanceRecord } from "@/lib/types";

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>(attendanceRecords);

  function handleReject(record: AttendanceRecord) {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === record.id
          ? { ...r, status: "ABSENT" as const, checkIn: null, checkOut: null }
          : r
      )
    );
    toast.success("Attendance rejected", {
      description: `${record.employeeName} was marked as absent.`,
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        subtitle="Review and manage today's check-ins, check-outs, and statuses."
      />
      <AttendanceChart />
      <AttendanceTable records={records} onReject={handleReject} />
    </div>
  );
}