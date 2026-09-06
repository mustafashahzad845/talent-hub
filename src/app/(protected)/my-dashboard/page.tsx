import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { MyStats } from "@/components/dashboard/MyStats";
import { MyActivity } from "@/components/dashboard/MyActivity";
import { getCurrentEmployee } from "@/lib/auth/mock-auth";

export const metadata: Metadata = {
  title: "My Dashboard",
};

export default function MyDashboardPage() {
  const me = getCurrentEmployee("EMPLOYEE");
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${me.name.split(" ")[0]}`}
        subtitle="Here's how your week is going."
      />
      <MyStats employee={me} />
      <MyActivity employeeName={me.name} />
    </div>
  );
}