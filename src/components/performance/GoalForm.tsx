"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { goalSchema, type GoalFormValues } from "@/lib/validations/performance";
import { employees } from "@/lib/data/employees";

interface GoalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitGoal: (values: GoalFormValues) => void;
}

export function GoalForm({ open, onOpenChange, onSubmitGoal }: GoalFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      employeeId: "",
      title: "",
      description: "",
      targetDate: "",
    },
  });

  function handleSave(values: GoalFormValues) {
    onSubmitGoal(values);
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
            <Target className="h-5 w-5 text-primary" aria-hidden="true" />
            Add goal
          </DialogTitle>
          <DialogDescription>
            Assign a new goal with a target date.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="goal-assignee">Assigned employee</Label>
            <Select
              onValueChange={(value) =>
                setValue("employeeId", value, { shouldValidate: true })
              }
            >
              <SelectTrigger id="goal-assignee" aria-label="Assigned employee">
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

          <div className="space-y-1.5">
            <Label htmlFor="goal-title">Title</Label>
            <Input
              id="goal-title"
              placeholder="e.g. Ship Q3 roadmap"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="goal-description">Description</Label>
            <Textarea
              id="goal-description"
              placeholder="What does success look like?"
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="goal-target">Target date</Label>
            <Input
              id="goal-target"
              type="date"
              aria-invalid={!!errors.targetDate}
              {...register("targetDate")}
            />
            {errors.targetDate && (
              <p className="text-sm text-destructive">
                {errors.targetDate.message}
              </p>
            )}
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
              Create goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}