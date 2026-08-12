import { TabContext } from "@/context/Tabcontext";
import { tabTypes } from "@/enums/TabEnums";
import { NoteTabDataType, ResourceTabDataType } from "@/types/WorkspaceType";
import { useContext } from "react";

export const useTab = () => {
  const tabContext = useContext(TabContext);
  if (!tabContext)
    throw new Error("useTab must be used within TabContext.Provider");

  const { tabData: tab, containerRef: tabRef } = tabContext;
  const taskId = tab.taskId;
  let tabData = tab.data;
  switch (tab.type) {
    case tabTypes.RESOURCE: {
      tabData = tab.data as ResourceTabDataType;
      break;
    }
    case tabTypes.NOTE: {
      tabData = tab.data as NoteTabDataType;
      break;
    }
    case tabTypes.TEST: {
      tabData = tab.data;
      break;
    }
    case tabTypes.CODE: {
      tabData = tab.data;
      break;
    }
  }

  return {
    tabRef,
    tab,
    taskId,
    tabData,
  };
};
