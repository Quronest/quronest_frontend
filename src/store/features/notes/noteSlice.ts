import { createSlice } from "@reduxjs/toolkit";

type Note = {
  id: string;
  selectedText: string;
  content: string;
  createdAt: string;
};

const initialState: { notes: Note[] } = {
  notes: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },

    editNote: (state, action) => {
      const { id, content } = action.payload;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.content = content;
      }
    },

    printNotes: (state) => {
      console.log(state.notes);
    }

  },
});

export const { addNote, deleteNote, editNote, printNotes } = noteSlice.actions;

export default noteSlice.reducer;
