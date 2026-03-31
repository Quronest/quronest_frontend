import clsx from "clsx";
import { ClassValue } from "clsx";
import React from "react";

type LabelType = "neutral" | "secondary" | "primary" | "accent";

type TagType = {
  label: string;
  tagType?: LabelType;
};

const tags: Record<string, ClassValue> = {
  neutral: "text-neutral",
  accent: "text-blue-300/80",
  secondary: "text-violet-300/80",
  primary: "text-amber-300/80",
};

export const Tag = ({ label, tagType = "primary" }: TagType) => {
  return (
    <div
      className={clsx(
        "rounded-full w-fit text-sm px-3 h-5 opacity-60 flex items-center justify-center bg-white/5 border border-white/10",
        tags[tagType],
      )}
    >
      {label}
    </div>
  );
};
