import { TabData, WorkspaceState } from "@/types/WorkspaceType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: WorkspaceState = {
  panes: {
    left: {
      tabs: [] as TabData<any>[],
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

    addToPane: (state, action: PayloadAction<{ tab: TabData<any> }>) => {
      const activePaneId = state.activePaneId;
      const pane = state.panes[activePaneId];
      if (!pane) return;

      const exists = pane.tabs.find((t) => t.id === action.payload.tab.id);

      if (!exists) pane.tabs.push(action.payload.tab);

      pane.activeTabId = action.payload.tab.id;
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
        data: Partial<TabData<unknown>["data"]>;
      }>,
    ) => {
      const { tabId, data } = action.payload;

      for (const pane of Object.values(state.panes)) {
        const tab = pane.tabs.find((tab) => tab.id === tabId);

        if (tab) {
          tab.data = {
            ...(tab.data as object),
            ...(data as object),
          };
          return;
        }
      }
    },
  },
});

export const selectWorkspace = (state: { workspace: WorkspaceState }) =>
  state.workspace;

export const {
  addToPane,
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
