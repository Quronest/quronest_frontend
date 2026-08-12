"use client";

import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Calendar } from "lucide-react";

import { CurrentTaskComponent } from "@/components/modules/homepage/CurrentTaskComponent";
import { WeeklyCalendarProgress } from "@/components/modules/homepage/WeeklyCalendarProgress";
import { TasklistItemComponent } from "@/components/modules/homepage/TasklistItemComponent";
import { WelcomeComponent } from "@/components/modules/homepage/WelcomeComponent";
import { PageContainer } from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  useGetProfileQuery,
  useGetCurrentJourneyQuery,
} from "@/store/features/user/userApi";
import {
  useGetDailyPlansByRangeQuery,
  useGenerateDailyPlansMutation,
  useLazyGetDailyPlansByRangeQuery,
} from "@/store/features/dailyplan/dailyplanApi";
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseLocalDate = (dateStr: string | undefined): Date | null => {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    return new Date(year, month, day, 0, 0, 0, 0);
  }
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return null;
  parsed.setHours(0, 0, 0, 0);
  return parsed;
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

  // Profile and Journey Queries
  const { data: profile } = useGetProfileQuery();
  const { data: journey } = useGetCurrentJourneyQuery();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const queryRange = useMemo(() => {
    let start = new Date(today);
    start.setDate(today.getDate() - 30); // Default fallback

    const journeyStart = parseLocalDate(journey?.creation_timestamp);
    if (journeyStart) {
      start = journeyStart;
    }

    const end = new Date(today);
    end.setDate(today.getDate() + 60);

    return {
      startDateStr: formatToLocalDateString(start),
      endDateStr: formatToLocalDateString(end),
    };
  }, [journey, today]);

  // Daily Plans Queries
  const { data: dailyPlans = [], isLoading, isFetching } = useGetDailyPlansByRangeQuery({
    startDate: queryRange.startDateStr,
    endDate: queryRange.endDateStr,
  });

  const [triggerGetDailyPlans] = useLazyGetDailyPlansByRangeQuery();
  const [generateDailyPlans] = useGenerateDailyPlansMutation();

  // Job Polling for generation
  const { start: handleGenerate, status: pollingStatus } = useJobPolling<DailyPlanDto[]>({
    startTrigger: () => generateDailyPlans().unwrap(),
    fetchFinalTrigger: async () => {
      const result = await triggerGetDailyPlans({
        startDate: queryRange.startDateStr,
        endDate: queryRange.endDateStr,
      }).unwrap();
      return result;
    },
  });

  const minDate = useMemo(() => {
    const journeyStart = parseLocalDate(journey?.creation_timestamp);
    if (journeyStart) {
      return journeyStart;
    }
    const d = new Date(today);
    return d;
  }, [journey, today]);

  const maxDate = useMemo(() => {
    let latestDate = new Date(today);

    for (const plan of dailyPlans) {
      if (plan.plan_date) {
        const planDate = parseLocalDate(plan.plan_date);
        if (planDate && planDate.getTime() > latestDate.getTime()) {
          latestDate = planDate;
        }
      }
    }

    return latestDate;
  }, [dailyPlans, today]);

  // Ensure selectedDate is clamped when minDate or maxDate changes
  useEffect(() => {
    setSelectedDate((prev) => {
      const prevClean = new Date(prev);
      prevClean.setHours(0, 0, 0, 0);

      if (prevClean.getTime() < minDate.getTime()) {
        return new Date(minDate);
      }
      if (prevClean.getTime() > maxDate.getTime()) {
        return new Date(maxDate);
      }
      return prev;
    });
  }, [minDate, maxDate]);

  const handlePrevDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      newDate.setHours(0, 0, 0, 0);
      if (newDate.getTime() < minDate.getTime()) {
        return new Date(minDate);
      }
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      newDate.setHours(0, 0, 0, 0);
      if (newDate.getTime() > maxDate.getTime()) {
        return new Date(maxDate);
      }
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
          <WeeklyCalendarProgress
            weekDates={weekDates}
            dailyPlans={dailyPlans}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onPrevDay={handlePrevDay}
            onNextDay={handleNextDay}
            minDate={minDate}
            maxDate={maxDate}
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
            <Card className="flex flex-col items-center justify-center p-8 border border-border/50 rounded-2xl bg-card/20 backdrop-blur-md text-center max-w-2xl mx-auto py-12 px-6 space-y-6 shadow-sm border-dashed">
              <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">No Daily Plans Scheduled</h2>
                <p className="text-neutral text-sm max-w-md mx-auto leading-relaxed">
                  No daily plan generated for this specific day ({formatToLocalDateString(selectedDate)}).
                  {selectedDate.getTime() === today.getTime() && " Let's generate your learning roadmap using our AI engine!"}
                </p>
              </div>
              {selectedDate.getTime() === today.getTime() && (
                <Button
                  onClick={handleGenerate}
                  className="font-bold bg-primary/80! hover:bg-primary! transition-colors px-6 py-2.5"
                >
                  Generate Daily Plans
                </Button>
              )}
            </Card>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;
