import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addHighlight,
  selectHighlight,
} from "@/store/features/highlights/highlightSlice";
import { TextSelection } from "@/types/WorkspaceType";
import { useState } from "react";
import { useTab } from "@/hooks/useTab";
import { NoteType } from "@/types/NoteType";

import { DraftMessageType } from "@/types/DiscussionType";
import { SelectableMarkdown } from "./markdown/SelectableMarkdown";
import { SelectionToolBar } from "./SelectionToolBar";
import { AnchorTypes } from "@/enums/AnchorEnums";
import { DailyTaskType } from "@/store/features/user/userType";
import { ReadingTaskContentType, TaskAnchor } from "@/types/TaskType";
import { useTabNavigation } from "@/hooks/useTabNavigation";
import { RawTabDataType } from "@/utils/tabDataConvertor";

export const DocsRenderer = ({
  readingTaskData,
}: {
  readingTaskData: DailyTaskType;
}) => {
  const taskId = readingTaskData.id;
  const markdown = (readingTaskData.content as ReadingTaskContentType)
    .markdown_content;
  const anchors = readingTaskData.anchors as TaskAnchor[] | [];
  const { tabData, tabRef } = useTab();
  const { highlights } = useAppSelector(selectHighlight);

  const resourceHighlights = highlights.filter(
    (highlight) => highlight.anchor?.referenceId === taskId,
  );

  const dispatch = useAppDispatch();

  const [selectionInfo, setSelectionInfo] = useState<TextSelection | null>(
    null,
  );

  const { navigate } = useTabNavigation();

  const handleHighlight = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection?.createAnchor(taskId, AnchorTypes.HIGHLIGHT);
    dispatch(
      addHighlight({
        id: crypto.randomUUID(),
        anchor,
      }),
    );
  };

  const handleAddNote = (selection: TextSelection | null) => {
    console.log("Selection: ", selection)
    if (!selection) return;
    const anchor = selection?.createAnchor(taskId, AnchorTypes.NOTE);
    const draftNote: NoteType = {
      id: "",
      taskId: taskId,
      anchor,
      content: "",
      createdAt: new Date().toISOString(),
    };
    const noteTabData: RawTabDataType = {
      id: "note-" + readingTaskData.id,
      path: "/note",
      title: "Note- " + readingTaskData.title,
      payload: {
        taskId: readingTaskData.id,
        activeNoteId: draftNote.id,
        draftNote,
      },
    };
    navigate({ target: "blank", tabData: noteTabData });
  };

  const handleAskDoubt = (selection: TextSelection | null) => {
    if (!selection) return;
    const anchor = selection?.createAnchor(taskId, AnchorTypes.DOUBT);
    const draftMessage: DraftMessageType = {
      anchor,
    };
    const discussTabData = {
      id: "discuss-" + readingTaskData.id,
      title: "Discuss- " + readingTaskData.title,
      path: "/discuss",
      payload: {
        taskId: readingTaskData.id,
        draftMessage: draftMessage,
        activeDiscussionId: "",
      },
    };
    navigate({ target: "blank", tabData: discussTabData });
  };

  return (
    <SelectableMarkdown
      referenceId={taskId}
      markdown={markdown}
      highlights={resourceHighlights}
      anchors={anchors}
      resizeContainerRef={tabRef}
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
