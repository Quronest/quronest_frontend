export type TabRefDataType = {
  label?: string;
  id?: string;
  type?: "Notes" | "Discuss" | "code" | "Docs";
};

export const mockTabs: TabRefDataType[] = [
  {
    id: "tab-1",
    label: "Create Next App",
    type: "code",
  },
  {
    id: "tab-2",
    label: "Frontend Guidance",
    type: "Docs",
  },
  {
    id: "tab-3",
    label: "Learning Roadmap",
    type: "Notes",
  },
  {
    id: "tab-4",
    label: "Discussion Thread",
    type: "Discuss",
  },
  {
    id: "tab-5",
    label: "API Integration",
    type: "code",
  },
];
