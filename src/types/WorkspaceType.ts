import { tabTypes } from "@/enums/TabEnums";
import { NoteType } from "./NoteType";
import { ValueOf } from "next/dist/shared/lib/constants";
import { mockMarkdown } from "@/mockData/mockMarkdown";
import { MessageType } from "./DiscussionType";

export type Pane = {
  tabs: TabData<any>[];
  activeTabId: string | null;
};

export type WorkspaceState = {
  panes: {
    left: Pane;
    right?: Pane;
  };
  activePaneId: "left" | "right";
  isSidebarCollapsed: boolean;
};

export type TabType = ValueOf<typeof tabTypes>;

export type TabData<T> = {
  id: string;
  label: string;

  type: TabType;

  data: T;
};

export type ResourceTabDataType = {
  resourceId: string;
  markdown: string;
};

export type ResourceTabType = TabData<ResourceTabDataType> & {
  type: typeof tabTypes.RESOURCE;
};

export type NoteTabType = TabData<NoteTabDataType> & {
  type: typeof tabTypes.NOTE;
};

export type DiscussTabType = TabData<DiscussTabDataType> & {
  type: typeof tabTypes.DISCUSS;
};

export type NoteTabDataType = {
  resourceId: string;

  activeNoteId: string | null;

  draftNote?: NoteType;
};

export type DiscussTabDataType = {
  resourceId: string;
  activeDiscussionId: string;
  draftMessage?: MessageType;
};

export type SelectionAnchor = {
  resourceId: string;

  block?: {
    startOffset: number;
    endOffset: number;
  };

  selection?: {
    startOffset: number;
    endOffset: number;
  };

  selectedText?: string;
};

export type ResourceSelection = {
  anchor: SelectionAnchor;

  position: {
    x: number;
    y: number;
  };

  range: Range;
};

export type DiscussionSelection = {
  messageId: string;

  selectedText: string;

  position: {
    x: number;
    y: number;
  };

  range: Range;
};
