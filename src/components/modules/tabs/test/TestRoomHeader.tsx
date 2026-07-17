import React from "react";
import { BookOpen, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import clsx from "clsx";

type TestRoomHeaderProps = {
  title: string;
  answeredCount: number;
  totalQuestions: number;
  timeRemaining: number; // in seconds
  onSubmitClick: () => void;
};

export const TestRoomHeader = ({
  title,
  answeredCount,
  totalQuestions,
  timeRemaining,
  onSubmitClick,
}: TestRoomHeaderProps) => {
  // Format remaining seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const isTimeLow = timeRemaining < 300; // Warning under 5 minutes

  return (
    <div className="sticky top-0 bg-background flex items-center justify-between border-b border-border pb-4 px-6 w-full select-none">
      {/* Left section: Title & Progress */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>{title}</span>
        </div>

        {/* Vertical divider */}
        <div className="h-4 w-px bg-border hidden sm:block" />

        {/* Progress bar */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-neutral text-sm">Progress</span>
          <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-foreground text-sm font-semibold">
            {answeredCount}/{totalQuestions}
          </span>
        </div>
      </div>

      {/* Right section: Timer & Submit Button */}
      <div className="flex items-center gap-4 pt-4">
        {/* Timer Box */}
        <div
          className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all duration-300",
            isTimeLow
              ? "text-red-400 border-red-500/30 bg-red-500/10 animate-pulse"
              : "text-foreground bg-card border-border",
          )}
        >
          <Clock className={clsx("h-4 w-4", isTimeLow && "text-red-400")} />
          <span>{formatTime(timeRemaining)}</span>
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onSubmitClick}
          className="rounded-lg shadow-md font-semibold"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
