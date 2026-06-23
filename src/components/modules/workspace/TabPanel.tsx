import { TabData } from "@/types/WorkspaceType";
import React from "react";
import { NoteTab } from "../tabs/note/NoteTab";
import { ResourceTab } from "../tabs/resource/ResourceTab";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { mockNotes } from "@/types/NoteType";
import { mockMarkdown } from "../tabs/resource/mockMarkdown";
import { tabTypes } from "@/enums/TabEnums";

export const TabPanel = ({ tab }: { tab: TabData<any> }) => {
  return (
    <ScrollArea className="h-full w-full">
      {/* switch case */}
      {tab.type === tabTypes.NOTE && <NoteTab {...tab.data} />}
      {tab.type === tabTypes.RESOURCE && <ResourceTab {...tab.data} />}
    </ScrollArea>
  );
};
