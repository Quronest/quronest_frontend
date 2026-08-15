import {
  DraftMessageType,
  MessageRole,
  MessageType,
} from "@/types/DiscussionType";
import { DiscussTabPayloadType, TextSelection } from "@/types/WorkspaceType";
import { AnchorTypes } from "@/enums/AnchorEnums";
import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import {
  openTab,
  updateTabData,
} from "@/store/features/workspace/workspaceSlice";
import { useWorkspace } from "@/hooks/useWorkspace";
import { TabTypes } from "@/enums/TabEnums";
import { useTab } from "@/hooks/useTab";
import { SelectableMarkdown } from "../reading/markdown/SelectableMarkdown";
import { SelectionToolBar } from "../reading/SelectionToolBar";

type AssistantMessageProps = {
  message: MessageType;
};

export const AssistantMessage = ({ message }: AssistantMessageProps) => {
  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const { activePane } = useWorkspace();
  const { tabData } = useTab();
  const handleAskDoubt = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection.createAnchor(
      (tabData.payload as DiscussTabPayloadType).taskId,
      AnchorTypes.DOUBT,
    );
    const draftMessage: DraftMessageType = {
      anchor,
    };
    const discussionTab = activePane?.tabs.find(
      (tab) =>
        tab.path === "/discuss" &&
        (tab.payload as DiscussTabPayloadType).taskId === anchor.referenceId,
    );
    if (discussionTab) {
      dispatch(
        updateTabData({
          tabId: discussionTab!.id,
          data: {
            taskId: anchor.referenceId,
            activeDiscussionId: message.discussionId,
            draftMessage,
          },
        }),
      );
    } else {
      dispatch(
        openTab({
          tab: {
            id: message.discussionId,
            title: "Discussion Tab",
            path: "/discuss",
            payload: {
              draftMessage,
              taskId: anchor.referenceId,
              activeDiscussionId: message.discussionId!,
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
          markdown={message?.content!}
          referenceId={message.discussionId!}
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
