import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HighlightText = {
  id: string;
  text: string;
  resourceId: string;
};

export type HighlightState = {
  highlights: HighlightText[];
};

const initialState: HighlightState = {
  highlights: [],
};

const highlightSlice = createSlice({
  name: "highlights",
  initialState,
  reducers: {
    addHighlight: (state, action: PayloadAction<HighlightText>) => {
      const exists = state.highlights.some(
        (highlight) => highlight.text === action.payload.text,
      );

      if (exists) return;
      state.highlights.push(action.payload);
    },
    deleteHighlight: (state, action: PayloadAction<{ id: string }>) => {
      state.highlights = state.highlights.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});
export const selectHighlight = (state: { highlight: HighlightState }) =>
  state.highlight;

export const { addHighlight, deleteHighlight } = highlightSlice.actions;
export default highlightSlice.reducer;
