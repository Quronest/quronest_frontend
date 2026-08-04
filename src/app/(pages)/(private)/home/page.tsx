"use client";

import { useMemo, useState } from "react";
import { LoaderCircle, Calendar } from "lucide-react";

import { CurrentTaskComponent } from "@/components/modules/homepage/CurrentTaskComponent";
import { MockWeekProgress } from "@/components/modules/homepage/MockWeekProgress";
import { TasklistItemComponent } from "@/components/modules/homepage/TasklistItemComponent";
import { WelcomeComponent } from "@/components/modules/homepage/WelcomeComponent";
import { PageContainer } from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  useGetProfileQuery,
  useGetCurrentJourneyQuery,
  useGetDailyPlansByRangeQuery,
  useGenerateDailyPlansMutation,
  useLazyGetDailyPlansByRangeQuery,
} from "@/store/features/user/userApi";
import { useJobPolling } from "@/hooks/useJobPolling";
import { DailyPlanDto } from "@/store/features/user/userType";
import { Tasktype } from "@/types/Tasktype";
import { formatDate } from "@/utils/date";

const getCenteredRange = (date: Date) => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(date);
    d.setDate(date.getDate() - 3 + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const weekStart = dates[0];
  const weekEnd = new Date(dates[6]);
  weekEnd.setHours(23, 59, 59, 999);

  return { weekStart, weekEnd, weekDates: dates };
};

const formatToLocalDateString = (date: Date): string => {
  const formatted = formatDate(date.toISOString());
  return `${formatted.year}-${formatted.monthNumber}-${formatted.day}`;
};

const mapDailyTaskToTaskType = (task: any): Tasktype => {
  const mapTypeToTagType = (type: string) => {
    switch (type) {
      case "CODING":
        return "primary";
      case "QUIZ":
        return "accent";
      case "READING":
        return "secondary";
      default:
        return "neutral";
    }
  };

  return {
    id: task.id,
    title: task.title,
    progress: task.progress_percent || 0,
    duration: (task.expected_total_time || 0) * 60, // convert minutes to seconds
    tags: [
      { type: mapTypeToTagType(task.task_type), label: task.task_type },
      { type: "neutral", label: task.status },
    ],
  };
};

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { weekStart, weekEnd, weekDates } = useMemo(() => getCenteredRange(selectedDate), [selectedDate]);

  const startDateStr = useMemo(() => formatToLocalDateString(weekStart), [weekStart]);
  const endDateStr = useMemo(() => formatToLocalDateString(weekEnd), [weekEnd]);

  // Profile and Journey Queries
  const { data: profile } = useGetProfileQuery();
  const { data: journey } = useGetCurrentJourneyQuery();

  // Daily Plans Queries
  const { data: dailyPlans = [], isLoading, isFetching } = useGetDailyPlansByRangeQuery({
    startDate: startDateStr,
    endDate: endDateStr,
  });

  const [triggerGetDailyPlans] = useLazyGetDailyPlansByRangeQuery();
  const [generateDailyPlans] = useGenerateDailyPlansMutation();

  // Job Polling for generation
  const { start: handleGenerate, status: pollingStatus } = useJobPolling<DailyPlanDto[]>({
    startTrigger: () => generateDailyPlans().unwrap(),
    fetchFinalTrigger: async () => {
      const result = await triggerGetDailyPlans({
        startDate: startDateStr,
        endDate: endDateStr,
      }).unwrap();
      return result;
    },
  });

  const handlePrevDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const selectedPlan = useMemo(() => {
    const selectedStr = formatToLocalDateString(selectedDate);
    return dailyPlans.find((p) => p.plan_date === selectedStr) || null;
  }, [dailyPlans, selectedDate]);

  const currentTask = useMemo(() => {
    if (!selectedPlan || !selectedPlan.tasks) return null;
    return selectedPlan.tasks.find((t) => t.status !== "COMPLETED") || null;
  }, [selectedPlan]);

  const isGenerating = pollingStatus === "review" || pollingStatus === "creating";

  if (isLoading || (isFetching && dailyPlans.length === 0)) {
    return (
      <PageContainer className="flex flex-col items-center justify-center pt-20">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
        <span className="text-neutral mt-4 font-medium">Loading your schedule...</span>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-6 pt-20 pb-12 overflow-y-auto px-6 max-h-screen">
      <WelcomeComponent
        fullname={profile?.fullname}
        currentDay={journey?.current_day}
      />

      {isGenerating ? (
        <Card className="flex flex-col items-center justify-center p-12 border border-border/50 rounded-2xl bg-card/30 backdrop-blur-md shadow-sm text-center space-y-6 max-w-lg mx-auto my-10">
          <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {pollingStatus === "review" ? "Analyzing Goals..." : "Generating Plans..."}
            </h2>
            <p className="text-neutral mt-2 text-sm max-w-xs mx-auto leading-relaxed">
              {pollingStatus === "review"
                ? "We are analyzing your learning progress and goals to structure your next steps."
                : "Our AI is crafting your personalized daily plans. This will take a few seconds."}
            </p>
          </div>
        </Card>
      ) : dailyPlans.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 border border-border/50 rounded-2xl bg-card/20 backdrop-blur-md text-center max-w-2xl mx-auto my-12 py-12 px-6 space-y-6 shadow-sm border-dashed">
          <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">No Daily Plans Scheduled</h2>
            <p className="text-neutral text-sm max-w-md mx-auto leading-relaxed">
              You don't have any daily plans generated for the week of{" "}
              <span className="text-primary font-semibold">{startDateStr}</span>.
              Let's generate your learning roadmap using our AI engine!
            </p>
          </div>
          <Button
            onClick={handleGenerate}
            className="font-bold bg-primary/80! hover:bg-primary! transition-colors px-6 py-2.5"
          >
            Generate Daily Plans
          </Button>
        </Card>
      ) : (
        <>
          <MockWeekProgress
            weekDates={weekDates}
            dailyPlans={dailyPlans}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onPrevDay={handlePrevDay}
            onNextDay={handleNextDay}
          />

          {selectedPlan ? (
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
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">
                  Today's Tasks ({selectedPlan.tasks?.length || 0})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlan.tasks && selectedPlan.tasks.length > 0 ? (
                    selectedPlan.tasks.map((task) => (
                      <TasklistItemComponent
                        task={mapDailyTaskToTaskType(task)}
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
          ) : (
            <Card className="p-8 border border-border/50 rounded-2xl bg-card/20 text-center py-12">
              <p className="text-neutral text-sm">
                No daily plan generated for this specific day ({formatToLocalDateString(selectedDate)}).
                Select another day from the weekly tracker.
              </p>
            </Card>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;
