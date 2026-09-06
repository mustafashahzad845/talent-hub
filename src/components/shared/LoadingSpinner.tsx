import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({
  text = "Loading…",
  className,
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2 py-8", className)}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className={cn("animate-spin text-primary", sizeClasses[size])}
        aria-hidden="true"
      />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}