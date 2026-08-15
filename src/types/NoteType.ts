import { SelectionAnchor } from "./WorkspaceType";

export type NoteType = {
  id: string;
  task_id: string;
  anchor?: SelectionAnchor;
  content: string;

  creation_timestamp: string;
  updated_timestamp?: string;
};


