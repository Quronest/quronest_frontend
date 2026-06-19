export type TabRefDataType = {
  id: string;
  label: string;
  type: "Notes" | "Discuss" | "code" | "Docs";

};

export type TabDataType <T> = {
  id: string;
  label: string;
  type: "Notes" | "Discuss" | "code" | "Docs";
  content: T;
};

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
    type: "Docs",
  },
  {
    id: "tab-5",
    label: "API Integration",
    type: "Docs",
  },
];
