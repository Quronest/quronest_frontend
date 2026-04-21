"use client";
import Button from "@/components/ui/Button";
import {
  addToPane,
  openSplitPane,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/store/hooks/hooks";
import { mockTabs } from "@/types/WorkspaceType";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  SquareSplitHorizontal,
} from "lucide-react";
import React, { useState } from "react";

export const WorkspaceSideBar = () => {
  const dispatch = useAppDispatch();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <React.Fragment>
      {/* sidebar open */}
      <div
        className={clsx(
          ` lg:sticky top-0 left-17 z-50 h-screen shrink-0`,
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
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <ChevronLeft size={16} />
              </Button>
            </div>
          </div>
          <div className="space-y-0 py-2">
            {mockTabs.map((tab) => (
              <Button
                key={tab.id}
                variant="list"
                onClick={() => dispatch(addToPane({ tab }))}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* sidebar collapsed */}
      {isSidebarCollapsed && (
        <div className={clsx("relative m-1 mx-2 w-fit ")}>
          <Button
            variant="nav"
            className=" justify-center p-1! w-fit! h-fit!"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};
