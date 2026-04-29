"use client";

import React, { useEffect, useRef, useState } from "react";
import { Note } from "./Note";
import { mockNotes } from "@/types/NoteType";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { TextArea } from "@/components/ui/TextArea";
import { TabHeader } from "../ui/TabHeader";
import { TabContainer } from "../ui/TabContainer";

const TEXTAREA_BASE_HEIGHT = 96;
const TEXTAREA_MAX_HEIGHT = 144;

export const NoteTab = () => {
  const [draft, setDraft] = useState("");

  return (
    <TabContainer>
      <TabHeader
        title="Notes"
        subtitle="Capture ideas without losing your place"
      />

      <ScrollArea className="flex-1 space-y-3 px-6! py-5!">
        {mockNotes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ScrollArea>

      <div className="rounded-3xl flex gap-3  my-5 mx-6">
        <TextArea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Write a note, thought, or reminder..."
          className="max-h-36 flex-1 p-3 bg-card/50! border border-neutral"
        />
        <Button
          size="sm"
          className="gap-2 h-fit! shrink-0 self-end shadow-[0_10px_25px_rgba(29,173,192,0.2)]"
          disabled={!draft.trim()}
        >
          <Plus size={16} />
          <span>Save Note</span>
        </Button>
      </div>
    </TabContainer>
  );
};
