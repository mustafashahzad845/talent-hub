import { z } from "zod";
import type { EmployeeStatus } from "@/lib/types";

export const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  departmentId: z.string().min(1, "Department is required"),
  position: z.string().min(2, "Position is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  status: z.enum(["ACTIVE", "ON_LEAVE", "INACTIVE"]),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

export type { EmployeeStatus };