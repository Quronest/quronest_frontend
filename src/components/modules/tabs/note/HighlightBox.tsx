import clsx from "clsx";
import { Quote } from "lucide-react";

type HighlightBoxProps = {
  text: string;
  className?: string;
};

export const HighlightBox = ({ text, className }: HighlightBoxProps) => {
  return (
    <div
      className={clsx(
        "inline-flex max-w-full items-start gap-2 rounded-t-xl",
        "bg-background/45 px-3 py-1.5 text-xs text-primary/90",
        className,
      )}
    >
      <Quote size={14} className="mt-0.5 shrink-0" />
      <p className="line-clamp-1">{text}</p>
    </div>
  );
};
