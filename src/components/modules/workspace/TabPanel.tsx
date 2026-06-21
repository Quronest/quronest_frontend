import { TabRefDataType } from "@/types/WorkspaceType";
import React from "react";
import { NoteTab } from "../tabs/note/NoteTab";
import { ResourceTab } from "../tabs/resource/ResourceTab";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { mockNotes } from "@/types/NoteType";
import { mockMarkdown } from "../tabs/resource/mockMarkdown";

export const TabPanel = ({ tab }: { tab: TabRefDataType }) => {
  return (
    <ScrollArea className="h-full w-full">
      {tab.type === "Notes" && <NoteTab resourceId="abc" notes={mockNotes} referenceText="how do I pass this or get this"/>}
      {tab.type === "Resource" && <ResourceTab id={tab.id} markdown={mockMarkdown}/>}
    </ScrollArea>
  );
};
