import clsx from "clsx";
import React from "react";

type TestOverviewHeaderProps = {
  level: string;
  title: string;
  description: string;
};

export const TestOverviewHeader = ({
  level,
  title,
  description,
}: TestOverviewHeaderProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-neutral text-lg">{description}</p>
    </div>
  );
};
