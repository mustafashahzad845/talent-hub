"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginSchema,
  type LoginValues,
} from "@/lib/validations/auth";
import { loginAs, getRoleDashboardTarget } from "@/lib/auth/mock-auth";
import type { Role } from "@/lib/types";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "hr@talenthub.com",
      password: "password123",
    },
  });

  useEffect(() => {
    setValue("email", "hr@talenthub.com");
    setValue("password", "password123");
  }, [setValue]);

  async function onSubmit(values: LoginValues) {
    const role: Role = values.email.startsWith("hr@")
      ? "HR"
      : values.email.startsWith("admin@")
        ? "ADMIN"
        : values.email.startsWith("emp@")
          ? "EMPLOYEE"
          : (window.localStorage.getItem("talenthub.mock.role") as Role) ?? "HR";

    await new Promise((resolve) => setTimeout(resolve, 900));

    const target = loginAs(role);
    const targetLabel = getRoleDashboardTarget(role);
    toast.success(`Signed in as ${role}`, {
      description: `Routing to ${targetLabel}.`,
    });
    router.push(target);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-label="Login form"
    >
      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className="pl-9"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p id="login-email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "login-password-error" : undefined}
            className="pl-9 pr-10"
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
          <p id="login-password-error" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Mock sign-in</p>
        <p className="mt-1">
          <span className="font-medium">hr@talenthub.com</span> → HR ·{" "}
          <span className="font-medium">admin@talenthub.com</span> → Admin ·{" "}
          <span className="font-medium">emp@talenthub.com</span> → Employee
        </p>
      </div>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}