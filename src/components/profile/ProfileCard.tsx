"use client";

import { Calendar, Mail, MapPin, Pencil } from "lucide-react";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

import Avatar from "../ui/Avatar";
import type { User } from "@/store/features/user/userType";
import ProfileSocialLink from "./ProfileSocialLink";

interface ProfileCardProps {
  profile: User;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <Card
      hoverEffect="none"
      border="transparent"
      className="w-full space-y-7 border border-border p-6"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center text-center">
        <Avatar
          src={profile.avatar}
          alt={profile.fullname}
          name={profile.fullname}
          size="xl"
        />

        <div className="mt-5 flex w-full flex-col items-center">
          <h2 className="text-2xl font-bold">{profile.fullname}</h2>

          <p className="mt-1 text-sm text-neutral">@{profile.username}</p>

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
            <p className="text-xs text-neutral">About</p>

            <p className="text-sm">
              {profile.personal_data.description ?? "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={18} className="mt-1 text-primary" />

          <div>
            <p className="text-xs text-neutral">Joined</p>

            <p className="text-sm">-</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="mb-3 font-semibold">Skills</h3>

        <div className="flex flex-wrap gap-2">
          {profile.personal_data.skills?.map((skill) => (
            <Tag key={skill} label={skill} />
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="mb-3 font-semibold">Social Links</h3>

        <div className="flex items-center justify-center gap-3">
          {profile.other_data.social_links.map((socialLink) => (
            <ProfileSocialLink key={socialLink.type} socialLink={socialLink as any} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
