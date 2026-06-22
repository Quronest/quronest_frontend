import { SelectionAnchor } from "@/types/WorkspaceType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HighlightText = {
  id: string;
  anchor: SelectionAnchor;
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
        (highlight) =>
          highlight.anchor?.selectedText ===
          action.payload.anchor?.selectedText,
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
