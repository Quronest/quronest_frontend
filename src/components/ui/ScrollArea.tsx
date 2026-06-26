"use client";

import clsx from "clsx";
import React, { forwardRef } from "react";

type ScrollAreaProps = {
  direction?: "vertical" | "horizontal" | "both";
  className?: string;
  children: React.ReactNode;
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ direction = "vertical", className, children }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={clsx(
          "w-full h-full",
          // Scroll behavior
          direction === "vertical" && "overflow-y-auto overflow-x-hidden",
          direction === "horizontal" && "overflow-x-auto overflow-y-hidden",
          direction === "both" && "overflow-auto",

          // Scrollbar styling (optional but recommended)
          "scrollbar-thin scrollbar-thumb-card-hover scrollbar-track-transparent",

          className,
        )}
      >
        {children}
      </div>
    );
  },
);
