"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
};

export const Select = ({ onChange, options, value }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  //   deriving selected state
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const index = options.findIndex((option) => option.value === value);
    setHighlightedIndex(index >= 0 ? index : 0);
  }, [value, options]);

  //   handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // helper function to skip disabled option
  const getNextEnabledIndex = (start: number, direction: 1 | -1) => {
    let newIndex = start;

    for (let i = 0; i < options.length; i++) {
      newIndex = (newIndex + direction + options.length) % options.length;

      if (!options[newIndex].disabled) {
        return newIndex;
      }
    }

    return start;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => getNextEnabledIndex(prev, 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => getNextEnabledIndex(prev, -1));
    }

    if (e.key === "Enter") {
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
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={clsx(
          "p-2 px-4 h-15 min-w-50 ",
          "flex items-center justify-between",
          "hover:bg-card border border-neutral rounded-lg outline-none",
          isOpen && "border-primary/80 bg-card",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
          handleKeyDown(e)
        }
      >
        {selectedOption ? selectedOption.label : "Select..."}
        <ChevronDown />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={clsx(
            "min-w-50 p-2 ",
            "absolute top-17 flex flex-col gap-2 ",
            "rounded-md border border-primary/50 bg-background ",
          )}
        >
          {options.map((option, index) => (
            <li
              role="option"
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => {
                if (option.disabled) return;
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => {
                !option.disabled && setHighlightedIndex(index);
              }}
              className={clsx(
                "rounded-sm px-3 py-1 cursor-pointer",
                option?.value === selectedOption?.value &&
                  "bg-primary text-white font-semibold",
                index === highlightedIndex &&
                  option.value !== selectedOption?.value &&
                  "bg-card-hover brightness-110",
                option.disabled &&
                  "opacity-50 brightness-75 cursor-not-allowed",
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
