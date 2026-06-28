import clsx from "clsx";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, ListTree } from "lucide-react";

type QuestionOutlineProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const QuestionOutline = ({
  collapsed,
  onToggle,
}: QuestionOutlineProps) => {
  return (
    <aside
      className={clsx(
        "flex h-full flex-col border-l border-card-hover bg-card transition-all duration-300",
        collapsed ? "w-14" : "w-64",
      )}
    >
      <div
        className={clsx(
          "flex h-14 items-center border-b border-card-hover",
          collapsed ? "justify-center" : "justify-between px-4",
        )}
      >
        <Button variant="nav" onClick={onToggle}>
          {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>

        {!collapsed && (
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Questions</h2>
            <ListTree size={18} className="text-primary" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!collapsed && <div className="space-y-2 p-3">Questions</div>}
      </div>
    </aside>
  );
};
