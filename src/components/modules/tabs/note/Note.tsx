"use client";

import Button from "@/components/ui/Button";
import { type NoteType } from "@/types/NoteType";
import clsx from "clsx";
import { Pen, Quote, Trash2 } from "lucide-react";
import { NoteCard } from "./NoteCard";
import CardActions from "./CardActions";
import { HighlightBox } from "./HighlightBox";

const formatNoteDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

export const Note = ({ note }: { note: NoteType }) => {
  return (
    <NoteCard>
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral/80">
          <span className="h-1 w-1 rounded-full bg-primary/70" />
          <time dateTime={note.createdAt.toISOString()}>
            {formatNoteDate(note.createdAt)}
          </time>
        </div>

        <CardActions>
          <Button
            variant="editIcon"
            aria-label={`Edit note created ${formatNoteDate(note.createdAt)}`}
            tooltip="Edit note"
          >
            <Pen size={15} />
          </Button>
          <Button
            variant="deleteIcon"
            aria-label={`Delete note created ${formatNoteDate(note.createdAt)}`}
            tooltip="Delete note"
          >
            <Trash2 size={15} />
          </Button>
        </CardActions>
      </div>

      <HighlightBox text={note.selectedText} />

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
