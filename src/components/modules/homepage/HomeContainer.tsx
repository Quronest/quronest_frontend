"use client";

import React from "react";
import { useHomePage } from "@/hooks/useHomePage";
import { WelcomeComponent } from "./WelcomeComponent";
import { WeeklyCalendarProgress } from "./WeeklyCalendarProgress";
import { HomeLoading } from "./HomeLoading";
import { GeneratingPlansOverlay } from "./GeneratingPlansOverlay";
import { NoPlansScheduled } from "./NoPlansScheduled";
import { SelectedPlanSection } from "./SelectedPlanSection";

export default function HomeContainer() {
  const {
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
  } = useHomePage();

  if (isLoading || (isFetching && dailyPlans.length === 0)) {
    return <HomeLoading />;
  }

  return (
    <div className="w-full h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-card-hover scrollbar-track-transparent">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 space-y-6">
        <WelcomeComponent
          fullname={profile?.fullname}
          currentDay={journey?.current_day}
        />

        {isGenerating ? (
          <GeneratingPlansOverlay pollingStatus={pollingStatus} />
        ) : dailyPlans.length === 0 ? (
          <NoPlansScheduled startDateStr={startDateStr} onGenerate={handleGenerate} />
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

            <SelectedPlanSection
              selectedPlan={selectedPlan}
              selectedDate={selectedDate}
              currentTask={currentTask}
              handleGenerate={handleGenerate}
            />
          </>
        )}
      </div>
    </div>
  );
}
