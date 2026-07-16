"use client";

import { TabContainer } from "@/components/ui/TabContainer";
import React, { useState } from "react";
import { TestOverviewSection } from "./TestOverviewSection";
import { TestRoom } from "./TestRoom";

export const TestTab = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <TabContainer className="">
      {isPlaying ? (
        <TestRoom onExit={() => setIsPlaying(false)} />
      ) : (
        <TestOverviewSection onStart={() => setIsPlaying(true)} />
      )}
    </TabContainer>
  );
};
