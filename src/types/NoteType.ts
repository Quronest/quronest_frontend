import { SelectionAnchor } from "./WorkspaceType";

export type NoteType = {
  id: string;
  taskId: string;
  anchor?: SelectionAnchor;

  content: string;

  createdAt: string;
  updatedAt?: string;
};


