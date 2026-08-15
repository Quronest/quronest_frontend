"use client";
import React, { useEffect } from "react";
import { Pane } from "@/components/modules/workspace/Pane";
import { Group, Panel } from "react-resizable-panels";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useAppDispatch } from "@/store/store";
import { openTab, setDailyPlanId } from "@/store/features/workspace/workspaceSlice";
import { mapTaskSummaryToTab } from "./WorkspaceSideBar";

type WorkspaceLayoutProps = {
  dailyPlanId: string;
};

export const WorkspaceLayout = ({ dailyPlanId }: WorkspaceLayoutProps) => {
  const dispatch = useAppDispatch();
  const { panes } = useWorkspace();

  useEffect(() => {
    if (dailyPlanId) {
      dispatch(setDailyPlanId(dailyPlanId));
      const activeTaskData = localStorage.getItem("autoMountTaskData");
      if (activeTaskData) {
        const activeTaskSummary = JSON.parse(activeTaskData);

        const activeTaskTabData = mapTaskSummaryToTab(activeTaskSummary);
        dispatch(openTab({ tab: activeTaskTabData }));
        localStorage.removeItem("autoMountTaskData");
      }
    }
  }, [dailyPlanId, dispatch]);

  return (
    <Group className="h-full w-full min-w-0">
      <Panel defaultSize={50} minSize="30%">
        <div className="h-full min-w-0">
          <Pane paneId="left" />
        </div>
      </Panel>

      {panes.right && (
        <Panel defaultSize={50} minSize="30%">
          <div className="h-full min-w-0">
            <Pane paneId="right" />
          </div>
        </Panel>
      )}
    </Group>
  );
};
