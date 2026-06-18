import { DocsRenderer } from "./DocsRenderer";
import { mockMarkdown } from "./mockMarkdown";
import { TabContainer } from "../ui/TabContainer";
import { useState } from "react";
import { SelectionToolBar } from "./SelectionToolBar";
import { extractHeadings } from "./contentTable/extractHeadings";
import { TOC } from "./contentTable/TOC";

export const ResourceTab = () => {
  const [selectionInfo, setSelectionInfo] = useState<{
    text: string;
    rect: DOMRect;
  } | null>(null);

  const headings = extractHeadings(mockMarkdown);

  console.log(headings);

  return (
    <>
      <TabContainer>
        <div className="flex h-full gap-6">
          <div className="min-w-0 flex-1 overflow-y-auto">
            <DocsRenderer
              markdown={mockMarkdown}
              onSelection={setSelectionInfo}
            />
          </div>

          <div className="w-64 shrink-0">
            <TOC headings={headings} />
          </div>
        </div>

        {selectionInfo && (
          <SelectionToolBar
            text={selectionInfo.text}
            rect={selectionInfo.rect}
          />
        )}
      </TabContainer>
    </>
  );
};
