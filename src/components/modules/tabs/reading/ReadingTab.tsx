import { DocsRenderer } from "./DocsRenderer";
import { TabContainer } from "../../../ui/TabContainer";
import { extractHeadings } from "./contentTable/extractHeadings";
import { TOC } from "./contentTable/TableOfContents";
import { useTab } from "@/hooks/useTab";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import { useLazyGetReadingTaskQuery } from "@/store/features/task/taskApi";
import { TaskTabPayloadType } from "@/types/WorkspaceType";
import { useEffect } from "react";
import { ReadingTaskContentType } from "@/types/TaskType";

export const ReadingTab = () => {
  const { tabData, tabRef } = useTab();
  const { id: taskId } = tabData.payload as TaskTabPayloadType;

  const [triggerReadingTaskGeneration] = useLazyGetReadingTaskQuery();
  const { loadTask, status, task } = useTaskGeneration({
    triggerGetTask: (taskId: string) =>
      triggerReadingTaskGeneration(taskId, false).unwrap(),
  });

  useEffect(() => {
    if (!taskId) return;
    loadTask(taskId);
  }, [taskId]);

  const headings = extractHeadings((task?.content as ReadingTaskContentType).markdown_content);

  if (status === "success" && task?.content) {
    return (
      <>
        <TabContainer className="">
          <div className="flex h-full gap-6 overflow-y-auto ">
            <div className="min-w-0 flex-1 px-4">
              <DocsRenderer readingTaskData={task} />
            </div>
            <div className="sticky top-5 right-2 w-64 shrink-0">
              <TOC headings={headings} />
            </div>
          </div>
        </TabContainer>
      </>
    );
  }
  else{
    return(
      <div className="flex items-center justify-center h-full text-3xl">
        Task Loading
      </div>
    )
  }
};
