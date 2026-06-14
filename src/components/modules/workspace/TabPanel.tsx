import { TabRefDataType } from "@/types/WorkspaceType";
import React from "react";
import { NoteTab } from "../tabs/note/NoteTab";
import { ResourceTab } from "../tabs/resource/ResourceTab";
import { ScrollArea } from "@/components/ui/ScrollArea";

export const TabPanel = ({ tab }: { tab: TabRefDataType }) => {
  return (
    <ScrollArea className="h-full w-full">
      {tab.type === "Notes" && <NoteTab />}\
      {tab.type === "Docs" && <ResourceTab />}
    </ScrollArea>
  );
};
