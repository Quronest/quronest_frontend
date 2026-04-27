"use client";

import Button from "@/components/ui/Button";
import { type NoteType } from "@/types/NoteType";
import clsx from "clsx";
import { Pen, Quote, Trash2 } from "lucide-react";

const formatNoteDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

export const Note = ({ note }: { note: NoteType }) => {
  return (
    <article
      className={clsx(
        "group relative overflow-hidden rounded-2xl border border-card-hover/70 bg-card/70 p-4 mt-1",
        "shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-r hover:border-primary/45 hover:shadow-[0_20px_45px_rgba(0,0,0,0.24)]",
        "focus-within:-translate-y-0.5 focus-within:border-primary/55",
      )}
    >
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral/80">
          <span className="h-1 w-1 rounded-full bg-primary/70" />
          <time dateTime={note.createdAt.toISOString()}>
            {formatNoteDate(note.createdAt)}
          </time>
        </div>

        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-safe:translate-y-1">
          <Button
            variant="icon"
            className="rounded-full! border border-primary/20 bg-background/60 text-primary!"
            aria-label={`Edit note created ${formatNoteDate(note.createdAt)}`}
            tooltip="Edit note"
          >
            <Pen size={15} />
          </Button>
          <Button
            variant="icon"
            className="rounded-full! border border-red-400/15 bg-background/60 text-red-300!"
            aria-label={`Delete note created ${formatNoteDate(note.createdAt)}`}
            tooltip="Delete note"
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>

      <div className="inline-flex max-w-full items-start rounded-t-xl gap-2 border-primary/20 bg-background/45 px-3 py-1.5 text-xs text-primary/90">
        <Quote size={14} className="mt-0.5 shrink-0" />
        <p className="line-clamp-1">{note.selectedText}</p>
      </div>

      <div className="relative rounded-xl rounded-tl-none border border-transparent bg-background/35 p-4 text-sm leading-6 text-foreground/95 transition-all duration-200 group-hover:border-primary/20 group-hover:bg-background/45">
        <p className="whitespace-pre-wrap text-md">{note.content}</p>
      </div>
    </article>
  );
};
