import { DocsRenderer } from "./DocsRenderer";
import { TabContainer } from "../../../ui/TabContainer";
import { extractHeadings } from "./contentTable/extractHeadings";
import { TOC } from "./contentTable/TableOfContents";
import { ResourceTabDataType, SelectionAnchor } from "@/types/WorkspaceType";
import { useTab } from "@/hooks/useTab";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/store";
import AnnotationLayer from "./AnnotationLayer";

export const ResourceTab = () => {
  const { tabData, taskId, tabRef} = useTab();
  const { markdown } = tabData as ResourceTabDataType;
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headings = extractHeadings(markdown);
  const { notes } = useAppSelector((state) => state.note);
  const resourceNotes = notes.filter((note) => note.taskId === taskId);
  const { discussions } = useAppSelector((state) => state.discussion);
  const resourceDiscussions = discussions.filter(
    (discussion) => discussion.taskId === taskId,
  );
  const resourceAnchors = [
    ...resourceNotes.map((note) => note.anchor),
    ...resourceDiscussions.map((discussion) => discussion.messages[0].anchor),
  ];

  if (!containerRef) return;
  return (
    <>
      <TabContainer className="relative">
        <div className="flex h-full gap-6 overflow-y-auto " ref={containerRef}>
          <div className="min-w-0 flex-1 px-4">
            <DocsRenderer />
          </div>
          <div className="sticky top-5 right-2 w-64 shrink-0">
            <TOC headings={headings} />
          </div>
          <AnnotationLayer anchors={resourceAnchors} containerRef={tabRef} />
        </div>
      </TabContainer>
    </>
  );
};
