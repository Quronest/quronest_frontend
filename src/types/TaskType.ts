import { AnchorTypes } from "@/enums/AnchorEnums";

export type TagType = {
  type: "neutral" | "secondary" | "primary" | "accent";
  label: string;
};

export type Tasktype = {
  id: string;
  title: string;
  progress: number;
  duration: number; // in seconds
  tags: TagType[];
};

export type SourceUrl = {
  url: string;
  name: string;
};

export type McqQuestionOption = {
  id: number;
  slug: string;
  text: string;
};

export type McqQuestion = {
  id: number;
  title: string;
  options: McqQuestionOption[];
  solution: McqQuestionOption;
  explanation: string;
};

export type ReadingTaskContentType = {
  markdown_content: string;
  sources: SourceUrl[];
  youtube_video_url: string;
  youtube_video_summary: string;
  questionnaires: McqQuestion[];
};

export type QuizQuestionType = {
  id: number;
  title: string;
  options: McqQuestionOption[];
};

export type QuizTaskContentType = {
  questionnaires: QuizQuestionType[];
};

export type DailyTaskType = {
   id: string;
  plan_id: string;
  user_id: string;
  order: number;
  title: string;
  description: string;
  task_type: string;
  domain: string;
  tags: string[];
  level: string;
  content: ReadingTaskContentType | QuizTaskContentType | null ;
  status: string;
  expected_total_time: number;
  actual_time_spent: number;
  progress_percent: number;
  is_optional: boolean;
  version: number;
  creation_timestamp: string;
  update_timestamp: string;
  job_id: string | null;
  anchors: TaskAnchor[];
};



export type TaskAnchor = {
  id: string;
  reference_id: string;
  type: AnchorTypes;
  block_offset: {
    start: number;
    end: number;
  };
  selection_offset: {
    start: number;
    end: number;
  };
  selected_text: string;
};

export type TaskData<T> = {
 
};

export type TaskSummaryType = {
  id: string;
  order: number;
  title: string;
  task_type: string;
  status: string;
  expected_total_time: number;
  actual_time_spent: number;
  progress_percent: number;
  is_optional: boolean;
};

export type DailyTaskSummaryDto = TaskSummaryType;
