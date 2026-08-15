"use client";

import React, { useEffect, useRef, useState } from "react";
import { Note } from "./Note";
import { NoteType } from "@/types/NoteType";
import Button from "@/components/ui/Button";
import { CornerDownRight, Plus, X, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { TextArea } from "@/components/ui/TextArea";
import { TabHeader } from "../../../ui/TabHeader";
import { TabContainer } from "../../../ui/TabContainer";
import { NoteTabPayloadType } from "@/types/WorkspaceType";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useTab } from "@/hooks/useTab";
import {
  addNote,
  addNotes,
  updateNote,
  deleteNote,
} from "@/store/features/notes/noteSlice";
import {
  useLazyGetNotesQuery,
  useCreateNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} from "@/store/features/notes/noteApi";
import { AnchorTypes } from "@/enums/AnchorEnums";

export type NoteTabProps = {
  activeNoteId?: string | null;
};

export const NoteTab = ({
  activeNoteId: propActiveNoteId,
}: NoteTabProps = {}) => {
  const dispatch = useAppDispatch();
  const { tabData } = useTab();
  const tabPayload = tabData.payload;
  const {
    taskId,
    draftNote,
    activeNoteId: tabActiveNoteId,
  } = (tabPayload as NoteTabPayloadType) || {};
  const activeNoteId =
    propActiveNoteId !== undefined ? propActiveNoteId : tabActiveNoteId;

  // Retrieve notes and sort chronologically (ascending) for WhatsApp style rendering
  // const notes = useAppSelector((state) =>
  //   state.note.notes
  //     .filter((note) => note?.taskId === taskId)
  //     .sort(
  //       (a, b) =>
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  //     ),
  // );

  // const notes: NoteType[] = [];
  const [notes, setNotes] = useState<NoteType[] | []>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [triggerGetNotes, { isFetching }] = useLazyGetNotesQuery();
  const [createNoteMutation] = useCreateNoteMutation();
  const [editNoteMutation] = useEditNoteMutation();
  const [deleteNoteMutation] = useDeleteNoteMutation();

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Map Backend DTO to Frontend NoteType

  const emptyNoteData: NoteType = {
    id: "",
    content: "",
    creation_timestamp: new Date().toISOString(),
    task_id: taskId,
  };
  const draftNoteData = draftNote ?? emptyNoteData;
  const [noteData, setNoteData] = useState<NoteType>(draftNoteData);

  useEffect(() => {
    if (draftNote) {
      setNoteData(draftNote);
    }
    textareaRef.current?.focus();
  }, [draftNote]);

  // Initial Load (page 0)
  useEffect(() => {
    const loadInitialNotes = async () => {
      try {
        const res = await triggerGetNotes({
          taskId,
          page: 0,
          sort: "creationTimestamp,desc",
        }).unwrap();

        const mapped = res.content;
        setNotes(() => [...mapped]);
        // notes.push(...mapped);
        // dispatch(addNotes(mapped));
        setPage(0);
        setHasMore(!res.last);

        // Scroll to bottom
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 50);
      } catch (err) {
        console.error("Failed to load initial notes:", err);
      }
    };

    if (taskId) {
      loadInitialNotes();
    }
  }, [taskId, triggerGetNotes, dispatch]);

  // Infinite Scroll Up to load older notes
  const handleScroll = async () => {
    const container = scrollRef.current;
    if (!container || isFetching || isLoadingMore || !hasMore) return;

    if (container.scrollTop < 80) {
      const nextPage = page + 1;
      setIsLoadingMore(true);
      const oldScrollHeight = container.scrollHeight;

      try {
        const res = await triggerGetNotes({
          taskId,
          page: nextPage,
          sort: "creationTimestamp,desc",
        }).unwrap();

        const mapped = res.content;
        // dispatch(addNotes(mapped));
        // notes.push(...mapped);
        setNotes((prevNotes) => [...prevNotes, ...mapped]);
        setPage(nextPage);
        setHasMore(!res.last);

        // Adjust scroll position to prevent view jumping
        setTimeout(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop =
            container.scrollTop + (newScrollHeight - oldScrollHeight);
        }, 0);
      } catch (err) {
        console.error("Failed to load more notes:", err);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const handleRemoveReferenceText = () => {
    const { anchor, ...rest } = noteData;
    setNoteData(rest);
  };

  const handleSaveNote = async () => {
    if (!noteData.content.trim()) return;

    if (noteData.id) {
      // Edit Mode
      try {
        const res = await editNoteMutation({
          noteId: noteData.id,
          message: noteData.content,
        }).unwrap();

        const updatedNote = res;
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
        );
        setNoteData(emptyNoteData);
      } catch (err) {
        console.error("Failed to edit note:", err);
      }
    } else {
      // Add Mode
      try {
        const res = await createNoteMutation({
          taskId,
          message: noteData.content,
          anchor: noteData.anchor
            ? {
                type: noteData.anchor.type,
                block_offset: noteData.anchor.block_offset,
                selection_offset: noteData.anchor.selection_offset,
                selected_text: noteData.anchor.selected_text || "",
              }
            : undefined,
          reference_text: noteData.anchor?.selected_text,
        }).unwrap();

        const newNote = res;
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setNoteData(emptyNoteData);

        // Scroll to bottom
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 50);
      } catch (err) {
        console.error("Failed to create note:", err);
      }
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNoteMutation({ noteId }).unwrap();
      dispatch(deleteNote({ id: noteId }));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const handleStartEdit = (note: NoteType) => {
    setNoteData(note);
    textareaRef.current?.focus();
  };

  return (
    <TabContainer>
      <TabHeader
        title="Notes"
        subtitle="Capture ideas without losing your place"
      />

      <ScrollArea
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 space-y-3 px-6! py-5!"
      >
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            isActive={note.id === activeNoteId}
            onEdit={() => handleStartEdit(note)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </ScrollArea>
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mt-5 rounded-3xl border border-card-hover bg-card p-3">
          {!!noteData?.anchor?.selected_text && (
            <div className="mb-3 rounded-2xl bg-card-hover p-3 flex items-center gap-3">
              <div className="text-white relative -top-2">
                <CornerDownRight size={25} />
              </div>
              <div className="flex items-center justify-between gap-3 flex-1">
                <p className="line-clamp-3 text-sm text-foreground/90">
                  {noteData.anchor.selected_text}
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

          <div className="mt-3 flex justify-end gap-2">
            {noteData.id && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setNoteData(emptyNoteData)}
              >
                <span>Cancel</span>
              </Button>
            )}
            <Button
              size="sm"
              className="gap-2 shadow-[0_10px_25px_rgba(29,173,192,0.2)]"
              onClick={handleSaveNote}
              disabled={!noteData?.content.trim()}
            >
              {noteData.id ? <Check size={16} /> : <Plus size={16} />}
              <span>{noteData.id ? "Update Note" : "Save Note"}</span>
            </Button>
          </div>
        </div>
      </div>
    </TabContainer>
  );
};
