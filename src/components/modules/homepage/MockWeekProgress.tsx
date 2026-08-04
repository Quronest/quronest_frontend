import Button from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DailyPlanDto } from "@/store/features/user/userType";

interface MockWeekProgressProps {
  weekDates: Date[];
  dailyPlans: DailyPlanDto[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
}

const formatToLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const MockWeekProgress = ({
  weekDates,
  dailyPlans,
  selectedDate,
  onSelectDate,
  onPrevDay,
  onNextDay,
}: MockWeekProgressProps) => {
  const selectedStr = formatToLocalDateString(selectedDate);
  const todayStr = formatToLocalDateString(new Date());

  return (
    <div className="flex items-center justify-between mx-auto max-w-2xl w-full px-4">
      <Button
        variant="nav"
        className="rounded-full! justify-center p-2 hover:bg-white/5 transition-colors"
        onClick={onPrevDay}
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

          return (
            <div
              key={dateStr}
              onClick={() => onSelectDate(date)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-colors ${
                isSelected ? "text-primary font-semibold" : "text-neutral group-hover:text-foreground"
              }`}>
                {weekdayShort}
              </span>
              <div className={`p-1 transition-all duration-200 ${
                isSelected 
                  ? "scale-105" 
                  : "hover:scale-105"
              } ${
                isToday ? "border-b-2 border-primary pb-0.5" : ""
              }`}>
                <CircularProgress
                  value={plan ? plan.progress_percent : 0}
                  showLabel
                  label={date.getDate().toString()}
                  size={isSelected ? 44 : 38}
                  isDate={true}
                  className={isSelected ? "text-primary" : "text-neutral"}
                  progressClassName={plan ? undefined : "text-white/10"}
                  labelClassName={isToday ? "text-white font-bold" : ""}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="nav"
        className="rounded-full! justify-center p-2 hover:bg-white/5 transition-colors"
        onClick={onNextDay}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

