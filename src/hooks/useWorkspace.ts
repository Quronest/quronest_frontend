"use client";

import { selectWorkspace } from "@/store/features/workspace/workspaceSlice";
import { useAppSelector } from "@/store/store";

export const useWorkspace = () => {
  const { panes, activePaneId, isSidebarCollapsed } =
    useAppSelector(selectWorkspace);
  const isSplitView = !!panes["right"];
  const leftPane = panes["left"];
  const rightPane = panes["right"];
  const activeTabId = {
    left: leftPane?.activeTabId,
    right: rightPane?.activeTabId,
  };
  const activePane = panes[activePaneId];

  const activeFocusedTab = panes[activePaneId]?.tabs.find(
    (tab) => tab.id === activeTabId[activePaneId],
  );

  return {
    panes,
    activePane,
    activePaneId,
    isSplitView,
    isSidebarCollapsed,
    leftPane,
    rightPane,
    activeTabId,
    activeFocusedTab,
  };
};
