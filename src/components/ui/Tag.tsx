import clsx from "clsx";
import { ClassValue } from "clsx";
import React from "react";

type LabelType = "Docs" | "Practice" | "Build" | "Test";

const tags: Record<string, ClassValue> = {
  Docs: "text-neutral",
  Build: "text-blue-300/80",
  Practice: "text-violet-300/80",
  Test: "text-amber-300/80",
};

export const Tag = ({ label }: { label: LabelType }) => {
  return (
    <div
      className={clsx(
        "rounded-full w-15 text-sm px-3 h-5 opacity-60 flex items-center justify-center bg-white/5 border border-white/10",
        tags[label],
      )}
    >
      {label}
    </div>
  );
};
