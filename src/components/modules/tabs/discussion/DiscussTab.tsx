import React, { useState } from "react";
import { TabContainer } from "../ui/TabContainer";
import { TabHeader } from "../ui/TabHeader";
import { DiscussionSidebar } from "./DiscussionSideBar";
import { Conversation } from "./Conversation";
import { QuestionOutline } from "./QuestionOutLine";
import { ChevronRight, Menu } from "lucide-react";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import { useTab } from "@/hooks/useTab";
import { DiscussTabDataType, DiscussTabType } from "@/types/WorkspaceType";
import { useAppSelector } from "@/store/store";
import { mockDiscussion } from "@/mockData/mockDiscussion";
import { MessageType } from "@/types/DiscussionType";

const DiscussTab = () => {

  const [isDiscussionSidebarCollapsed, setDiscussionSidebarCollapsed] =
    useState(false);

  return (
    <TabContainer>
      <div className="flex flex-1 overflow-hidden">
        {isDiscussionSidebarCollapsed && (
          <div>
            <Button
              variant="icon"
              onClick={() => setDiscussionSidebarCollapsed(false)}
            >
              <Menu size={20} />
            </Button>
          </div>
        )}
        <DiscussionSidebar
          collapsed={isDiscussionSidebarCollapsed}
          onToggle={() => setDiscussionSidebarCollapsed((prev) => !prev)}
        />

        <Conversation />
      </div>
    </TabContainer>
  );
};

export default DiscussTab;
