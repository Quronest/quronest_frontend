import { tabTypes } from "@/enums/TabEnums";
import { TabData } from "@/types/WorkspaceType";
import { mockMarkdown } from "./mockMarkdown";

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
  {
    id: "tab-6",
    label: "Discuss React Basics",
    type: tabTypes.DISCUSS,
    data: {
      resourceId: "react-basics",
    },
  },
];
