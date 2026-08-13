import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tag } from "@/components/ui/Tag";
import { DailyTaskSummaryDto } from "@/store/features/user/userType";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import Link from "next/link";

interface CurrentTaskProps {
  task: DailyTaskSummaryDto | null;
  dayNumber?: number;
  dailyPlanId?: string;
}

const getTagType = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "primary";
    case "PENDING":
      return "accent";
    default:
      return "neutral";
  }
};

export const CurrentTaskComponent = ({ task, dayNumber, dailyPlanId }: CurrentTaskProps) => {
  if (!task) {
    return (
      <Card className="w-full flex flex-col justify-center items-center h-48 relative border-green-500/20 bg-green-500/5 text-center p-6">
        <div className="rounded-full bg-green-500/10 p-3 mb-3">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          All Tasks Completed! 🎉
        </h2>
        <p className="text-neutral text-sm mt-1 max-w-sm">
          {dayNumber 
            ? `Great job! You've finished all the scheduled learning tasks for Day ${dayNumber}.`
            : "No active or pending tasks for this day."}
        </p>
      </Card>
    );
  }

  const innerButton = (
    <Button className="font-bold shrink-0 bg-accent2/80! hover:bg-accent2! transition-colors">
      {task.status === "COMPLETED" ? "Review Work" : "Resume Work"}
    </Button>
  );

  return (
    <Card className="w-full flex flex-col justify-between h-48 relative p-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-foreground flex items-baseline gap-2">
          <span className="text-accent2 font-bold whitespace-nowrap">Task {task.order}:</span> 
          <span className="truncate max-w-md">{task.title}</span>
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <Tag label={task.task_type} tagType="primary" />
          <Tag label={task.status} tagType={getTagType(task.status)} />
          {task.is_optional && <Tag label="Optional" tagType="secondary" />}
          <span className="text-xs text-neutral ml-auto">
            Estimated: {task.expected_total_time} mins
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-4">
        <ProgressBar value={task.progress_percent || 0} />
        {dailyPlanId ? (
          <Link href={`/workspace/${dailyPlanId}`}>
            {innerButton}
          </Link>
        ) : (
          innerButton
        )}
      </div>
    </Card>
  );
};
