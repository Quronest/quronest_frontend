import React from "react";
import { Note } from "./Note";
import { mockNotes } from "@/types/NoteType";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export const NoteTab = () => {
  return (
    <div className=" p-6 flex flex-col  h-full w-full">
      {/* Notes list */}
      <div className="flex-1">
        {/* <Note note={mockNotes[0]} /> */}
        <div className="space-y-2">
          {mockNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      </div>
      <div className="shrink-0 h-fit w-full flex items-center gap-3">
        <textarea placeholder="write something..." className="flex-1 p-1 px-2" />
        <Button size="md">
          <span>Save</span>
        </Button>
      </div>
    </div>
  );
};
