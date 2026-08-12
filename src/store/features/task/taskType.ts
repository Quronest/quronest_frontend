import { DailyTaskStatus, DailyTaskType } from "../user/userType";

export type DailyTaskLevel = "EASY" | "MEDIUM" | "HARD";

export type Domain =
  | "COMPETITIVE_PROGRAMMING"
  | "WEB_DEVELOPMENT"
  | "MACHINE_LEARNING"
  | "DATA_SCIENCE"
  | "APP_DEVELOPMENT"
  | "GAME_DEVELOPMENT"
  | "CLOUD_COMPUTING"
  | "DEVOPS"
  | "CYBER_SECURITY"
  | "BLOCKCHAIN"
  | "INTERNET_OF_THINGS"
  | "ROBOTICS"
  | "VIRTUAL_REALITY"
  | "AUGMENTED_REALITY";

export interface SourceUrl {
  title: string;
  url: string;
}

export interface McqQuestionOption {
  id: number;
  slug: string;
  text: string;
}

export interface McqQuestion {
  id: number;
  title: string;
  options: McqQuestionOption[];
  solution: McqQuestionOption;
  explanation: string;
}

export interface ReadingTaskContent {
  markdown_content: string;
  sources?: SourceUrl[];
  youtube_video_url?: string;
  youtube_video_summary?: string;
  questionnaires?: McqQuestion[];
  selection_anchors?: any[];
}

export interface QuizTaskContent {
  questionnaires: McqQuestion[];
}

export interface DailyTaskDto {
  id: string;
  plan_id: string;
  user_id: string;
  order: number;
  title: string;
  description: string;
  task_type: DailyTaskType;
  domain: Domain;
  tags: string[];
  level: DailyTaskLevel;
  content: ReadingTaskContent | QuizTaskContent | null;
  status: DailyTaskStatus;
  expected_total_time: number;
  actual_time_spent: number;
  progress_percent: number;
  is_optional: boolean;
  version: number;
  creation_timestamp: string;
  update_timestamp: string;
  job_id: string | null;
}
