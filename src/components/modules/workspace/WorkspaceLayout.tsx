"use client";
import React from "react";
import { Pane } from "@/components/modules/workspace/Pane";
import { Group, Panel } from "react-resizable-panels";
import { useAppSelector } from "@/store/store";
import { selectWorkspace } from "@/store/features/workspace/workspaceSlice";

export const WorkspaceLayout = () => {
  const { panes } = useAppSelector(selectWorkspace);

  return (
    <Group>
      <Panel defaultSize={50} minSize="30%">
        <Pane paneId="left" />
      </Panel>

      {panes.right && (
        <Panel defaultSize={50} minSize="30%">
          <Pane paneId="right" />
        </Panel>
      )}
    </Group>
  );
};
