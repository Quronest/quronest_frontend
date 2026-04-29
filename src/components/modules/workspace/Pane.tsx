"use client";
import { TabRefDataType } from "@/types/WorkspaceType";
import React, { useState } from "react";
import { TabPanel } from "./TabPanel";
import Button from "@/components/ui/Button";
import { ChevronRight, PanelLeftClose, PanelRightClose, X } from "lucide-react";
import clsx from "clsx";
import {
  closePane,
  closeTab,
  openSidebar,
  selectWorkspace,
  setActivePane,
  switchTab,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

type PaneProps = {
  id: "left" | "right";
};

export const Pane = ({ id }: PaneProps) => {
  const dispatch = useAppDispatch();

  const { panes, isSidebarCollapsed, activePaneId } =
    useAppSelector(selectWorkspace);

  const pane = panes[id];

  if (!pane) return null;

  const { tabs: tabList, activeTabId } = pane;
  const activeTab = tabList.find((tab) => tab.id === activeTabId);

  const handleSwitchTab = (id: string) => {
    dispatch(switchTab({ tabId: id }));
  };

  const handleCloseTab = (id: string) => {
    dispatch(closeTab({ tabId: id }));
  };

  return (
    <div
      className={clsx(
        "flex flex-col min-h-0 h-full p-px",
        panes.right && activePaneId === id && "ring-1 ring-accent2 ring-inset ",
      )}
      onClick={() => dispatch(setActivePane({ paneId: id }))}
    >
      <div className="flex items-center h-10 border-b-2 border-card-hover bg-card">
        {/* open side bar option */}
        {id === "left" && isSidebarCollapsed && (
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
                <div
                  key={tab.id}
                  className={clsx(
                    " justify-between border-r border-card-hover flex gap-5 items-center cursor-pointer",

                    tab.id === activeTabId
                      ? "bg-background border-background!"
                      : " hover:bg-card-hover",
                  )}
                  onClick={() => handleSwitchTab(tab.id!)}
                >
                  <span className="text-sm ml-2 line-clamp-1">{tab.label}</span>
                  <Button
                    variant="nav"
                    className="w-fit! h-fit! bg-transparent! rounded-full! p-0.5! hover:bg-card-hover! mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setActivePane({ paneId: id }));
                      handleCloseTab(tab.id!);
                    }}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
            {/* Close button (fixed at end) */}
            {panes.right && (
              <Button
                variant="nav"
                className="mr-2 shrink-0 w-8! h-8!"
                onClick={() => dispatch(closePane({ paneId: id }))}
                tooltip={
                  id === "left" ? "Close left panel" : "Close right panel"
                }
                tooltipPlace="left"
              >
                {id === "left" ? <PanelLeftClose /> : <PanelRightClose />}
              </Button>
            )}
          </React.Fragment>
        )}
      </div>

      <div className="flex-1 min-h-0">
        {activeTab ? (
          <TabPanel tab={activeTab} />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral">
            No tabs open
          </div>
        )}
      </div>
    </div>
  );
};
