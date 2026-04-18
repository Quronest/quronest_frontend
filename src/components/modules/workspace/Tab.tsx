import { TabRefDataType } from "@/types/TabRefDataType";
import React from "react";

export const Tab = ({ tab }: { tab: TabRefDataType }) => {
  return (
    <div className="flex items-center justify-center h-full">
      Welcome to the tab component, tab id: {tab.id}
    </div>
  );
};
