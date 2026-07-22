import { tabTypes } from "@/enums/TabEnums";
import { TabData } from "@/types/WorkspaceType";
import { mockMarkdown } from "./mockMarkdown";

export const mockTabs: TabData<any>[] = [
  {
    id: "tab-1",
    label: "Create Next App",
    type: tabTypes.NOTE,
    taskId: "hibcicdoniaos",
    data: {
      notes: [],
      referenceText: "this is the reference text",
    },
  },
  {
    id: "tab-2",
    label: "Frontend Guidance",
    type: tabTypes.NOTE,
    taskId: "hibcicdoniaos",
    data: { notes: [] },
  },
  {
    id: "tab-3",
    label: "Learning Roadmap",
    taskId: "hibcicdoniaos",
    type: tabTypes.NOTE,
    data: {
      notes: [],
    },
  },
  {
    id: "tab-4",
    label: "Discussion Thread",
    taskId: "hibcicdoniaos",
    type: tabTypes.RESOURCE,
    data: {
      markdown: mockMarkdown,
    },
  },
  {
    id: "tab-5",
    label: "API Integration",
    taskId: "scvhbciubvuv",
    type: tabTypes.RESOURCE,
    data: {
      markdown: mockMarkdown,
    },
  },
  {
    id: "tab-6",
    label: "Discuss React Basics",
    type: tabTypes.DISCUSS,
    taskId: "react-basics",
    data: {},
  },
  {
    id: "tab-7",
    label: "Typescript Test",
    type: tabTypes.TEST,
    taskId: "typescript-basics",
    data: {},
  },
];
