export type User = {
  id: string;
  fullname: string;
  email: string;
  username: string;
  avatar: string;
  email_verified: boolean;
  phone_verified: boolean;
  phone: string;
  account_status: AccountStatus;
  other_data: OtherData;
  personal_data: PersonalData;
  academic_data: AcademicData;
  current_summary: CurrentSummary;
};

export type OtherData = {
  about: string;
  social_links: SocialLink[];
};

export type SocialLink = {
  link: string;
  type: SocialLinkType;
  title: string;
};

export type PersonalData = {
  interested_domains: string[];
  skills: string[];
  primary_goal: string;
  experience: string;
  description: string;
};

export type AcademicData = {
  institute_name: string;
  grade: string;
  course: string;
  academic_description: string;
};

export type CurrentSummary = {
  group: Group;
  phase: Phase;
  summary: string;
};

export type AccountStatus =
  | "INCOMPLETE"
  | "COMPLETE"
  | "PERSONAL_DATA_INCOMPLETE"
  | "ACADEMIC_DATA_INCOMPLETE"
  | "JOURNEY_START_INCOMPLETE";

export type SocialLinkType = "OTHER" | "GITHUB" | "LINKEDIN";

export type Group = "GROUP_A" | "GROUP_B" | "GROUP_C";

export type Phase = "PHASE_1" | "PHASE_2" | "PHASE_3";

export type JobStatus = "PENDING" | "LOCKED" | "COMPLETED" | "FAILED";

export interface JobStatusResponse {
  job_id: string;
  job_status: JobStatus;
}

export interface UserJourneyResponse {
  id: string;
  user_id: string;
  group: Group;
  phase: Phase;
  current_day: number;
  streak_days: number;
  total_active_days: number;
  last_active_at: string;
  current_stage: string;
  engagement_level: string;
  burnout_risk: string;
  is_on_track: boolean;
  needs_intervention: boolean;
  summary: string;
  creation_timestamp: string;
  update_timestamp: string;
}

export type {
  DailyPlanStatus,
  DailyTaskStatus,
  DailyTaskType,
  DailyTaskSummaryDto,
  DailyPlanType as DailyPlanDto,
} from "../dailyplan/dailyplanType";


