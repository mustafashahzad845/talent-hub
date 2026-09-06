"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { employees as initialEmployees, totalEmployees } from "@/lib/data/employees";
import { departments } from "@/lib/data/departments";
import type { Employee } from "@/lib/types";
import type { EmployeeFormValues } from "@/lib/validations/employee";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [deleting, setDeleting] = useState<Employee | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  function handleSave(values: EmployeeFormValues, target: Employee | null) {
    const department = departments.find((d) => d.id === values.departmentId);

    if (target) {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === target.id
            ? {
                ...e,
                ...values,
                departmentName: department?.name ?? target.departmentName,
                phone: values.phone ?? "",
              }
            : e
        )
      );
      toast.success("Employee updated", {
        description: `${values.name}'s details were saved.`,
      });
    } else {
      const nextId = `emp-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      const nextEmployee: Employee = {
        id: nextId,
        employeeId: `EMP-${String(totalEmployees + employees.length + 1).padStart(3, "0")}`,
        name: values.name,
        email: values.email,
        phone: values.phone ?? "",
        departmentId: values.departmentId,
        departmentName: department?.name ?? "Unknown",
        position: values.position,
        joiningDate: values.joiningDate,
        status: values.status,
      };
      setEmployees((prev) => [nextEmployee, ...prev]);
      toast.success("Employee added", {
        description: `${values.name} was added to your team.`,
      });
    }
  }

  function handleDelete() {
    if (!deleting) return;
    setDeleteSubmitting(true);
    setTimeout(() => {
      setEmployees((prev) => prev.filter((e) => e.id !== deleting.id));
      toast.success("Employee deleted", {
        description: `${deleting.name} was removed.`,
      });
      setDeleting(null);
      setDeleteSubmitting(false);
    }, 500);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        subtitle={`Manage your workforce — ${employees.length} employees.`}
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add employee
          </Button>
        }
      />

      <EmployeeTable
        employees={employees}
        onEdit={(emp) => {
          setEditing(emp);
          setFormOpen(true);
        }}
        onDelete={(emp) => setDeleting(emp)}
      />

      <EmployeeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        employee={editing}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
        title="Delete employee"
        description={
          deleting
            ? `Are you sure you want to delete ${deleting.name}? This action cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        loading={deleteSubmitting}
        onConfirm={handleDelete}
      />
    </div>
  );
}