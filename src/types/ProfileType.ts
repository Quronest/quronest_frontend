import type { SocialLinkType } from "./SocialLinkType.enum";

export interface SocialLink {
  type: SocialLinkType;
  title: string;
  link: string;
}

export interface CurrentSummary {
  group: string | null;
  phase: number | null;
  summary: string | null;
}

export interface PersonalData {
  personal_description: string | null;
  experience: string | null;
  primary_goal: string | null;
  interested_domains: string;
  skills: string;
}

export interface AcademicData {
  institute_name: string | null;
  course: string | null;
  grade: string | null;
  academic_description: string | null;
}

export interface OtherData {
  about: string | null;
  social_links: SocialLink[];
}

export interface ProfileResponse {
  id: string;
  fullname: string;
  username: string;
  email: string;
  email_verified: boolean;
  phone: string | null;
  phone_verified: boolean;
  avatar: string | null;

  academic_data: AcademicData;
  personal_data: PersonalData;
  other_data: OtherData;
  current_summary: CurrentSummary;
}

export interface Contribution {
  date: string;
  count: number;
}

export type ActivityStatus = "Started" | "In Progress" | "Completed";

export type ActivityIcon = "book" | "git" | "code" | "check" | "award";

export interface ActivityTimelineItem {
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: ActivityStatus;
  icon: ActivityIcon;
}
