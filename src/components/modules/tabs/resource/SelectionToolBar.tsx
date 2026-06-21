import Button from "@/components/ui/Button";
import { addNote } from "@/store/features/notes/noteSlice";
import {
  addToPane,
  openSplitPane,
  selectWorkspace,
  setActivePane,
} from "@/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { use } from "react";

type SelectionToolBarProps = {
  text: string;
  x: number;
  y: number;
};

export const SelectionToolBar = ({ text, x, y }: SelectionToolBarProps) => {
  const dispatch = useAppDispatch();
  const { panes, activePaneId } = useAppSelector(selectWorkspace);
  
  const handleAddNote = () => {
    if (panes["right"]) {
      if (activePaneId == "right") dispatch(setActivePane({ paneId: "left" }));
      else dispatch(setActivePane({ paneId: "right" }));
    } else {
      dispatch(openSplitPane());
    }
    dispatch(
      addToPane({ tab: { id: "abcd", label: "MockTab", type: "Notes" } }),
    );
  };
  console.log("SelectionToolBar Render");

  return (
    <div
      className="absolute z-50 bg-card border border-primary p-2 rounded-lg grid grid-cols-3 gap-2 text-sm -translate-x-1/2 "
      style={{
        left: Math.max(235, x),
        top: y - 50,
      }}
    >
      <Button variant="list">Highlight</Button>
      <Button variant="list" onClick={handleAddNote}>
        Add Note
      </Button>
      <Button variant="list" className="">
        Ask Doubt
      </Button>
    </div>
  );
};
