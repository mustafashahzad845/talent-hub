"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  CalendarDays,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Target,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-context";
import type { Role } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const hrNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: User },
  { href: "/attendance", label: "Attendance", icon: CalendarDays },
  { href: "/leaves", label: "Leaves", icon: Briefcase },
  { href: "/performance", label: "Performance", icon: Target },
  { href: "/departments", label: "Departments", icon: Home },
  { href: "/settings", label: "Settings", icon: Settings },
];

const employeeNav: NavItem[] = [
  { href: "/my-dashboard", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/employees/emp-001", label: "My Profile", icon: User },
  { href: "/attendance", label: "My Attendance", icon: CalendarDays },
  { href: "/leaves", label: "My Leaves", icon: Briefcase },
  { href: "/performance", label: "Performance", icon: Target },
];

function getNav(role: Role): NavItem[] {
  return role === "EMPLOYEE" ? employeeNav : hrNav;
}

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const { role } = useAuth();
  const nav = getNav(role);

  const content = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between gap-2 border-b border-sidebar-border px-5">
        <Link
          href={role === "EMPLOYEE" ? "/my-dashboard" : "/dashboard"}
          className="flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-extrabold text-primary-foreground">
            TH
          </span>
          <span className="text-sm font-bold tracking-tight text-white">
            Talent Hub
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-white md:hidden"
          onClick={() => onOpenChange(false)}
          aria-label="Close navigation menu"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
          Main Menu
        </p>
        {nav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/my-dashboard" &&
              pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/login"
          onClick={() => onOpenChange(false)}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-sidebar-accent/60 hover:text-white"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">
        {content}
      </aside>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 max-w-[320px] transform transition-transform duration-200 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {content}
      </div>
    </>
  );
}