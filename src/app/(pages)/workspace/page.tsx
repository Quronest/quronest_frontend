"use client";
import { Pane } from "@/components/modules/workspace/Pane";
import { useAppSelector } from "@/store/hooks/hooks";
import { Group, Panel } from "react-resizable-panels";
import { mockTabs } from "@/types/WorkspaceType";
import React from "react";

const WorkSpacePage = () => {
  const panes = useAppSelector((state) => state.workspace.panes);

  return (
    // <div className="flex h-full">
    //   <div className="flex-1">
    //     <Pane id="left" />
    //   </div>

    //   {panes.right && (
    //     <div className="flex-1 border-l border-card-hover">
    //       <Pane id="right" />
    //     </div>
    //   )}
    // </div>

    <Group>
      <Panel defaultSize={50} >
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
