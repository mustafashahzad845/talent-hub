import { z } from "zod";

export const profileSettingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(2, "Position is required"),
});

export type ProfileSettingsValues = z.infer<typeof profileSettingsSchema>;

export const securitySettingsSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;