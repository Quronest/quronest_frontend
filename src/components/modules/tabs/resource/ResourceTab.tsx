import { DocsRenderer } from "./DocsRenderer";
import { TabContainer } from "../ui/TabContainer";
import { useContext, useEffect, useState } from "react";
import { SelectionToolBar } from "./SelectionToolBar";
import { extractHeadings } from "./contentTable/extractHeadings";
import { TOC } from "./contentTable/TableOfContents";
import { ResourceSelection, ResourceTabDataType } from "@/types/WorkspaceType";
import { TabContext } from "@/context/Tabcontext";
import { tabTypes } from "@/enums/TabEnums";
import { useTab } from "@/hooks/useTab";

export const ResourceTab = () => {
  const [selectionInfo, setSelectionInfo] = useState<ResourceSelection | null>(
    null,
  );

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();

      if (!selection?.toString().trim()) {
        setSelectionInfo(null);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const { tabData } = useTab();
  const { markdown, resourceId } = tabData as ResourceTabDataType;

  const headings = extractHeadings(markdown);

  return (
    <>
      <TabContainer>
        <div className="flex h-full gap-6 overflow-y-auto">
          <div className="min-w-0 flex-1 ">
            <DocsRenderer />
          </div>
          <div className="sticky top-5 w-64 shrink-0">
            <TOC headings={headings} />
          </div>
        </div>

        {selectionInfo && <SelectionToolBar selection={selectionInfo} />}
      </TabContainer>
    </>
  );
};
