"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/settings/SectionHeading";
import { useAuth } from "@/lib/auth/auth-context";
import { getCurrentEmployee, getRoleDashboardTarget } from "@/lib/auth/mock-auth";
import type { Role } from "@/lib/types";
import {
  profileSettingsSchema,
  securitySettingsSchema,
  type ProfileSettingsValues,
  type SecuritySettingsValues,
} from "@/lib/validations/settings";

export default function SettingsPage() {
  const router = useRouter();
  const { role, setMockRole } = useAuth();
  const me = getCurrentEmployee(role);

  const profileForm = useForm<ProfileSettingsValues>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: me.name,
      email: me.email,
      phone: me.phone,
      department: me.departmentName,
      position: me.position,
    },
  });

  const securityForm = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSaveProfile(values: ProfileSettingsValues) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Profile saved", {
      description: "Your profile was updated.",
    });
  }

  async function onSaveSecurity(values: SecuritySettingsValues) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Password changed", {
      description: "Your security settings were updated.",
    });
    securityForm.reset();
  }

  function switchRole(next: "HR" | "EMPLOYEE") {
    setMockRole(next);
    toast.info(`Switched mock role to ${next}`, {
      description: "Profile fields now reflect the demo user.",
    });
    router.push(getRoleDashboardTarget(next as Role));
  }

  const {
    register: regProfile,
    handleSubmit: subProfile,
    formState: fProfile,
  } = profileForm;
  const {
    register: regSecurity,
    handleSubmit: subSecurity,
    formState: fSecurity,
  } = securityForm;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeading
          title="Settings"
          subtitle="Manage your profile and security preferences."
        />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Demo role:</span>
          <span className="font-semibold">{role}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => switchRole(role === "HR" ? "EMPLOYEE" : "HR")}
          >
            Switch to {role === "HR" ? "Employee" : "HR"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how you appear across Talent Hub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={subProfile(onSaveProfile)} noValidate className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="settings-name">Full name</Label>
                <Input
                  id="settings-name"
                  aria-invalid={!!fProfile.errors.name}
                  aria-describedby={fProfile.errors.name ? "settings-name-error" : undefined}
                  {...regProfile("name")}
                />
                {fProfile.errors.name && (
                  <p id="settings-name-error" className="text-sm text-destructive">
                    {fProfile.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  type="email"
                  aria-invalid={!!fProfile.errors.email}
                  {...regProfile("email")}
                />
                {fProfile.errors.email && (
                  <p className="text-sm text-destructive">
                    {fProfile.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-phone">Phone</Label>
                <Input id="settings-phone" {...regProfile("phone")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-dept">Department</Label>
                <Input id="settings-dept" {...regProfile("department")} />
                {fProfile.errors.department && (
                  <p className="text-sm text-destructive">
                    {fProfile.errors.department.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-position">Position</Label>
                <Input id="settings-position" {...regProfile("position")} />
                {fProfile.errors.position && (
                  <p className="text-sm text-destructive">
                    {fProfile.errors.position.message}
                  </p>
                )}
              </div>
            </div>
            <div className="pt-1">
              <Button type="submit" loading={fProfile.isSubmitting}>
                Save changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Keep your account secure with a strong password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={subSecurity(onSaveSecurity)} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="settings-current">Current password</Label>
              <Input
                id="settings-current"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!fSecurity.errors.currentPassword}
                {...regSecurity("currentPassword")}
              />
              {fSecurity.errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {fSecurity.errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="settings-new">New password</Label>
                <Input
                  id="settings-new"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!fSecurity.errors.newPassword}
                  {...regSecurity("newPassword")}
                />
                {fSecurity.errors.newPassword && (
                  <p className="text-sm text-destructive">
                    {fSecurity.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-confirm">Confirm new password</Label>
                <Input
                  id="settings-confirm"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!fSecurity.errors.confirmPassword}
                  {...regSecurity("confirmPassword")}
                />
                {fSecurity.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {fSecurity.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="pt-1">
              <Button type="submit" loading={fSecurity.isSubmitting}>
                Update password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}