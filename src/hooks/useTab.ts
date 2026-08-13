import { TabContext } from "@/context/Tabcontext";
import { useContext } from "react";

export const useTab = () => {
  const tabContext = useContext(TabContext);
  if (!tabContext)
    throw new Error("useTab must be used within TabContext.Provider");

  const { tabData, containerRef: tabRef } = tabContext;

  return {
    tabRef,
    tabData,
  };
};
