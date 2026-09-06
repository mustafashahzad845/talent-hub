import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { PerformanceRecord } from "@/lib/types";

interface PerformanceCardProps {
  record: PerformanceRecord;
}

export function PerformanceCard({ record }: PerformanceCardProps) {
  const metrics = [
    { label: "Productivity", value: record.productivity },
    { label: "Teamwork", value: record.teamwork },
    { label: "Punctuality", value: record.punctuality },
  ];

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="truncate text-base">
            {record.employeeName}
          </CardTitle>
          <Badge
            variant={
              record.overallScore >= 80
                ? "success"
                : record.overallScore >= 60
                  ? "warning"
                  : "muted"
            }
            className="shrink-0"
          >
            {record.overallScore >= 80
              ? "Excellent"
              : record.overallScore >= 60
                ? "Good"
                : "Needs focus"}
          </Badge>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-extrabold text-primary">
            {record.overallScore}
          </p>
          <p className="pb-1 text-sm text-muted-foreground">overall</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-semibold">{metric.value}</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
        <p className="pt-1 text-xs text-muted-foreground">
          Reviewed {record.reviewDate}
        </p>
      </CardContent>
    </Card>
  );
}