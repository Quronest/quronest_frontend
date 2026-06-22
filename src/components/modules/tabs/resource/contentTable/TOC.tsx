import clsx from "clsx";
import { HeadingItem } from "../types";
import { useAppSelector } from "@/store/store";
import { selectWorkspace } from "@/store/features/workspace/workspaceSlice";

type TOCProps = {
  headings: HeadingItem[];
  tabId: string;
};

export const TOC = ({ headings, tabId }: TOCProps) => {
  const { activePaneId, panes } = useAppSelector(selectWorkspace);
  const handleScroll = (id: string) => {
    console.log(
      panes[activePaneId]?.activeTabId !== tabId,
      panes[activePaneId]?.activeTabId,
      tabId,
    );
    if (panes[activePaneId]?.activeTabId !== tabId) return;
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className=" rounded-xl border border-card-hover bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
        On This Page
      </h3>

      <div className="flex flex-col gap-1">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => handleScroll(heading.id)}
            className={clsx(
              "rounded-md px-2 py-1 text-left text-sm transition-colors",
              "hover:bg-card-hover",
              heading.level === 3 && "ml-4 text-neutral",
            )}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </div>
  );
};
