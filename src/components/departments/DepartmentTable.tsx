"use client";

import { Building2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Department } from "@/lib/types";

interface DepartmentTableProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
}

export function DepartmentTable({
  departments,
  onEdit,
  onDelete,
}: DepartmentTableProps) {
  if (departments.length === 0) {
    return (
      <EmptyState
        title="No departments yet"
        description="Create your first department to start organising your team."
      />
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Building2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{dept.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {dept.employeeCount} employees
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Actions for ${dept.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onEdit(dept)}>
                      <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onDelete(dept)}>
                      <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}