import { tabTypes } from "@/enums/TabEnums";
import { NoteType } from "./NoteType";
import { ValueOf } from "next/dist/shared/lib/constants";
import { mockMarkdown } from "@/components/modules/tabs/resource/mockMarkdown";

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

type ResourceTabType = TabData<ResourceTabDataType> & {
  type: typeof tabTypes.RESOURCE;
};

type NoteTabType = TabData<NoteTabDataType> & {
  type: typeof tabTypes.NOTE;
};

export type NoteTabDataType = {
  resourceId: string;

  activeNoteId: string | null;

  draftNote?: NoteType;
};

export type SelectionAnchor = {
  resourceId: string;

  block: {
    startOffset: number;
    endOffset: number;
  };

  selection: {
    startOffset: number;
    endOffset: number;
  };

  selectedText: string;
};

export type ResourceSelection = {
  anchor: SelectionAnchor;

  position: {
    x: number;
    y: number;
  };

  range: Range;
};

export const mockTabs: TabData<any>[] = [
  {
    id: "tab-1",
    label: "Create Next App",
    type: tabTypes.NOTE,
    data: {
      resourceId: "hibcicdoniaos",
      notes: [],
      referenceText: "this is the reference text",
    },
  },
  {
    id: "tab-2",
    label: "Frontend Guidance",
    type: tabTypes.NOTE,
    data: { resourceId: "hibcicdoniaos", notes: [] },
  },
  {
    id: "tab-3",
    label: "Learning Roadmap",
    type: tabTypes.NOTE,
    data: {
      resourceId: "hibcicdoniaos",
      notes: [],
    },
  },
  {
    id: "tab-4",
    label: "Discussion Thread",
    type: tabTypes.RESOURCE,
    data: {
      resourceId: "scvhbv",
      markdown: mockMarkdown,
    },
  },
  {
    id: "tab-5",
    label: "API Integration",
    type: tabTypes.RESOURCE,
    data: {
      resourceId: "scvhbciubvuv",
      markdown: mockMarkdown,
    },
  },
];
