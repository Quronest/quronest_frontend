import { clsx } from "clsx";
import { HTMLAttributes } from "react";

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function Label({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: LabelProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium",
        {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-base": size === "lg",

          "text-primary": variant === "primary",
          "text-foreground": variant === "secondary",
          "text-emerald-400": variant === "success",
          "text-red-400": variant === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}