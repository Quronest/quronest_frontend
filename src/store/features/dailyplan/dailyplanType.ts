import { Group, Phase } from "../user/userType";
import { DailyTaskType, TaskSummaryType } from "@/types/TaskType";
export type { DailyTaskType, TaskSummaryType };

export type DailyPlanStatus = "PENDING" | "COMPLETED" | "PARTIAL" | "SKIPPED";

export interface DailyPlanType {
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
  tasks: TaskSummaryType[];
}
