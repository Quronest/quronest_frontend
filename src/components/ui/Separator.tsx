import clsx from "clsx";

export const Separator = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <div className={clsx("w-full flex items-center gap-3 mb-3", className)}>
      <div className="flex-1 h-px bg-neutral" />

      {text && (
        <span className="text-xs font-medium tracking-wide text-muted-foreground whitespace-nowrap">
          {text}
        </span>
      )}

      <div className="flex-1 h-px bg-neutral" />
    </div>
  );
};