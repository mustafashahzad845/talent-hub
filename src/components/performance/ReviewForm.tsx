"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  reviewSchema,
  type ReviewFormValues,
} from "@/lib/validations/performance";
import { employees } from "@/lib/data/employees";

interface ReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitReview: (values: ReviewFormValues) => void;
}

function ScoreField({
  label,
  value,
  onChange,
  error,
  id,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  id: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={100}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          /100
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function ReviewForm({ open, onOpenChange, onSubmitReview }: ReviewFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      employeeId: "",
      productivity: undefined as unknown as number,
      teamwork: undefined as unknown as number,
      punctuality: undefined as unknown as number,
    },
  });

  const productivity = watch("productivity");
  const teamwork = watch("teamwork");
  const punctuality = watch("punctuality");

  function handleSave(values: ReviewFormValues) {
    onSubmitReview(values);
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" aria-hidden="true" />
            Add performance review
          </DialogTitle>
          <DialogDescription>
            Rate the employee 0–100 across productivity, teamwork, and
            punctuality.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="review-employee">Employee</Label>
            <Select
              onValueChange={(value) =>
                setValue("employeeId", value, { shouldValidate: true })
              }
            >
              <SelectTrigger id="review-employee" aria-label="Employee">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees
                  .filter((e) => e.status !== "INACTIVE")
                  .slice(0, 60)
                  .map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.employeeId && (
              <p className="text-sm text-destructive">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ScoreField
              id="review-productivity"
              label="Productivity"
              value={productivity}
              onChange={(v) =>
                setValue("productivity", v, { shouldValidate: true })
              }
              error={errors.productivity?.message}
            />
            <ScoreField
              id="review-teamwork"
              label="Teamwork"
              value={teamwork}
              onChange={(v) =>
                setValue("teamwork", v, { shouldValidate: true })
              }
              error={errors.teamwork?.message}
            />
            <ScoreField
              id="review-punctuality"
              label="Punctuality"
              value={punctuality}
              onChange={(v) =>
                setValue("punctuality", v, { shouldValidate: true })
              }
              error={errors.punctuality?.message}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Save review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}