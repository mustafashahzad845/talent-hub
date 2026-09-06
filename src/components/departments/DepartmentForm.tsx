"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  departmentSchema,
  type DepartmentFormValues,
} from "@/lib/validations/department";
import type { Department } from "@/lib/types";

interface DepartmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
  onSubmitDepartment: (values: DepartmentFormValues) => void;
}

export function DepartmentForm({
  open,
  onOpenChange,
  department,
  onSubmitDepartment,
}: DepartmentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: department?.name ?? "" },
  });

  function handleSave(values: DepartmentFormValues) {
    onSubmitDepartment(values);
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
            {department ? "Edit department" : "Add department"}
          </DialogTitle>
          <DialogDescription>
            {department
              ? `Rename ${department.name}.`
              : "Create a new department."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="dept-name">Department name</Label>
            <Input
              id="dept-name"
              placeholder="e.g. Customer Success"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "dept-name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="dept-name-error" className="text-sm text-destructive">
                {errors.name.message}
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
              {department ? "Save changes" : "Add department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}