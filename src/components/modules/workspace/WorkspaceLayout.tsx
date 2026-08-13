"use client";
import React, { useEffect } from "react";
import { Pane } from "@/components/modules/workspace/Pane";
import { Group, Panel } from "react-resizable-panels";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useAppDispatch } from "@/store/store";
import { setDailyPlanId } from "@/store/features/workspace/workspaceSlice";

type WorkspaceLayoutProps = {
  dailyPlanId: string;
};

export const WorkspaceLayout = ({ dailyPlanId }: WorkspaceLayoutProps) => {
  const dispatch = useAppDispatch();
  const { panes } = useWorkspace();

  useEffect(() => {
    if (dailyPlanId) {
      dispatch(setDailyPlanId(dailyPlanId));
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
