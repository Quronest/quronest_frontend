"use client";
import Button from "@/components/ui/Button";
import {
  closeTab,
  setActivePane,
  switchTab,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/store/store";
import { TabData } from "@/types/WorkspaceType";
import clsx from "clsx";
import { X } from "lucide-react";
import React from "react";

type TabItemProps = {
  tab: TabData;
  activeTabId: string | null;
  paneId: "left" | "right";
};

export const TabItem = ({ tab, activeTabId, paneId }: TabItemProps) => {
  const dispatch = useAppDispatch();
  const handleSwitchTab = (tabId: string) => {
    dispatch(setActivePane({ paneId: paneId }));
    dispatch(switchTab({ tabId: tabId }));
  };

  const handleCloseTab = (tabId: string) => {
    dispatch(setActivePane({ paneId: paneId }));
    dispatch(closeTab({ tabId: tabId }));
  };

  return (
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
      <span className="text-sm ml-2 line-clamp-1">{tab.title}</span>
      <Button
        variant="nav"
        className="w-fit! h-fit! bg-transparent! rounded-full! p-0.5! hover:bg-card-hover! mr-2"
        onClick={(e) => {
          e.stopPropagation();
          handleCloseTab(tab.id!);
        }}
      >
        <X size={16} />
      </Button>
    </div>
  );
};
