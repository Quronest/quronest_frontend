"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  Flame,
  Target,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/CircularProgress";

const overviewItems = [
  {
    icon: BriefcaseBusiness,
    label: "Current Phase",
    value: "Internship",
  },
  {
    icon: Users,
    label: "Current Group",
    value: "Frontend Engineering",
  },
  {
    icon: CalendarDays,
    label: "Started Date",
    value: "Jan 15, 2025",
  },
  {
    icon: Target,
    label: "Expected Completion",
    value: "Aug 30, 2025",
  },
  {
    icon: Flame,
    label: "Learning Streak",
    value: "34 Days",
  },
];

export default function JourneyOverview() {
  return (
    <Card hoverEffect="light" className="rounded-3xl border-border p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="flex flex-col items-center justify-center border-b border-border pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
          <CircularProgress
            value={73}
            size={170}
            strokeWidth={10}
            showLabel
            isDate={false}
            labelClassName="text-4xl font-bold text-foreground"
          />

          <h3 className="mt-6 text-xl font-semibold text-foreground">
            Journey Progress
          </h3>

          <p className="mt-2 text-sm text-neutral">Phase 5 of 6 Complete</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {overviewItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex flex-col justify-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral">
                    {item.label}
                  </span>
                </div>

                <p className="text-xl font-semibold leading-tight text-foreground">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
