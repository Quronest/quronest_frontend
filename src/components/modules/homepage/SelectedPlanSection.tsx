import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar } from "lucide-react";
import React from "react";
import { CurrentTaskComponent } from "./CurrentTaskComponent";
import { TasklistItemComponent } from "./TasklistItemComponent";
import { DailyPlanDto } from "@/store/features/user/userType";
import { formatToLocalDateString } from "@/utils/date";

interface SelectedPlanSectionProps {
  selectedPlan: DailyPlanDto | null;
  selectedDate: Date;
  currentTask: any;
  handleGenerate: () => void;
}

export const SelectedPlanSection = ({
  selectedPlan,
  selectedDate,
  currentTask,
  handleGenerate,
}: SelectedPlanSectionProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDateClean = new Date(selectedDate);
  selectedDateClean.setHours(0, 0, 0, 0);

  if (!selectedPlan) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 border border-border/50 rounded-2xl bg-card/20 backdrop-blur-md text-center max-w-2xl mx-auto py-12 px-6 space-y-6 shadow-sm border-dashed">
        <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">
            No Daily Plans Scheduled
          </h2>
          <p className="text-neutral text-sm max-w-md mx-auto leading-relaxed">
            No daily plan generated for this specific day ({formatToLocalDateString(selectedDate)}).
            {selectedDateClean.getTime() === today.getTime() &&
              " Let's generate your learning roadmap using our AI engine!"}
          </p>
        </div>
        {selectedDateClean.getTime() === today.getTime() && (
          <Button
            onClick={handleGenerate}
            className="font-bold bg-primary/80! hover:bg-primary! transition-colors px-6 py-2.5"
          >
            Generate Daily Plans
          </Button>
        )}
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-foreground">
          {selectedPlan.title}
        </h2>
        <p className="text-neutral text-sm max-w-3xl">
          {selectedPlan.description}
        </p>
      </div>

      <CurrentTaskComponent
        task={currentTask}
        dayNumber={selectedPlan.day_number}
        dailyPlanId={selectedPlan.id}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Today's Tasks ({selectedPlan.tasks?.length || 0})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedPlan.tasks && selectedPlan.tasks.length > 0 ? (
            selectedPlan.tasks.map((task) => (
              <TasklistItemComponent
                task={task}
                dailyPlanId={selectedPlan.id}
                key={task.id}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-6 text-neutral text-sm">
              No tasks found for this plan.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
