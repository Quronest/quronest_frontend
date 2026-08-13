"use client";

import { TabContainer } from "@/components/ui/TabContainer";
import React, { useEffect, useState } from "react";
import { TestOverviewSection } from "./TestOverviewSection";
import { TestRoom } from "./TestRoom";
import { useTab } from "@/hooks/useTab";
import { TaskTabPayloadType } from "@/types/WorkspaceType";
import { useLazyGetQuizTaskQuery } from "@/store/features/task/taskApi";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";

export const TestTab = () => {
  const [isPlaying, setIsPlaying] = useState(false);
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
  const {
    questionnaires = [],
    title,
    description,
    level,
    expected_total_time,
    domain,
  } = (tabData as any) || {};

  return (
    <TabContainer className="pt-0!">
      {isPlaying ? (
        <TestRoom
          questions={questionnaires}
          title={title}
          duration={expected_total_time}
          domain={domain}
          onExit={() => setIsPlaying(false)}
        />
      ) : (
        <TestOverviewSection
          questions={questionnaires}
          title={title}
          description={description}
          level={level}
          duration={expected_total_time}
          domain={domain}
          onStart={() => setIsPlaying(true)}
        />
      )}
    </TabContainer>
  );
};
