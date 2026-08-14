import { JSX } from "react";
import { NoteType } from "./NoteType";
import { MessageType } from "./DiscussionType";
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
  component: () => JSX.Element;
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
  draftMessage?: MessageType;
};

export type SelectionAnchor = {
  id: string;
  referenceId: string;
  type: AnchorTypes;
  blockOffset: {
    start: number;
    end: number;
  };

  selectionOffset: {
    start: number;
    end: number;
  };

  selectedText?: string;
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
