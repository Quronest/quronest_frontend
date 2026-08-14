import { ReadingTaskContentType } from "@/types/TaskType";
import {
  DiscussTabPayloadType,
  NoteTabPayloadType,
  TabData,
  TaskTabPayloadType,
  WorkspaceState,
} from "@/types/WorkspaceType";
import { RawTabDataType, tabDataConvertor } from "@/utils/tabDataConvertor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: WorkspaceState = {
  dailyPlanId: null,
  panes: {
    left: {
      tabs: [] as TabData[],
      activeTabId: null,
    },
  },
  activePaneId: "left",
  isSidebarCollapsed: true,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setDailyPlanId: (state, action: PayloadAction<string>) => {
      if (state.dailyPlanId !== action.payload) {
        state.dailyPlanId = action.payload;
        state.panes = {
          left: {
            tabs: [],
            activeTabId: null,
          },
        };
        state.activePaneId = "left";
      }
    },

    openSidebar: (state) => {
      state.isSidebarCollapsed = false;
    },

    closeSidebar: (state) => {
      state.isSidebarCollapsed = true;
    },

    setActivePane: (
      state,
      action: PayloadAction<{ paneId: "left" | "right" }>,
    ) => {
      state.activePaneId = action.payload.paneId;
    },

    openSplitPane: (state) => {
      if (!state.panes.right) {
        state.panes.right = {
          tabs: [],
          activeTabId: null,
        };
      }
      state.activePaneId = "right";
    },

    closePane: (state, action: PayloadAction<{ paneId: "left" | "right" }>) => {
      const { paneId } = action.payload;

      if (paneId === "right") {
        delete state.panes.right;
        state.activePaneId = "left";
      } else if (paneId === "left" && state.panes.right) {
        state.panes.left = state.panes.right;
        delete state.panes.right;
        state.activePaneId = "left";
      }
    },

    createTab: (state, action: PayloadAction<{ tab: TabData }>) => {
      const tabData = tabDataConvertor(action.payload.tab);
      const activePaneId = state.activePaneId;
      const pane = state.panes[activePaneId];
      if (!pane) return;

      const exists = pane.tabs.find((t) => t.id === action.payload.tab.id);

      if (!exists) pane.tabs.push(tabData);
    },

    openTab: (state, action: PayloadAction<{ tab: RawTabDataType }>) => {
      const tabData = tabDataConvertor(action.payload.tab);
      const activePaneId = state.activePaneId;
      const pane = state.panes[activePaneId];
      if (!pane) return;

      const exists = pane.tabs.find((t) => t.id === action.payload.tab.id);

      if (!exists) pane.tabs.push(tabData);

      pane.activeTabId = tabData.id;
    },

    switchTab: (state, action: PayloadAction<{ tabId: string }>) => {
      const activePaneId = state.activePaneId;
      const pane = state.panes[activePaneId];

      if (!pane) return;
      pane.activeTabId = action.payload.tabId;
    },

    closeTab: (state, action: PayloadAction<{ tabId: string }>) => {
      const activePaneId = state.activePaneId;
      const pane = state.panes[activePaneId];
      if (!pane) return;

      const index = pane.tabs.findIndex((t) => t.id === action.payload.tabId);
      pane.tabs = pane.tabs.filter((tab) => tab.id !== action.payload.tabId);

      if (pane.activeTabId === action.payload.tabId) {
        const nextTab = pane.tabs[index] || pane.tabs[index - 1];
        pane.activeTabId = nextTab?.id || null;
      }
    },
    updateTabData: (
      state,
      action: PayloadAction<{
        tabId: string;
        data: Partial<TabData["payload"]>;
      }>,
    ) => {
      const { tabId, data } = action.payload;

      for (const pane of Object.values(state.panes)) {
        const tab = pane.tabs.find((tab) => tab.id === tabId);

        if (tab) {
          tab.payload = {
            ...(tab.payload as object),
            ...(data as object),
          } as TaskTabPayloadType | NoteTabPayloadType | DiscussTabPayloadType;
          return;
        }
      }
    },
  },
});

export const selectWorkspace = (state: { workspace: WorkspaceState }) =>
  state.workspace;

export const {
  setDailyPlanId,
  openTab,
  switchTab,
  closeTab,
  updateTabData,
  setActivePane,
  openSplitPane,
  closePane,
  closeSidebar,
  openSidebar,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
