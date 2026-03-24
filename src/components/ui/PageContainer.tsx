import clsx from "clsx";
import React from "react";

export const PageContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={clsx("max-w-7xl h-screen w-full mx-auto pt-10", className)}>{children}</div>;
};
