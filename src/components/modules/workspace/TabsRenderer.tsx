import { TabData } from "@/types/WorkspaceType";
import React from "react";
import { TabLayout } from "./TabLayout";
import clsx from "clsx";

type TabsRendererProps = {
  tabList: TabData[];
  activeTabId: string;
};

export const TabsRenderer = ({ tabList, activeTabId }: TabsRendererProps) => {
   
  return (
    <div className="flex-1 min-h-0">
      {tabList.map((tab) => {
        return (
          <TabLayout
            key={tab.id}
            tab={tab}
            className={activeTabId === tab.id ? "block" : "hidden"}
          />
        );
      })}
    </div>
  );
};
