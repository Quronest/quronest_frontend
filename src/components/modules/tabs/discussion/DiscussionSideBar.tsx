import clsx from "clsx";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { DiscussionType } from "@/types/DiscussionType";
import { useTab } from "@/hooks/useTab";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { DiscussTabDataType } from "@/types/WorkspaceType";
import { setActiveDiscussion } from "@/store/features/discussion/discussionSlice";
import { updateTabData } from "@/store/features/workspace/workspaceSlice";
import {
  ResponsiveContainer,
  useResponsiveContainer,
} from "@/components/ui/ResponsiveContainer";

type DiscussionSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const DiscussionSidebar = ({
  collapsed,
  onToggle,
}: DiscussionSidebarProps) => {
  const dispatch = useAppDispatch();
  const { tab, taskId } = useTab();
  const discussions = useAppSelector((state) =>
    state.discussion.discussions.filter(
      (discussion) => discussion?.taskId === taskId,
    ),
  );

  const { width, breakpoint } = useResponsiveContainer();

  const isCompactView =
    breakpoint === "base" || breakpoint === "md" || breakpoint === "sm";
    
  const handleSwitchDiscussion = (discussionId: string) => {
    dispatch(setActiveDiscussion(discussionId));
    dispatch(
      updateTabData({
        tabId: tab.id,
        data: { activeDiscussionId: discussionId },
      }),
    );
  };

  return (
    <aside
      className={clsx(
        "flex flex-col ",
        "border-r border-card-hover bg-card ",
        "transition-all duration-300 h-full ",
        isCompactView ? "absolute top-0 z-2 " : "static",
        collapsed ? "w-0 p-0 border-0!" : "w-72 ",
      )}
    >
      <div
        className={clsx(
          "flex h-14 items-center border-b border-card-hover",
          "justify-between px-4",
          collapsed
            ? "opacity-0 pointer-events-none duration-150"
            : "opacity-100 duration-500",
        )}
      >
        {
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-primary" />
            <h2 className="font-semibold">Discussions</h2>
          </div>
        }

        <Button variant="nav" onClick={onToggle}>
          {<ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div
          className={clsx(
            "space-y-1 p-3",
            collapsed && "opacity-0",
            "transition-all duration-200",
          )}
        >
          {discussions.map((discussion: DiscussionType) => {
            return (
              <Button
                key={discussion.id}
                variant="list"
                onClick={() => handleSwitchDiscussion(discussion.id)}
              >
                {discussion.title}
              </Button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
