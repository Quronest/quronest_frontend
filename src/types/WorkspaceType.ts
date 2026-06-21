export type Pane = {
  tabs: TabRefDataType[];
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

export type TabRefDataType = {
  id: string;
  label: string;
  type: "Notes" | "Discuss" | "code" | "Resource";
};

export type TabDataType<T> = {
  id: string;
  label: string;
  type: "Notes" | "Discuss" | "code" | "Resource";
  content: T;
};

export type ResourceTabType = {
  id: string;
  markdown: string;
};

export type ResourceSelection = {
  resourceId: string;

  text: string;

  position: {
    x: number;
    y: number;
  };

  range: Range;
};

export const mockTabs: TabRefDataType[] = [
  {
    id: "tab-1",
    label: "Create Next App",
    type: "Notes",
  },
  {
    id: "tab-2",
    label: "Frontend Guidance",
    type: "Notes",
  },
  {
    id: "tab-3",
    label: "Learning Roadmap",
    type: "Notes",
  },
  {
    id: "tab-4",
    label: "Discussion Thread",
    type: "Resource",
  },
  {
    id: "tab-5",
    label: "API Integration",
    type: "Resource",
  },
];
