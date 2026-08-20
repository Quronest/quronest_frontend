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
import React, { useEffect, useRef, useState } from "react";

export const Note = ({
  note,
  onEdit,
  onDelete,
  isActive,
}: {
  note: NoteType;
  onEdit: () => void;
  onDelete: () => void;
  isActive: boolean;
}) => {
  const dispatch = useAppDispatch();
  const formattedDate = formatDate(note.creation_timestamp);
  const noteRef = useRef<HTMLDivElement>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isActive) {
      noteRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      setPulse(true);
      const timer = setTimeout(() => {
        setPulse(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleDeleteNote = () => {
    onDelete();
  };

  return (
    <div ref={noteRef}>
      <NoteCard className={clsx(pulse && "animate-border-pulse")}>
        <div className="relative flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral/80">
            <span className="h-1 w-1 rounded-full bg-primary/70" />
            <time dateTime={note.creation_timestamp}>{formattedDate.dateTime}</time>
          </div>

          <CardActions>
            <Button
              variant="editIcon"
              aria-label={`Edit note created ${formattedDate.dateTime}`}
              tooltip="Edit note"
              onClick={onEdit}
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

        {note?.anchor?.selected_text && (
          <HighlightBox text={note.anchor.selected_text} />
        )}

        <div
          className={clsx(
            "relative rounded-xl rounded-tl-none border border-transparent ",
            "bg-background/35 p-4 text-sm leading-6 text-foreground/95 transition-all duration-200 ",
            " group-hover:bg-background/45",
          )}
        >
          <p className="whitespace-pre-wrap text-md">{note.message}</p>
        </div>
      </NoteCard>
    </div>
  );
};
