import Button from "@/components/ui/Button";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  addHighlight,
  selectHighlight,
} from "@/store/features/highlights/highlightSlice";
import {
  addToPane,
  openSplitPane,
  setActivePane,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { mockNotes } from "@/types/NoteType";
import { ResourceSelection } from "@/types/WorkspaceType";

type SelectionToolBarProps = {
  selection: ResourceSelection;
};

export const SelectionToolBar = ({ selection }: SelectionToolBarProps) => {
  const dispatch = useAppDispatch();
  const { activePaneId, isSplitView } = useWorkspace();

  const handleAddNote = () => {
    if (isSplitView) {
      if (activePaneId == "right") dispatch(setActivePane({ paneId: "left" }));
      else dispatch(setActivePane({ paneId: "right" }));
    } else {
      dispatch(openSplitPane());
    }
    dispatch(
      addToPane({
        tab: {
          id: "abcd",
          label: "MockTab",
          type: "Notes",
          data: { notes: mockNotes },
        },
      }),
    );
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
