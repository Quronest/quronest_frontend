"use client";
import React from "react";
import Button from "@/components/ui/Button";
import { ChevronRight, PanelLeftClose, PanelRightClose, X } from "lucide-react";
import clsx from "clsx";
import {
  closePane,
  openSidebar,
  setActivePane,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/store/store";
import { TabItem } from "./TabItem";
import { useWorkspace } from "@/hooks/useWorkspace";
import { TabsRenderer } from "./TabsRenderer";

type PaneProps = {
  paneId: "left" | "right";
};

export const Pane = ({ paneId }: PaneProps) => {
  const dispatch = useAppDispatch();

  const { panes, isSidebarCollapsed, activePaneId } = useWorkspace();

  const pane = panes[paneId];

  if (!pane) return null;

  const { tabs: tabList, activeTabId } = pane;

  return (
    <div
      className={clsx(
        "flex flex-col min-h-0 h-full p-px",
        panes.right &&
          activePaneId === paneId &&
          "ring-1 ring-accent2 ring-inset ",
      )}
      onClick={() => dispatch(setActivePane({ paneId: paneId }))}
    >
      <div className="flex items-center h-10 border-b-2 border-card-hover bg-card">
        {/* open side bar option */}
        {paneId === "left" && isSidebarCollapsed && (
          <div className={clsx("relative m-1 mx-2 w-fit ")}>
            <Button
              variant="nav"
              className=" justify-center p-1! w-fit! h-fit!"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(openSidebar());
              }}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}

        {/* simple Tabslist */}
        {tabList.length > 0 && (
          <React.Fragment>
            {/* Tabs container (takes full width) */}
            <div className="flex items-center flex-1 overflow-hidden">
              {tabList.map((tab) => (
                <TabItem
                  key={tab.id}
                  tab={tab}
                  activeTabId={activeTabId}
                  paneId={paneId}
                />
              ))}
            </div>
            {/* Close button (fixed at end) */}
            {panes.right && (
              <Button
                variant="nav"
                className="mr-2 shrink-0 w-8! h-8!"
                onClick={() => dispatch(closePane({ paneId: paneId }))}
                tooltip={
                  paneId === "left" ? "Close left panel" : "Close right panel"
                }
                tooltipPlace="left"
              >
                {paneId === "left" ? <PanelLeftClose /> : <PanelRightClose />}
              </Button>
            )}
          </React.Fragment>
        )}
      </div>

      {tabList ? (
        <TabsRenderer activeTabId={activeTabId!} tabList={tabList} />
      ) : (
        <div>"No Tabs to Open</div>
      )}
    </div>
  );
};
