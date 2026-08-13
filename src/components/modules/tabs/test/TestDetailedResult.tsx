"use client";

import React from "react";
import {
  Sparkles,
  RotateCcw,
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/CircularProgress";
import clsx from "clsx";
import { MarkdownRenderer } from "../reading/MarkdownRenderer";
import { McqQuestion } from "@/types/TaskType";


export type TestDetailedResultProps = {
  questions: McqQuestion[];
  answers: Record<number, number | null>;
  timeTaken: number;
  onRetake: () => void;
  onExit: () => void;
  topic?: string;
};

export const TestDetailedResult = ({
  questions,
  answers,
  timeTaken,
  onRetake,
  onExit,
  topic,
}: TestDetailedResultProps) => {
  // --- COMPUTED STATS ---
  const totalQuestions = questions.length;

  const answeredCount = Object.keys(answers).filter(
    (key) => answers[Number(key)] !== null && answers[Number(key)] !== undefined
  ).length;

  // Grade compilation (verifies if the chosen option ID matches the correct solution ID)
  const correctCount = questions.reduce((acc, question, index) => {
    const userAnswerIndex = answers[index];
    const isUserCorrect =
      userAnswerIndex !== null &&
      userAnswerIndex !== undefined &&
      question.options[userAnswerIndex]?.id === question.solution.id;
    return isUserCorrect ? acc + 1 : acc;
  }, 0);

  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isPassed = scorePercent >= 70;

  // Format time elapsed
  const formatMinutesSeconds = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 select-none p-2 animate-fade-in">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Quiz Results
          </h1>
          <p className="text-neutral text-sm">
            {topic || "Quiz"} • Review your answers and explanations below.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={onRetake}
            className="rounded-lg gap-2 text-sm border-border hover:bg-card-hover font-semibold cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
        </div>
      </div>

      {/* Results Card Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card border border-border p-6 rounded-2xl">
        {/* Left Circular Gauge */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
          <CircularProgress
            value={scorePercent}
            size={140}
            strokeWidth={10}
            showLabel={true}
            isDate={false}
            labelClassName="text-2xl font-extrabold"
          />
          <span className="text-neutral text-sm mt-3 font-medium">Your Final Score</span>
        </div>

        {/* Center Details */}
        <div className="col-span-2 flex flex-col justify-center space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-neutral text-xs uppercase font-bold tracking-wider">Status</span>
              <div>
                <span
                  className={clsx(
                    "px-3 py-1 rounded-full text-sm font-bold border inline-block",
                    isPassed
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
                      : "text-red-400 bg-red-500/10 border-red-500/25"
                  )}
                >
                  {isPassed ? "PASSED" : "FAILED"}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-neutral text-xs uppercase font-bold tracking-wider">Correct Answers</span>
              <p className="text-xl font-bold text-foreground">
                {correctCount} / {totalQuestions}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral text-xs uppercase font-bold tracking-wider">Time Taken</span>
              <p className="text-xl font-bold text-foreground">{formatMinutesSeconds(timeTaken)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral text-xs uppercase font-bold tracking-wider">Passing Score</span>
              <p className="text-xl font-bold text-neutral">70%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Question-by-Question Detailed Review */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
          <Layers className="h-5 w-5 text-neutral" />
          Detailed Review
        </h2>

        <div className="space-y-6">
          {questions.map((question, qIdx) => {
            const userAnswer = answers[qIdx];
            const isCorrect =
              userAnswer !== null &&
              userAnswer !== undefined &&
              question.options[userAnswer]?.id === question.solution.id;

            return (
              <div
                key={question.id}
                className={clsx(
                  "border rounded-2xl p-6 bg-card/60 transition-all duration-300",
                  isCorrect ? "border-emerald-500/20" : "border-red-500/20"
                )}
              >
                {/* Top Stats */}
                <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-neutral">
                      Question {qIdx + 1}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-neutral rounded-md">
                      {topic || "Quiz"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Correct</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                        <XCircle className="h-4 w-4" />
                        <span>Incorrect</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Question Body */}
                <div className="prose prose-invert max-w-none text-base mb-6 text-foreground/95">
                  <MarkdownRenderer markdown={question.title} />
                </div>

                {/* Options List */}
                <div className="flex flex-col gap-3">
                  {question.options.map((option, optIdx) => {
                    const isCorrectOption = option.id === question.solution.id;
                    const isUserSelected = optIdx === userAnswer;

                    return (
                      <div
                        key={option.id}
                        className={clsx(
                          "rounded-xl border p-4 flex items-center gap-4 text-sm font-medium transition-all duration-300",
                          isCorrectOption && "border-emerald-500 bg-emerald-500/10 text-emerald-400",
                          isUserSelected && !isCorrectOption && "border-red-500 bg-red-500/10 text-red-400",
                          !isCorrectOption && !isUserSelected && "border-border bg-card/20 text-neutral"
                        )}
                      >
                        {/* Mini Indicator icon */}
                        <div
                          className={clsx(
                            "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                            isCorrectOption && "border-emerald-500 text-emerald-500",
                            isUserSelected && !isCorrectOption && "border-red-500 text-red-500",
                            !isCorrectOption && !isUserSelected && "border-neutral/30 bg-transparent"
                          )}
                        >
                          {isCorrectOption && <CheckCircle2 className="h-4 w-4 fill-emerald-500/10" />}
                          {isUserSelected && !isCorrectOption && <XCircle className="h-4 w-4 fill-red-500/10" />}
                          {!isCorrectOption && !isUserSelected && <div className="w-1.5 h-1.5 rounded-full bg-transparent" />}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation block */}
                <div className="mt-5 p-4 rounded-xl border border-border bg-card-hover/20 space-y-2">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <span>Explanation</span>
                  </div>
                  <div className="text-sm leading-relaxed text-foreground/80">
                    <MarkdownRenderer markdown={question.explanation} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
