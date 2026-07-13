import { TabContext } from "@/context/Tabcontext";
import { tabTypes } from "@/enums/TabEnums";
import { NoteTabDataType, ResourceTabDataType } from "@/types/WorkspaceType";
import { useContext } from "react";

export const useTab = () => {
  const tabContext = useContext(TabContext);
  if (!tabContext)
    throw new Error("useTab must be used within TabContext.Provider");

  const { tabData: tab, containerRef: tabRef } = tabContext;
  let tabData = tab.data;
  switch (tab.type) {
    case tabTypes.RESOURCE: {
      tabData = tab.data as ResourceTabDataType;
    }
    case tabTypes.NOTE: {
      tabData = tab.data as NoteTabDataType;
    }
  }

  return {
    tabRef,
    tab,
    tabData,
  };
};
