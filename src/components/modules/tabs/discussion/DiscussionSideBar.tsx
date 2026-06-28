import clsx from "clsx";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

type DiscussionSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const DiscussionSidebar = ({
  collapsed,
  onToggle,
}: DiscussionSidebarProps) => {
  return (
    <aside
      className={clsx(
        "flex h-full flex-col border-r border-card-hover bg-card transition-all duration-300",
        collapsed ? "w-14" : "w-72",
      )}
    >
      <div
        className={clsx(
          "flex h-14 items-center border-b border-card-hover",
          collapsed ? "justify-center" : "justify-between px-4",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-primary" />
            <h2 className="font-semibold">Discussions</h2>
          </div>
        )}

        <Button variant="nav" onClick={onToggle}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!collapsed && <div className="space-y-2 p-3">Sidebar Content</div>}
      </div>
    </aside>
  );
};
