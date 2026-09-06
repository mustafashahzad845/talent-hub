"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { attendanceSummary } from "@/lib/data/attendance";

const data = [
  { name: "Present", value: attendanceSummary.present, fill: "#22C55E" },
  { name: "Late", value: attendanceSummary.late, fill: "#F59E0B" },
  { name: "Absent", value: attendanceSummary.absent, fill: "#DC2626" },
];

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Today&apos;s Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#475569" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E8F0" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#475569" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(37,99,235,0.06)" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E2E8F0",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={64} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}