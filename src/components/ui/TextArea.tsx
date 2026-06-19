"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  minHeight?: number;
  maxHeight?: number;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { minHeight = 64, maxHeight = 200, className, value, ...props },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const setRefs = (node: HTMLTextAreaElement | null) => {
      ref.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

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
        ref={setRefs}
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
