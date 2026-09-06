"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { leaveSchema, type LeaveFormValues } from "@/lib/validations/leave";
import { employees } from "@/lib/data/employees";
import type { LeaveType } from "@/lib/types";

interface LeaveFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitLeave: (values: LeaveFormValues) => void;
}

export function LeaveForm({ open, onOpenChange, onSubmitLeave }: LeaveFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      employeeId: "",
      leaveType: "ANNUAL",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  function handleSave(values: LeaveFormValues) {
    onSubmitLeave(values);
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
          <DialogTitle>New leave request</DialogTitle>
          <DialogDescription>
            Submit a leave request on behalf of an employee.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="leave-employee">Employee</Label>
            <Select
              onValueChange={(value) =>
                setValue("employeeId", value, { shouldValidate: true })
              }
            >
              <SelectTrigger id="leave-employee" aria-label="Employee">
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
            <span className="text-sm font-medium leading-none" id="leave-type-label">
              Leave type
            </span>
            <Select
              defaultValue="ANNUAL"
              onValueChange={(value) =>
                setValue("leaveType", value as LeaveType, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger
                id="leave-type"
                aria-labelledby="leave-type-label"
                aria-label="Leave type"
              >
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ANNUAL">Annual</SelectItem>
                <SelectItem value="SICK">Sick</SelectItem>
                <SelectItem value="CASUAL">Casual</SelectItem>
                <SelectItem value="EMERGENCY">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="leave-start">Start date</Label>
              <Input
                id="leave-start"
                type="date"
                aria-invalid={!!errors.startDate}
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-sm text-destructive">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="leave-end">End date</Label>
              <Input
                id="leave-end"
                type="date"
                aria-invalid={!!errors.endDate}
                aria-describedby={errors.endDate ? "leave-end-error" : undefined}
                {...register("endDate")}
              />
              {errors.endDate && (
                <p id="leave-end-error" className="text-sm text-destructive">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="leave-reason">Reason</Label>
            <Textarea
              id="leave-reason"
              placeholder="Why is this leave needed?"
              aria-invalid={!!errors.reason}
              {...register("reason")}
            />
            {errors.reason && (
              <p className="text-sm text-destructive">{errors.reason.message}</p>
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
              Submit request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}