import { TabData } from "@/types/WorkspaceType";
import { createContext } from "react";

type TabContextType<T> = {} & TabData<unknown>;

const TabContext = createContext<TabContextType<unknown> | undefined>(
  undefined,
);
