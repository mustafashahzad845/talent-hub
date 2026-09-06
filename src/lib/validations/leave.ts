import { z } from "zod";

export const leaveSchema = z
  .object({
    employeeId: z.string().min(1, "Employee is required"),
    leaveType: z.enum(["ANNUAL", "SICK", "CASUAL", "EMERGENCY"], {
      message: "Leave type is required",
    }),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().min(3, "Reason must be at least 3 characters"),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be on or after the start date",
    path: ["endDate"],
  });

export type LeaveFormValues = z.infer<typeof leaveSchema>;