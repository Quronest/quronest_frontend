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
          className="h-full bg-accent2 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
