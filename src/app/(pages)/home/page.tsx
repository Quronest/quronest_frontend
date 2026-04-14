"use client";

import { CurrentTaskComponent } from "@/components/modules/homepage/CurrentTaskComponent";
import { MockWeekProgress } from "@/components/modules/homepage/MockWeekProgress";
import { TasklistItemComponent } from "@/components/modules/homepage/TasklistItemComponent";
import { WelcomeComponent } from "@/components/modules/homepage/WelcomeComponent";
import { PageContainer } from "@/components/ui/PageContainer";
import { useAuth } from "@/hooks/useAuth";
import { Tasktype } from "@/types/Tasktype";
import React from "react";

const mockTasks: Tasktype[] = [
  {
    id: "dfghjk",
    title: "Design Landing Page",
    progress: 65,
    duration: 5400, // 1.5 hours
    tags: [
      { type: "primary", label: "Design" },
      { type: "accent", label: "UI/UX" },
      { type: "secondary", label: "High Priority" },
    ],
  },
  {
    id: "fdsaf",
    title: "Fix Authentication Bug",
    progress: 30,
    duration: 2700, // 45 minutes
    tags: [
      { type: "neutral", label: "Bug" },
      { type: "primary", label: "Backend" },
    ],
  },
];

const HomePage = () => {
  // useAuth();
  return (
    <PageContainer className="space-y-3 pt-20">
      <WelcomeComponent />
      <CurrentTaskComponent />
      <MockWeekProgress />
      <div className="grid grid-cols-2 gap-4">
        {mockTasks.map((task, index) => (
          <TasklistItemComponent task={task} key={task.id} />
        ))}
      </div>
    </PageContainer>
  );
};

export default HomePage;
