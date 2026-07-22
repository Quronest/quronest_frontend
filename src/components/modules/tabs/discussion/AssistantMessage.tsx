import { SelectableMarkdown } from "../resource/markdown/SelectableMarkdown";
import { MessageRole, MessageType } from "@/types/DiscussionType";
import { SelectionToolBar } from "../resource/SelectionToolBar";
import { TextSelection } from "@/types/WorkspaceType";
import { AnchorTypes } from "@/enums/AnchorEnums";
import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import {
  addToPane,
  updateTabData,
} from "@/store/features/workspace/workspaceSlice";
import { useWorkspace } from "@/hooks/useWorkspace";
import { tabTypes } from "@/enums/TabEnums";
import { useTab } from "@/hooks/useTab";

type AssistantMessageProps = {
  message: MessageType;
};

export const AssistantMessage = ({ message }: AssistantMessageProps) => {
  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const { activePane } = useWorkspace();
  const { taskId } = useTab();
  const handleAskDoubt = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection.createAnchor(taskId, AnchorTypes.DOUBT);
    const draftMessage: MessageType = {
      id: "",
      discussionId: message.discussionId,
      anchor,
      content: "",
      createdAt: new Date().toISOString(),
      role: "user" as MessageRole,
    };
    const discussionTab = activePane?.tabs.find(
      (tab) =>
        tab.type === tabTypes.DISCUSS && tab.taskId === anchor.referenceId,
    );
    if (discussionTab) {
      dispatch(
        updateTabData({
          tabId: discussionTab!.id,
          data: {
            resourceId: anchor.referenceId,
            activeDiscussionId: message.discussionId,
            draftMessage,
          },
        }),
      );
    } else {
      dispatch(
        addToPane({
          tab: {
            id: message.discussionId,
            label: "Discussion Tab",
            taskId: taskId,
            type: tabTypes.DISCUSS,
            data: {
              draftMessage,
              resourceId: anchor.referenceId,
              activeDiscussionId: message.discussionId,
            },
          },
        }),
      );
    }
  };
  return (
    <div
      className="space-y-2"
      id={`message-${message.id}`}
      data-message-id={message.id}
    >
      <span className="text-xs font-medium uppercase tracking-wider text-primary">
        AI Response
      </span>
      <div className=" rounded-2xl border border-card-hover bg-transparent px-6 py-4">
        <SelectableMarkdown
          markdown={message.content}
          referenceId={message.discussionId}
          onSelect={setSelectionInfo}
          selectionToolBar={
            <SelectionToolBar
              selection={selectionInfo}
              onAskDoubt={handleAskDoubt}
            />
          }
        />
      </div>
    </div>
  );
};
