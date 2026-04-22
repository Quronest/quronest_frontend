import { TabRefDataType } from "@/types/WorkspaceType";
import React from "react";
import { NoteTab } from "../tabs/note/NoteTab";

export const Tab = ({ tab }: { tab: TabRefDataType }) => {
  return (
    <div className="flex items-center h-full w-full">
      <NoteTab />
    </div>
  );
};
