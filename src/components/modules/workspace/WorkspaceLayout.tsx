"use client";
import React from "react";
import { Pane } from "@/components/modules/workspace/Pane";
import { Group, Panel } from "react-resizable-panels";
import { useAppSelector } from "@/store/store";
import { selectWorkspace } from "@/store/features/workspace/workspaceSlice";

export const WorkspaceLayout = () => {
  const { panes } = useAppSelector(selectWorkspace);

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
