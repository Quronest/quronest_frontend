import { DocsRenderer } from "./DocsRenderer";
import { mockMarkdown } from "./mockMarkdown";
import { TabContainer } from "../ui/TabContainer";
import { useState } from "react";
import { SelectionToolBar } from "./SelectionToolBar";

export const ResourceTab = () => {
  const [selectionInfo, setSelectionInfo] = useState<{
    text: string;
    rect: DOMRect;
  } | null>(null);

  

  return (
    <>
      <TabContainer>
        <DocsRenderer markdown={mockMarkdown} onSelection={setSelectionInfo} />
      </TabContainer>
      {selectionInfo && (
        <SelectionToolBar text={selectionInfo.text} rect={selectionInfo.rect} />
      )}
    </>
  );
};
