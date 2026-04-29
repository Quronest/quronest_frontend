"use client";

import React from "react";
import clsx from "clsx";

type TabContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const TabContainer = ({
  children,
  className,
  ...props
}: TabContainerProps) => {
  return (
    <div
      className={clsx("flex h-full w-full min-h-0 flex-col p-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};
