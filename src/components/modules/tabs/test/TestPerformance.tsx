import { CalendarDays, TrendingUp } from "lucide-react";

export const TestPerformance = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 text-neutral mb-6">
        <TrendingUp className="h-5 w-5" />
        <span>YOUR PERFORMANCE</span>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <PerformanceStat label="Attempts" value="4" />
        <PerformanceStat label="Avg. Score" value="74%" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral">Best attempt progress</span>
          <span className="text-primary font-medium">85%</span>
        </div>

        <ProgressBar value={85} />
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-neutral">
        <CalendarDays className="h-4 w-4" />
        <span>Last attempt: July 12, 2026</span>
      </div>
    </div>
  );
};

type PerformanceStatProps = {
  label: string;
  value: string;
};

const PerformanceStat = ({ label, value }: PerformanceStatProps) => (
  <div className="space-y-1">
    <p className="text-neutral text-sm">{label}</p>
    <h3 className="text-3xl font-semibold">{value}</h3>
  </div>
);

type ProgressBarProps = {
  value: number;
};

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="h-2 w-full rounded-full bg-card-hover overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
