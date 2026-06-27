import clsx from "clsx";
import { HeadingItem } from "../types";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useContext } from "react";
import { TabContext } from "@/context/Tabcontext";

type TOCProps = {
  headings: HeadingItem[];
};

export const TOC = ({ headings }: TOCProps) => {
  const tabContext = useContext(TabContext);
  if (!tabContext) {
    throw new Error("Must be used within TabContext.Provider");
  }
  const { containerRef } = tabContext;

  const handleScroll = (id: string) => {
    containerRef.current?.querySelector(`#${CSS.escape(id)}`)?.scrollIntoView({
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
