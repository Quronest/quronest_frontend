import Button from "@/components/ui/Button";
import { addNote } from "@/store/features/notes/noteSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { use } from "react";

type SelectionToolBarProps = {
  text: string;
  rect: DOMRect;
};

export const SelectionToolBar = ({ text, rect }: SelectionToolBarProps) => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(state => state.note);
    const handleAddNote = () => {
        const newNote = {
            id: Date.now().toString(),
            selectedText: text,
            content: "",
            createdAt: new Date().toISOString(),
        };
        dispatch(addNote(newNote));
    }

  return (
    <div
      className="fixed z-50 bg-card border border-primary p-2 rounded-lg grid grid-cols-3 gap-2 text-sm -translate-x-1/2 "
      style={{
        left: rect.left + 30 ,
        top: rect.top - 60,
      }}
    >
        <Button variant="list">
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
