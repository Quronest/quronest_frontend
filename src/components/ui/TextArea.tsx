"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  minHeight?: number;
  maxHeight?: number;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ minHeight = 64, maxHeight = 200, className, value, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

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
        ref={(node) => {
          innerRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        value={value}
        className={clsx(
          "w-full resize-none bg-transparent outline-none p-2 px-4 rounded-xl text-md",
          className,
        )}
        {...props}
      />
    );
  },
);
