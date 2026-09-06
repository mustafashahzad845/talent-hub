import { Badge, type BadgeProps } from "@/components/ui/badge";

type StatusValue = string;

const statusVariant: Record<string, BadgeProps["variant"]> = {
  ACTIVE: "success",
  ON_LEAVE: "warning",
  INACTIVE: "muted",
  PRESENT: "success",
  LATE: "warning",
  ABSENT: "destructive",
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "destructive",
  IN_PROGRESS: "info",
  COMPLETED: "success",
  BEGINNER: "muted",
  INTERMEDIATE: "info",
  ADVANCED: "warning",
  EXPERT: "destructive",
};

function formatLabel(value: StatusValue): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface StatusBadgeProps {
  status: StatusValue;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariant[status] ?? "muted";
  return (
    <Badge variant={variant} className={className}>
      {formatLabel(status)}
    </Badge>
  );
}