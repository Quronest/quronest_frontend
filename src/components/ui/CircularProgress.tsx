"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type CircularProgressProps = {
  value: number; // 0–100
  size?: number; // px
  label?: string;
  strokeWidth?: number;
  className?: string;
  trackClassName?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
  isDate?: boolean;
};

export const CircularProgress = ({
  value,
  label,
  size = 50,
  strokeWidth = 6,
  className,
  trackClassName,
  progressClassName,
  labelClassName,
  showLabel = false,
  isDate = true,
}: CircularProgressProps) => {
  const safeValue = Math.min(100, Math.max(0, value));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference * (1 - safeValue / 100);

  return (
    <div className={clsx(className, "cursor-pointer")}>
      <div
        className={clsx("relative inline-flex items-center justify-center")}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size}>
          {/* Track */}
          <circle
            className={clsx("text-white/10", trackClassName)}
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />

          {/* Progress */}
          <circle
            className={clsx(
              safeValue === 100 ? "text-accent2" : "text-primary",
              progressClassName,
            )}
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: "stroke-dashoffset 0.35s ease",
            }}
          />
        </svg>

        {showLabel && (
          <span
            className={clsx(
              "absolute text-xs font-semibold text-white/80 z-100",
              labelClassName,
            )}
          >
            {label ? label : safeValue}{!isDate && "%"}
          </span>
        )}
      </div>
    </div>
  );
};
