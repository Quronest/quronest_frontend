"use client";

import { TabContainer } from "@/components/ui/TabContainer";
import React, { useState } from "react";
import { TestOverviewSection } from "./TestOverviewSection";
import { TestRoom } from "./TestRoom";
import { useTab } from "@/hooks/useTab";

export const TestTab = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { tabData } = useTab();
  const { questions = [], title, description, level } = (tabData as any) || {};

  return (
    <TabContainer className="pt-0!">
      {isPlaying ? (
        <TestRoom
          questions={questions}
          title={title}
          onExit={() => setIsPlaying(false)}
        />
      ) : (
        <TestOverviewSection
          questions={questions}
          title={title}
          description={description}
          level={level}
          onStart={() => setIsPlaying(true)}
        />
      )}
    </TabContainer>
  );
};
