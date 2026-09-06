"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { leaveRequests } from "@/lib/data/leaves";

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function monthFromOffset(offset: number): { year: number; month: number } {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateKey(dateStr: string): string {
  return dateStr.slice(0, 10);
}

export function CalendarCard() {
  const [offset, setOffset] = useState(0);
  const activeLeaves = leaveRequests.filter((l) => l.status === "APPROVED");

  const { year, month } = monthFromOffset(offset);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function leaveCountFor(day: number): number {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return activeLeaves.filter((l) => {
      const start = toDateKey(l.startDate);
      const end = toDateKey(l.endDate);
      return key >= start && key <= end;
    }).length;
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          {monthNames[month]} {year}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setOffset((o) => o - 1)}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setOffset((o) => o + 1)}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdayLabels.map((label) => (
            <span
              key={label}
              className="py-1 text-xs font-semibold text-muted-foreground"
            >
              {label}
            </span>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <span key={`empty-${i}`} aria-hidden="true" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const count = leaveCountFor(day);
            const isToday =
              offset === 0 &&
              day === new Date().getDate();
            return (
              <div
                key={day}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-md text-sm",
                  isToday
                    ? "bg-primary font-bold text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {day}
                {count > 0 && (
                  <span
                    className="absolute bottom-0.5 flex h-1.5 w-1.5 rounded-full bg-primary"
                    aria-label={`${count} approved leave${count === 1 ? "" : "s"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Approved leave day
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded bg-primary" aria-hidden="true" />
            Today
          </span>
        </div>
      </CardContent>
    </Card>
  );
}