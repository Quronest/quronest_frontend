import { createContext, RefObject } from "react";
import { TabData } from "@/types/WorkspaceType";

export type TabContextType = {
  tabData: TabData<unknown>;
  containerRef: RefObject<HTMLDivElement | null>;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);
