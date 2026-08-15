import { ComponentType, JSX } from "react";
import { NoteType } from "./NoteType";
import { DraftMessageType, MessageType } from "./DiscussionType";
import { AnchorTypes } from "@/enums/AnchorEnums";
import { TaskSummaryType } from "./TaskType";

export type Pane = {
  tabs: TabData[];
  activeTabId: string | null;
};

export type WorkspaceState = {
  dailyPlanId: string | null;
  panes: {
    left: Pane;
    right?: Pane;
  };
  activePaneId: "left" | "right";
  isSidebarCollapsed: boolean;
};

export type TabData = {
  id: string;
  path: string;
  // component: ComponentType;
  title: string;
  payload: TaskTabPayloadType | NoteTabPayloadType | DiscussTabPayloadType;
};

export type TaskTabPayloadType = TaskSummaryType;

export type NoteTabPayloadType = {
  taskId: string;
  activeNoteId: string | null;
  draftNote?: NoteType;
};

export type DiscussTabPayloadType = {
  taskId: string;
  activeDiscussionId: string;
  draftMessage?: DraftMessageType;
};

export type SelectionAnchor = {
  id?: string;
  referenceId?: string;
  type: AnchorTypes;
  block_offset: {
    start: number;
    end: number;
  };

  selection_offset: {
    start: number;
    end: number;
  };

  selected_text?: string;
};



export type TextSelection = {
  selectedText: string;

  position: {
    x: number;
    y: number;
  };

  range: Range;

  blockOffset: {
    start: number;
    end: number;
  };

  selectionOffset: {
    start: number;
    end: number;
  };

  createAnchor: (reference: string, type: AnchorTypes) => SelectionAnchor;
};
