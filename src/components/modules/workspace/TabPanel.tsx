import { TabData } from "@/types/WorkspaceType";
import React, { forwardRef } from "react";
import { NoteTab } from "../tabs/note/NoteTab";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { TabTypes } from "@/enums/TabEnums";
import DiscussTab from "../tabs/discussion/DiscussTab";
import { QuizTab } from "../tabs/test/QuizTab";
import { ReadingTab } from "../tabs/reading/ReadingTab";
import { CodingTab } from "../tabs/coding/CodingTab";
import { TaskLoaderWrapper } from "./TaskLoaderWrapper";

type TabPanelType = {
  tab: TabData<any>;
};

export const TabPanel = forwardRef<HTMLDivElement, TabPanelType>(
  ({ tab }, forwardedRef) => {
    let content: React.ReactNode;
    switch (tab.type) {
      case TabTypes.READING:
        content = <ReadingTab />;
        break;

      case TabTypes.NOTE:
        content = <NoteTab />;
        break;

      case TabTypes.DISCUSS:
        content = <DiscussTab />;
        break;

      case TabTypes.QUIZ:
        content = <QuizTab />;
        break;

      case TabTypes.CODING:
        content = <CodingTab />;
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
