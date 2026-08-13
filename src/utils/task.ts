import { DailyTaskType, QuizTaskContentType } from "@/types/TaskType";


export const mapTaskDtoToTabData = (task: DailyTaskType): any => {
  const type = task.task_type;

  if (type === "READING" && task.content) {
    return {
      markdown: (task.content as any).markdown_content || (task.content as any).markdownContent || "",
      anchors: (task.content as any).selection_anchors || (task.content as any).selectionAnchors || [],
    };
  } else if (type === "QUIZ" && task.content) {
    return {
      questionnaires: (task.content as QuizTaskContentType).questionnaires || [],
      title: task.title,
      description: task.description,
      level: task.level,
      expected_total_time: task.expected_total_time,
      domain: task.domain,
    };
  } else if (type === "CODING") {
    return {};
  }

  return {};
};
