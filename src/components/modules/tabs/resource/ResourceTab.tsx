import { DocsRenderer } from "./DocsRenderer";
import { TabContainer } from "../ui/TabContainer";
import { useEffect, useState } from "react";
import { SelectionToolBar } from "./SelectionToolBar";
import { extractHeadings } from "./contentTable/extractHeadings";
import { TOC } from "./contentTable/TableOfContents";
import { ResourceSelection, ResourceTabDataType } from "@/types/WorkspaceType";

export const ResourceTab = ({id,markdown}: ResourceTabDataType) => {
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

  const headings = extractHeadings(markdown);

  return (
    <>
      <TabContainer>
        <div className="flex h-full gap-6 overflow-y-auto">
          <div className="min-w-0 flex-1 ">
            <DocsRenderer
              markdown={markdown}
              onSelection={setSelectionInfo}
              resourceId={id}
            />
          </div>
          <div className="sticky top-5 w-64 shrink-0">
            <TOC headings={headings} tabId={id} />
          </div>
        </div>

        {selectionInfo && <SelectionToolBar selection={selectionInfo} />}
      </TabContainer>
    </>
  );
};
