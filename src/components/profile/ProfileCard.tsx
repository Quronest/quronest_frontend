"use client";

import { useMemo } from "react";
import {
  Calendar,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

import type { UserProfile } from "@/types/ProfileType";
import Avatar from "../ui/Avatar";
import ProfileSocialLink from "./ProfileSocialLink";

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const initials = useMemo(() => {
    return profile.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile.name]);

  return (
    <Card
      hoverEffect="none"
      border="transparent"
      className="w-full border border-border p-6 space-y-7"
    >
      {/* Avatar */}

      <div className="flex flex-col items-center text-center">
        <Avatar
          src={profile.avatar}
          alt={profile.name}
          name={profile.name}
          size="xl"
        />

        <div className="mt-5 flex w-full flex-col items-center">
          <h2 className="text-2xl font-bold">{profile.name}</h2>

          <p className="mt-1 text-sm text-neutral">{profile.username}</p>

          <Button
            variant="primary"
            className="mt-4 gap-2 px-3 py-1.5 text-xs font-medium"
          >
            <Pencil size={14} />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Personal Information */}

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <Mail size={18} className="mt-1 text-primary" />

          <div>
            <p className="text-xs text-neutral">Email</p>

            <p className="text-sm">{profile.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={18} className="mt-1 text-primary" />

          <div>
            <p className="text-xs text-neutral">Location</p>

            <p className="text-sm">{profile.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={18} className="mt-1 text-primary" />

          <div>
            <p className="text-xs text-neutral">Joined</p>

            <p className="text-sm">{profile.joinedAt}</p>
          </div>
        </div>
      </div>

      {/* Skills */}

      <div>
        <h3 className="mb-3 font-semibold">Skills</h3>

        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Tag key={skill} label={skill} />
          ))}
        </div>
      </div>

      {/* Social Links */}

      <div>
        <h3 className="mb-3 font-semibold">Social Links</h3>

        <div className="flex items-center justify-center gap-3">
          {profile.social.map((socialLink) => (
            <ProfileSocialLink key={socialLink.type} socialLink={socialLink} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
