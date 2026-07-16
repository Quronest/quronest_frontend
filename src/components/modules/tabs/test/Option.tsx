import React from "react";
import clsx from "clsx";

type OptionProps = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
};

export const Option = ({ text, isSelected, onClick }: OptionProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "cursor-pointer rounded-xl border p-4 transition-all duration-300 flex items-center gap-4 select-none",
        isSelected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card hover:bg-card-hover hover:border-neutral/30 text-foreground/90",
      )}
    >
      {/* Radio Circle */}
      <div
        className={clsx(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
          isSelected ? "border-primary" : "border-neutral/40 bg-transparent",
        )}
      >
        <div
          className={clsx(
            "w-2.5 h-2.5 rounded-full bg-primary transition-all duration-300 scale-0",
            isSelected && "scale-100",
          )}
        />
      </div>

      {/* Option Text */}
      <span className="text-base font-medium">{text}</span>
    </div>
  );
};
