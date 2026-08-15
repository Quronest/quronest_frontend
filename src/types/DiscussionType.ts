import { SelectionAnchor } from "./WorkspaceType";

export type MessageRole = "user" | "assistant";

export type DraftMessageType = {
  anchor: SelectionAnchor;
};

export type MessageType = {
  id?: string;

  discussionId?: string;

  role?: MessageRole;

  content?: string;

  createdAt?: string;

  anchor?: SelectionAnchor;
};

export type DiscussionType = {
  id?: string;

  title: string;

  taskId: string;

  // reference?: SelectionAnchor;

  messages: MessageType[];

  createdAt?: string;
  updatedAt?: string;
};
