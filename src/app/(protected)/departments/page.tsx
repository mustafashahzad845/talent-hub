"use client";

import { useState } from "react";
import { Building2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { DepartmentTable } from "@/components/departments/DepartmentTable";
import { DepartmentForm } from "@/components/departments/DepartmentForm";
import { departments as initialDepartments } from "@/lib/data/departments";
import { employees } from "@/lib/data/employees";
import type { Department } from "@/lib/types";
import type { DepartmentFormValues } from "@/lib/validations/department";

function countEmployees(departmentId: string): number {
  return employees.filter((e) => e.departmentId === departmentId).length;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(
    initialDepartments.map((d) => ({ ...d, employeeCount: countEmployees(d.id) }))
  );
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [deleting, setDeleting] = useState<Department | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  function handleSubmit(values: DepartmentFormValues) {
    if (editing) {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === editing.id ? { ...d, name: values.name } : d
        )
      );
      toast.success("Department updated", {
        description: `Renamed to ${values.name}.`,
      });
      setEditing(null);
    } else {
      const next: Department = {
        id: `dept-${Date.now()}`,
        name: values.name,
        employeeCount: 0,
      };
      setDepartments((prev) => [...prev, next]);
      toast.success("Department added", {
        description: `${values.name} created.`,
      });
    }
  }

  function handleDelete() {
    if (!deleting) return;
    setDeleteSubmitting(true);
    setTimeout(() => {
      setDepartments((prev) => prev.filter((d) => d.id !== deleting.id));
      toast.success("Department deleted", {
        description: `${deleting.name} was removed.`,
      });
      setDeleting(null);
      setDeleteSubmitting(false);
    }, 500);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Departments"
        subtitle={`${departments.length} departments across your organisation.`}
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add department
          </Button>
        }
      />

      <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">
        <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
        Employee counts stay in sync with the employee directory.
      </div>

      <DepartmentTable
        departments={departments}
        onEdit={(dept) => {
          setEditing(dept);
          setFormOpen(true);
        }}
        onDelete={(dept) => setDeleting(dept)}
      />

      <DepartmentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        department={editing}
        onSubmitDepartment={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
        title="Delete department"
        description={
          deleting
            ? `Are you sure you want to delete ${deleting.name}? Employees in this department are not deleted.`
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