import Button from "@/components/ui/Button";
import { tabTypes } from "@/enums/TabEnums";
import { useTab } from "@/hooks/useTab";
import { useWorkspace } from "@/hooks/useWorkspace";
import { addDiscussion } from "@/store/features/discussion/discussionSlice";
import {
  addHighlight,
  selectHighlight,
} from "@/store/features/highlights/highlightSlice";
import { addNote } from "@/store/features/notes/noteSlice";
import {
  addToPane,
  openSplitPane,
  setActivePane,
  switchTab,
  updateTabData,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { DiscussionType, MessageRole } from "@/types/DiscussionType";
import { NoteType } from "@/types/NoteType";
import {
  NoteTabDataType,
  TextSelection,
  ResourceTabDataType,
} from "@/types/WorkspaceType";

export type SelectionToolBarProps = {
  selection: TextSelection | null;
  onHighlight?: (selection: TextSelection | null) => void;
  onAddNote?: (selection: TextSelection | null) => void;
  onAskDoubt?: (selection: TextSelection | null) => void;
};

export const SelectionToolBar = ({
  selection,
  onHighlight,
  onAddNote,
  onAskDoubt,
}: SelectionToolBarProps) => {
  if (!selection) {
    return null;
  }

  return (
    <div
      className="absolute z-50 bg-card border border-primary p-2 rounded-lg grid grid-cols-3 gap-2 text-sm -translate-x-1/2 "
      style={{
        left: Math.max(235, selection.position.x),
        top: selection.position.y - 50,
      }}
    >
      {onHighlight && (
        <Button variant="list" onClick={() => onHighlight(selection)}>
          Highlight
        </Button>
      )}
      {onAddNote && (
        <Button variant="list" onClick={() => onAddNote(selection)}>
          Add Note
        </Button>
      )}
      {onAskDoubt && (
        <Button variant="list" className="" onClick={() => onAskDoubt(selection)}>
          Ask Doubt
        </Button>
      )}
    </div>
  );
};
