"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  minHeight?: number;
  maxHeight?: number;
};

export const TextArea = ({
  minHeight = 64,
  maxHeight = 200,
  className,
  value,
  ...props
}: TextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reset height to recalculate
    el.style.height = `${minHeight}px`;

    const scrollHeight = el.scrollHeight;

    if (scrollHeight > maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
    } else {
      el.style.height = `${scrollHeight}px`;
      el.style.overflowY = "hidden";
    }
  }, [value, minHeight, maxHeight]);

  return (
    <textarea
      ref={ref}
      value={value}
      className={clsx(
        "w-full resize-none bg-transparent outline-none p-2 px-4 rounded-xl text-md",
        className,
      )}
      {...props}
    />
  );
};
