"use client";

import React, { useState, useEffect } from "react";
import { Layers } from "lucide-react";
import { TestRoomHeader } from "./TestRoomHeader";
import { Question } from "./Question";
import { QuestionType, mockQuestions } from "./mockQuestions";
import { TestSubmissionModal } from "./TestSubmissionModal";
import { TestDetailedResult } from "./TestDetailedResult";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/ScrollArea";

type TestRoomProps = {
  questions?: QuestionType[];
  title?: string;
  onExit: () => void;
};

export const TestRoom = ({ questions: propQuestions, title: propTitle, onExit }: TestRoomProps) => {
  const questions = propQuestions && propQuestions.length > 0 ? propQuestions : mockQuestions;
  const title = propTitle || "TypeScript Advanced Patterns";

  // --- STATE ---
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
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
  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setTimeRemaining(2700);
    setIsSubmitted(false);
  };

  // --- COMPUTED STATS ---
  const totalQuestions = questions.length;

  const answeredCount = Object.keys(answers).filter(
    (key) =>
      answers[Number(key)] !== null && answers[Number(key)] !== undefined,
  ).length;

  const leftCount = totalQuestions - answeredCount;

  // Format time elapsed
  const timeTaken = 2700 - timeRemaining;

  const scrollToQuestion = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // --- SUBMITTED / RESULTS DASHBOARD ---
  if (isSubmitted) {
    return (
      <TestDetailedResult
        questions={questions}
        answers={answers}
        timeTaken={timeTaken}
        onRetake={handleRetake}
        onExit={onExit}
      />
    );
  }

  // --- ACTIVE EXAM ENVIRONMENT ---
  return (
    <ScrollArea className=" space-y-6 flex flex-col">
      {/* Top Header Row */}
      <TestRoomHeader
        title={title}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        timeRemaining={timeRemaining}
        onSubmitClick={() => setIsModalOpen(true)}
      />

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start w-full max-w-7xl mx-auto">
        {/* Left Section: Continuous Questions List */}
        <div className="col-span-1 lg:col-span-3 space-y-6 flex flex-col">
          {questions.map((question, index) => (
            <div
              key={question.id || index}
              id={`question-${index}`}
              className="scroll-mt-6"
            >
              <Question
                question={question}
                questionNumber={index + 1}
                totalQuestions={totalQuestions}
                selectedOptionIndex={answers[index] ?? null}
                onSelectOption={(optionIndex) =>
                  handleSelectOption(index, optionIndex)
                }
              />
            </div>
          ))}
        </div>

        {/* Right Section: Palette sidebar */}
        <div className="col-span-1 space-y-6 lg:sticky lg:top-22">
          <div className="bg-card border border-border p-5 rounded-xl space-y-6">
            {/* Palette Header */}
            <div className="flex items-center gap-2 text-neutral border-b border-border/60 pb-3 select-none">
              <Layers className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Question Palette
              </span>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => {
                const isAnswered =
                  answers[index] !== null && answers[index] !== undefined;

                return (
                  <button
                    key={index}
                    onClick={() => scrollToQuestion(index)}
                    className={clsx(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-300 border cursor-pointer",
                      isAnswered
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-md shadow-emerald-500/5"
                        : "border-border text-neutral hover:bg-card-hover",
                    )}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Palette Stats blocks */}
            <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-4">
              <div className="bg-card-hover/20 border border-border/80 p-2.5 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-emerald-400">
                  {answeredCount}
                </span>
                <span className="text-[10px] text-neutral uppercase font-bold">
                  Answered
                </span>
              </div>
              <div className="bg-card-hover/20 border border-border/80 p-2.5 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-neutral">
                  {leftCount}
                </span>
                <span className="text-[10px] text-neutral uppercase font-bold">
                  Unanswered
                </span>
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
          left: leftCount,
        }}
      />
    </ScrollArea>
  );
};
export default TestRoom;
