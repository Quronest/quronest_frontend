import { TabData } from "@/types/WorkspaceType";
import React, { forwardRef } from "react";
import { NoteTab } from "../tabs/note/NoteTab";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { tabTypes } from "@/enums/TabEnums";
import DiscussTab from "../tabs/discussion/DiscussTab";
import { TestTab } from "../tabs/test/TestTab";
import { ResourceTab } from "../tabs/reading/ReadingTab";

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

      case tabTypes.DISCUSS:
        content = <DiscussTab />;
        break;

      case tabTypes.TEST:
        content = <TestTab />;
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
