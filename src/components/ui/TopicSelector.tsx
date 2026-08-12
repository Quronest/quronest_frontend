"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Check, Plus } from "lucide-react";

import Button from "@/components/ui/Button";

export type TopicOption = {
  label: string;
  value: string;
};

type TopicSelectorProps = {
  options: (string | TopicOption)[];
  selectedTopic?: string | null;
  onSelectTopic: (topic: string | null) => void;
  placeholder?: string;
  buttonClassName?: string;
  menuClassName?: string;
};

export function TopicSelector({
  options,
  selectedTopic,
  onSelectTopic,
  placeholder = "Choose topic",
  buttonClassName,
  menuClassName,
}: TopicSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: TopicOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-border/70 bg-card-hover px-3.5 text-xs font-medium text-foreground/80 transition-all hover:bg-card hover:text-foreground cursor-pointer",
          buttonClassName,
        )}
      >
        <Plus size={15} className="shrink-0 text-primary" />
        <span>{placeholder}</span>
      </Button>

      {isOpen && (
        <div
          className={clsx(
            "absolute bottom-full left-0 mb-2 z-50 w-56 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-2xl backdrop-blur-xl",
            menuClassName,
          )}
        >
          <div className="border-b border-border/40 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral">
              Select Topic
            </p>
          </div>

          <div className="max-h-60 space-y-0.5 overflow-y-auto py-1">
            {normalizedOptions.map((option) => {
              const isSelected = selectedTopic === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSelectTopic(option.value);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs transition-all",
                    isSelected
                      ? "bg-primary font-medium text-white"
                      : "text-foreground/90 hover:bg-card-hover hover:text-foreground",
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check size={14} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicSelector;
