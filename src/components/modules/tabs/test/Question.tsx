import React from "react";
import { Option } from "./Option";
import { Tag } from "@/components/ui/Tag";
import clsx from "clsx";
import { MarkdownRenderer } from "../reading/MarkdownRenderer";
import { McqQuestion, QuizQuestionType } from "@/types/TaskType";

type QuestionProps = {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: number | null;
  onSelectOption: (optionIndex: number) => void;
  topic?: string;
};

export const Question = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  topic,
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
          <Tag label="Single Choice" tagType="secondary" />
          <Tag label={topic || "Quiz"} tagType="neutral" />
        </div>
      </div>

      {/* Question Body */}
      <div
        className={clsx(
          "prose prose-invert w-full prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0",
          " max-w-none text-lg leading-relaxed text-foreground/90",
        )}
      >
        <MarkdownRenderer markdown={question.title} showCopyButton={false} />
      </div>

      {/* Options Stack */}
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <Option
            key={option.id}
            text={option.text}
            isSelected={selectedOptionId === option.id}
            onClick={() => onSelectOption(option.id)}
          />
        ))}
      </div>
    </div>
  );
};
