import { DocsRenderer } from "./DocsRenderer";
import { mockMarkdown } from "./mockMarkdown";
import { TabContainer } from "../ui/TabContainer";
import { useEffect, useState } from "react";
import { SelectionToolBar } from "./SelectionToolBar";
import { extractHeadings } from "./contentTable/extractHeadings";
import { TOC } from "./contentTable/TOC";

export const ResourceTab = () => {
  const [selectionInfo, setSelectionInfo] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

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

  const headings = extractHeadings(mockMarkdown);
  console.log("ResourceTab Render");
  console.log(selectionInfo);

  return (
    <>
      <TabContainer>
        <div className="flex h-full gap-6 overflow-y-auto">
          <div className="min-w-0 flex-1 ">
            <DocsRenderer
              markdown={mockMarkdown}
              onSelection={setSelectionInfo}
            />
          </div>
          <div className="sticky top-5 w-64 shrink-0">
            <TOC headings={headings} />
          </div>
        </div>

        {selectionInfo && (
          <SelectionToolBar
            text={selectionInfo.text}
            x={selectionInfo.x}
            y={selectionInfo.y}
          />
         
        )}
      </TabContainer>
    </>
  );
};
