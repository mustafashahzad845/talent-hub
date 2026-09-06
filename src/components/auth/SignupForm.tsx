"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
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
import { signupSchema, type SignupValues } from "@/lib/validations/auth";
import { loginAs } from "@/lib/auth/mock-auth";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "HR",
    },
  });

  async function onSubmit(values: SignupValues) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const target = loginAs(values.role);
    toast.success(`Account created for ${values.name}`, {
      description: `Signed up as ${values.role}.`,
    });
    router.push(target);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-label="Signup form"
    >
      <div className="space-y-1.5">
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          placeholder="Jane Cooper"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "signup-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="signup-name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "signup-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="signup-email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-role">Account type</Label>
        <Select
          defaultValue="HR"
          onValueChange={(value) =>
            setValue("role", value as SignupValues["role"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger id="signup-role" aria-label="Account type">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HR">HR Manager</SelectItem>
            <SelectItem value="ADMIN">Administrator</SelectItem>
            <SelectItem value="EMPLOYEE">Employee</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "signup-password-error" : undefined}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <p id="signup-password-error" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-confirm">Confirm password</Label>
        <div className="relative">
          <Input
            id="signup-confirm"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "signup-confirm-error" : undefined
            }
            className="pr-10"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showConfirm ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p id="signup-confirm-error" className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}