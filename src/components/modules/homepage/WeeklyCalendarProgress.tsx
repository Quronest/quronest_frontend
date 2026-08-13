import Button from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DailyPlanDto } from "@/store/features/user/userType";

interface WeeklyCalendarProgressProps {
  weekDates: Date[];
  dailyPlans: DailyPlanDto[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  minDate?: Date | null;
  maxDate?: Date | null;
}

const formatToLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const WeeklyCalendarProgress = ({
  weekDates,
  dailyPlans,
  selectedDate,
  onSelectDate,
  onPrevDay,
  onNextDay,
  minDate,
  maxDate,
}: WeeklyCalendarProgressProps) => {
  const selectedStr = formatToLocalDateString(selectedDate);
  const todayStr = formatToLocalDateString(new Date());

  const selectedClean = new Date(selectedDate);
  selectedClean.setHours(0, 0, 0, 0);

  const minClean = minDate ? new Date(minDate) : null;
  if (minClean) minClean.setHours(0, 0, 0, 0);

  const maxClean = maxDate ? new Date(maxDate) : null;
  if (maxClean) maxClean.setHours(0, 0, 0, 0);

  const isPrevDisabled = minClean ? selectedClean.getTime() <= minClean.getTime() : false;
  const isNextDisabled = maxClean ? selectedClean.getTime() >= maxClean.getTime() : false;

  return (
    <div className="flex items-center justify-between mx-auto max-w-2xl w-full px-4">
      <Button
        variant="nav"
        className="rounded-full! justify-center p-2 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onPrevDay}
        disabled={isPrevDisabled}
        active={!isPrevDisabled}
        hover={!isPrevDisabled}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 py-2">
        {weekDates.map((date) => {
          const dateStr = formatToLocalDateString(date);
          const plan = dailyPlans.find((p) => p.plan_date === dateStr);
          const isSelected = dateStr === selectedStr;
          const isToday = dateStr === todayStr;
          const weekdayShort = date.toLocaleDateString("en-US", { weekday: "short" });

          const dateClean = new Date(date);
          dateClean.setHours(0, 0, 0, 0);
          const isDisabled = !!(
            (minClean && dateClean.getTime() < minClean.getTime()) ||
            (maxClean && dateClean.getTime() > maxClean.getTime())
          );

          return (
            <button
              key={dateStr}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelectDate(date)}
              className={`flex flex-col items-center gap-1.5 transition-all ${
                isDisabled
                  ? "cursor-not-allowed opacity-35 select-none pointer-events-none"
                  : "cursor-pointer group"
              }`}
            >
              <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-colors ${
                isSelected 
                  ? "text-primary font-semibold" 
                  : isDisabled 
                    ? "text-neutral/40" 
                    : "text-neutral group-hover:text-foreground"
              }`}>
                {weekdayShort}
              </span>
              <div className={`p-1 transition-all duration-200 ${
                isSelected 
                  ? "scale-105" 
                  : isDisabled 
                    ? "" 
                    : "hover:scale-105"
              }`}>
                <CircularProgress
                  value={plan ? plan.progress_percent : 0}
                  showLabel
                  label={date.getDate().toString()}
                  size={isSelected ? 44 : 38}
                  isDate={true}
                  className={isSelected ? "text-primary" : isDisabled ? "text-neutral/30" : "text-neutral"}
                  progressClassName={plan ? undefined : "text-white/10"}
                  labelClassName={isToday ? "text-white font-bold" : isDisabled ? "text-white/35" : ""}
                />
              </div>
            </button>
          );
        })}
      </div>

      <Button
        variant="nav"
        className="rounded-full! justify-center p-2 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onNextDay}
        disabled={isNextDisabled}
        active={!isNextDisabled}
        hover={!isNextDisabled}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
