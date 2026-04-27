import { TabRefDataType, WorkspaceState } from "@/types/WorkspaceType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: WorkspaceState = {
  panes: {
    left: {
      tabs: [],
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

    addToPane: (state, action: PayloadAction<{ tab: TabRefDataType }>) => {
      const activePaneId = state.activePaneId;
      const pane = state.panes[activePaneId];
      if (!pane) return;

      const exists = pane.tabs.find((t) => t.id === action.payload.tab.id);

      if (!exists) pane.tabs.push(action.payload.tab);

      pane.activeTabId = action.payload.tab.id;
    },

    switchTab: (state, action: PayloadAction<{ tabId: string }>) => {
      const activePaneId = state.activePaneId;
      const pane = state.panes[state.activePaneId];

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
  },
});

export const {
  addToPane,
  switchTab,
  closeTab,
  setActivePane,
  openSplitPane,
  closePane,
  closeSidebar,
  openSidebar,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
