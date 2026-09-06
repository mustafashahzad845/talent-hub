"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchBar } from "@/components/shared/SearchBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employees as initialEmployees } from "@/lib/data/employees";
import { departments } from "@/lib/data/departments";
import type { Employee } from "@/lib/types";

type SortKey = "name" | "employeeId" | "departmentName" | "position" | "joiningDate";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

interface EmployeeTableProps {
  employees?: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeTable({
  employees = initialEmployees,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const query = search.trim().toLowerCase();

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      !query ||
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.employeeId.toLowerCase().includes(query) ||
      emp.position.toLowerCase().includes(query);
    const matchesDept = department === "all" || emp.departmentId === department;
    const matchesStatus = status === "all" || emp.status === status;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === "joiningDate") {
      return sortDir === "asc"
        ? a.joiningDate.localeCompare(b.joiningDate)
        : b.joiningDate.localeCompare(a.joiningDate);
    }
    return sortDir === "asc"
      ? a[sortKey].localeCompare(b[sortKey])
      : b[sortKey].localeCompare(a[sortKey]);
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function renderSortableHead(label: string, key: SortKey) {
    return (
      <TableHead
        aria-sort={
          sortKey === key
            ? sortDir === "asc"
              ? "ascending"
              : "descending"
            : "none"
        }
      >
        <button
          type="button"
          onClick={() => toggleSort(key)}
          className="flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {label}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${sortKey === key && sortDir === "desc" ? "rotate-180" : ""} ${sortKey === key ? "text-primary" : "opacity-50"}`}
            aria-hidden="true"
          />
        </button>
      </TableHead>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search name, email, ID, position…"
          className="w-full sm:w-80"
        />
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-full sm:w-44" aria-label="Filter by department">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-40" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="ON_LEAVE">On Leave</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          title="No employees found"
          description={
            query
              ? "Try a different search term or clear your filters."
              : "Get started by adding your first employee."
          }
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                {renderSortableHead("Employee ID", "employeeId")}
                {renderSortableHead("Department", "departmentName")}
                {renderSortableHead("Position", "position")}
                {renderSortableHead("Joining Date", "joiningDate")}
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-muted text-xs font-semibold">
                          {initials(emp.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <Link
                          href={`/employees/${emp.id}`}
                          className="block truncate text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        >
                          {emp.name}
                        </Link>
                        <p className="truncate text-xs text-muted-foreground">
                          {emp.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{emp.employeeId}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {emp.departmentName}
                    </Badge>
                  </TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {emp.joiningDate}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={emp.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${emp.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/employees/${emp.id}`}
                            className="w-full"
                          >
                            View profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onEdit(emp)}>
                          <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onDelete(emp)}>
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
      )}
      <p className="text-sm text-muted-foreground">
        Showing {sorted.length} of {employees.length} employees
      </p>
    </div>
  );
}