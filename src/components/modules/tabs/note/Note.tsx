"use client";

import Button from "@/components/ui/Button";
import { type NoteType } from "@/types/NoteType";
import { formatDate } from "@/utils/date";
import clsx from "clsx";
import { Pen, Trash2 } from "lucide-react";
import { NoteCard } from "./NoteCard";
import CardActions from "./CardActions";
import { HighlightBox } from "./HighlightBox";
import { useAppDispatch } from "@/store/store";
import { deleteNote } from "@/store/features/notes/noteSlice";

export const Note = ({ note }: { note: NoteType }) => {
  const dispatch = useAppDispatch();
  const formattedDate = formatDate(note.createdAt);
  const handleDeleteNote = () => {
    dispatch(deleteNote({ id: note.id }));
  };
  return (
    <NoteCard>
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral/80">
          <span className="h-1 w-1 rounded-full bg-primary/70" />
          <time dateTime={note.createdAt}>{formattedDate.dateTime}</time>
        </div>

        <CardActions>
          <Button
            variant="editIcon"
            aria-label={`Edit note created ${formattedDate.dateTime}`}
            tooltip="Edit note"
          >
            <Pen size={15} />
          </Button>
          <Button
            variant="deleteIcon"
            aria-label={`Delete note created ${formattedDate.dateTime}`}
            tooltip="Delete note"
            onClick={handleDeleteNote}
          >
            <Trash2 size={15} />
          </Button>
        </CardActions>
      </div>

      {note?.anchor?.selectedText && (
        <HighlightBox text={note.anchor.selectedText} />
      )}

      <div
        className={clsx(
          "relative rounded-xl rounded-tl-none border border-transparent ",
          "bg-background/35 p-4 text-sm leading-6 text-foreground/95 transition-all duration-200 ",
          "group-hover:border-primary/20 group-hover:bg-background/45",
        )}
      >
        <p className="whitespace-pre-wrap text-md">{note.content}</p>
      </div>
    </NoteCard>
  );
};
