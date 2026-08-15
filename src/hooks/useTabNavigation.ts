import CodingTab from "@/components/modules/tabs/coding/CodingTab";
import { DiscussTab } from "@/components/modules/tabs/discussion/DiscussTab";
import { NoteTab } from "@/components/modules/tabs/note/NoteTab";
import { ReadingTab } from "@/components/modules/tabs/reading/ReadingTab";
import { QuizTab } from "@/components/modules/tabs/test/QuizTab";
import { ComponentType, JSX } from "react";
import { useWorkspace } from "./useWorkspace";
import { useAppDispatch } from "@/store/store";
import {
  openSplitPane,
  openTab,
  setActivePane,
  switchTab,
  updateTabData,
} from "@/store/features/workspace/workspaceSlice";
import { RawTabDataType } from "@/utils/tabDataConvertor";
type RouteObjectType = {
  path: string;
  component: ComponentType;
};

export const routes: RouteObjectType[] = [
  {
    path: "/reading",
    component: ReadingTab,
  },
  {
    path: "/note",
    component: NoteTab,
  },
  {
    path: "/discuss",
    component: DiscussTab,
  },
  {
    path: "/quiz",
    component: QuizTab,
  },
  {
    path: "/coding",
    component: CodingTab,
  },
];

export const useTabNavigation = () => {
  const { panes, activePaneId, isSplitView } = useWorkspace();
  const dispatch = useAppDispatch();
  const navigate = ({
    target,
    tabData,
  }: {
    tabData: RawTabDataType;
    target: "self" | "blank";
  }) => {
    switch (target) {
      case "self":
        dispatch(openTab({ tab: tabData }));
        break;
      case "blank":
        let targetPane = panes["right"] ?? undefined;
        if (isSplitView) {
          if (activePaneId === "left") {
            dispatch(setActivePane({ paneId: "right" }));
            targetPane = panes["right"];
          } else {
            if (activePaneId === "right") {
              dispatch(setActivePane({ paneId: "left" }));
              targetPane = panes["left"];
            }
          }
        } else {
          dispatch(openSplitPane());
          targetPane = panes["right"];
        }
        const existingTab = targetPane?.tabs.find(
          (tab) => tab.id === tabData.id,
        );
        if (existingTab) {
          dispatch(
            updateTabData({ tabId: tabData.id!, data: tabData.payload }),
          );
          dispatch(switchTab({ tabId: tabData.id! }));
        } else {
          dispatch(openTab({ tab: tabData }));
        }
    }
  };
  return { navigate };
};
