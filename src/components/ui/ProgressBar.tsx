import clsx from "clsx";

type ProgressBarProps = {
  value: number;
};

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between ">
        <div className="text-neutral">Progress</div>
        <div className="text-neutral">{value} %</div>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={clsx("h-full rounded-full transition-all duration-300", value===100? "bg-accent2": "bg-primary")}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
