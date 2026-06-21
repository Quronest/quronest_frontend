"use client";
import Button from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  addToPane,
  closeSidebar,
  openSplitPane,
  selectWorkspace,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { mockTabs } from "@/types/WorkspaceType";
import clsx from "clsx";
import { ChevronLeft, SquareSplitHorizontal } from "lucide-react";
import React from "react";

export const WorkspaceSideBar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed } = useAppSelector(selectWorkspace);

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
            {mockTabs.map((tab) => (
              <Button
                key={tab.id}
                variant="list"
                onClick={() => dispatch(addToPane({ tab }))}
              >
                {tab.label}
              </Button>
            ))}
          </ScrollArea>
        </div>
      </div>
    </React.Fragment>
  );
};
