import { Group, Phase } from "../user/userType";

export type DailyPlanStatus = "PENDING" | "COMPLETED" | "PARTIAL" | "SKIPPED";
export type DailyTaskStatus = "PENDING" | "COMPLETED" | "PARTIAL" | "SKIPPED";
export type DailyTaskType = "READING" | "QUIZ" | "CODING" | "DESCRIPTIVE";

export interface DailyTaskSummaryDto {
  id: string;
  order: number;
  title: string;
  task_type: DailyTaskType;
  status: DailyTaskStatus;
  expected_total_time: number; // in minutes
  actual_time_spent: number;
  progress_percent: number;
  is_optional: boolean;
}

export interface DailyPlanDto {
  id: string;
  user_id: string;
  plan_date: string; // ISO date string (YYYY-MM-DD)
  day_number: number;
  group: Group;
  phase: Phase;
  title: string;
  description: string;
  is_base_plan: boolean;
  is_adjusted: boolean;
  adjustment_reason: string;
  status: DailyPlanStatus;
  expected_total_time: number;
  actual_time_spent: number;
  progress_percent: number;
  version: number;
  creation_timestamp: string;
  update_timestamp: string;
  tasks: DailyTaskSummaryDto[];
}
