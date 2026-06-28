import React, { useState } from "react";
import { TabContainer } from "../ui/TabContainer";
import { TabHeader } from "../ui/TabHeader";
import { DiscussionSidebar } from "./DiscussionSideBar";
import { Conversation } from "./Conversation";
import { QuestionOutline } from "./QuestionOutLine";

const DiscussTab = () => {
  const [isDiscussionSidebarCollapsed, setDiscussionSidebarCollapsed] =
    useState(false);

  const [isQuestionOutlineCollapsed, setQuestionOutlineCollapsed] =
    useState(false);
  return (
    <TabContainer>
      <TabHeader title="Discuss" subtitle="Ask questions and learn with AI" />

      <div className="flex flex-1 overflow-hidden">
        <DiscussionSidebar
          collapsed={isDiscussionSidebarCollapsed}
          onToggle={() => setDiscussionSidebarCollapsed((prev) => !prev)}
        />

        <Conversation />

        <QuestionOutline
          collapsed={isQuestionOutlineCollapsed}
          onToggle={() => setQuestionOutlineCollapsed((prev) => !prev)}
        />
      </div>
    </TabContainer>
  );
};

export default DiscussTab;
