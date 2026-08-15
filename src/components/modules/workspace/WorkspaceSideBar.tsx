"use client";

import Button from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useWorkspace } from "@/hooks/useWorkspace";
import { TabTypes } from "@/enums/TabEnums";
import { TabData } from "@/types/WorkspaceType";
import { TaskSummaryType } from "@/store/features/dailyplan/dailyplanType";
import { useGetDailyPlanByIdQuery } from "@/store/features/dailyplan/dailyplanApi";
import {
  openTab,
  closeSidebar,
  openSplitPane,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/store/store";
import clsx from "clsx";
import {
  ChevronLeft,
  SquareSplitHorizontal,
  LoaderCircle,
  BookOpen,
  HelpCircle,
  Code2,
  AlignLeft,
} from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { RawTabDataType } from "@/utils/tabDataConvertor";

const taskIconMap: Record<string, React.ComponentType<any>> = {
  READING: BookOpen,
  QUIZ: HelpCircle,
  CODING: Code2,
  DESCRIPTIVE: AlignLeft,
};

const taskPathMap: Record<string, string> = {
  READING: "/reading",
  QUIZ: "/quiz",
  CODING: "/coding",
};

export const mapTaskSummaryToTab = (task: TaskSummaryType): RawTabDataType => {
  return {
    id: task.id,
    title: task.title,
    path: taskPathMap[task.task_type],
    payload: task,
  };
};

export const WorkspaceSideBar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed } = useWorkspace();
  const { dailyPlanId } = useParams<{ dailyPlanId: string }>();

  const { data: dailyPlan, isLoading: isPlanLoading } =
    useGetDailyPlanByIdQuery(dailyPlanId || "", { skip: !dailyPlanId });

  const tasks = dailyPlan?.tasks || [];

  // useEffect(() => {
  //   const activeTaskData = localStorage.getItem("autoMountTaskData");
  //   if (activeTaskData) {
  //     const activeTaskSummary = JSON.parse(activeTaskData);

  //     const activeTaskTabData = mapTaskSummaryToTab(activeTaskSummary);
  //     dispatch(openTab({ tab: activeTaskTabData }));
  //     localStorage.removeItem("autoMountTaskData");
  //   }
  // }, []);

  const handleTaskClick = (taskSummary: TaskSummaryType) => {
    const tab = mapTaskSummaryToTab(taskSummary);
    dispatch(openTab({ tab: tab }));
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
            {isPlanLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoaderCircle className="animate-spin text-primary" size={24} />
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8 text-neutral text-sm">
                No tasks for today. Go to Home to generate your daily plans.
              </div>
            ) : (
              tasks.map((task) => {
                const IconComponent = taskIconMap[task.task_type] || AlignLeft;
                return (
                  <Button
                    key={task.id}
                    variant="list"
                    onClick={() => handleTaskClick(task)}
                    className="flex items-center gap-3 w-full"
                  >
                    <IconComponent className="h-4 w-4 text-neutral shrink-0" />
                    <span className="truncate flex-1 text-left">
                      {task.title}
                    </span>
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
