import { tabTypes } from "@/enums/TabEnums";
import { mockNotes, NoteType } from "./NoteType";
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
  id: string;
  markdown: string;
};

export type ResourceTabType = TabData<ResourceTabDataType>;

export type NoteTabDataType = {
  resourceId: string;
  notes: NoteType[];
  referenceText?: string;
};

export type NoteTabType = TabData<NoteTabDataType>;

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
    data: { resourceId: "hibcicdoniaos", notes: mockNotes , referenceText:"this is the reference text"},
  },
  {
    id: "tab-2",
    label: "Frontend Guidance",
    type: tabTypes.NOTE,
    data: { resourceId: "hibcicdoniaos", notes: mockNotes },
  },
  {
    id: "tab-3",
    label: "Learning Roadmap",
    type: tabTypes.NOTE,
    data: {
      resourceId: "hibcicdoniaos",
      notes: mockNotes,
    },
  },
  {
    id: "tab-4",
    label: "Discussion Thread",
    type: tabTypes.RESOURCE,
    data: {
      id: "abcjkddvio",
      markdown: mockMarkdown,
    },
  },
  {
    id: "tab-5",
    label: "API Integration",
    type: tabTypes.RESOURCE,
    data: {
      id: "abcjkdjkbdvio",
      markdown: mockMarkdown,
    },
  },
];
