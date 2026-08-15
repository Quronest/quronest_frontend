import { useEffect, useMemo, useState } from "react";
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
import {
  getCenteredRange,
  formatToLocalDateString,
  parseLocalDate,
} from "@/utils/date";

export const useHomePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { weekStart, weekEnd, weekDates } = useMemo(
    () => getCenteredRange(selectedDate),
    [selectedDate],
  );

  const startDateStr = useMemo(
    () => formatToLocalDateString(weekStart),
    [weekStart],
  );

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
  const {
    data: dailyPlans = [],
    isLoading,
    isFetching,
  } = useGetDailyPlansByRangeQuery({
    startDate: queryRange.startDateStr,
    endDate: queryRange.endDateStr,
  });

  const [triggerGetDailyPlans] = useLazyGetDailyPlansByRangeQuery();
  const [generateDailyPlans] = useGenerateDailyPlansMutation();

  // Job Polling for generation
  const { start: handleGenerate, status: pollingStatus } = useJobPolling<
    DailyPlanDto[]
  >({
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
    return new Date(today);
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

  const isGenerating =
    pollingStatus === "review" || pollingStatus === "creating";

  return {
    profile,
    journey,
    isGenerating,
    pollingStatus,
    dailyPlans,
    startDateStr,
    handleGenerate,
    weekDates,
    selectedDate,
    setSelectedDate,
    handlePrevDay,
    handleNextDay,
    minDate,
    maxDate,
    selectedPlan,
    currentTask,
    isLoading,
    isFetching,
    today,
  };
};
