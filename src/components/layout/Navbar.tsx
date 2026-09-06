"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth/auth-context";
import { getCurrentEmployee } from "@/lib/auth/mock-auth";
import { pendingLeaveCount } from "@/lib/data/leaves";

const pageTitles: Record<string, string> = {
  "/dashboard": "HR Dashboard",
  "/my-dashboard": "My Dashboard",
  "/employees": "Employees",
  "/attendance": "Attendance",
  "/leaves": "Leaves",
  "/performance": "Performance",
  "/departments": "Departments",
  "/settings": "Settings",
};

function getTitle(pathname: string): string {
  if (pathname.startsWith("/employees/")) return "Employee Profile";
  return pageTitles[pathname] ?? "Talent Hub";
}

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setMockRole } = useAuth();
  const me = getCurrentEmployee(role);
  const [searchOpen, setSearchOpen] = useState(false);

  const initials = me.name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");

  function handleLogout() {
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>

      <div className="min-w-0 flex-1">
        <h1
          className="truncate text-base font-bold text-foreground"
          style={{ overflowWrap: "anywhere" }}
        >
          {getTitle(pathname)}
        </h1>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <div className="relative w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Global search…"
            aria-label="Global search"
            className="h-9 pl-9"
          />
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setSearchOpen((v) => !v)}
        aria-label="Toggle search"
        aria-expanded={searchOpen}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </Button>

      {searchOpen && (
        <div className="absolute left-4 right-4 top-16 z-40 md:hidden">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Global search…"
              aria-label="Global search"
              autoFocus
              className="h-10 pl-9"
            />
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Notifications, ${pendingLeaveCount} pending`}
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
              {pendingLeaveCount}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel className="font-semibold">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start gap-1 whitespace-normal py-2">
            <span className="font-medium">{pendingLeaveCount} leave requests pending</span>
            <span className="text-xs text-muted-foreground">
              Review pending leave requests
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start gap-1 whitespace-normal py-2">
            <span className="font-medium">Attendance flagged</span>
            <span className="text-xs text-muted-foreground">
              8 employees marked late today
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/leaves" className="w-full text-primary">
              View all
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="gap-2 pl-1 pr-2"
            aria-label="Account menu"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:inline">
              {me.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <span className="block truncate">{me.name}</span>
            <span className="block text-xs font-normal text-muted-foreground">
              {role} · {me.position}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={role === "EMPLOYEE" ? "/employees/emp-001" : "/employees/emp-002"}
            >
              View profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="focus:bg-accent"
            onSelect={() => setMockRole("HR")}
          >
            Sign in as HR
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setMockRole("EMPLOYEE")}>
            Sign in as Employee
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}