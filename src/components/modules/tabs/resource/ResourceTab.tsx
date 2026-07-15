import { DocsRenderer } from "./DocsRenderer";
import { TabContainer } from "../ui/TabContainer";
import { extractHeadings } from "./contentTable/extractHeadings";
import { TOC } from "./contentTable/TableOfContents";
import { ResourceTabDataType } from "@/types/WorkspaceType";
import { useTab } from "@/hooks/useTab";

export const ResourceTab = () => {
  const { tabData } = useTab();
  const { markdown } = tabData as ResourceTabDataType;

  const headings = extractHeadings(markdown);

  return (
    <>
      <TabContainer>
        <div className="flex h-full gap-6 overflow-y-auto">
          <div className="min-w-0 flex-1 px-4">
            <DocsRenderer />
          </div>
          <div className="sticky top-5 right-2 w-64 shrink-0">
            <TOC headings={headings} />
          </div>
        </div>
      </TabContainer>
    </>
  );
};
