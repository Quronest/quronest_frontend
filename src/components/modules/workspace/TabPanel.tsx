import { TabData } from "@/types/WorkspaceType";
import React, { forwardRef } from "react";
import { NoteTab } from "../tabs/note/NoteTab";
import { ResourceTab } from "../tabs/resource/ResourceTab";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { mockNotes } from "@/types/NoteType";
import { mockMarkdown } from "../tabs/resource/mockMarkdown";
import { tabTypes } from "@/enums/TabEnums";

type TabPanelType = {
  tab: TabData<any>;
};

export const TabPanel = forwardRef<HTMLDivElement, TabPanelType>(
  ({ tab }, forwardedRef) => {
    return (
      <ScrollArea className="h-full w-full" ref={forwardedRef}>
        {/* switch case */}
        {tab.type === tabTypes.NOTE && <NoteTab {...tab.data} />}
        {tab.type === tabTypes.RESOURCE && <ResourceTab {...tab.data} />}
      </ScrollArea>
    );
  },
);
