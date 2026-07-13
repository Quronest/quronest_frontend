import { NoteType } from "@/types/NoteType";
import { SelectionAnchor } from "@/types/WorkspaceType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { notes: NoteType[]; activeNoteId: string | null } = {
  notes: [],
  activeNoteId: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteType>) => {
      state.notes.push(action.payload);
    },

    updateNoteContent: (
      state,
      action: PayloadAction<{
        id: string;
        content: string;
      }>,
    ) => {
      const note = state.notes.find((note) => note.id === action.payload.id);

      if (!note) return;

      note.content = action.payload.content;
      note.updatedAt = new Date().toISOString();
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    updateNoteAnchor: (
      state,
      action: PayloadAction<{
        id: string;
        anchor: SelectionAnchor;
      }>,
    ) => {
      const note = state.notes.find((note) => note.id === action.payload.id);

      if (!note) return;

      note.anchor = action.payload.anchor;
      note.updatedAt = new Date().toISOString();
    },

    setActiveNote: (state, action: PayloadAction<string | null>) => {
      state.activeNoteId = action.payload;
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNoteAnchor,
  updateNoteContent,
  setActiveNote,
} = noteSlice.actions;

export default noteSlice.reducer;
