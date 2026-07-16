"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { TestRoomHeader } from "./TestRoomHeader";
import { Question } from "./Question";
import { mockQuestions } from "./mockQuestions";
import { TestSubmissionModal } from "./TestSubmissionModal";
import { TestDetailedResult } from "./TestDetailedResult";
import clsx from "clsx";

type TestRoomProps = {
  onExit: () => void;
};

export const TestRoom = ({ onExit }: TestRoomProps) => {
  // --- STATE ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- TIMER EFFECT ---
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // --- ACTIONS ---
  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions({});
    setTimeRemaining(2700);
    setIsSubmitted(false);
  };

  // --- COMPUTED STATS ---
  const totalQuestions = mockQuestions.length;
  
  const answeredCount = Object.keys(answers).filter(
    (key) => answers[Number(key)] !== null && answers[Number(key)] !== undefined
  ).length;
  
  const flaggedCount = Object.keys(flaggedQuestions).filter(
    (key) => flaggedQuestions[Number(key)] === true
  ).length;

  const leftCount = totalQuestions - answeredCount;

  // Format time elapsed
  const timeTaken = 2700 - timeRemaining;

  // --- SUBMITTED / RESULTS DASHBOARD ---
  if (isSubmitted) {
    return (
      <TestDetailedResult
        questions={mockQuestions}
        answers={answers}
        timeTaken={timeTaken}
        onRetake={handleRetake}
        onExit={onExit}
      />
    );
  }

  // --- ACTIVE EXAM ENVIRONMENT ---
  const currentQuestion = mockQuestions[currentQuestionIndex];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 flex flex-col min-h-[500px]">
      {/* Top Header Row */}
      <TestRoomHeader
        title="TypeScript Advanced Patterns"
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        timeRemaining={timeRemaining}
        onSubmitClick={() => setIsModalOpen(true)}
      />

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Section: Current Question + Bottom Navigation */}
        <div className="col-span-1 lg:col-span-3 space-y-6 flex flex-col">
          {/* Active Question Panel */}
          <Question
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            selectedOptionIndex={answers[currentQuestionIndex] ?? null}
            isFlagged={!!flaggedQuestions[currentQuestionIndex]}
            onSelectOption={handleSelectOption}
            onToggleFlag={handleToggleFlag}
          />

          {/* Bottom Pagination controls */}
          <div className="flex items-center justify-between mt-2 select-none">
            {/* Prev Button */}
            <Button
              variant="outline"
              size="md"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="rounded-lg gap-2 text-sm border-border hover:bg-card-hover font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Quick Paginated Numbers List */}
            <div className="hidden sm:flex items-center gap-1.5">
              {mockQuestions.map((_, index) => {
                const isCurrent = index === currentQuestionIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={clsx(
                      "w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-200 border cursor-pointer",
                      isCurrent
                        ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                        : "border-border text-neutral hover:bg-card-hover hover:text-foreground"
                    )}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              variant="primary"
              size="md"
              disabled={currentQuestionIndex === totalQuestions - 1}
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="rounded-lg gap-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Section: Palette sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="bg-card border border-border p-5 rounded-xl space-y-6">
            {/* Palette Header */}
            <div className="flex items-center gap-2 text-neutral border-b border-border/60 pb-3 select-none">
              <Layers className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider">Question Palette</span>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-5 gap-2">
              {mockQuestions.map((_, index) => {
                const isCurrent = index === currentQuestionIndex;
                const isAnswered =
                  answers[index] !== null && answers[index] !== undefined;
                const isFlagged = !!flaggedQuestions[index];

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={clsx(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-300 border cursor-pointer",
                      isCurrent && "bg-primary border-primary text-white",
                      !isCurrent &&
                        isAnswered &&
                        "border-emerald-500 bg-emerald-500/10 text-emerald-400",
                      !isCurrent &&
                        !isAnswered &&
                        isFlagged &&
                        "border-amber-500 bg-amber-500/10 text-amber-400",
                      !isCurrent &&
                        !isAnswered &&
                        !isFlagged &&
                        "border-border text-neutral hover:bg-card-hover"
                    )}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend Indicators */}
            <div className="space-y-2 text-sm text-foreground/80 select-none border-t border-border/40 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-primary" />
                <span className="text-neutral">Current</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-500/60" />
                <span className="text-neutral">Answered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 border border-amber-500/60" />
                <span className="text-neutral">Flagged</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full border border-border" />
                <span className="text-neutral">Not visited</span>
              </div>
            </div>

            {/* Palette Stats blocks */}
            <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-4">
              <div className="bg-card-hover/20 border border-border/80 p-2.5 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-emerald-400">{answeredCount}</span>
                <span className="text-[10px] text-neutral uppercase font-bold">Done</span>
              </div>
              <div className="bg-card-hover/20 border border-border/80 p-2.5 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-neutral">{leftCount}</span>
                <span className="text-[10px] text-neutral uppercase font-bold">Left</span>
              </div>
              <div className="bg-card-hover/20 border border-border/80 p-2.5 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-amber-400">{flaggedCount}</span>
                <span className="text-[10px] text-neutral uppercase font-bold">Flagged</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      <TestSubmissionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        stats={{
          answered: answeredCount,
          flagged: flaggedCount,
          left: leftCount,
        }}
      />
    </div>
  );
};
export default TestRoom;
