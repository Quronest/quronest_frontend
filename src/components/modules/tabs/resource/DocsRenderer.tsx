import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

import { Heading } from "./markdown/Heading";
import { Paragraph } from "./markdown/Paragraph";
import { BlockQuote } from "./markdown/BlockQuote";
import { CodeBlock } from "./markdown/CodeBlock";
import { PreBlock } from "./markdown/PreBlock";

import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addHighlight,
  selectHighlight,
} from "@/store/features/highlights/highlightSlice";
import {
  NoteTabDataType,
  TextSelection,
  ResourceTabDataType,
} from "@/types/WorkspaceType";
import { useContext, useState } from "react";
import { TabContext } from "@/context/Tabcontext";
import { useTab } from "@/hooks/useTab";
import { MarkdownRenderer } from "./MarkdownRenderer";
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
import { DiscussionType, MessageRole } from "@/types/DiscussionType";
import { addDiscussion } from "@/store/features/discussion/discussionSlice";
import { SelectableMarkdown } from "./markdown/SelectableMarkdown";
import { SelectionToolBar } from "./SelectionToolBar";

export const DocsRenderer = () => {
  const { tabData } = useTab();
  const { resourceId, markdown } = tabData as ResourceTabDataType;
  const { highlights } = useAppSelector(selectHighlight);
  const resourceHighlights = highlights.filter(
    (highlight) => highlight.anchor?.reference === resourceId,
  );
  const dispatch = useAppDispatch();
  const { panes, activePaneId, isSplitView } = useWorkspace();

  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );

  const handleHighlight = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection?.createAnchor(resourceId);
    dispatch(
      addHighlight({
        id: crypto.randomUUID(),
        anchor,
      }),
    );
  };

  const handleAddNote = (selection: TextSelection | null) => {
    console.log("from add note", selection);
    if (!selection) return;
    const anchor = selection?.createAnchor(resourceId);
    let targetPane = panes["right"] ?? undefined;
    const draftNote: NoteType = {
      id: "",
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
      (tab) =>
        tab.type === tabTypes.NOTE &&
        (tab.data as NoteTabDataType).resourceId === anchor.reference,
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
            data: {
              resourceId: anchor.reference,
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
    const anchor = selection?.createAnchor(resourceId);
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
    const draftMessage = {
      id: "",
      anchor,
      content: "",
      createdAt: new Date().toISOString(),
      role: "user" as MessageRole,
    };
    const newDiscussion: DiscussionType = {
      id: crypto.randomUUID(),
      title: "New Discussion",
      reference: anchor,
      messages: [],
      createdAt: new Date().toISOString(),
    };
    dispatch(addDiscussion(newDiscussion));
    const discussionTab = targetPane?.tabs.find(
      (tab) =>
        tab.type === tabTypes.DISCUSS &&
        (tab.data as ResourceTabDataType).resourceId === anchor.reference,
    );
    if (discussionTab) {
      dispatch(
        updateTabData({
          tabId: discussionTab.id,
          data: {
            resourceId: anchor.reference,
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
            type: tabTypes.DISCUSS,
            data: {
              draftMessage,
              resourceId: anchor.reference,
              activeDiscussionId: newDiscussion.id,
            },
          },
        }),
      );
    }
  };

  return (
    <SelectableMarkdown
      referenceId={resourceId}
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
