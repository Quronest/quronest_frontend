import React, { useEffect } from "react";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import { useAppDispatch } from "@/store/store";
import { updateTabData } from "@/store/features/workspace/workspaceSlice";
import { LoaderCircle, FileText, HelpCircle, Code2, BookOpen } from "lucide-react";
import { mapTaskDtoToTabData } from "@/utils/task";
import { useLazyGetDailyTaskByIdQuery } from "@/store/features/task/taskApi";

type TaskLoaderWrapperProps = {
  taskId: string;
  tabId: string;
  tabType: string;
  children: React.ReactNode;
  hasData: boolean;
};

const taskTypeLabels: Record<string, string> = {
  resource: "Reading Material",
  test: "Quiz",
  code: "Coding Task",
};

const iconMap: Record<string, React.ComponentType<any>> = {
  resource: BookOpen,
  test: HelpCircle,
  code: Code2,
};

export const TaskLoaderWrapper = ({
  taskId,
  tabId,
  tabType,
  children,
  hasData,
}: TaskLoaderWrapperProps) => {
  const dispatch = useAppDispatch();
  const [triggerGetTask] = useLazyGetDailyTaskByIdQuery();
  const { loadTask, status } = useTaskGeneration({
    triggerGetTask: (id, force) => triggerGetTask(id, force).unwrap(),
  });



  useEffect(() => {
    if (!hasData && taskId) {
      loadTask(taskId).then((loadedTask) => {
        if (loadedTask) {
          const data = mapTaskDtoToTabData(loadedTask);
          dispatch(updateTabData({ tabId, data }));
        }
      });
    }
  }, [taskId, tabId, hasData, dispatch]);

  if (!hasData) {
    const Icon = iconMap[tabType] || FileText;
    const label = taskTypeLabels[tabType] || "Task";

    return (
      <div className="flex flex-col items-center justify-center h-full min-h-100 p-8 text-center space-y-6">
        <div className="relative flex items-center justify-center">
          <LoaderCircle className="h-16 w-16 animate-spin text-primary/30" />
          <Icon className="absolute h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {status === "generating" ? "Generating Content" : "Loading Content"}
          </h3>
          <p className="text-neutral mt-2 text-sm max-w-sm leading-relaxed">
            {status === "generating"
              ? `Our AI is structuring this ${label.toLowerCase()} for you. Please wait a few seconds.`
              : `Loading your ${label.toLowerCase()} details...`}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
