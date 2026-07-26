"use client";

import clsx from "clsx";

import { Card } from "@/components/ui/Card";

type TimelineCardProps = {
  title: string;
  description: string;
  date: string;
  align: "left" | "right";
};

export default function TimelineCard({
  title,
  description,
  date,
  align,
}: TimelineCardProps) {
  const isLeft = align === "left";

  const card = (
    <Card
      hoverEffect="light"
      className={clsx(
        "w-full max-w-140 rounded-[28px] p-6 border",
        isLeft
          ? "border-border border-r-4 border-r-primary"
          : "border-border border-l-4 border-l-primary",
      )}
    >
      <div
        className={clsx(
          "flex items-start gap-6",
          isLeft ? "flex-row-reverse justify-between" : "justify-between",
        )}
      >
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>

        <span className="shrink-0 text-sm text-neutral">{date}</span>
      </div>

      <p
        className={clsx(
          "mt-4 text-sm leading-7 text-neutral",
          isLeft && "text-right",
        )}
      >
        {description}
      </p>
    </Card>
  );

  return (
    <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_80px_1fr] lg:items-center">
      {/* Left */}
      <div className="hidden justify-end pr-8 lg:flex">
        {isLeft ? card : null}
      </div>

      {/* Center */}
      <div className="relative hidden h-full items-center justify-center lg:flex">
        <div
          className={clsx(
            "absolute top-1/2 h-0.5 w-8 -translate-y-1/2 bg-border",
            isLeft ? "left-0" : "right-0",
          )}
        />

        <div className="z-10 h-5 w-5 rounded-full border-4 border-background bg-primary" />
      </div>

      {/* Right */}
      <div className="hidden justify-start pl-8 lg:flex">
        {!isLeft ? card : null}
      </div>

      {/* Mobile */}
      <div className="lg:hidden">{card}</div>
    </div>
  );
}
