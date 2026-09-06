"use client";

import { useState } from "react";
import { Plus, Star, Target } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { PerformanceCard } from "@/components/performance/PerformanceCard";
import { GoalTracker } from "@/components/performance/GoalTracker";
import { ReviewForm } from "@/components/performance/ReviewForm";
import { GoalForm } from "@/components/performance/GoalForm";
import { performanceRecords } from "@/lib/data/performance";
import { goals as initialGoals } from "@/lib/data/goals";
import { getEmployeeById } from "@/lib/data/employees";
import type { Goal, GoalStatus } from "@/lib/types";
import type { GoalFormValues, ReviewFormValues } from "@/lib/validations/performance";

export default function PerformancePage() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const featured = [...performanceRecords]
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 3);

  function handleSubmitReview(values: ReviewFormValues) {
    const employee = getEmployeeById(values.employeeId);
    const overall = Math.round(
      (values.productivity + values.teamwork + values.punctuality) / 3
    );
    toast.success("Performance review saved", {
      description: `${employee?.name} scored ${overall} overall.`,
    });
  }

  function handleSubmitGoal(values: GoalFormValues) {
    const employee = getEmployeeById(values.employeeId);
    const next: Goal = {
      id: `goal-${Date.now()}`,
      employeeId: values.employeeId,
      employeeName: employee?.name ?? "Unknown",
      title: values.title,
      description: values.description,
      status: "PENDING" as GoalStatus,
      targetDate: values.targetDate,
      progress: 0,
    };
    setGoals((prev) => [next, ...prev]);
    toast.success("Goal created", {
      description: `Assigned to ${next.employeeName}.`,
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance & Goals"
        subtitle="Track scores, reviews, and team goals in one place."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setReviewOpen(true)}>
              <Star className="h-4 w-4" aria-hidden="true" />
              Add review
            </Button>
            <Button onClick={() => setGoalOpen(true)}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add goal
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((record) => (
          <PerformanceCard key={record.id} record={record} />
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            Goal Tracker
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {goals.length} goals
          </span>
        </CardHeader>
        <CardContent>
          <GoalTracker goals={goals} />
        </CardContent>
      </Card>

      <ReviewForm open={reviewOpen} onOpenChange={setReviewOpen} onSubmitReview={handleSubmitReview} />
      <GoalForm open={goalOpen} onOpenChange={setGoalOpen} onSubmitGoal={handleSubmitGoal} />
    </div>
  );
}