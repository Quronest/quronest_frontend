import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addHighlight,
  selectHighlight,
} from "@/store/features/highlights/highlightSlice";
import { TextSelection, ResourceTabDataType } from "@/types/WorkspaceType";
import { useState } from "react";
import { useTab } from "@/hooks/useTab";
import { useWorkspace } from "@/hooks/useWorkspace";
import { NoteType } from "@/types/NoteType";
import {
  addToPane,
  openSplitPane,
  setActivePane,
  switchTab,
  updateTabData,
} from "@/store/features/workspace/workspaceSlice";
import { tabTypes } from "@/enums/TabEnums";
import {
  DiscussionType,
  MessageRole,
  MessageType,
} from "@/types/DiscussionType";
import { addDiscussion } from "@/store/features/discussion/discussionSlice";
import { SelectableMarkdown } from "./markdown/SelectableMarkdown";
import { SelectionToolBar } from "./SelectionToolBar";

export const DocsRenderer = () => {
  const { tabData, taskId } = useTab();
  const { markdown } = tabData as ResourceTabDataType;
  const { highlights } = useAppSelector(selectHighlight);
  const resourceHighlights = highlights.filter(
    (highlight) => highlight.anchor?.referenceId === taskId,
  );
  const dispatch = useAppDispatch();
  const { panes, activePaneId, isSplitView } = useWorkspace();

  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );

  const handleHighlight = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection?.createAnchor(taskId);
    dispatch(
      addHighlight({
        id: crypto.randomUUID(),
        anchor,
      }),
    );
  };

  const handleAddNote = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection?.createAnchor(taskId);
    let targetPane = panes["right"] ?? undefined;
    const draftNote: NoteType = {
      id: "",
      taskId: taskId,
      anchor,
      content: "",
      createdAt: new Date().toISOString(),
    };
    if (isSplitView) {
      if (activePaneId == "right") {
        dispatch(setActivePane({ paneId: "left" }));
        targetPane = panes["left"];
      } else {
        dispatch(setActivePane({ paneId: "right" }));
        targetPane = panes["right"];
      }
    } else {
      dispatch(openSplitPane());
      targetPane = undefined;
    }
    const notesTab = targetPane?.tabs.find(
      (tab) => tab.type === tabTypes.NOTE && tab.taskId === anchor.referenceId,
    );
    if (notesTab) {
      dispatch(
        updateTabData({
          tabId: notesTab.id,
          data: {
            activeNoteId: draftNote.id,
            draftNote,
          },
        }),
      );

      dispatch(
        switchTab({
          tabId: notesTab.id,
        }),
      );
    } else {
      dispatch(
        addToPane({
          tab: {
            id: crypto.randomUUID(),
            label: "Notes",
            type: tabTypes.NOTE,
            taskId: anchor.referenceId,
            data: {
              activeNoteId: draftNote.id,
              draftNote,
            },
          },
        }),
      );
    }
  };

  const handleAskDoubt = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection?.createAnchor(taskId);
    let targetPane = panes["right"] ?? undefined;
    if (isSplitView) {
      if (activePaneId == "right") {
        dispatch(setActivePane({ paneId: "left" }));
        targetPane = panes["left"];
      } else {
        dispatch(setActivePane({ paneId: "right" }));
        targetPane = panes["right"];
      }
    } else {
      dispatch(openSplitPane());
      targetPane = undefined;
    }

    const newDiscussion: DiscussionType = {
      id: crypto.randomUUID(),
      title: anchor.selectedText!,
      taskId: taskId,
      messages: [],
      createdAt: new Date().toISOString(),
    };
    dispatch(addDiscussion(newDiscussion));
    const draftMessage: MessageType = {
      id: "",
      discussionId: newDiscussion.id,
      anchor,
      content: "",
      createdAt: new Date().toISOString(),
      role: "user" as MessageRole,
    };
    const discussionTab = targetPane?.tabs.find(
      (tab) =>
        tab.type === tabTypes.DISCUSS && tab.taskId === anchor.referenceId,
    );
    if (discussionTab) {
      dispatch(
        updateTabData({
          tabId: discussionTab.id,
          data: {
            resourceId: anchor.referenceId,
            activeDiscussionId: newDiscussion.id,
            draftMessage,
          },
        }),
      );
    } else {
      dispatch(
        addToPane({
          tab: {
            id: newDiscussion.id,
            label: "Discussion Tab",
            taskId: taskId,
            type: tabTypes.DISCUSS,
            data: {
              draftMessage,
              resourceId: anchor.referenceId,
              activeDiscussionId: newDiscussion.id,
            },
          },
        }),
      );
    }
  };

  return (
    <SelectableMarkdown
      referenceId={taskId}
      markdown={markdown}
      highlights={resourceHighlights}
      onSelect={setSelectionInfo}
      selectionToolBar={
        <SelectionToolBar
          selection={selectionInfo}
          onHighlight={handleHighlight}
          onAddNote={handleAddNote}
          onAskDoubt={handleAskDoubt}
        />
      }
    />
  );
};
