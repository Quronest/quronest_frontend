import clsx, { ClassValue } from "clsx";
import React from "react";

type HoverEffects = "move" | "light" | "none";

type CardProp = {
  hoverEffect?: HoverEffects;
  className?: string;
  children: React.ReactNode;
  border?: "primary" | "neutral" | "transparent";
};

const hoverEffects: Record<HoverEffects, ClassValue> = {
  move: "hover:-translate-1 hover:shadow-[5px_5px_30px_var(--shadow)]! bg-transparent!",
  light: "hover:bg-card-hover",
  none: "",
};

const borderVariants: Record<string, ClassValue> = {
  primary: "border-primary",
  neutral: "border-neutral",
  transparent: "border-transparent",
};

export const Card = ({
  hoverEffect = "none",
  className,
  children,
  border = "transparent",
}: CardProp) => {
  return (
    <div
      className={clsx(
        `p-4 rounded-lg border bg-card`,
        `transition-all duration-300`,
        hoverEffects[hoverEffect],
        borderVariants[border],
        className,
      )}
    >
      {children}
    </div>
  );
};
