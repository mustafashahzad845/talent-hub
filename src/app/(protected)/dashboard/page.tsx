import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Charts } from "@/components/dashboard/Charts";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CalendarCard } from "@/components/dashboard/CalendarCard";
import { RecentEmployees } from "@/components/dashboard/RecentEmployees";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Dashboard"
        subtitle="A live snapshot of your workforce at a glance."
      />
      <StatsCards />
      <Charts />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ActivityFeed />
        </div>
        <CalendarCard />
      </div>
      <RecentEmployees />
    </div>
  );
}