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
  move: "hover:-translate-1 hover:shadow-[10px_10px_20px_var(--shadow)]!",
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
