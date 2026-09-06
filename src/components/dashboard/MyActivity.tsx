import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/shared/EmptyState";
import { activityFeed } from "@/lib/data/activity";

function timeAgoLabel(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.max(Math.round(diffMs / 3_600_000), 0);
  if (hours < 1) return "just now";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.round(hours / 24)} days ago`;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

interface MyActivityProps {
  employeeName: string;
}

export function MyActivity({ employeeName }: MyActivityProps) {
  const mine = activityFeed.filter(
    (a) => a.actorName === employeeName || a.target.includes(employeeName)
  );

  if (mine.length === 0) {
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">My Activity</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No activity yet"
            description="Your recent activity will appear here."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base">My Activity</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </CardHeader>
      <CardContent className="space-y-5">
        {mine.map((item) => (
          <div key={item.id} className="flex gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-muted text-xs font-semibold">
                {initials(item.actorName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <span className="font-semibold">{item.actorName}</span>{" "}
                <span className="text-muted-foreground">{item.verb}</span>{" "}
                <span className="font-medium">{item.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {timeAgoLabel(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}