import type { UserProfile } from "@/types/ProfileType";
import { SocialLinkType } from "@/types/SocialLinkType.enum";

export const profileMockData: UserProfile = {
  id: "1",

  name: "Alex Johnson",

  username: "@alexjohnson",

  email: "alexjohnson@gmail.com",

  avatar: null,

  location: "New York, USA",

  joinedAt: "March 2024",

  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Redux Toolkit",
    "Node.js",
  ],

  social: [
    {
      type: SocialLinkType.GITHUB,
      link: "https://github.com/yourusername",
      title: "GitHub",
    },
    {
      type: SocialLinkType.LINKEDIN,
      link: "https://linkedin.com/in/yourusername",
      title: "LinkedIn",
    },
    {
      type: SocialLinkType.PORTFOLIO,
      link: "https://yourportfolio.com",
      title: "Portfolio",
    },
  ],

  stats: {
    group: "A",
    level: 12,
    streak: 18,
    techStack: "MERN",
  },

  contributions: [
    { date: "2026-01-03", count: 3 },
    { date: "2026-01-08", count: 5 },
    { date: "2026-01-15", count: 2 },
    { date: "2026-01-22", count: 7 },
    { date: "2026-01-29", count: 4 },

    { date: "2026-02-02", count: 8 },
    { date: "2026-02-05", count: 9 },
    { date: "2026-02-11", count: 6 },
    { date: "2026-02-18", count: 5 },
    { date: "2026-02-25", count: 12 },

    { date: "2026-03-03", count: 7 },
    { date: "2026-03-10", count: 3 },
    { date: "2026-03-17", count: 10 },
    { date: "2026-03-24", count: 6 },

    { date: "2026-04-02", count: 8 },
    { date: "2026-04-09", count: 4 },
    { date: "2026-04-16", count: 11 },
    { date: "2026-04-23", count: 5 },

    { date: "2026-05-01", count: 7 },
    { date: "2026-05-08", count: 6 },
    { date: "2026-05-15", count: 9 },
    { date: "2026-05-22", count: 3 },

    { date: "2026-06-05", count: 8 },
    { date: "2026-06-12", count: 10 },
    { date: "2026-06-19", count: 5 },
    { date: "2026-06-26", count: 4 },

    { date: "2026-07-03", count: 11 },
    { date: "2026-07-10", count: 7 },
    { date: "2026-07-17", count: 6 },
    { date: "2026-07-24", count: 8 },

    { date: "2026-08-07", count: 3 },
    { date: "2026-08-14", count: 9 },
    { date: "2026-08-21", count: 12 },
    { date: "2026-08-28", count: 5 },

    { date: "2026-09-04", count: 8 },
    { date: "2026-09-11", count: 6 },
    { date: "2026-09-18", count: 7 },
    { date: "2026-09-25", count: 10 },

    { date: "2026-10-02", count: 4 },
    { date: "2026-10-09", count: 9 },
    { date: "2026-10-16", count: 6 },
    { date: "2026-10-23", count: 8 },

    { date: "2026-11-06", count: 5 },
    { date: "2026-11-13", count: 11 },
    { date: "2026-11-20", count: 7 },
    { date: "2026-11-27", count: 4 },

    { date: "2026-12-04", count: 8 },
    { date: "2026-12-11", count: 6 },
    { date: "2026-12-18", count: 10 },
    { date: "2026-12-26", count: 9 },
    { date: "2025-01-04", count: 2 },
    { date: "2025-01-10", count: 5 },
    { date: "2025-01-18", count: 1 },
    { date: "2025-02-02", count: 6 },
    { date: "2025-02-05", count: 8 },
    { date: "2025-02-08", count: 3 },
    { date: "2025-02-11", count: 10 },
    { date: "2025-02-14", count: 7 },
    { date: "2025-02-18", count: 4 },
    { date: "2025-02-22", count: 9 },
    { date: "2025-02-25", count: 12 },
    { date: "2025-03-01", count: 5 },
    { date: "2025-03-06", count: 7 },
    { date: "2025-03-10", count: 2 },
    { date: "2025-03-15", count: 11 },
    { date: "2025-03-21", count: 6 },
    { date: "2025-04-02", count: 8 },
    { date: "2025-04-07", count: 3 },
    { date: "2025-04-12", count: 9 },
    { date: "2025-04-20", count: 5 },
    { date: "2025-05-03", count: 7 },
    { date: "2025-05-10", count: 4 },
    { date: "2025-05-18", count: 12 },
    { date: "2025-05-24", count: 8 },
    { date: "2025-06-01", count: 6 },
    { date: "2025-06-07", count: 9 },
    { date: "2025-06-15", count: 3 },
    { date: "2025-06-20", count: 10 },
    { date: "2025-06-28", count: 5 },
    { date: "2025-07-05", count: 7 },
    { date: "2025-07-12", count: 4 },
    { date: "2025-07-18", count: 8 },
    { date: "2025-07-26", count: 11 },
    { date: "2025-08-03", count: 6 },
    { date: "2025-08-10", count: 2 },
    { date: "2025-08-18", count: 9 },
    { date: "2025-08-25", count: 12 },
    { date: "2025-09-02", count: 4 },
    { date: "2025-09-11", count: 7 },
    { date: "2025-09-20", count: 5 },
    { date: "2025-10-01", count: 10 },
    { date: "2025-10-08", count: 8 },
    { date: "2025-10-18", count: 3 },
    { date: "2025-10-28", count: 11 },
    { date: "2025-11-04", count: 6 },
    { date: "2025-11-13", count: 9 },
    { date: "2025-11-21", count: 5 },
    { date: "2025-12-03", count: 8 },
    { date: "2025-12-12", count: 4 },
    { date: "2025-12-20", count: 10 },
  ],

  activityTimeline: [
    {
      id: 1,
      title: "Completed Authentication Module",
      description:
        "Implemented JWT authentication, refresh tokens and protected routes.",
      date: "February 25, 2026",
      tags: ["React", "JWT"],
      status: "Completed",
      icon: "book",
    },
    {
      id: 2,
      title: "Finished Redux Toolkit Integration",
      description:
        "Created workspace slice and optimized API caching using RTK Query.",
      date: "February 25, 2026",
      tags: ["Redux", "RTK Query"],
      status: "Completed",
      icon: "git",
    },
    {
      id: 3,
      title: "Built Reusable UI Components",
      description:
        "Created reusable Card, Button and Input components with Tailwind CSS.",
      date: "February 24, 2026",
      tags: ["Tailwind", "UI"],
      status: "In Progress",
      icon: "code",
    },
    {
      id: 4,
      title: "Started Next.js Routing",
      description:
        "Implemented nested routing, layouts and improved project structure.",
      date: "February 23, 2026",
      tags: ["Next.js"],
      status: "Started",
      icon: "check",
    },
    {
      id: 5,
      title: "Reached Weekly Learning Goal",
      description:
        "Completed planned study sessions and maintained consistent progress.",
      date: "February 18, 2026",
      tags: ["Milestone"],
      status: "Completed",
      icon: "award",
    },
  ],
};
