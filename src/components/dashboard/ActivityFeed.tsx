import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export function ActivityFeed() {
  const items = activityFeed.slice(0, 6);
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base">Activity Feed</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map((item) => (
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