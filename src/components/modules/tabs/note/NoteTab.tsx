"use client";

import React, { useEffect, useRef, useState } from "react";
import { Note } from "./Note";
import { NoteType } from "@/types/NoteType";
import Button from "@/components/ui/Button";
import { CornerDownRight, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { TextArea } from "@/components/ui/TextArea";
import { TabHeader } from "../../../ui/TabHeader";
import { TabContainer } from "../../../ui/TabContainer";
import { NoteTabDataType } from "@/types/WorkspaceType";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useTab } from "@/hooks/useTab";
import { addNote } from "@/store/features/notes/noteSlice";

export const NoteTab = () => {
  const dispatch = useAppDispatch();
  const { tabData, taskId } = useTab();
  const { draftNote } = tabData as NoteTabDataType;

  const notes = useAppSelector((state) =>
    state.note.notes.filter((note) => note?.taskId === taskId),
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (draftNote) {
      setNoteData(draftNote);
    }
    textareaRef.current?.focus();
  }, [draftNote]);
  const emptyNoteData: NoteType = {
    id: "",
    content: "",
    createdAt: new Date().toISOString(),
    taskId: taskId,
  };
  const draftNoteData = draftNote ?? emptyNoteData;
  const [noteData, setNoteData] = useState<NoteType>(draftNoteData);

  const handleRemoveReferenceText = () => {
    const { anchor, ...rest } = noteData;
    setNoteData(rest);
  };

  const handleAddNote = () => {
    const finalNote = {
      ...noteData,
      id: crypto.randomUUID(),
    };
    dispatch(addNote(finalNote));
    setNoteData(emptyNoteData);
  };

  return (
    <TabContainer>
      <TabHeader
        title="Notes"
        subtitle="Capture ideas without losing your place"
      />

      <ScrollArea className="flex-1 space-y-3 px-6! py-5!">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ScrollArea>
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mt-5 rounded-3xl border border-card-hover bg-card p-3">
          {!!noteData?.anchor?.selectedText && (
            <div className="mb-3 rounded-2xl bg-card-hover p-3 flex items-center gap-3">
              <div className="text-white relative -top-2">
                <CornerDownRight size={25} />
              </div>
              <div className="flex items-center justify-between gap-3 flex-1">
                <p className="line-clamp-3 text-sm text-foreground/90">
                  {noteData.anchor.selectedText}
                </p>
                <Button
                  variant="nav"
                  className="bg-transparent!"
                  onClick={handleRemoveReferenceText}
                >
                  <X />
                </Button>
              </div>
            </div>
          )}

          <TextArea
            ref={textareaRef}
            value={noteData?.content ?? ""}
            onChange={(event) =>
              setNoteData((noteData) => {
                return { ...noteData!, content: event.target.value };
              })
            }
            placeholder="Write a note, thought, or reminder..."
            className="max-h-30 h-full border-none! bg-card! p-0! pl-2! "
          />

          <div className="mt-3 flex justify-end">
            <Button
              size="sm"
              className="gap-2 shadow-[0_10px_25px_rgba(29,173,192,0.2)]"
              onClick={handleAddNote}
              disabled={!noteData?.content.trim()}
            >
              <Plus size={16} />
              <span>Save Note</span>
            </Button>
          </div>
        </div>
      </div>
    </TabContainer>
  );
};
