"use client";
import { Pane } from "@/components/modules/workspace/Pane";
import { useAppSelector } from "@/store/hooks/hooks";
import { Group, Panel } from "react-resizable-panels";
import { mockTabs } from "@/types/WorkspaceType";
import React from "react";

const WorkSpacePage = () => {
  const panes = useAppSelector((state) => state.workspace.panes);

  return (
    <Group >
      <Panel defaultSize={50} minSize="30%">
        <Pane id="left" />
      </Panel>

      {panes.right && (
        <Panel defaultSize={50} minSize="30%">
          <Pane id="right" />
        </Panel>
      )}
    </Group>
  );
};

export default WorkSpacePage;
