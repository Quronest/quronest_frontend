import clsx from "clsx";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";

import type { SocialLink } from "@/types/ProfileType";
import { SocialLinkType } from "@/types/SocialLinkType.enum";

interface ProfileSocialLinkProps {
  socialLink: SocialLink;
}

const ICONS = {
  [SocialLinkType.GITHUB]: Github,
  [SocialLinkType.LINKEDIN]: Linkedin,
  [SocialLinkType.PORTFOLIO]: Globe,
  [SocialLinkType.TWITTER]: Twitter,
  [SocialLinkType.WEBSITE]: Globe,
};

const ProfileSocialLink = ({ socialLink }: ProfileSocialLinkProps) => {
  const Icon = ICONS[socialLink.type];

  if (!Icon) return null;

  return (
    <a
      href={socialLink.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={socialLink.title}
    >
      <div
        className={clsx(
          "flex h-11 w-11 items-center justify-center",
          "rounded-full border border-border",
          "bg-background/40 transition-all duration-300",
          "hover:bg-card-hover"
        )}
      >
        <Icon
          size={20}
          className={clsx(
            "text-neutral",
            "transition-colors",
            "hover:text-primary"
          )}
        />
      </div>
    </a>
  );
};

export default ProfileSocialLink;