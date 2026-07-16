import clsx from "clsx";
import React from "react";

type TestOverviewHeaderProps = {
  level: string;
  title: string;
  description: string;
};

const testLevel: Record<string, Record<string, string>> = {
  easy: {
    label: "EASY",
    className: "text-green-300 border border-green-300 bg-green-50/20",
  },
  medium: {
    label: "MEDIUM",
    className: "text-yellow-300 border border-yellow-300 bg-yellow-50/20",
  },
  hard: {
    label: "HARD",
    className: "text-red-300 border border-red-300 bg-red-50/20",
  },
};

export const TestOverviewHeader = ({
  level,
  title,
  description,
}: TestOverviewHeaderProps) => {
  return (
    <div className="space-y-2">
      {/* Level tag */}
      <div
        className={clsx("px-3 py-0 w-fit h-fit rounded-full text-sm", testLevel[level].className)}
      >
        {testLevel[level].label}
      </div>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-neutral text-lg">{description}</p>
    </div>
  );
};
