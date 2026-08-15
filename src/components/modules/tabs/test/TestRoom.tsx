"use client";

import React, { useState, useEffect } from "react";
import { Layers } from "lucide-react";
import { TestRoomHeader } from "./TestRoomHeader";
import { Question } from "./Question";
import { TestSubmissionModal } from "./TestSubmissionModal";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { DailyTaskType, QuizTaskContentType } from "@/types/TaskType";
import { QuizSubmitResponseType } from "@/types/QuizTaskType";
import { useSubmitQuizMutation } from "@/store/features/task/taskApi";

type TestRoomProps = {
  quizTaskData: DailyTaskType;
  onQuizSubmit: (quizSubmitResponse: QuizSubmitResponseType) => void;
  taskId: string;
};

export const TestRoom = ({
  quizTaskData,
  onQuizSubmit,
  taskId,
}: TestRoomProps) => {
  const [triggerQuizSubmit, { isLoading: isSubmittingQuiz }] =
    useSubmitQuizMutation();

  const quizTaskContent = quizTaskData.content as QuizTaskContentType;
  // --- STATE ---
  const totalSeconds = quizTaskData.expected_total_time
    ? quizTaskData.expected_total_time * 60
    : 2700;
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answersRecord, setAnswersRecord] = useState<Record<number, number>[]>(
    [],
  );

  // Sync initial timer value if duration changes
  useEffect(() => {
    setTimeRemaining(totalSeconds);
  }, [totalSeconds]);

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
  const handleSelectOption = (questionId: number, optionId: number) => {
    const exists = answersRecord.some((record) => questionId in record);
    if (exists) {
      setAnswersRecord((prev) =>
        prev.map((record) =>
          questionId in record ? { [questionId]: optionId } : record,
        ),
      );
    } else {
      setAnswersRecord((prev) => [...prev, { [questionId]: optionId }]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await triggerQuizSubmit({
        quizAnswerData: {
          answers: answersRecord,
          total_time_spent: totalSeconds - timeRemaining,
        },
        taskId,
      }).unwrap();
      onQuizSubmit(response);
    } catch {
      console.log("Quiz submission failed");
    } finally {
      setIsModalOpen(false);
      setIsSubmitted(true);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setTimeRemaining(totalSeconds);
    setIsSubmitted(false);
  };

  // --- COMPUTED STATS ---
  const totalQuestions = quizTaskContent.questionnaires.length;

  const answeredCount = Object.keys(answers).filter(
    (key) =>
      answers[Number(key)] !== null && answers[Number(key)] !== undefined,
  ).length;

  const leftCount = totalQuestions - answeredCount;

  // Format time elapsed
  const timeTaken = totalSeconds - timeRemaining;

  const scrollToQuestion = (questionId: number) => {
    const element = document.getElementById(`${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // --- ACTIVE EXAM ENVIRONMENT ---
  return (
    <ScrollArea className=" space-y-6 flex flex-col">
      {/* Top Header Row */}
      <TestRoomHeader
        title={quizTaskData.title}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        timeRemaining={timeRemaining}
        onSubmitClick={() => setIsModalOpen(true)}
      />

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start w-full max-w-7xl mx-auto">
        {/* Left Section: Continuous Questions List */}
        <div className="col-span-1 lg:col-span-3 space-y-6 flex flex-col">
          {quizTaskContent.questionnaires.map((question, index) => (
            <div
              key={question.id}
              id={`${question.id}`}
              className="scroll-mt-6"
            >
              <Question
                question={question}
                questionNumber={index + 1}
                totalQuestions={totalQuestions}
                selectedOptionId={
                  answersRecord?.find((record) => question.id in record)?.[
                    question.id
                  ] ?? null
                }
                onSelectOption={(optionId) =>
                  handleSelectOption(question.id, optionId)
                }
                topic={quizTaskData.domain}
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
              {quizTaskContent.questionnaires.map((question, index) => {
                const isAnswered = answersRecord.some(
                  (record) => question.id in record,
                );

                return (
                  <button
                    key={index}
                    onClick={() => scrollToQuestion(question.id)}
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
        disabled={isSubmittingQuiz}
      />
    </ScrollArea>
  );
};

export default TestRoom;
