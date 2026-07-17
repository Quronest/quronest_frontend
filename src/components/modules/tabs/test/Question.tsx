import React from "react";
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
  onSelectOption: (optionIndex: number) => void;
};

export const Question = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionIndex,
  onSelectOption,
}: QuestionProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Question Header: Tags */}
      <div className="flex items-center">
        <div className="flex flex-wrap items-center gap-2">
          {/* Custom Pill for Question Number */}
          <div className="bg-primary/15 border border-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full">
            Q{questionNumber} / {totalQuestions}
          </div>
          <Tag label={question.type} tagType="secondary" />
          <Tag label={question.topic} tagType="neutral" />
        </div>
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
