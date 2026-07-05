export const SocialLinkType = {
  GITHUB: "GITHUB",
  LINKEDIN: "LINKEDIN",
  PORTFOLIO: "PORTFOLIO",
  TWITTER: "TWITTER",
  WEBSITE: "WEBSITE",
} as const;

export type SocialLinkType =
  (typeof SocialLinkType)[keyof typeof SocialLinkType];