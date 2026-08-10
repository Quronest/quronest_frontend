"use client";

import clsx from "clsx";
import React, { forwardRef } from "react";

type ScrollAreaProps = React.ComponentPropsWithoutRef<"div"> & {
  direction?: "vertical" | "horizontal" | "both";
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ direction = "vertical", className, children, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={clsx(
          "w-full h-full",
          // Scroll behavior
          direction === "vertical" && "overflow-y-auto overflow-x-hidden",
          direction === "horizontal" && "overflow-x-auto overflow-y-hidden",
          direction === "both" && "overflow-auto",

        "scrollbar-thin scrollbar-thumb-card-hover scrollbar-track-transparent",

          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
