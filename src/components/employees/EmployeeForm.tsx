"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  employeeSchema,
  type EmployeeFormValues,
} from "@/lib/validations/employee";
import { departments } from "@/lib/data/departments";
import type { Employee } from "@/lib/types";

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onSave: (values: EmployeeFormValues, employee: Employee | null) => void;
}

export function EmployeeForm({
  open,
  onOpenChange,
  employee,
  onSave,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee
      ? {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          departmentId: employee.departmentId,
          position: employee.position,
          joiningDate: employee.joiningDate,
          status: employee.status,
        }
      : {
          name: "",
          email: "",
          phone: "",
          departmentId: "",
          position: "",
          joiningDate: "",
          status: "ACTIVE",
        },
  });

  function handleSave(values: EmployeeFormValues) {
    onSave(values, employee);
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
          <DialogTitle>{employee ? "Edit employee" : "Add employee"}</DialogTitle>
          <DialogDescription>
            {employee
              ? `Update ${employee.name}'s details.`
              : "Add a new employee to your organisation."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="emp-name">Full name</Label>
            <Input
              id="emp-name"
              placeholder="Jane Cooper"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "emp-name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="emp-name-error" className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="emp-email">Email</Label>
              <Input
                id="emp-email"
                type="email"
                placeholder="jane@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "emp-email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id="emp-email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emp-phone">Phone</Label>
              <Input
                id="emp-phone"
                placeholder="+92 300 000 0000"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="emp-dept">Department</Label>
              <Select
                defaultValue={employee?.departmentId}
                onValueChange={(value) =>
                  setValue("departmentId", value, { shouldValidate: true })
                }
              >
                <SelectTrigger id="emp-dept" aria-label="Department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.departmentId && (
                <p className="text-sm text-destructive">
                  {errors.departmentId.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emp-position">Position</Label>
              <Input
                id="emp-position"
                placeholder="Software Engineer"
                aria-invalid={!!errors.position}
                {...register("position")}
              />
              {errors.position && (
                <p className="text-sm text-destructive">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="emp-joining">Joining date</Label>
              <Input
                id="emp-joining"
                type="date"
                aria-invalid={!!errors.joiningDate}
                {...register("joiningDate")}
              />
              {errors.joiningDate && (
                <p className="text-sm text-destructive">
                  {errors.joiningDate.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emp-status">Status</Label>
              <Select
                defaultValue={employee?.status ?? "ACTIVE"}
                onValueChange={(value) =>
                  setValue("status", value as EmployeeFormValues["status"], {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger id="emp-status" aria-label="Status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              {employee ? "Save changes" : "Add employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}