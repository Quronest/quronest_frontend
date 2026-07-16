import clsx from "clsx";
import React from "react";

type TopicsCoveredProps = {
  topics: string[];
  className?: string;
};

export const TopicsCovered = ({ topics, className }: TopicsCoveredProps) => {
  return (
    <div
      className={clsx("bg-card border border-border rounded-xl p-5", className)}
    >
      <h3 className="text-neutral uppercase tracking-wider mb-4">
        Topics Covered
      </h3>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <TopicBadge key={topic} label={topic} />
        ))}
      </div>
    </div>
  );
};

type TopicBadgeProps = {
  label: string;
};

const TopicBadge = ({ label }: TopicBadgeProps) => (
  <span className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-sm text-neutral">
    {label}
  </span>
);
