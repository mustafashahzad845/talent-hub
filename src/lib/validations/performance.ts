import { z } from "zod";

export const reviewSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  productivity: z.coerce
    .number({ message: "Enter a number" })
    .min(0, "Min 0")
    .max(100, "Max 100")
    .int("Whole numbers only"),
  teamwork: z.coerce
    .number({ message: "Enter a number" })
    .min(0, "Min 0")
    .max(100, "Max 100")
    .int("Whole numbers only"),
  punctuality: z.coerce
    .number({ message: "Enter a number" })
    .min(0, "Min 0")
    .max(100, "Max 100")
    .int("Whole numbers only"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const goalSchema = z.object({
  employeeId: z.string().min(1, "Assignee is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  targetDate: z.string().min(1, "Target date is required"),
});

export type GoalFormValues = z.infer<typeof goalSchema>;