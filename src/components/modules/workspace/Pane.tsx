"use client";
import { TabRefDataType } from "@/types/WorkspaceType";
import React, { useState } from "react";
import { Tab } from "./Tab";
import Button from "@/components/ui/Button";
import { PanelLeftClose, PanelRightClose, X } from "lucide-react";
import clsx from "clsx";
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import {
  closePane,
  closeTab,
  setActivePane,
  switchTab,
} from "@/store/features/workspace/workspaceSlice";

type PaneProps = {
  id: "left" | "right";
};

export const Pane = ({ id }: PaneProps) => {
  const dispatch = useAppDispatch();

  const panes = useAppSelector((state) => state.workspace.panes);
  const activePaneId = useAppSelector((state) => state.workspace.activePaneId);
  const pane = useAppSelector(
    (state) => state.workspace.panes[id as "left" | "right"],
  );

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
        "flex flex-col h-full p-px",
        panes.right && activePaneId === id && "ring-1 ring-primary ring-inset ",
      )}
      onClick={() => dispatch(setActivePane({ paneId: id }))}
    >
      {/* simple Tabslist */}
      {tabList.length > 0 && (
        <div className="flex items-center h-10 border-b-2 border-card-hover bg-card">
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
              tooltip={id === "left" ? "Close left panel" : "Close right panel"}
              tooltipPlace="left"
            >
              {id === "left" ? <PanelLeftClose /> : <PanelRightClose />}
            </Button>
          )}
        </div>
      )}
      <div className="flex-1">
        {activeTab ? (
          <Tab tab={activeTab} />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral">
            No tabs open
          </div>
        )}
      </div>
    </div>
  );
};
