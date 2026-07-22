"use client";

import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const Select = ({
  options,
  value,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    const index = options.findIndex(
      (option) => option.value === value
    );

    setHighlightedIndex(index >= 0 ? index : 0);
  }, [value, options]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  const getNextEnabledIndex = (
    start: number,
    direction: 1 | -1
  ) => {
    let newIndex = start;

    for (let i = 0; i < options.length; i++) {
      newIndex =
        (newIndex + direction + options.length) %
        options.length;

      if (!options[newIndex].disabled) {
        return newIndex;
      }
    }

    return start;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          getNextEnabledIndex(prev, 1)
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          getNextEnabledIndex(prev, -1)
        );
        break;

      case "Enter":
      case " ":
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else {
          const option = options[highlightedIndex];

          if (option && !option.disabled) {
            onChange(option.value);
            setIsOpen(false);
          }
        }
        break;

      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={clsx(
          "inline-flex h-11 items-center gap-2",
          "rounded-lg border border-neutral",
          "bg-background",
          "px-5",
          "text-sm font-medium",
          "transition-all duration-200",
          "outline-none",
          "hover:border-primary/40 hover:bg-card",
          "focus:ring-2 focus:ring-primary/30",
          isOpen &&
            "border-primary bg-card ring-2 ring-primary/20"
        )}
      >
        <span className="whitespace-nowrap">
          {selectedOption?.label ?? "Select..."}
        </span>

        <ChevronDown
          size={18}
          className={clsx(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={clsx(
            "absolute left-0 top-full z-50 mt-2",
            "min-w-full",
            "max-h-64 overflow-y-auto",
            "rounded-xl border border-neutral",
            "bg-background p-1",
            "shadow-xl"
          )}
        >
          {options.map((option, index) => {
            const selected = option.value === value;
            const highlighted =
              highlightedIndex === index;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={selected}
                onMouseEnter={() =>
                  !option.disabled &&
                  setHighlightedIndex(index)
                }
                onClick={() => {
                  if (option.disabled) return;

                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={clsx(
                  "flex cursor-pointer items-center justify-between rounded-lg",
                  "px-3 py-2 text-sm transition-colors",
                  selected &&
                    "bg-primary text-primary-foreground",
                  highlighted &&
                    !selected &&
                    "bg-card",
                  option.disabled &&
                    "cursor-not-allowed opacity-40"
                )}
              >
                <span>{option.label}</span>

                {selected && (
                  <Check
                    size={16}
                    strokeWidth={2.5}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};