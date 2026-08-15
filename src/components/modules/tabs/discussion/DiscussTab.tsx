import React, { useState } from "react";
import { TabContainer } from "../../../ui/TabContainer";
import { DiscussionSidebar } from "./DiscussionSideBar";
import { Conversation } from "./Conversation";
import { Menu } from "lucide-react";
import Button from "@/components/ui/Button";

export const DiscussTab = () => {
  const [isDiscussionSidebarCollapsed, setDiscussionSidebarCollapsed] =
    useState(true);

  return (
    <div className="flex overflow-hidden h-full w-full min-h-0 min-w-0 relative">
      {isDiscussionSidebarCollapsed && (
        <div className="absolute z-2 top-4 left-4">
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
      <TabContainer className="flex-1">
        <Conversation />
      </TabContainer>
    </div>
  );
};

