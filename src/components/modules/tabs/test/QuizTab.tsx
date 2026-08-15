"use client";

import { TabContainer } from "@/components/ui/TabContainer";
import React, { useEffect, useState } from "react";
import { TestRoom } from "./TestRoom";
import { useTab } from "@/hooks/useTab";
import { TaskTabPayloadType } from "@/types/WorkspaceType";
import { useLazyGetQuizTaskQuery } from "@/store/features/task/taskApi";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import { TestOverviewSection } from "./TestOverviewSection";
import { QuizResultSection } from "./QuizResultSection";
import { QuizSubmitResponseType } from "@/types/QuizTaskType";

export const QuizTab = () => {
  const { tabData } = useTab();
  const { id: taskId } = tabData.payload as TaskTabPayloadType;

  const [triggerQuizTaskGeneration] = useLazyGetQuizTaskQuery();
  const { loadTask, status, task, reset } = useTaskGeneration({
    triggerGetTask: (taskId: string) =>
      triggerQuizTaskGeneration(taskId, false).unwrap(),
  });

  useEffect(() => {
    if (!taskId) return;
    loadTask(taskId);
    return () => reset();
  }, [taskId]);

  const [quizStage, setQuizStage] = useState<"overview" | "attempt" | "result">(
    "overview",
  );
  const [quizSubmitResponse, setQuizSubmitResponse] =
    useState<QuizSubmitResponseType | null>(null);

  if (status === "success" && task?.content) {
    return (
      <TabContainer className="pt-0!">
        {quizStage === "overview" && (
          <TestOverviewSection
            quizTaskData={task}
            onStart={() => setQuizStage("attempt")}
          />
        )}
        {quizStage === "attempt" && (
          <TestRoom
            quizTaskData={task}
            onQuizSubmit={(quizSubmitResponse) => {
              setQuizSubmitResponse(quizSubmitResponse);
              setQuizStage("result");
            }}
            taskId={taskId}
          />
        )}
        {quizStage === "result" && <QuizResultSection quizSubmitResponseData={quizSubmitResponse!} quizTask={task}/>}
      </TabContainer>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-full text-3xl">
        Quiz Loading
      </div>
    );
  }
};
