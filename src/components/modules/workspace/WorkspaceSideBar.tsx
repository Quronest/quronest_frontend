"use client";

import Button from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useWorkspace } from "@/hooks/useWorkspace";
import { tabTypes } from "@/enums/TabEnums";
import { TabData } from "@/types/WorkspaceType";
import { DailyTaskSummaryDto } from "@/store/features/dailyplan/dailyplanType";
import { DailyTaskDto } from "@/store/features/task/taskType";
import { useGetDailyPlansByRangeQuery } from "@/store/features/dailyplan/dailyplanApi";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import {
  addToPane,
  closeSidebar,
  openSplitPane,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/store/store";
import clsx from "clsx";
import { ChevronLeft, SquareSplitHorizontal, LoaderCircle } from "lucide-react";
import React, { useState, useMemo } from "react";

const formatToLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const mapTaskTypeToTabType = (type: string) => {
  switch (type) {
    case "READING":
      return tabTypes.RESOURCE;
    case "QUIZ":
      return tabTypes.TEST;
    case "CODING":
      return tabTypes.CODE;
    default:
      return tabTypes.NOTE;
  }
};

const mapTaskDtoToTab = (task: DailyTaskDto): TabData<any> => {
  const type = mapTaskTypeToTabType(task.task_type);
  let data: any = {};

  if (type === tabTypes.RESOURCE && task.content) {
    data = {
      markdown: (task.content as any).markdown_content || (task.content as any).markdownContent || "",
      anchors: (task.content as any).selection_anchors || (task.content as any).selectionAnchors || [],
    };
  } else if (type === tabTypes.TEST && task.content) {
    const questionnaires = (task.content as any).questionnaires || [];
    const questions = questionnaires.map((q: any) => {
      const solutionIndex = q.options?.findIndex((o: any) => o.id === q.solution?.id);
      return {
        id: q.id,
        question: q.title,
        options: q.options?.map((o: any) => o.text) || [],
        solution: solutionIndex >= 0 ? solutionIndex : 0,
        explanation: q.explanation || "",
        topic: task.domain || "Quiz",
        type: "Single Choice",
      };
    });

    data = {
      questions,
      title: task.title,
      description: task.description,
      level: task.level,
    };
  } else if (type === tabTypes.CODE) {
    data = {};
  }

  return {
    id: `task-${task.id}`,
    taskId: task.id,
    label: task.title,
    type,
    data,
  };
};

export const WorkspaceSideBar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed } = useWorkspace();

  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const { loadTask } = useTaskGeneration();

  const todayStr = useMemo(() => {
    return formatToLocalDateString(new Date());
  }, []);

  const { data: dailyPlans = [], isLoading: isPlansLoading } = useGetDailyPlansByRangeQuery({
    startDate: todayStr,
    endDate: todayStr,
  });

  const todayPlan = useMemo(() => {
    return dailyPlans.find((p) => p.plan_date === todayStr) || null;
  }, [dailyPlans, todayStr]);

  const tasks = todayPlan?.tasks || [];

  const handleTaskClick = async (taskSummary: DailyTaskSummaryDto) => {
    if (loadingTaskId) return;
    setLoadingTaskId(taskSummary.id);

    try {
      const loadedTask = await loadTask(taskSummary.id);
      if (loadedTask) {
        const tab = mapTaskDtoToTab(loadedTask);
        dispatch(addToPane({ tab }));
      }
    } catch (err) {
      console.error("Failed to load task:", err);
    } finally {
      setLoadingTaskId(null);
    }
  };

  return (
    <React.Fragment>
      {/* sidebar open */}
      <div
        className={clsx(
          ` lg:sticky top-0 left-0 z-50 h-screen shrink-0`,
          ` bg-card transition-all duration-300 overflow-x-hidden `,
          isSidebarCollapsed ? "w-0 p-0" : "w-80 ",
        )}
      >
        <div
          className={clsx(
            "space-y-2 py-1 transition-opacity ",
            isSidebarCollapsed
              ? "opacity-0 pointer-events-none duration-150"
              : "opacity-100 duration-500",
          )}
        >
          <div className="flex justify-between items-center mx-3">
            <span className="font-semibold text-lg">Tasks List</span>
            <div className="flex items-center gap-2">
              <Button
                variant="nav"
                className=" justify-center p-1! w-fit! h-fit!"
                tooltip="Open split view"
                tooltipPlace="left"
                onClick={() => dispatch(openSplitPane())}
              >
                <SquareSplitHorizontal size={16} />
              </Button>
              <Button
                variant="nav"
                className=" justify-center p-1! w-fit! h-fit!"
                onClick={() => dispatch(closeSidebar())}
              >
                <ChevronLeft size={16} />
              </Button>
            </div>
          </div>
          <ScrollArea className="space-y-0 py-2">
            {isPlansLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoaderCircle className="animate-spin text-primary" size={24} />
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8 text-neutral text-sm">
                No tasks for today. Go to Home to generate your daily plans.
              </div>
            ) : (
              tasks.map((task) => {
                const isLoading = loadingTaskId === task.id;
                return (
                  <Button
                    key={task.id}
                    variant="list"
                    disabled={!!loadingTaskId}
                    onClick={() => handleTaskClick(task)}
                    className="flex justify-between items-center w-full"
                  >
                    <span>{task.title}</span>
                    {isLoading && (
                      <LoaderCircle className="animate-spin text-accent ml-2" size={16} />
                    )}
                  </Button>
                );
              })
            )}
          </ScrollArea>
        </div>
      </div>
    </React.Fragment>
  );
};
