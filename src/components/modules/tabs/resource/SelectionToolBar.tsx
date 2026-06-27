import Button from "@/components/ui/Button";
import { tabTypes } from "@/enums/TabEnums";
import { useTab } from "@/hooks/useTab";
import { useWorkspace } from "@/hooks/useWorkspace";
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
import { NoteType } from "@/types/NoteType";
import {
  NoteTabDataType,
  ResourceSelection,
  ResourceTabDataType,
} from "@/types/WorkspaceType";

type SelectionToolBarProps = {
  selection: ResourceSelection;
};

export const SelectionToolBar = ({ selection }: SelectionToolBarProps) => {
  const dispatch = useAppDispatch();
  const { panes, activePaneId, isSplitView } = useWorkspace();

  const handleAddNote = () => {
    let targetPane = panes["right"] ?? undefined;
    const draftNote: NoteType = {
      id: crypto.randomUUID(),
      anchor: selection.anchor,
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
        (tab.data as NoteTabDataType).resourceId ===
          selection.anchor.resourceId,
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
              resourceId: selection.anchor.resourceId,
              activeNoteId: draftNote.id,
              draftNote,
            },
          },
        }),
      );
    }
  };

  const handleHighlight = () => {
    dispatch(
      addHighlight({
        id: crypto.randomUUID(),
        anchor: selection.anchor,
      }),
    );
  };

  return (
    <div
      className="absolute z-50 bg-card border border-primary p-2 rounded-lg grid grid-cols-3 gap-2 text-sm -translate-x-1/2 "
      style={{
        left: Math.max(235, selection.position.x),
        top: selection.position.y - 50,
      }}
    >
      <Button variant="list" onClick={handleHighlight}>
        Highlight
      </Button>
      <Button variant="list" onClick={handleAddNote}>
        Add Note
      </Button>
      <Button variant="list" className="">
        Ask Doubt
      </Button>
    </div>
  );
};
