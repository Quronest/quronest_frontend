import { SelectionAnchor } from "./WorkspaceType";

export type MessageRole = "user" | "assistant";

export type MessageType = {
  id: string;

  role: MessageRole;

  content: string;

  createdAt: string;

  anchor?: SelectionAnchor;
};

export type DiscussionType = {
  id: string;

  title: string;

  resourceId: string;

  messages: MessageType[];
};
