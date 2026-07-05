import type { SocialLinkType } from "./SocialLinkType.enum";

export type SocialLink = {
  type: SocialLinkType;
  link: string;
  title: string;
};

export interface UserStats {
  group: string;
  level: number;
  streak: number;
  techStack: string;
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

export interface UserProfile {
  id: string;

  name: string;
  username: string;
  email: string;
  avatar: string | null;

  location: string;
  joinedAt: string;

  skills: string[];

  social: SocialLink[];

  stats: UserStats;

  contributions: Contribution[];

  activityTimeline: ActivityTimelineItem[];
}
