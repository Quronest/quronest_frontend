import { TabData } from "@/types/WorkspaceType";
import React, { forwardRef } from "react";
import { NoteTab } from "../tabs/note/NoteTab";
import { ResourceTab } from "../tabs/resource/ResourceTab";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { mockMarkdown } from "../tabs/resource/mockMarkdown";
import { tabTypes } from "@/enums/TabEnums";

type TabPanelType = {
  tab: TabData<any>;
};

export const TabPanel = forwardRef<HTMLDivElement, TabPanelType>(
  ({ tab }, forwardedRef) => {
    let content: React.ReactNode;
    switch (tab.type) {
      case tabTypes.RESOURCE:
        content = <ResourceTab />;
        break;

      case tabTypes.NOTE:
        content = <NoteTab />;
        break;

      default:
        content = <div>No valid tab to render</div>;
    }
    return (
      <ScrollArea className="h-full w-full" ref={forwardedRef}>
        {content}
      </ScrollArea>
    );
  },
);
