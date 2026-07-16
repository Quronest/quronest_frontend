import React from "react";
import { Flag } from "lucide-react";
import { Option } from "./Option";
import { QuestionType } from "./mockQuestions";
import { MarkdownRenderer } from "@/components/modules/tabs/resource/MarkdownRenderer";
import { Tag } from "@/components/ui/Tag";
import clsx from "clsx";

type QuestionProps = {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionIndex: number | null;
  isFlagged: boolean;
  onSelectOption: (optionIndex: number) => void;
  onToggleFlag: () => void;
};

export const Question = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionIndex,
  isFlagged,
  onSelectOption,
  onToggleFlag,
}: QuestionProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Question Header: Tags & Flag */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Custom Pill for Question Number */}
          <div className="bg-primary/15 border border-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full">
            Q{questionNumber} / {totalQuestions}
          </div>
          <Tag label={question.type} tagType="secondary" />
          <Tag label={question.topic} tagType="neutral" />
        </div>

        {/* Flag Button */}
        <button
          onClick={onToggleFlag}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-300 cursor-pointer select-none",
            isFlagged
              ? "border-amber-500 bg-amber-500/10 text-amber-400"
              : "border-border text-neutral hover:bg-card-hover hover:text-foreground",
          )}
        >
          <Flag
            className={clsx("h-4 w-4 transition-all duration-300", isFlagged && "fill-amber-400")}
          />
          <span>{isFlagged ? "Flagged" : "Flag"}</span>
        </button>
      </div>

      {/* Question Body */}
      <div className="prose prose-invert max-w-none text-lg leading-relaxed text-foreground/90">
        <MarkdownRenderer markdown={question.question} />
      </div>

      {/* Options Stack */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <Option
            key={index}
            text={option}
            isSelected={selectedOptionIndex === index}
            onClick={() => onSelectOption(index)}
          />
        ))}
      </div>
    </div>
  );
};
