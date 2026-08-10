"use client";

import clsx from "clsx";
import { Bot } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex max-w-xl flex-col items-center text-center">
      <div
        className={clsx(
          "mb-8 flex h-20 w-20 items-center justify-center rounded-3xl",
          "border border-border bg-card",
        )}
      >
        <Bot className="h-10 w-10 text-primary" />
      </div>

      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Queronest Assistant
      </h1>

      <p className="mt-4 max-w-md text-sm leading-7 text-neutral">
        Ask anything about coding, debugging, interview preparation, roadmaps,
        projects, or your learning journey.
      </p>
    </div>
  );
}
