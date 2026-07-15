import { DiscussionType, MessageType } from "@/types/DiscussionType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DiscussionState = {
  discussions: DiscussionType[];
  activeDiscussionId: string | null;
};

const initialState: DiscussionState = {
  discussions: [],
  activeDiscussionId: null,
};

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {
    addDiscussion: (state, action: PayloadAction<DiscussionType>) => {
      state.discussions.push(action.payload);
      state.activeDiscussionId = action.payload.id;
    },

    deleteDiscussion: (state, action: PayloadAction<string>) => {
      const discussionId = action.payload;

      const index = state.discussions.findIndex(
        (discussion) => discussion.id === discussionId,
      );

      state.discussions = state.discussions.filter(
        (discussion) => discussion.id !== discussionId,
      );

      if (state.activeDiscussionId === discussionId) {
        const nextDiscussion =
          state.discussions[index] ?? state.discussions[index - 1];

        state.activeDiscussionId = nextDiscussion?.id ?? null;
      }
    },

    setActiveDiscussion: (state, action: PayloadAction<string>) => {
      state.activeDiscussionId = action.payload;
    },

    updateMessage: (
      state,
      action: PayloadAction<{
        discussionId: string;
        messageId: string;
        content: string;
      }>,
    ) => {
      const discussion = state.discussions.find(
        (discussion) => discussion.id === action.payload.discussionId,
      );

      if (!discussion) return;

      const message = discussion.messages.find(
        (message) => message.id === action.payload.messageId,
      );

      if (!message) return;

      message.content = action.payload.content;
    },

    addMessage: (
      state,
      action: PayloadAction<{
        discussionId: string;
        message: MessageType;
      }>,
    ) => {
      const discussion = state.discussions.find(
        (discussion) => discussion.id === action.payload.discussionId,
      );

      if (!discussion) return;

      discussion.messages.push(action.payload.message);
    },
  },
});

export const {
  addDiscussion,
  deleteDiscussion,
  setActiveDiscussion,
  addMessage,
  updateMessage,
} = discussionSlice.actions;

export default discussionSlice.reducer;
