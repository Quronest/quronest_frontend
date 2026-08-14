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

export const QuizTab = () => {
  const { tabData } = useTab();
  const { id: taskId } = tabData.payload as TaskTabPayloadType;

  const [triggerQuizTaskGeneration] = useLazyGetQuizTaskQuery();
  const { loadTask, status, task } = useTaskGeneration({
    triggerGetTask: (taskId: string) =>
      triggerQuizTaskGeneration(taskId, false).unwrap(),
  });

  useEffect(() => {
    if (!taskId) return;
    loadTask(taskId);
  }, [taskId]);

  const [quizStage, setQuizStage] = useState<"overview" | "attempt" | "result">(
    "overview",
  );

  if (status === "success" && task?.content) {
    return (
      <TabContainer className="pt-0!">
        {quizStage === "overview" && (
          <TestOverviewSection
            quizTaskData={task}
            onStart={() => console.log("route to /quiz/attempt")}
          />
        )}
        {quizStage === "attempt" && (
          <TestRoom
            quizTaskData={task}
            onExit={() => console.log("route to /quiz/overview")}
          />
        )}
        {quizStage === "result" && <QuizResultSection/>}
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
