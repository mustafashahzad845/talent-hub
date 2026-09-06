"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer: React.ReactNode;
}

export function AuthShell({ children, title, subtitle, footer }: AuthShellProps) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-sidebar lg:flex">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 40rem at 20% 10%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(50rem 30rem at 90% 90%, rgba(59,130,246,0.25), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-md px-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-lg font-extrabold text-primary-foreground">
            TH
          </span>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white">
            The modern home for your people operations.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-sidebar-foreground">
            Rank, track, and support your team — attendance, leaves,
            performance, and goals in one clean workspace.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-sidebar-foreground">
            {[
              "One dashboard for every HR decision",
              "Real-time attendance and leave workflows",
              "Performance goals that actually get tracked",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-background px-4 py-10 sm:px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-extrabold text-primary-foreground">
              TH
            </span>
            <span className="text-base font-bold tracking-tight">Talent Hub</span>
          </Link>

          <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
            <div className={cn("mt-6", !subtitle && "mt-8")}>{children}</div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </p>
        </div>
      </div>
    </div>
  );
}